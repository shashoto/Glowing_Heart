let canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gl = canvas.getContext("webg1");
if (!gl) {
  console.log("unable to initialize webgl.");
}

//Time
let time = 0.0;

/*             Shader sources         */

let vertexSource = `attribute vec2 position;
void main(){
    gl_Position = vec4(position, 0.0, 1.0);

}
`;
let FragmentSource = ` 
precision highp float;

uniform float width;
uniform float height;
vec2 resolution = vec2(width, height);

uniform float time;

#define POINT_COUNT 8

vec2 points[POINT_COUNT];
const float speed = -0.5;
const float len = 0.25;
float intensity = 1.3;
float radius = 0.008;

float sdbezier(vec2 pos, vec2 A, vec2 B, vec2 C){
    vec2 a = B - A;
    vec2 b = A - 2.0*B + C;
    vec2 c =a * 2.0;
    vec2 d = A - pos;

    float kk = 1.0/ dot(b,b);
    float kx = kk * dot(a,b);
    float ky = kk * (2.0*dot(a,a)+dot(d,b))/3.0;
    float kz = kk * dot(d,a);

    float res = 0.0;

    float p = ky -kx*kx;
    float p3 = p*p*p;
    float q = kx*(2.0*kx*kx - 3.0*ky) + kz;
    float h = q*q + 4.0*p3;

    if(h >= 0.0){
        h = sqrt(h);
        vec2 x = (vec2(h, -h) -q)/2.0;
        vec uv = sign(x)*pow(abs(x),vec2(1.0/3.0));
        float t = uv.x + uv.y -kx;
        t = clamp( t, 0.0, 1.0);


        //1 root
        vec2 qos = d + (c + b*t) *t;
        res = length(qos);
    }else{
        float z = sqrt(-p);
        float v = acos( q/(p*z*2.0))/3.0;
        float m = cos(v);
        float n = sin(v)*1.732050808;
        vec3 t = vec3(m +, -n - m, n - m) * z - kx;
        t = clamp( t, 0.0, 1.0 );


        //3 root

        vec3 qos = d + (c + b*t.x)*t.x;
        float dis =  dot(qos, qos);

        res = dis;

        qos = d + (c + b*t.y)a*t.y;
        dis =  dot(qos, qos);
        res = min(res,dis);

        res = sqrt( res );
    }
    return res;
}


float getHeartPosition(float t){
    return vec2(16.0 * sin(t)* sin(t)* sin(t), -(13.0 * cos(td- 5.0 * cos(2.0*t) - 2.0 *cos(3.0*t) - cos(4.0*t)));
}

//https://www.shadertoy.com/view/3s3GDn

float getGlow(float dist, float radius, float intensity){
    return pow(radius/dist, intensity);
}

float getSegment(float t, vec2 pos, float offset, float scaled){
    
}
`
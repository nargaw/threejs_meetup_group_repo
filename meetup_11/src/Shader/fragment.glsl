varying vec2 vUv;
uniform float u_time;
uniform vec2 u_mouse1;
uniform vec2 u_mouse2;
uniform vec2 u_mouse3;
uniform vec2 u_mouse4;
uniform vec2 u_mouse5;
uniform vec2 u_resolution;

float sdCircle(vec2 p, float r)
{
    return length(p) - r;
}


void main()
{
    
    vec2 vUv = (vec2(vUv.x, vUv.y))* u_resolution;

    vec3 color;
    vec2 m = u_mouse1.xy;
    vec2 m2 = u_mouse2.xy;
    vec2 m3 = u_mouse3.xy;
    vec2 m4 = u_mouse4.xy;
    vec2 m5 = u_mouse5.xy;

    vec2 offset = vec2(m) * u_resolution;
    vec2 offset2 = vec2(m2) * u_resolution;
    vec2 offset3 = vec2(m3) * u_resolution;
    vec2 offset4 = vec2(m4) * u_resolution;
    vec2 offset5 = vec2(m5) * u_resolution;
    

    vec3 col = vec3(0.25, 0.25, 0.25);
  
    float d = sdCircle(vUv - offset, 50.21);
    float d2 = sdCircle(vUv - offset2, 40.21);
    float d3 = sdCircle(vUv - offset3, 30.21);
    float d4 = sdCircle(vUv - offset4, 20.21);
    float d5 = sdCircle(vUv - offset5, 10.21);

    //firey glow
    float glowAmount = smoothstep(0., 20.4, abs(d));
    glowAmount = 1. - pow(glowAmount, 0.15);
    color += glowAmount * vec3(1., 0.2, 0.05);

    float glowAmount2 = smoothstep(0., 20.4, abs(d2));
    glowAmount2 = 1. - pow(glowAmount2, 0.15);
    color += glowAmount2 * vec3(1., 0.2, 0.05);

    float glowAmount3 = smoothstep(0., 20.4, abs(d3));
    glowAmount3 = 1. - pow(glowAmount3, 0.15);
    color += glowAmount3 * vec3(1., 0.2, 0.05);

    float glowAmount4 = smoothstep(0., 20.4, abs(d4));
    glowAmount4 = 1. - pow(glowAmount4, 0.15);
    color += glowAmount4 * vec3(1., 0.2, 0.05);

    float glowAmount5 = smoothstep(0., 20.4, abs(d5));
    glowAmount5 = 1. - pow(glowAmount5, 0.15);
    color += glowAmount5 * vec3(1., 0.2, 0.05);
    
    gl_FragColor = vec4(color, 1.);
}
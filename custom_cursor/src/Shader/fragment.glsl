//vUv linked from the vertex shader
//the shader program first needs the vertex shader then the fragment shader
varying vec2 vUv;

//updated uniform values are transfered from the shader material to the fragment shader
//float value is 1 (x)
//vec2 value is 2 (x, y)
//vec3 value is 3 (x, y, z)
//vec4 value is 4 (x, y, z, a)
uniform float u_time;
uniform vec2 u_mouse1;
uniform vec2 u_mouse2;
uniform vec2 u_mouse3;
uniform vec2 u_mouse4;
uniform vec2 u_mouse5;
uniform vec2 u_resolution;


//circle function
//takes the value of a point and draws a radius r distance away
float sdCircle(vec2 p, float r)
{
    return length(p) - r;
}


void main()
{
    //vUv value is multiplied by the resolution of the screen
    vec2 vUv = (vec2(vUv.x, vUv.y))* u_resolution;

    //color has three values (x, y, z)
    vec3 color;

    //each m value is copied from the uniform mouse values and each has two values (x, y)
    //the m values are different because the uniforms are different
    vec2 m = u_mouse1.xy;
    vec2 m2 = u_mouse2.xy;
    vec2 m3 = u_mouse3.xy;
    vec2 m4 = u_mouse4.xy;
    vec2 m5 = u_mouse5.xy;

    //each offset value is multipled by the uniform resolution
    vec2 offset = vec2(m) * u_resolution;
    vec2 offset2 = vec2(m2) * u_resolution;
    vec2 offset3 = vec2(m3) * u_resolution;
    vec2 offset4 = vec2(m4) * u_resolution;
    vec2 offset5 = vec2(m5) * u_resolution;

    //draw each circle - we have 5 circles
    //vUv value and offset values are both multiplied by the resolution
    //the sdCircle function takes two values(vec2 point, float distance)
    //it will draw each circle x distance away based on the mouse location
    float d = sdCircle(vUv - offset, 50.21);
    float d2 = sdCircle(vUv - offset2, 40.21);
    float d3 = sdCircle(vUv - offset3, 30.21);
    float d4 = sdCircle(vUv - offset4, 20.21);
    float d5 = sdCircle(vUv - offset5, 10.21);

    //firey glow applied to each circle
    //smoothstep function added a gradient 
    //abs function makes the glow on either side of the point of the distance
    //pow function make the color increase by raising the glowAmount to a certain power giving a glow effect
    //the color is multipled by a vec3 value to change the color (r, g, b)
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
    
    //the final color is sent to the gl_FragColor and will be drawn on the screen
    gl_FragColor = vec4(color, 1.);
}
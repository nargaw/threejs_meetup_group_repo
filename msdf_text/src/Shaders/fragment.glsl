//varying
varying vec2 vLayoutUv;
varying vec2 vUv;

// Uniforms: Common
uniform float u_time;
uniform float uOpacity;
uniform float uThreshold;
uniform float uAlphaTest;
uniform vec3 uColor;
uniform sampler2D uMap;
uniform float uProgress;
uniform float uProgress2;
uniform float uProgress3;
uniform float uProgress4;

// Uniforms: Strokes
uniform vec3 uStrokeColor;
uniform float uStrokeOutsetWidth;
uniform float uStrokeInsetWidth;

// Utils: Median
    float median(float r, float g, float b) {
        return max(min(r, g), min(max(r, g), b));
    }

    float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float random2(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

     float noise(vec2 p){
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
        
        float res = mix(
            mix(random2(ip),rand(ip+vec2(1.0,0.0)),u.x),
            mix(random2(ip+vec2(0.0,1.0)),random2(ip+vec2(1.0,1.0)),u.x),u.y);
        return res*res;
    }

    float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }


void main()
{
    
    vec2 coords = vec2(vLayoutUv.x, vLayoutUv.y);

    vec3 color = vec3(0.);

    
    vec3 s = texture2D(uMap, vec2(vUv) ).rgb;

    // Signed distance
    float sigDist = median(s.r, s.g, s.b) - 0.5;

    float afwidth = 1.4142135623730951 / 2.0;

    #ifdef IS_SMALL
        float alpha = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDist);
    #else
        float alpha = clamp(sigDist / fwidth(sigDist) + 0.5, 0.0, 1.0);
    #endif

    // Strokes
    // Outset
    float sigDistOutset = sigDist + uStrokeOutsetWidth * 0.5;

    // Inset
    float sigDistInset = sigDist - uStrokeInsetWidth * 0.5;

    #ifdef IS_SMALL
        float outset = smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistOutset);
        float inset = 1.0 - smoothstep(uThreshold - afwidth, uThreshold + afwidth, sigDistInset);
    #else
        float outset = clamp(sigDistOutset / fwidth(sigDistOutset) + 0.5, 0.0, 1.0);
        float inset = 1.0 - clamp(sigDistInset / fwidth(sigDistInset) + 0.5, 0.0, 1.0);
    #endif

    // Border
    float border = outset * inset;

    // Alpha Test
    if (alpha < uAlphaTest) discard;

    // Output: Common
    vec4 filledFragColor = vec4( uColor, uProgress * uOpacity * alpha);

    // Output: Strokes
    vec4 strokedFragColor = vec4(uStrokeColor, uOpacity * border);

    float x = floor(vLayoutUv.x * 10. * 3.88);
    float y = floor(vLayoutUv.y * 10.);
    float pattern = noise(vec2(x, y));

    vec3 blue = vec3(0.034, 0.966, 0.988);
    vec4 l1 = vec4(vec3(0.912, .0987, 0.234), border);
    vec4 l2 = vec4(vec3(.902, 0.278, 0.369), border);
    vec4 l3 = vec4(vec3(0.924, 0.43, 0.01), outset);
    vec4 l4 = vec4(vec3(0.7204, .604, .929), outset);

    float width = 1.0;

    float p0 = abs(sin(u_time) + 0.25 / 2.);
    p0 = map(p0, 0., 1., -width, 1.);
    p0 = smoothstep(p0, p0 + width, vLayoutUv.x);
    float mix0 = 2. * p0 - pattern; 
    mix0 = clamp(mix0, 0., 1.);

    float p2 = (cos(u_time)) + 0.5;
    p2 = map(p2, 0., 1., -width, 1.);
    p2 = smoothstep(p2, p2 + width, vLayoutUv.x);
    float mix2 = 2. * p2 - pattern; 
    mix2 = clamp(mix2, 0., 1.);

    float p3 = (sin(u_time)) + 0.75;
    p3 = map(p3, 0., 1., -width, 1.);
    p3 = smoothstep(p3, p3 + width, vLayoutUv.x);
    float mix3 = 2. * p3 - pattern; 
    mix3 = clamp(mix3, 0., 1.);

    float p4 = cos(u_time) + 1.;
    p4 = map(p4, 0., 1., -width, 1.);
    p4 = smoothstep(p4, p4 + width, vLayoutUv.x);
    float mix4 = 2. * p4 - pattern; 
    mix4 = clamp(mix4, 0., 1.);

    vec4 layer1 = mix(vec4(0.), l1, 1. - mix0);
    vec4 layer2 = mix(layer1, l2, 1. - mix2);
    vec4 layer3 = mix(layer2, l3, 1. - mix3);
    vec4 layer4 = mix(layer3, l4, 1. - mix4);

    vec4 finalLayer = layer1;
    gl_FragColor = finalLayer;
    // gl_FragColor = vec4(vLayoutUv, 0., outset);
    // gl_FragColor = vec4(color, outset);
}
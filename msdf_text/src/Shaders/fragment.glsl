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

//noise function
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

//remap function
float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}


void main()
{
    
    vec2 coords = vec2(vLayoutUv.x, vLayoutUv.y);

    vec3 color = vec3(0.);

    vec3 s = texture2D(uMap, vec2(vUv)).rgb;

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

    float x = floor(vLayoutUv.x * 100. * 3.88 );
    float y = floor(vLayoutUv.y * 100.);
    float pattern = noise(vec2(x, y));

    vec4 l1 = vec4(vec3(0.512, .5987, 0.934), uOpacity * border);

    float width = 1.0;

    float p0 = abs(sin(u_time * 0.25) + 0.25 / 2.);
    p0 = map(p0, 0., 1., -width, 1.);
    p0 = smoothstep(p0, p0 + width, vLayoutUv.x);
    float mix0 = 2. * p0 - pattern; 
    mix0 = clamp(mix0, 0., 1.);

    vec4 layer1 = mix(vec4(0.), l1, 1. - mix0);
    vec4 finalLayer = layer1;

    gl_FragColor = finalLayer;
}
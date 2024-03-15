// Varyings
varying vec2 vUv;
varying vec2 vLayoutUv;

// Uniforms: Common
uniform float uOpacity;
uniform float uThreshold;
uniform float uAlphaTest;
uniform vec3 uColor;
uniform sampler2D uMap;
uniform vec2 uMouse;
uniform float uTime;

// Uniforms: Strokes
uniform vec3 uStrokeColor;
uniform float uStrokeOutsetWidth;
uniform float uStrokeInsetWidth;

// Utils: Median
float median(float r, float g, float b) {
    return max(min(r, g), min(max(r, g), b));
}

 vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    
    //
    // Description : GLSL 2D simplex noise function
    //      Author : Ian McEwan, Ashima Arts
    //  Maintainer : ijm
    //     Lastmod : 20110822 (ijm)
    //     License :
    //  Copyright (C) 2011 Ashima Arts. All rights reserved.
    //  Distributed under the MIT License. See LICENSE file.
    //  https://github.com/ashima/webgl-noise
    //
    float snoise(vec2 v) {
    
        // Precompute values for skewed triangular grid
        const vec4 C = vec4(0.211324865405187,
                            // (3.0-sqrt(3.0))/6.0
                            0.366025403784439,
                            // 0.5*(sqrt(3.0)-1.0)
                            -0.577350269189626,
                            // -1.0 + 2.0 * C.x
                            0.024390243902439);
                            // 1.0 / 41.0
    
        // First corner (x0)
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
    
        // Other two corners (x1, x2)
        vec2 i1 = vec2(0.0);
        i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);
        vec2 x1 = x0.xy + C.xx - i1;
        vec2 x2 = x0.xy + C.zz;
    
        // Do some permutations to avoid
        // truncation effects in permutation
        i = mod289(i);
        vec3 p = permute(
                permute( i.y + vec3(0.0, i1.y, 1.0))
                    + i.x + vec3(0.0, i1.x, 1.0 ));
    
        vec3 m = max(0.5 - vec3(
                            dot(x0,x0),
                            dot(x1,x1),
                            dot(x2,x2)
                            ), 0.0);
    
        m = m*m ;
        m = m*m ;
    
        // Gradients:
        //  41 pts uniformly over a line, mapped onto a diamond
        //  The ring size 17*17 = 289 is close to a multiple
        //      of 41 (41*7 = 287)
    
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
    
        // Normalise gradients implicitly by scaling m
        // Approximation of: m *= inversesqrt(a0*a0 + h*h);
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);
    
        // Compute final noise value at P
        vec3 g = vec3(0.0);
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);
        return 130.0 * dot(m, g);
    }
    
    #define OCTAVES 6
    
    float ridge(float h, float offset) {
        h = abs(h);     // create creases
        h = offset - h; // invert so creases are at top
        h = h * h;      // sharpen creases
        return h;
    }
    
    float fbm(vec2 vUv){
        float lacunarity = 2.0;
        float gain = 0.15;
        float offset = 0.9;
        float amp = 0.5;
        float sum = 0.0;
        float freq = 1.0; 
        float prev = 1.0;
        for( int i = 0; i < OCTAVES; i++){
            float v = ridge(snoise(vUv * freq), offset * sin(snoise(vUv + (uTime * 0.25))));
            sum += v *amp;
            sum += v * amp * prev;
            prev = v;
            freq *= lacunarity;
            amp *= gain;
        }
        return sum;
    }

void main() {
    vec2 m = uMouse.xy;
    vec3 color = uColor;

    vec3 circleColor = vec3(1., 0., 0.);
    vec2 offset = vec2(m) - 0.5;
    offset.y -= 1.0;
    vec2 newUv = vLayoutUv;

    float f = fbm(vLayoutUv - offset) * 0.005;
    float circle = distance(newUv - offset + f, vec2(0.5));
    circle = 1. - smoothstep(0.2, 0.21, circle);


    // Common
    // Texture sample
    vec3 s = texture2D(uMap, vUv + f).rgb;

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
    vec4 filledFragColor = vec4(uColor, uOpacity * alpha);

    // Output: Strokes
    vec4 strokedFragColor = vec4(uStrokeColor, uOpacity * border);

    // gl_FragColor = filledFragColor;

    

    color = uStrokeColor;

    color = mix(color, circleColor, circle);

    gl_FragColor = vec4(color, uOpacity * border);

    
}
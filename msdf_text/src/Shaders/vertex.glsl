// Attribute
attribute vec2 layoutUv;

attribute float lineIndex;

attribute float lineLettersTotal;
attribute float lineLetterIndex;

attribute float lineWordsTotal;
attribute float lineWordIndex;

attribute float wordIndex;

attribute float letterIndex;

// Varyings
varying vec2 vUv;
varying vec2 vLayoutUv;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 vPosition;

varying float vLineIndex;

varying float vLineLettersTotal;
varying float vLineLetterIndex;

varying float vLineWordsTotal;
varying float vLineWordIndex;

varying float vWordIndex;

varying float vLetterIndex;

uniform vec2 u_mouse;
uniform float u_time;

//easing functions
float easeOutBounce(float x){
    const float nl = 7.5625;
    const float dl = 2.75;

    if (x < 1. / dl){
        return nl * x * x;
    } else if (x < 2.0 / dl){
        x -= 1.5/ dl;
        return nl * x * x + 0.75;
    } else if (x < 2.5 / dl){
        x -= 2.25 / dl;
        return nl * x * x + 0.9375;
    } else {
        x -= 2.625 / dl;
        return nl * x * x + 0.984375;
    }
}

float easeInBounce(float x){
    return 1. - easeOutBounce(1. - x);
}

float easeInOutBounce(float x){
    return x < 0.5
    ? (1. - easeOutBounce(1. - 2. * x)) / 2.
    : (1. + easeOutBounce(2. * x - 1.)) / 2.;
}

void main() {
    
    vec3 localSpacePosition = position;

    float wave = sin(localSpacePosition.x * 4.5 + u_time * 3.);

    localSpacePosition.y += wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.);
    // vNormal = (modelMatrix * vec4(normal, 0.)).xyz;

    // Varyings
    vUv = uv;
    vLayoutUv = layoutUv;
    // vViewPosition = -localSpacePosition.xyz;
    vNormal = normal;

    vLineIndex = lineIndex;

    vLineLettersTotal = lineLettersTotal;
    vLineLetterIndex = lineLetterIndex;

    vLineWordsTotal = lineWordsTotal;
    vLineWordIndex = lineWordIndex;

    vWordIndex = wordIndex;

    vLetterIndex = letterIndex;
}
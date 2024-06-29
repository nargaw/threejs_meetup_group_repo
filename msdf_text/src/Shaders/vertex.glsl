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
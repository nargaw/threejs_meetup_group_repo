//uniforms
uniform float uTime;
uniform vec2 uMouse;
uniform sampler2D uTexture;

//varying
varying vec2 vUv;

void main()
{
    vec3 color = vec3(0.);

    color = texture2D(uTexture, vUv).rgb;

    gl_FragColor = vec4(color, 1.);
}
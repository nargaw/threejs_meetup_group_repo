
#define S(a, b, t) smoothstep(a, b, t)
#define grid 10.
#define time u_time

uniform sampler2D u_texture;
uniform samplerCube u_background;
uniform vec3 u_cameraPosition;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec4 vColor;

void main()
{
    vec2 vUv = vec2(vUv.x, vUv.y);
    vec2 uv2 = vUv;
    vec3 color = vec3(0.9, 0.1, 0.1);
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(u_cameraPosition - vPosition);
    vec3 lighting = vec3(0.);

    //Lambertian lighting
    vec3 lightDirection = normalize(vec3(1.));
    vec3 lightColor = vec3(1., 1., 0.9);
    float dp = max(0., dot(lightDirection, normal));
    vec3 diffuse = dp * lightColor * 2.;

    lighting = diffuse * 0.8;

    vec3 r = normalize(reflect(-lightDirection, normal));
    float phongValue = max(0.0, dot(viewDir, r));
    phongValue = pow(phongValue, 128.0);
    vec3 specular = vec3(phongValue);

    vec3 iblCoord = normalize(reflect(-viewDir, normal));
    vec3 iblSample = textureCube(u_background, iblCoord).xyz;

    float fresnel = 1. - max(0., dot(viewDir, normal));
    fresnel = pow(fresnel, 2.);
    fresnel *= step(0.027, fresnel);

    color = color * lighting + specular * 0.5;
    color = pow(color, vec3(1./2.2));

    color = normal * 0.5 + 0.5 + fresnel;

    gl_FragColor = vec4(color, 1.0);
}
//unifrom form the Blob component sent here to the frag shader
//uniforms are uniform for all fragments
uniform vec3 u_cameraPosition;
uniform vec3 u_color;

//varyings vary for all fragments
varying vec3 vNormal;
varying vec3 vPosition;

//inverseLerp 
float inverseLerp(float v, float minVal, float maxVal){
    return (v - minVal) / (maxVal - minVal);
}

//remap function
float remap(float v, float minIn, float maxIn, float minOut, float maxOut){
    float t = inverseLerp(v, minIn, maxIn);
    return mix(minOut, maxOut, t);
}

void main()
{
    //color of the mesh
    // vec3 color = vec3(0.9, 0.1, 0.1);
    vec3 color = u_color;

    //normal allows us to calculate which direction the fragments are facing
    //acquired from the vertex shader and normalized
    //to normalize a function is to convert its value from 0 to 1 based on mean value
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(u_cameraPosition - vPosition);
    vec3 lighting = vec3(0.);

    //ambient light
    vec3 ambient = vec3(0.5);

    //Hemi light
    vec3 skyColor = vec3(0., 0.3, 0.6);
    vec3 groundColor = vec3(0.6, 0.3, 0.1);
    float hemiMix = remap(normal.y, -1., 1., 0., 1.);
    vec3 hemi = mix(groundColor, skyColor, hemiMix);

    //Lambertian lighting
    //the surface reflects light such that each part of the surface looks the same from every angle
    vec3 lightDirection = normalize(vec3(1.));
    vec3 lightColor = vec3(1., 1., 0.9);
    //dot product and take the max
    float dp = max(0., dot(lightDirection, normal));
    vec3 diffuse = dp * lightColor * 2.;

    //ambient light
    //lighting += ambient * 0.2;

    //hemi light
    lighting += hemi * 0.5;

    //diffuse light
    lighting += diffuse * 0.8;

    //phong shading - calculates the reflection of a model based on the normal
    vec3 r = normalize(reflect(-lightDirection, normal));
    float phongValue = max(0.0, dot(viewDir, r));
    phongValue = pow(phongValue, 128.0);
    vec3 specular = vec3(phongValue);

    //fresnel - as you approach the grazing angle more light is reflected 
    float fresnel = 1. - max(0., dot(viewDir, normal));
    fresnel = pow(fresnel, 2.);
    fresnel *= step(0.027, fresnel);

    color = color * lighting + specular * 0.5 + fresnel * 0.025;
    color = pow(color, vec3(1./2.2));

    //color = normal * 0.5 + 0.5 + fresnel;

    gl_FragColor = vec4(color, 1.0);
}
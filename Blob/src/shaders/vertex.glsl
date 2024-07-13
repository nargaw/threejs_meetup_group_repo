varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec4 vColor;

uniform float u_frequency;
uniform float u_amplitude;
uniform float u_speed;

//inverseLerp 
float inverseLerp(float v, float minVal, float maxVal){
    return (v - minVal) / (maxVal - minVal);
}

//remap
float remap(float v, float minIn, float maxIn, float minOut, float maxOut){
    float t = inverseLerp(v, minIn, maxIn);
    return mix(minOut, maxOut, t);
}

//rotate
mat3 rotateY(float radians)
{
    float s = sin(radians);
    float c = cos(radians);

    return mat3(
        c, 0.0, s,
        0.0, 1., 0.,
        -s, 0., c
    );
}

mat3 rotateZ(float radians)
{
    float s = sin(radians);
    float c = cos(radians);

    return mat3(
        c, -s, 0.,
        s, c, 0.,
        0., 0., 1.
    );
}

mat3 rotateX(float radians)
{
    float s = sin(radians);
    float c = cos(radians);

    return mat3(
        1., 0.0, 0.,
        0.0, c, -s,
        0., s, c
    );
}

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

//	Classic Perlin 3D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}



float displace(vec3 point) {
    return cnoise(point * u_frequency + vec3(u_time * u_speed)) * u_amplitude;
  }

vec3 orthogonal(vec3 v){
    return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
}

void main()
{
    vec3 displacedPosition = position + normal * displace(position);
    vec4 modelPosition = modelMatrix * vec4(displacedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    

    float offset = 4.0/256.0;
    vec3 tangent = orthogonal(normal);
    vec3 bitangent = normalize(cross(normal, tangent));
    vec3 neighbour1 = position + tangent * offset;
    vec3 neighbour2 = position + bitangent * offset;
    vec3 displacedNeighbour1 = neighbour1 + normal * displace(neighbour1);
    vec3 displacedNeighbour2 = neighbour2 + normal * displace(neighbour2);

    vec3 displacedTangent = displacedNeighbour1 - displacedPosition;
    vec3 displacedBitangent = displacedNeighbour2 - displacedPosition;

    vec3 displacedNormal = normalize(cross(displacedTangent, displacedBitangent));

    vPosition = (modelMatrix * vec4(displacedPosition, 1.)).xyz;
    vNormal = displacedNormal * normalMatrix;
}
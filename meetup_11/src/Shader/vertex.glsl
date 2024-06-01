varying vec2 vUv;
            
void main()
    {
        //vUv is the defined varying value that varies in each pixel fragment
        //vUv value copies the value of uv which is already available 
        vUv = uv;
        gl_Position = vec4(position, 1.0);
        // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
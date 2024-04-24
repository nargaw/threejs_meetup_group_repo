import { useRef } from "react"
import useScrolly from "./stores/useScrolly"
import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { lerp } from "three/src/math/MathUtils.js"


export default function TextDisplay()
{

    const pagePositionValue = useScrolly(state => state.pageValue)

    const text1 = useRef()
    const text2 = useRef()
    const text3 = useRef()
    const text4 = useRef()
    const text5 = useRef()

    useFrame((state, delta) => {
        if(pagePositionValue !== 0){
            text1.current.material.opacity = lerp(text1.current.material.opacity, 0., 2.5 * delta)
        } else {
            text1.current.material.opacity = lerp(text1.current.material.opacity, 1., 2.5 * delta)
        }

        if(pagePositionValue !== 1){
            text2.current.material.opacity = lerp(text2.current.material.opacity, 0., 2.5 * delta)
        } else {
            text2.current.material.opacity = lerp(text2.current.material.opacity, 1., 2.5 * delta)
        }

        if(pagePositionValue !== 2){
            text3.current.material.opacity = lerp(text3.current.material.opacity, 0., 2.5 * delta)
        } else {
            text3.current.material.opacity = lerp(text3.current.material.opacity, 1., 2.5 * delta)
        }

        if(pagePositionValue !== 3){
            text4.current.material.opacity = lerp(text4.current.material.opacity, 0., 2.5 * delta)
        } else {
            text4.current.material.opacity = lerp(text4.current.material.opacity, 1., 2.5 * delta)
        }

        if(pagePositionValue !== 4){
            text5.current.material.opacity = lerp(text5.current.material.opacity, 0., 2.5 * delta)
        } else {
            text5.current.material.opacity = lerp(text5.current.material.opacity, 1., 2.5 * delta)
        }
    })

    return <>
        <Text
            ref = {text1}
            font='./Font/Inter-Light.woff'
            fontSize={15.95}
            // anchorX={0.}
            // anchorY={-1.5}
            maxWidth={140}
            minWidth={5}
            lineHeight={1.125}
            textAlign="center"
            position={[0, .0, 5.]}
        >
            What is the best food on earth?
        </Text>

        <Text
            ref = {text2}
            font='./Font/Inter-Light.woff'
            fontSize={2.95}
            // anchorX={17.0}
            anchorY={2.5}
            maxWidth={100}
            minWidth={5}
            lineHeight={1.125}
            textAlign="center"
            position={[0, 0.0, 3.]}
        >
            maybe it is a burger
        </Text>

        <Text
            ref = {text3}
            font='./Font/Inter-Light.woff'
            fontSize={1.95}
            color={'black'}
            anchorX={10.0}
            anchorY={1.5}
            maxWidth={10}
            minWidth={5}
            lineHeight={1.125}
            textAlign="center"
            position={[0, 10, 0.]}
            rotation-x={-Math.PI * 0.215}
        >
            probably sushi
        </Text>

        <Text
            ref = {text4}
            font='./Font/Inter-Light.woff'
            fontSize={0.25}
            anchorX={2.0}
            anchorY={0.}
            maxWidth={2}
            minWidth={5}
            lineHeight={1.125}
            textAlign="center"
            position={[0, 0.0, 1.]}
        >
            perhaps icecream
        </Text>

        <Text
            ref = {text5}
            font='./Font/Inter-Light.woff'
            fontSize={0.25}
            anchorX={0.0}
            anchorY={-0.125}
            maxWidth={3.40}
            // minWidth={5}
            lineHeight={1.125}
            textAlign="center"
            position={[-1.75, 0.0, -2.]}
        >
            Whichever one you choose, it is a delicious world!
        </Text>
    </>
}
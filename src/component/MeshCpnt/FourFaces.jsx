import { useGLTF, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import { Dicesmap } from "./DicesMap";
import d4NormalMap from "@/assets/images/texturesPack/d4/d4_nm.png"

export default function FourFaces({ position, rotation, textureId }){

    const { nodes } = useGLTF('./models/fourFacesDice.glb')
    const meshRef = useRef()
    const texture = useRef({})

    Dicesmap.d4.forEach((t) => {
        texture.current[t.id] = useTexture({map: t.map.src, normalMap: d4NormalMap.src})
        texture.current[t.id].map.flipY = false
        texture.current[t.id].normalMap.flipY = false
        texture.current[t.id].roughness = 0.4
        texture.current[t.id].metalness = 0.2
    })

    const [ d4Texture ] = useState(texture.current[textureId])

    return (
        <mesh
            ref={(meshRef)}
            castShadow={true}
            geometry={nodes.d4.geometry}
            scale={0.0001}
            position={position}
            rotation={rotation}
        >
            <meshStandardMaterial
                attach="material"
                {...d4Texture}
            />
        </mesh>
    )
}
import { useGLTF, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import { Dicesmap } from "./DicesMap";
import d6NormalMap from "@/assets/images/texturesPack/d6/d6_nm.png"

export default function SixFaces({ position, rotation, textureId }){
    const { nodes } = useGLTF('./models/sixFacesDice.glb')
    const meshRef = useRef()
    const texture = useRef({})

    Dicesmap.d6.forEach((t) => {
        texture.current[t.id] = useTexture({map: t.map.src, normalMap: d6NormalMap.src})
        texture.current[t.id].map.flipY = false
        texture.current[t.id].normalMap.flipY = false
        texture.current[t.id].roughness = 0.4
        texture.current[t.id].metalness = 0.2
    })

    const [ d6Texture ] = useState(texture.current[textureId])

    return (
        <mesh
            ref={(meshRef)}
            castShadow={true}
            geometry={nodes.d6.geometry}
            scale={0.00005}
            position={position}
            rotation={rotation}
        >
            <meshStandardMaterial
                attach="material"
                {...d6Texture}
            />
        </mesh>
    )
}
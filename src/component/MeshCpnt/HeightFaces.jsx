import { useGLTF, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import { Dicesmap } from "./DicesMap";

export default function HeightFaces({ position, rotation, textureId }){

    const { nodes } = useGLTF('/models/heightFacesDice.glb')
    const meshRef = useRef()
    const texture = useRef({})

    Dicesmap.d8.forEach((t) => {
        texture.current[t.id] = useTexture({map: t.map, normalMap: "/images/texturesPack/d8/d8_nm.png"})
        texture.current[t.id].map.flipY = false
        texture.current[t.id].normalMap.flipY = false
        texture.current[t.id].roughness = 0.4
        texture.current[t.id].metalness = 0.2
    })

    const [ d8Texture ] = useState(texture.current[textureId])

    return (
        <mesh
            ref={(meshRef)}
            castShadow={true}
            geometry={nodes.d8.geometry}
            scale={0.00005}
            position={position}
            rotation={rotation}
        >
            <meshStandardMaterial
                attach="material"
                {...d8Texture}
            />
        </mesh>
    )
}
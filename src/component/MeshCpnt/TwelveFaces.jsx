import { useGLTF, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import { Dicesmap } from "./DicesMap";

export default function TwelveFaces({ position, rotation, textureId }){
    const { nodes, materials } = useGLTF('/models/twelveFacesDice.glb')
    const meshRef = useRef()
    const texture = useRef({})

    Dicesmap.d12.forEach((t) => {
        texture.current[t.id] = useTexture({map: t.map, normalMap: "/images/texturesPack/d12/d12_nm.png"})
        texture.current[t.id].map.flipY = false
        texture.current[t.id].normalMap.flipY = false
        texture.current[t.id].roughness = 0.4
        texture.current[t.id].metalness = 0.2
    })

    const [ d12Texture ] = useState(texture.current[textureId])

    return (
        <mesh
            ref={(meshRef)}
            castShadow={true}
            geometry={nodes.d12.geometry}
            scale={0.000065}
            position={position}
            rotation={rotation}
            >
            <meshStandardMaterial
                attach="material"
                {...d12Texture}
            />
        </mesh>
    )
}
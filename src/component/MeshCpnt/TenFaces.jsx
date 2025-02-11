import { useGLTF, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import { Dicesmap } from "./DicesMap";
import d10NormalMap from "@/assets/images/texturesPack/d10/d10_nm.png"

export default function TenFaces({ position, rotation, textureId }){
    const { nodes } = useGLTF('./models/tenFacesDice.glb')
    const meshRef = useRef()
    const texture = useRef({})

    Dicesmap.d10.forEach((t) => {
        texture.current[t.id] = useTexture({map: t.map.src, normalMap: d10NormalMap.src})
        texture.current[t.id].map.flipY = false
        texture.current[t.id].normalMap.flipY = false
        texture.current[t.id].roughness = 0.4
        texture.current[t.id].metalness = 0.2
    })

    const [ d10Texture ] = useState(texture.current[textureId])

    return (
        <mesh
            ref={(meshRef)}
            castShadow={true}
            geometry={nodes.d10.geometry}
            scale={0.00006}
            position={position}
            rotation={rotation}
            >
            <meshStandardMaterial
                attach="material"
                {...d10Texture}
            />
        </mesh>
    )
}
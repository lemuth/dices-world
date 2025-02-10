import { useGLTF, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import { Dicesmap } from "./DicesMap";

export default function TwentyFaces({ position, rotation, textureId }){
    const { nodes } = useGLTF('./models/twentyFacesDice.glb')
    const meshRef = useRef()
    const texture = useRef({})

    Dicesmap.d20.forEach((t) => {
        texture.current[t.id] = useTexture({map: t.map, normalMap: "./images/texturesPack/d20/d20_nm.png"})
        texture.current[t.id].map.flipY = false
        texture.current[t.id].normalMap.flipY = false
        texture.current[t.id].roughness = 0.4
        texture.current[t.id].metalness = 0.2
    })

    const [ d20Texture ] = useState(texture.current[textureId])

    return (
        <mesh
            ref={(meshRef)}
            castShadow={true}
            geometry={nodes.d20.geometry}
            scale={0.00007}
            position={position}
            rotation={rotation}
            >
            <meshStandardMaterial
                attach="material"
                {...d20Texture}
            />
        </mesh>
    )
}
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export default function PisteExt({position}){
    const { nodes } = useGLTF('./models/pisteExt.glb')
    const meshRef = useRef()

    return (
        <group position={position}>
            <mesh
                ref={(meshRef)}
                receiveShadow={false}
                geometry={nodes.CylinderExt01.geometry}
                scale={0.00005}
            >
                <meshStandardMaterial
                    visible={false}
                />
            </mesh>
            <mesh
                ref={(meshRef)}
                receiveShadow={false}
                geometry={nodes.CylinderExt02.geometry}
                scale={0.00005}
            >
                <meshStandardMaterial
                    visible={false}
                />
            </mesh>
            <mesh
                ref={(meshRef)}
                receiveShadow={false}
                geometry={nodes.CylinderExt03.geometry}
                scale={0.00005}
            >
                <meshStandardMaterial
                    visible={false}
                />
            </mesh>
            <mesh
                ref={(meshRef)}
                receiveShadow={false}
                geometry={nodes.CylinderExt04.geometry}
                scale={0.00005}
            >
                <meshStandardMaterial
                    visible={false}
                />
            </mesh>
            <mesh
                ref={(meshRef)}
                receiveShadow={false}
                geometry={nodes.CylinderExt05.geometry}
                scale={0.00005}
            >
                <meshStandardMaterial
                    visible={false}
                />
            </mesh>
            <mesh
                ref={(meshRef)}
                receiveShadow={false}
                geometry={nodes.CylinderExt06.geometry}
                scale={0.00005}
            >
                <meshStandardMaterial
                    visible={false}
                />
            </mesh>
            <mesh
                ref={(meshRef)}
                receiveShadow={false}
                geometry={nodes.CylinderExt07.geometry}
                scale={0.00005}
            >
                <meshStandardMaterial
                    visible={false}
                />
            </mesh>
            <mesh
                ref={(meshRef)}
                receiveShadow={false}
                geometry={nodes.CylinderExt08.geometry}
                scale={0.00005}
            >
                <meshStandardMaterial
                    visible={false}
                />
            </mesh>
            
        </group>
    )
}
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export default function Piste({position}){
    const { nodes, materials } = useGLTF('/models/piste.glb')
    const meshRef = useRef()

    return (
        <group position={position}>
            <mesh
                ref={(meshRef)}
                receiveShadow={true}
                geometry={nodes.base.geometry}
                material={materials.base}
                scale={0.00005}
            />
            <mesh
                ref={(meshRef)}
                receiveShadow
                geometry={nodes.north_east.geometry}
                material={materials.panel}
                scale={0.00005}
            />
            <mesh
                ref={(meshRef)}
                receiveShadow
                geometry={nodes.north.geometry}
                material={materials.panel}
                scale={0.00005}
            />
            <mesh
                ref={(meshRef)}
                receiveShadow
                geometry={nodes.north_west.geometry}
                material={materials.panel}
                scale={0.00005}
            />
            <mesh
                ref={(meshRef)}
                receiveShadow
                geometry={nodes.west.geometry}
                material={materials.panel}
                scale={0.00005}
            />
            <mesh
                ref={(meshRef)}
                receiveShadow
                geometry={nodes.south_east001.geometry}
                material={materials.panel}
                scale={0.00005}
            />
            <mesh
                ref={(meshRef)}
                receiveShadow
                geometry={nodes.south.geometry}
                material={materials.panel}
                scale={0.00005}
            />
            <mesh
                ref={(meshRef)}
                receiveShadow
                geometry={nodes.south_east.geometry}
                material={materials.panel}
                scale={0.00005}
            />
            <mesh
                ref={(meshRef)}
                receiveShadow
                geometry={nodes.east.geometry}
                material={materials.panel}
                scale={0.00005}
            />
        </group>
    )
}
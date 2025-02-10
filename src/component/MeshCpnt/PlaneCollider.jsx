import { RigidBody } from "@react-three/rapier"

export default function PlaneCollider() {
    return (
        <RigidBody 
            type="fixed" 
            colliders="cuboid"
            position={[0, 0.28, 0]}
            friction={1}
            restitution={0.1}
        >
            {/* Mesh invisible mais qui crée une collision */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial
                    visible={false}
                />
            </mesh>
        </RigidBody>
    )
}
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useContext, useRef } from "react";
import { CameraHelper } from 'three';
import DiceSelector from "./DiceSelector";
import RollPreparation from "./RollPreparation"
import RollPhysics from "./RollPhysics";
import { RollDiceContext } from "@/context/RollDiceContext";
import Title from "@/component/Title"

export default function Scene(){

    const { selectPhase } = useContext(RollDiceContext)
    const cameraRef = useRef()
    const cameraPosition = [ 0, 9, 0 ]
    const cameraRotation = [ -1.57080, -0.14452, -0.00 ]
    const cameraTarget = [0, -1, 0 ]

    function CameraLogger() {
        const { camera } = useThree();
        
        useFrame(() => {
            // On vérifie si la caméra a une target (via OrbitControls)
            const target = cameraRef.current.target ? {
                x: cameraRef.current.target.x.toFixed(5),
                y: cameraRef.current.target.y.toFixed(5),
                z: cameraRef.current.target.z.toFixed(5)
            } : 'No target';
    
            console.log('Camera Info:', {
                // position: {
                //     x: camera.position.x.toFixed(5),
                //     y: camera.position.y.toFixed(5),
                //     z: camera.position.z.toFixed(5)
                // },
                // rotation: {
                //     x: camera.rotation.x.toFixed(5),
                //     y: camera.rotation.y.toFixed(5),
                //     z: camera.rotation.z.toFixed(5)
                // },
                target: cameraRef.current,

                // far: camera.far,
                // near: camera.near,
                // zoom: camera.zoom.toFixed(2)
            });
        });
        
        return null;
    }
    
    return (
        <div className="flex">
            <div className="flex-col w-screen h-full relative">
                <Canvas
                    shadows
                    camera={{
                        position: cameraPosition,
                        rotation: cameraRotation,
                        fov: 45
                    }}
                >
                    <Suspense fallback={null}>
                        {
                            selectPhase ?
                                <RollPreparation />
                            :
                                <RollPhysics />
                        }
                        <>
                            {/* <CameraLogger /> */}
                            <OrbitControls
                                ref={cameraRef}
                                target={cameraTarget}
                                target0={[0,0,0]}
                            />
                        </>
                        <ambientLight intensity={0.8} />
                        <directionalLight
                            position={[2, 10, 0]}
                            intensity={1.5}
                            castShadow
                        />
                    </Suspense>
                </Canvas>
                <div className="flex w-full justify-center absolute bottom-10">
                    <DiceSelector />
                </div>
                <Title />
            </div>
                
        </div>
    )
}
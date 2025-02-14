import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useContext, useRef } from "react";
import { CameraHelper } from 'three';
import DiceSelector from "./DiceSelector";
import RollPreparation from "./RollPreparation"
import RollPhysics from "./RollPhysics";
import { RollDiceContext } from "@/context/RollDiceContext";
import Title from "@/component/Title"
import Image from "next/image";
import recentrer from "@/assets/images/icone/target.png"

export default function Scene(){

    const { selectPhase } = useContext(RollDiceContext)
    const cameraRef = useRef()
    const cameraPosition = [ 0, 9, 0 ]
    const cameraRotation = [ -1.57080, -0.14452, -0.00 ]
    const cameraTarget = [0, -1, 0 ]

    function recenter(){

        if (cameraRef.current) {
            cameraRef.current.object.position.set(...cameraPosition);
            cameraRef.current.target.set(...cameraTarget);
            cameraRef.current.update();
        }
    }
    
    return (
        <div className="flex">
            <div className="flex-col w-screen h-full relative">
                <div className="flex absolute top-5 right-5 z-20">
                    <button onClick={() => recenter()}>
                        <Image
                            alt="recentrer"
                            width={40}
                            height={40}
                            src={recentrer}
                        />
                    </button>
                </div>
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
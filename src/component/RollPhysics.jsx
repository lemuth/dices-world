import { Physics } from "@react-three/rapier";
import DicesWorld from "./DicesWorld";
import { useContext } from "react";
import { RollDiceContext } from "@/context/RollDiceContext";

export default function RollPhysics() {
    const { isPaused, keyFrame, betweenRoll } = useContext(RollDiceContext)
    
    return (
        <Physics
            paused={isPaused}
            key={keyFrame}
        >
            <DicesWorld />
        </Physics>
    )
}
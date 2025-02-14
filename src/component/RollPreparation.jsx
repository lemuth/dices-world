import TwelveFaces from "./MeshCpnt/TwelveFaces";
import SixFaces from "./MeshCpnt/SixFaces"
import FourFaces from "./MeshCpnt/FourFaces";
import Piste from "./MeshCpnt/Piste";
import HeightFaces from "./MeshCpnt/HeightFaces";
import TwentyFaces from "./MeshCpnt/TwentyFaces";
import TenFaces from "./MeshCpnt/TenFaces";
import TenFacesDizaine from "./MeshCpnt/TenFacesDizaine";
import { useContext } from "react";
import { RollDiceContext } from "@/context/RollDiceContext";

function Dice({ type, position, textureId }){

    switch (type) {
        case "d4":
            return (
                <FourFaces position={position} textureId={textureId} />
            )
        case "d6":
            return (
                <SixFaces position={position} textureId={textureId} />
            )
        case "d8":
            return (
                <HeightFaces position={position} textureId={textureId} />
            )
        case "d10":
            return (
                <TenFaces position={position} textureId={textureId} />
            )
        case "d100":
            return (
                <TenFacesDizaine position={position} textureId={textureId} />
            )
        case "d12":
            return (
                <TwelveFaces position={position} textureId={textureId} />
            )
        case "d20":
            return (
                <TwentyFaces position={position} textureId={textureId} />
            )
    
        default:
            break;
    }
}

export default function RollPreparation(){

    const {dicePool} = useContext(RollDiceContext)

    return(
        <>
            <Piste position={[0, 0, 0]} />
            {
                dicePool.map((dice, index) => {

                    const row = Math.floor(index/5)
                    const col = index % 5

                    return (
                        <Dice key={`${dice + index}`} type={dice.type} position={[ (2 - col) * -0.8, dice.type === "d4" || dice.type === "d6" ? 0.35 : 0.6, -1.6 + (row *0.6)]} textureId={dice.map} />
                    )
                })
            }
        </>
    )
}
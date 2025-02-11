
import Image from "next/image"
import { Dicesmap } from "./MeshCpnt/DicesMap"
import TextureManager from "./TextureManager"
import { useContext } from "react"
import { RollDiceContext } from "@/context/RollDiceContext"

export default function DiceSelector(){

    const {
        addDice,
        removeDice,
        dices,
        textureId,
        onStart,
        onRelaunch,
        selectPhase,
        cleanBoard,
        dicePool
    } = useContext(RollDiceContext)

    return (
        <div className="flex flex-col justify-between items-center w-full">
            {
                selectPhase ?
                <div>
                    <div className="flex justify-center items-center">
                        <button
                            className={`w-full px-4 py-2 text-black rounded-md border ${dicePool.length > 0 ? "border-cyan-700 bg-cyan-500/80 transition hover:bg-cyan-700/80 hover:text-cyan-200" : "border-gray-700 bg-gray-500/80"}`}
                            onClick={onStart}
                        >Lancer</button>
                        <TextureManager />
                        <button
                            className={"w-full px-4 py-2 text-black rounded-md border border-cyan-700 transition-colors bg-cyan-500/80 hover:bg-cyan-700/80 hover:text-cyan-200"}
                            onClick={cleanBoard}
                        >Clean</button>
                    </div>
                    <div className="flex">
                        {
                            Object.keys(dices).map((dice) => {
                                return (
                                    <div key={dice} className="flex-col justify-center items-center rounded-t-sm rounded-b-3xl border border-cyan-200 bg-cyan-500/50">
                                        <p className="w-full text-white text-center">{dices[dice]}</p>
                                        <button
                                            className="flex w-full justify-center font-bold text text-3xl bg-cyan-600/80  text-white border border-cyan-800 rounded-md hover:bg-cyan-300 shadow-lg hover:text-black hover:border-cyan-200"
                                            onClick={() => removeDice(dice)}
                                        >-</button>
                                        <button
                                            className="flex rounded-b-3xl justify-center p-2 hover:bg-cyan-400/70"
                                            onClick={() => addDice(dice)}
                                        >
                                            <div className="flex-col justify-center items-center">
                                                <p className="text-white text-sm">{dice}</p>
                                                <Image
                                                    alt={dice}
                                                    src={Dicesmap[dice][textureId].icon}
                                                    width={60}
                                                    height={60}
                                                />
                                            </div>
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                :
                <div>
                    <button
                        className="w-full px-4 py-2 text-black rounded-md border border-cyan-700 bg-cyan-500/80 transition hover:bg-cyan-700/80 hover:text-cyan-200"
                        onClick={onRelaunch}
                    >Relancer</button>
                    <button
                        onClick={cleanBoard}
                        className="mt-2 px-4 py-2 text-black rounded-md w-full border border-cyan-700 bg-cyan-500/80 transition hover:bg-cyan-700/80 hover:text-cyan-200"
                    >Nettoyer</button>
                </div>
            }
            
        </div>
    )
}
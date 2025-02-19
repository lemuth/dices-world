
import Image from "next/image"
import { Dicesmap } from "./MeshCpnt/DicesMap"
import TextureManager from "./TextureManager"
import { useContext } from "react"
import { RollDiceContext } from "@/context/RollDiceContext"
import { chewy } from "@/lib/fonts"

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
                            className={`w-full px-4 py-2 text-gray-800 rounded-md border ${chewy.className} tracking-wider ${dicePool.length > 0 ? "border-cyan-700 bg-cyan-500/80 transition hover:bg-cyan-700/80 hover:text-cyan-200" : "invisible"}`}
                            onClick={onStart}
                        >Lancer</button>
                        <TextureManager />
                        <button
                            className={`w-full px-4 py-2 text-gray-800 ${chewy.className} tracking-wider rounded-md border ${dicePool.length > 0 ? "border-cyan-700 bg-cyan-500/80 hover:bg-cyan-700/80 hover:text-cyan-200": "invisible"}`}
                            onClick={cleanBoard}
                        >Nettoyer</button>
                    </div>
                    <div className="flex">
                        {
                            Object.keys(dices).map((dice) => {
                                return (
                                    <div key={dice} className="flex-col justify-center items-center rounded-t-sm rounded-b-3xl border border-cyan-200 bg-cyan-500/50">
                                        <p className={`w-full text-white ${chewy.className} text-center`}>{dices[dice]}</p>
                                        <button
                                            className={`flex w-full justify-center font-bold ${chewy.className} text text-3xl bg-cyan-600/80  text-white border border-cyan-800 rounded-md hover:bg-cyan-300 shadow-lg hover:text-[#002F5F] hover:border-cyan-200`}
                                            onClick={() => removeDice(dice)}
                                        >-</button>
                                        <button
                                            className="flex rounded-b-3xl justify-center p-2 hover:bg-cyan-400/70 text-white hover:text-[#002F5F]"
                                            onClick={() => addDice(dice)}
                                        >
                                            <div className="flex-col justify-center items-center">
                                                <p className={` tracking-widest ${chewy.className} text-sm capitalize`}>{dice}</p>
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
                        className={`w-full px-4 py-2 text-[#002F5F] ${chewy.className} tracking-wider rounded-md border border-cyan-700 bg-cyan-500/80 transition hover:bg-cyan-700/80 hover:text-cyan-200`}
                        onClick={onRelaunch}
                    >Relancer</button>
                    <button
                        onClick={cleanBoard}
                        className={`mt-2 px-4 py-2 text-[#002F5F] ${chewy.className} tracking-wider rounded-md w-full border border-cyan-700 bg-cyan-500/80 transition hover:bg-cyan-700/80 hover:text-cyan-200`}
                    >Nettoyer</button>
                </div>
            }
            
        </div>
    )
}
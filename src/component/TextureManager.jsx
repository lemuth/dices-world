import { RollDiceContext } from "@/context/RollDiceContext"
import Image from "next/image"
import { useContext } from "react"

export default function TextureManager() {

    const {textureId, setTextureId} = useContext(RollDiceContext)
    const source = [
        "./images/miniature/blue.jpg",
        "./images/miniature/gold.jpg",
        "./images/miniature/green.jpg",
        "./images/miniature/pink.jpg",
        "./images/miniature/red.jpg",
        "./images/miniature/violet.jpg"
    ]

    const prev = () => { setTextureId(textureId === 0 ? source.length -1 : textureId - 1) }
    const next = () => { setTextureId(textureId === source.length -1 ? 0 : textureId + 1) }

    return (
        <div className="flex justify-between p-4 w-full">
            <button onClick={prev}>
                <Image
                    key="prev"
                    alt="prev"
                    src="./images/icone/double_arrow.png"
                    width={40}
                    height={40}
                    className="rotate-180"
                />
            </button>
            {
                source.map((path, index) => {
                    if(textureId === index){
                        return(
                            <div key={index} className="flex justify-center items-center w-full h-full">
                                <div className="flex justify-center w-full h-full pr-2">
                                    <Image
                                        alt={index}
                                        src={source[index === 0 ? source.length -1 : index - 1]}
                                        width={20}
                                        height={20}
                                        className="rounded-full border border-cyan-600"
                                    />
                                </div>
                                <Image
                                    alt={index}
                                    src={path}
                                    width={40}
                                    height={40}
                                    className="rounded-full border-2 border-cyan-600"
                                />
                                <div className="flex justify-center w-full h-full pl-2">
                                    <Image
                                        alt={index}
                                        src={source[index === source.length -1 ? 0 : index + 1]}
                                        width={20}
                                        height={20}
                                        className="rounded-full border border-cyan-600"
                                    />
                                </div>
                            </div>
                    
                        )               
                    }
                })
            }
            <button onClick={next}>
                <Image
                    key="next"
                    alt="next"
                    src="./images/icone/double_arrow.png"
                    width={40}
                    height={40}
                />
            </button>
        </div>
    )
}
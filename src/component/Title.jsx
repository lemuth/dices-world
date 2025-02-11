import { hennyPenny } from "@/lib/fonts"
import Link from "next/link"

export default function Title() {

    const color = ["text-[#3E8DB1]", "text-[#F5D483]", "text-[#539476]", "text-[#B579B6]", "text-[#FB6C20]", "text-[#936FC1]"]
    const text = "Dices World"

    return (
            <Link
                className="flex w-full items-center absolute pl-5 left-0 bottom-2"
                href="https://lemuth.github.io/lemuth_portfolio/"
                target="_blank" rel="noopener noreferrer"
            >
                {
                    text.split("").map((char, index) => {
                        return (
                            <span
                                key={char + index}
                                className={`${hennyPenny.className} ${color[index % color.length]} inline-block`}
                            >{char}</span>
                        )
                    })
                }
                <span className={`text-cyan-400 pl-2 ${hennyPenny.className} text-xs`}>by Lemuth</span>
            </Link>
    )
}
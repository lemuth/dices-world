import { hennyPenny } from "@/lib/fonts"
import Link from "next/link"
import logo from "@/assets/images/icone/dw-icon.png"
import gitHubLogo from "@/assets/images/icone/GitHub-logo.png"
import Image from "next/image"

export default function Title() {

    const color = ["text-[#3E8DB1]", "text-[#F5D483]", "text-[#539476]", "text-[#B579B6]", "text-[#FB6C20]", "text-[#936FC1]"]
    const text = "Dices World"

    return (
            <div className="flex w-full items-center absolute pl-5 left-0 bottom-0">
                <Link
                    className="flex items-center rounded-lg pr-2 hover:bg-cyan-200/30"
                    href="https://lemuth.github.io/lemuth_portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        alt="logo"
                        width={30}
                        height={30}
                        src={logo}
                        className="mr-3"
                    />
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
                <Link
                    href="https://github.com/lemuth/dices-world"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                        <Image
                            alt="logo git-hub"
                            width={30}
                            height={30}
                            src={gitHubLogo}
                            className="ml-3 py-1 bg-white rounded-full hover:bg-slate-400"
                        />
                </Link>
            </div>
    )
}
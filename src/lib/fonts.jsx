import { Henny_Penny, Chewy } from "next/font/google"

const hennyPenny = Henny_Penny({
    subsets: ['latin'],
    weight: '400'
})
const chewy = Chewy({
    subsets: ['latin'],
    weight: '400'
})

export {
    hennyPenny,
    chewy
}
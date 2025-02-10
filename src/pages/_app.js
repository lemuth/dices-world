import { RollDiceProvider } from "@/context/RollDiceContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <RollDiceProvider>
      <Component {...pageProps} />
    </RollDiceProvider>
  )
}

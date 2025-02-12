import { createContext, useEffect, useRef, useState } from "react";

const RollDiceContext = createContext({
    isPaused: true,
    keyFrame: 0,
    dices: {"d4": 0, "d6": 0, "d8": 0, "d10": 0, "d100": 0, "d12" : 0, "d20": 0},
    dicePool: [],
    selectPhase: true,
    betweenRoll: false,
    textureId: 0,
    setTextureId: () => {},
    onStart: () => {},
    onRelaunch: () => {},
    onReset: () => {},
    addDice: () => {},
    removeDice: () => {},
    cleanBoard: () => {},
    handleMovingDices: () => {}
})

const RollDiceProvider = ({ children }) => {

    const [ isPaused, setIsPaused ]         = useState(true)
    const [ keyFrame, setKeyFrame ]         = useState(0)
    const [ dices, setDices ]               = useState({"d4": 0, "d6": 0, "d8": 0, "d10": 0, "d100": 0, "d12" : 0, "d20": 0})
    const [ dicePool,setDicePool ]          = useState([])
    const [ selectPhase, setSelectPhase ]   = useState(true)
    const [ betweenRoll, setBetweenRoll ]   = useState(false)
    const [ textureId, setTextureId ]       = useState(0)
    const [ endDiceParam, setEndDiceParam ] = useState([])

    const onStart = () => {
        setSelectPhase(false)
        setIsPaused(false)
    }

    const onRelaunch = () => {
        setKeyFrame(keyFrame => keyFrame + 1)
    }

    const onReset = () => {
        setBetweenRoll(false)
        setIsPaused(false)
        setSelectPhase(false)
        setKeyFrame(keyFrame += 1)
    }

    const addDice = (type) => {
        const newDiceId = dicePool.length > 0 ? dicePool[dicePool.length -1].id + 1 : 1
        setDicePool(
            [
                ...dicePool,
                { id: newDiceId, type: type, map: textureId, result: null }
            ]
        )
        setDices(
            {
                ...dices,
                [type]: dices[type] + 1
            }
        )
    }

    const removeDice = (type) => {
        const diceToRemoveInPool = dicePool.slice().reverse().find(dice => dice.type === type)
        if (diceToRemoveInPool) {
            setDicePool(
                dicePool.filter((dice) => dice.id !== diceToRemoveInPool.id)
            ) 
        }
        setDices(
            {
                ...dices,
                [type]: dices[type] > 0 ? dices[type] - 1 : 0
            }
        )
    }

    const cleanBoard = () => {
        setDices({"d4": 0, "d6": 0, "d8": 0, "d10": 0, "d100": 0, "d12" : 0, "d20": 0})
        setDicePool([])
        setSelectPhase(true)
    }

    return <RollDiceContext.Provider
            value={{
                isPaused: isPaused,
                keyFrame: keyFrame,
                dices: dices,
                dicePool: dicePool,
                selectPhase: selectPhase,
                betweenRoll: betweenRoll,
                endDiceParam: endDiceParam,
                textureId: textureId,
                setTextureId: (id) => { setTextureId(id) },
                onStart,
                onRelaunch,
                onReset,
                addDice,
                removeDice,
                cleanBoard
            }}
        >
            {children}
        </RollDiceContext.Provider>
}

export {
    RollDiceContext,
    RollDiceProvider
}
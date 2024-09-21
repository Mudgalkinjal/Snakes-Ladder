import * as React from "react";
import Dice from "react-dice-roll";
import '../styles/globals.css';
import { useState } from 'react'

interface DiceCompProps {
    onRoll: (value: number) => void;
}

export default function DiceComp({ onRoll }: DiceCompProps) {
    const [diceRoll, setDiceRoll] = useState<number | null>(null);

    return (
        <div className="dicecomp" id="custom-dice">
            <Dice size={60} onRoll={onRoll}
                triggers={['Enter', 'Space', 'click']} />
        </div>
    );
}
import React, { useEffect, useState } from "react";
import Board from "./Board";
import "../styles/globals.css";
import Marker from './Marker';
import DiceComp from "./DiceComp";
import { useRouter } from "next/router";

const snakes: { [key: number]: number } = {
  16: 1,
  47: 2,
  49: 3,
  56: 4,
  62: 5,
  64: 6,
  87: 7,
  93: 8,
  95: 9,
  98: 10,
};

const ladders: { [key: number]: number } = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100,
};

const Game: React.FC = () => {
  const router = useRouter();
  const { players } = router.query;
  const numPlayers = parseInt(players as string, 10) || 1;
  const [playerPositions, setPlayerPositions] = useState<number[]>(Array(numPlayers).fill(0));
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login');
    }
  }, []);

  const rollDice = (value: number) => {
    setDiceRoll(value);
    setMessage(`Player ${currentPlayerIndex + 1} rolled a ${value}`);
    animateMovement(value);
  };

  const animateMovement = (diceNumber: number) => {
    let currentStep = 0;
    const playerStartPosition = playerPositions[currentPlayerIndex];
    const targetPosition = playerStartPosition + diceNumber;

    const moveStep = () => {
      setTimeout(() => {
        if (currentStep < diceNumber) {
          const newPositions = [...playerPositions];
          newPositions[currentPlayerIndex] = playerStartPosition + currentStep + 1;
          setPlayerPositions(newPositions);
          currentStep++;
          moveStep();
        } else {
          let finalPosition = targetPosition;

          if (snakes[finalPosition]) {
            finalPosition = snakes[finalPosition];
            setMessage(`Player ${currentPlayerIndex + 1} landed on a snake! Sliding down to ${finalPosition}`);
          } else if (ladders[finalPosition]) {
            finalPosition = ladders[finalPosition];
            setMessage(`Player ${currentPlayerIndex + 1} climbed a ladder! Jumping to ${finalPosition}`);
          }

          const newPositions = [...playerPositions];
          newPositions[currentPlayerIndex] = finalPosition;
          setPlayerPositions(newPositions);

          if (finalPosition >= 100) {
            setMessage(`Player ${currentPlayerIndex + 1} wins the game!`);
          } else {
            changePlayer();
          }
        }
      }, 200);
    };

    moveStep();
  };

  const changePlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % playerPositions.length);
    setDiceRoll(null);
  };

  return (
    <div>
      <Board snakes={snakes} ladders={ladders} playerPositions={playerPositions} />
      <div className='btn-roll'>
        <DiceComp onRoll={rollDice} />
      </div>
      <div className="player-status">
        Current Player: Player {currentPlayerIndex + 1}
      </div>
      <div className="game-message">
        {message}
      </div>
      <Marker numPlayers={playerPositions.length} />
    </div>
  );
};

export default Game;

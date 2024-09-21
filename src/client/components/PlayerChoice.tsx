import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from './Layout';
import '../styles/globals.css'

const PlayerChoice = () => {
    const [numPlayers, setNumPlayers] = useState(1);
    const router = useRouter();

    const handleStartGame = async () => {
        const userId = "your_logged_in_user_id";

        try {
            await fetch('/api/player-choice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, numPlayers }),
            });

            router.push(`/game?players=${numPlayers}`);
        } catch (error) {
            console.error('Failed to save player choice:', error);
        }
    };

    return (
        <Layout>
            <div className="player-choice-container">
                <h1 className="player-choice-title">Select Number of Players</h1>
                <div className="player-choice-buttons">
                    {[1, 2, 3, 4].map((num) => (
                        <button
                            key={num}
                            onClick={() => setNumPlayers(num)}
                            className="player-choice-button"
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <p className="selected-players">Selected Players: {numPlayers}</p>
                <button onClick={handleStartGame} className="start-game-button">
                    Start Game
                </button>
            </div>
        </Layout>
    );
};

export default PlayerChoice;

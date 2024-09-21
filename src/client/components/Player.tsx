"use client";

import React from 'react';
import '../styles/globals.css';

interface PlayerProps {
    position: number;
    playerIndex: number;
}

const Player: React.FC<PlayerProps> = ({ position, playerIndex }) => {
    const gridRow = Math.floor(position / 10);
    const gridCol = position % 10;

    return (
        <div
            className={`player player-${playerIndex + 1}`}
            style={{
                gridRow: gridRow + 1,
                gridColumn: gridCol + 1,
            }}
        >
            Player {playerIndex + 1}
        </div>
    );
};

export default Player;

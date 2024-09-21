import React from 'react';
import '../styles/globals.css';

interface BoardProps {
    snakes: Record<number, number>;
    ladders: Record<number, number>;
    playerPositions: number[];
}

const Board: React.FC<BoardProps> = ({ snakes, ladders, playerPositions }) => {
    const size = 10;
    const cells = Array.from({ length: size * size }, (_, index) => {
        const row = Math.floor(index / size);
        const col = index % size;
        return (size - 1 - row) * size + (row % 2 === 0 ? col : size - 1 - col);
    });

    return (
        <div className="board">
            {cells.map(cell => {
                const playerIndex = playerPositions.findIndex(pos => pos === cell);
                const cellColor = playerIndex >= 0 ? `player-${playerIndex + 1}` : '';

                return (
                    <div
                        key={cell}
                        className={`cell ${cell in snakes ? 'snake' : ''} ${cell in ladders ? 'ladder' : ''} ${cellColor}`}
                    >
                        {cell}
                    </div>
                );
            })}
        </div>
    );
};

export default Board;

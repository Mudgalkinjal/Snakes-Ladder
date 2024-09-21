import React from 'react';
import '../styles/globals.css';

interface MarkerProps {
    numPlayers: number;
}

const Marker: React.FC<MarkerProps> = ({ numPlayers }) => {
    return (
        <>
            <div className="legend">
                {Array.from({ length: numPlayers }, (_, index) => (
                    <div key={index} className="legend-item">
                        <div className={`player-color player-${index + 1}`}></div>
                        Player {index + 1}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Marker;

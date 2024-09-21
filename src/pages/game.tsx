import React from 'react';
import Game from 'client/components/Game';
import Layout from 'client/components/Layout';

const GamePage: React.FC = () => {
    return (
        <Layout>
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Snakes and Ladders Game</h1>
            <Game />
        </Layout>
    );
};

export default GamePage;

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFindGame from '../hooks/useFindGame';
import usePlayGame from '../hooks/usePlayGame';

export default function Game() {
    const { id } = useParams(); 
    const { rollDice, startGame, playersScores, playTurn, endTurn, currentPlayerIndex, isGameOver } = usePlayGame(); // Ajout de currentPlayerIndex
    const { gameData } = useFindGame(id, startGame); // Passe startGame comme callback
    const [nbrDice, setNbrDice] = useState(1);

    const handlePlay = () => {
        playTurn(nbrDice);
    };

    const handleEnd = () => {
        endTurn();
    };

    if (!gameData) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>Blackjack</h1>
            <h2>{gameData.name}</h2>

            {!isGameOver && playersScores[currentPlayerIndex] && (
                <h3>Joueur actuel: {playersScores[currentPlayerIndex].name}</h3>
            )}

            <p>Nombre de dés :   
                <select id="select" onChange={(e) => setNbrDice(Number(e.target.value))}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </p>
            <br />
            <button id="Jouer" onClick={handlePlay} disabled={isGameOver}>Play</button>
            <button id="Fin du tours" onClick={handleEnd} disabled={isGameOver}>End Turn</button>
            
            <h2>Players</h2>
            <ul>
                {playersScores && playersScores.length > 0 ? (
                    playersScores.map((player, index) => (
                        <li key={index}>
                            {player.name}: {player.score} points {player.isPlaying ? '(Playing)' : '(Finished)'}
                        </li>
                    ))
                ) : (
                    <li>No players available</li>
                )}
            </ul>

            {isGameOver && (
                <>
                    <h2>Game Over</h2>
                    <p>See results below.</p>
                </>
            )}
        </>
    );
}




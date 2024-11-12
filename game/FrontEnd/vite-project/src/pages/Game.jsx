import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFindGame from '../hooks/useFindGame';
import usePlayGame from '../hooks/usePlayGame';

export default function Game() {
    const { id } = useParams();  // Récupère l'id du jeu depuis l'URL
    const { rollDice, startGame, playersScores, playTurn, endTurn, currentPlayerIndex, isGameOver, EndGame, playerWinners, playerLosers } = usePlayGame(id);  // Passe gameId ici
    const { gameData, winners, losers } = useFindGame(id, startGame);

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

    const endedGame = gameData.game ? gameData.game.eneded : false;

    const gamePlayers = gameData.players || [];

    // Si le jeu n'est pas encore terminé
    if (!endedGame) {
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
                        {EndGame()}  {/* Appelez la fonction EndGame */}
                        <h2>Game Over</h2>

                        <h2>Winners</h2>    
                        <ul>
                            {playerWinners.length > 0 ? (
                                playerWinners.map((winner, index) => (
                                    <li key={index}>{winner.name} with score {winner.score} points</li>
                                ))
                            ) : (
                                <li>No winners</li>
                            )}
                        </ul>

                        <h2>Losers</h2>
                        <ul>
                            {playerLosers.length > 0 ? (
                                playerLosers.map((loser, index) => (
                                    <li key={index}>{loser.name} with score {loser.score} points</li>
                                ))
                            ) : (
                                <li>No losers</li>
                            )}
                        </ul>
                    </>
                )}
            </>
        );
    }

    // Si le jeu est terminé
    return (
        <>
            <h1>Blackjack</h1>
            <h2>{gameData.name}</h2>

            <h2>Game Over</h2>

            <h2>Players</h2>
            <ul>
                {gamePlayers.length > 0 ? (
                    gamePlayers.map((player, index) => (
                        <li key={index}>
                            {player.name}: {player.score} points {player.isPlaying ? '(Playing)' : '(Finished)'}
                        </li>
                    ))
                ) : (
                    <li>No players available</li>
                )}
            </ul>

            <h2>Winners</h2>
            <ul>
                {winners.length > 0 ? (
                    winners.map((winner, index) => (
                        <li key={index}>{winner.name} with score {winner.score} points</li>
                    ))
                ) : (
                    <li>No winners</li>
                )}
            </ul>

            <h2>Losers</h2>
            <ul>
                {losers.length > 0 ? (
                    losers.map((loser, index) => (
                        <li key={index}>{loser.name} with score {loser.score} points</li>
                    ))
                ) : (
                    <li>No losers</li>
                )}
            </ul>
        </>
    );
}

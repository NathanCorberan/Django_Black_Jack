import { useState } from 'react';

export default function usePlayGame() {
    const [playersScores, setPlayersScores] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    const rollDice = (nbr_dice, currentScore) => {
        let score = currentScore;
        for (let i = 0; i < nbr_dice; i++) {
            score += Math.floor((Math.random() * 6) + 1);  // Ajout du score des dés
        }
        return score;
    };

    const startGame = (players) => {
        setPlayersScores(players.map(player => ({
            ...player,
            score: 0,
            isPlaying: true,  // Détermine si le joueur est encore en train de jouer
        })));
        setIsGameOver(false);
    };

    const playTurn = (nbrDice) => {
        if (isGameOver) return;

        const updatedPlayersScores = [...playersScores];
        const currentPlayer = updatedPlayersScores[currentPlayerIndex];
        let newScore = rollDice(nbrDice, currentPlayer.score);

        if (newScore > 21) {
            currentPlayer.isPlaying = false; // Marque le joueur comme terminé
            advanceToNextPlayer();
        } else if (newScore === 21) {
            currentPlayer.isPlaying = false; // Marque le joueur comme terminé s'il atteint 21
            advanceToNextPlayer();
        }

        currentPlayer.score = newScore;
        setPlayersScores(updatedPlayersScores);
    };

    const endTurn = () => {
        if (!isGameOver) {
            playersScores[currentPlayerIndex].isPlaying = false;
            setPlayersScores([...playersScores]);
            advanceToNextPlayer();
        }
    };

    const advanceToNextPlayer = () => {
        const nextPlayerIndex = (currentPlayerIndex + 1) % playersScores.length;
        if (playersScores.every(player => !player.isPlaying)) {
            setIsGameOver(true);
        } else {
            setCurrentPlayerIndex(nextPlayerIndex);
        }
    };

    return {
        playersScores,
        currentPlayerIndex,
        playTurn,
        endTurn,
        startGame,
        isGameOver,
    };
}

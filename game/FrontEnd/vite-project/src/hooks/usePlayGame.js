import { useState } from 'react';

export default function usePlayGame(gameId) {
    const [playersScores, setPlayersScores] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [playerWinners, setPlayerWinners] = useState([]);  // Renommé winners en playerWinners
    const [playerLosers, setPlayerLosers] = useState([]);    // Renommé losers en playerLosers

    const rollDice = (nbr_dice, currentScore) => {
        let score = currentScore;
        for (let i = 0; i < nbr_dice; i++) {
            score += Math.floor((Math.random() * 6) + 1);  // Ajout du score des dés
        }
        return score;
    };

    const updatePlayerScore = async (playerId, newScore) => {
        try {
            const response = await fetch(`http://localhost:8000/api/players/${playerId}/score`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ score: newScore }),
            });

            if (response.ok) {
                const updatedPlayer = await response.json();
                console.log(`Score mis à jour pour ${updatedPlayer.name}: ${updatedPlayer.score}`);
            } else {
                console.error('Erreur lors de la mise à jour du score');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du score:', error);
        }
    };

    const startGame = (players) => {
        setPlayersScores(players.map(player => ({
            ...player,
            score: 0,
            isPlaying: true,
        })));
        setIsGameOver(false);
        setPlayerWinners([]);  // Initialisation des gagnants
        setPlayerLosers([]);    // Initialisation des perdants
    };

    const playTurn = (nbrDice) => {
        if (isGameOver) return;

        const updatedPlayersScores = [...playersScores];
        const currentPlayer = updatedPlayersScores[currentPlayerIndex];
        let newScore = rollDice(nbrDice, currentPlayer.score);

        if (newScore > 21 || newScore === 21) {
            currentPlayer.isPlaying = false;
            advanceToNextPlayer();
        }

        currentPlayer.score = newScore;
        setPlayersScores(updatedPlayersScores);

        updatePlayerScore(currentPlayer.id, newScore);
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
            determineWinnersAndLosers();  // Calculer les gagnants et les perdants à la fin du jeu
        } else {
            setCurrentPlayerIndex(nextPlayerIndex);
        }
    };

    const determineWinnersAndLosers = () => {
        const validPlayers = playersScores.filter(player => player.score <= 21);
        
        if (validPlayers.length === 0) {
            setPlayerWinners([]);
            setPlayerLosers(playersScores);  // Tous les joueurs sont des perdants
            return;
        }
        
        const maxScore = Math.max(...validPlayers.map(player => player.score));
        
        const currentWinners = validPlayers.filter(player => player.score === maxScore);
        
        const currentLosers = playersScores.filter(player => player.score < maxScore || player.score > 21);
    
        setPlayerWinners(currentWinners);
        setPlayerLosers(currentLosers);
    
        console.log("Gagnants: ", currentWinners);
        console.log("Perdants: ", currentLosers);
    };
    
    
    

    const EndGame = () => {
        if (!gameId) return;

        try {
            const response = fetch(`http://localhost:8000/api/game/${gameId}/end`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedGame = response.json();
                console.log(`Jeu terminé. Statut mis à jour: ${updatedGame.ended}`);
            } else {
                console.error('Erreur lors de la fin du jeu');
            }
        } catch (error) {
            console.error('Erreur lors de la fin du jeu:', error);
        }
    };

    return {
        playersScores,
        currentPlayerIndex,
        playTurn,
        endTurn,
        startGame,
        isGameOver,
        playerWinners,  // Renommé winners en playerWinners
        playerLosers,   // Renommé losers en playerLosers
        EndGame,
    };
}

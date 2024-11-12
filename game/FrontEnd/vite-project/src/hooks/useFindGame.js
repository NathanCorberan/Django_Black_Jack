import { useState, useEffect } from 'react';

export default function useFindGame(game_id, onGameDataLoaded) {
    const [gameData, setGameData] = useState({});
    const [winners, setWinners] = useState([]);
    const [losers, setLosers] = useState([]);

    const findGame = () => {
        fetch(`http://localhost:8000/api/game/${game_id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setGameData(data);
            if (onGameDataLoaded) {
                onGameDataLoaded(data.players); 
            }

            calculateWinnersAndLosers(data.players);
        })
        .catch((reason) => {
            console.error(reason);
            setGameData(null);
        });
    };

    const calculateWinnersAndLosers = (players) => {
        const validPlayers = players.filter(player => player.score <= 21);
        
        if (validPlayers.length === 0) {
            setWinners([]);
            setLosers(players);
            return;
        }
    
        const maxScore = Math.max(...validPlayers.map(player => player.score));
    
        const currentWinners = validPlayers.filter(player => player.score === maxScore);
    
        const currentLosers = players.filter(player => player.score < maxScore || player.score > 21);
    
        setWinners(currentWinners);
        setLosers(currentLosers);
    
        console.log("Gagnants: ", currentWinners);
        console.log("Perdants: ", currentLosers);
    };
    
    useEffect(() => {
        findGame();
    }, [game_id]);

    return { gameData, winners, losers };
}

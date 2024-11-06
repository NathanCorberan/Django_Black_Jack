
import { useParams } from 'react-router-dom';
import useFindGame from '../hooks/useFindGame';
import usePlayGame from '../hooks/usePlayGame';

export default function Toto() {
    const { id } = useParams(); 
    const { gameData } = useFindGame(id);



    if (!gameData) {
        return <p>Loading...</p>;
    }

    const playGame = () => {
        
    };
    
    return (
        <>
            <h1>Black Jack</h1>
            <h2>{gameData.name}</h2>

            <p>Nombre de dés :   
                <select id="select" onChange={(e) => playGame()}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </p>
            <br></br>
            <button id="Play">Play</button>
            
            <h2>Players</h2>
            <ul>
                {gameData.players && gameData.players.length > 0 ? (
                    gameData.players.map((player, index) => (
                        <li key={index}>
                            {player.name}: {player.score} points
                        </li>
                    ))
                ) : (
                    <li>No players available</li>
                )}
            </ul>
        </>
    );
}

import useCreateGame from '../hooks/useCreateGame.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const { createGame } = useCreateGame();

    const [game_name, setGameName] = useState('');
    const [Player1, setPlayer1] = useState('');
    const [Player2, setPlayer2] = useState('');
    const [Player3, setPlayer3] = useState('');
    const [Player4, setPlayer4] = useState('');

    function addClick() {
        const players = [Player1, Player2, Player3, Player4].filter(Boolean); 
        console.log(players);
        console.log(game_name);

        createGame(game_name, players).then((gameId) => {
            if (gameId) {
                navigate(`/game/${gameId}`);
            }
        });
        setGameName('');
        setPlayer1('');
        setPlayer2('');
        setPlayer3('');
        setPlayer4('');
    }

    return ( 
        <>
            <h1>Black Jack</h1>
            <h2>Game Name</h2>
            <input type="text" id="game_name" name="game_name" placeholder="Game Name" value={game_name} onChange={(e) => setGameName(e.target.value)} />
            <h3>Player 1</h3>
            <input type="text" id="player_name1" name="player_name1" placeholder="Player Name" value={Player1} onChange={(e) => setPlayer1(e.target.value)} />
            <h3>Player 2</h3>
            <input type="text" id="player_name2" name="player_name2" placeholder="Player Name" value={Player2} onChange={(e) => setPlayer2(e.target.value)} />
            <h3>Player 3</h3>
            <input type="text" id="player_name3" name="player_name3" placeholder="Player Name" value={Player3} onChange={(e) => setPlayer3(e.target.value)} />
            <h3>Player 4</h3>
            <input type="text" id="player_name4" name="player_name4" placeholder="Player Name" value={Player4} onChange={(e) => setPlayer4(e.target.value)} />
            <br></br>
            <br></br>
            <button id="CreateGame" onClick={addClick}>Create Game</button>
        </>
    );
}

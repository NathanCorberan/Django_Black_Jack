export default function useCreateGame() {
    const createGame = (game_name, listplayer) => {
        return fetch('http://localhost:8000/api/create_game/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: game_name,
                players: listplayer,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data.id;  
        })
        .catch((error) => {
            console.error(error);
            return null;
        });
    };
    return { createGame };
}

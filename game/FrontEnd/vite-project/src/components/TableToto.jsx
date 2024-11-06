import Row from "./Row";

const ListPlayer = [
  {
    id: 1,
    name: "Toto",
    score: 0
  },
  {
    id: 2,
    name: "Tata",
    score: 10
  },
  {
    id: 3,
    name: "Titi",
    score: 5
  },
  {
    id: 4,
    name: "GrosMiner",
    score: 25
  },
];

export default function TableToto() {
  return (
    <table>
      <thead>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Score</td>
        </tr>
      </thead>
      <tbody>
        {ListPlayer.map((player) => (
          <Row key={player.id} player={player} />
        ))}
      </tbody>
    </table>
  );
}

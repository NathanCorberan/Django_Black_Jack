
export default function Row({player}) {
  return (
    <tr>
      <td>{player.id}</td>
      <td>{player.name}</td>
      <td>{player.score}</td>
    </tr>
  )
}
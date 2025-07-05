import { gql, useQuery } from '@apollo/client'

const GET_BOARDS = gql`
  query {
    boards {
      id
      name
    }
  }
`

function BoardsList() {
  const { loading, error, data } = useQuery(GET_BOARDS)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data.boards.map(board => (
        <li key={board.id}>{board.name}</li>
      ))}
    </ul>
  )
}

export default BoardsList
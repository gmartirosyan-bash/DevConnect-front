import { useSelector } from 'react-redux'
import Column from './Column'

function Columns() {
  const columns = useSelector(state => state.dashboard.columns)
  return (
    <>
      {columns.map(column => (
        <Column
          key={column.id}
          column={column}
        />
      ))}
    </>
  )
}

export default Columns

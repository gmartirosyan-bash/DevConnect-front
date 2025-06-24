import { useContext } from 'react'
import { DashboardContext } from '../context/DashboardContext'
import { useSelector } from 'react-redux'
import Column from './Column'

function Columns() {
  const columns = useSelector(state => state.dashboard.columns)
  const { handleDeleteColumn, handleRenameColumn } = useContext(DashboardContext)
  return (
    <>
      {columns.map(column => (
        <Column
          key={column.id}
          column={column}
          onRename={handleRenameColumn}
          onDelete={handleDeleteColumn}
        />
      ))}
    </>
  )
}

export default Columns

import { useContext } from 'react'
import { DashboardContext } from '../context/DashboardContext'
import Column from './Column'

function Columns() {
  const { columns, handleDeleteColumn, handleRenameColumn } = useContext(DashboardContext)
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

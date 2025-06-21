import { useContext } from 'react'
import { DashboardContext } from '../context/DashboardContext'

function BoardSelect() {
  const { handleSelect, boards } = useContext(DashboardContext)
  return (
    <div className="text-left divide-y divide-neutral-400/15 mt-2">
      {boards.map(board => (
        <div
          className="whitespace-pre-wrap break-words p-2 hover:cursor-pointer hover:bg-neutral-300/5 active:bg-neutral-300/20"
          onClick={() => handleSelect(board.id)}
          key={board.id}
        >
          {board.title}
        </div>
      ))}
    </div>
  )
}

export default BoardSelect

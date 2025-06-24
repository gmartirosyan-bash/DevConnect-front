import { useContext } from 'react'
import { DashboardContext } from '../context/DashboardContext'
import { useSelector } from 'react-redux'

function BoardSelect() {
  const boards = useSelector(state => state.dashboard.boards)
  const { handleSelect } = useContext(DashboardContext)
  
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

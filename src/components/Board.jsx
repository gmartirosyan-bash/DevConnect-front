import { useContext } from 'react'
import { DashboardContext } from '../context/DashboardContext'
import BoardTitle from './BoardTitle'
import AddColumnForm from './AddColumnForm'
import Columns from './Columns'

function Board({ className }) {
  const { handleDeleteBoard } = useContext(DashboardContext)

  return (
    <div className={`${className} bg-gradient-to-t from-green-950 to-green-700 flex flex-col transition-all duration-300`}>
      <div className="flex-initial flex justify-between bg-blue-950/50 p-3">
        <BoardTitle className=" hover:cursor-text text-white/75 font-sm text-lg" />
        <button
          className="group text-neutral-300 bg-neutral-800 py-1 px-2 text-sm hover:cursor-pointer hover:bg-neutral-900 active:bg-neutral-800 active:text-red-700 rounded-md"
          type="button"
          onClick={handleDeleteBoard}
        >
          Delete board
          <span className="font-mono group-hover:text-red-700 text-lg m-0 px-1">&times;</span>
        </button>
      </div>
      <div className="flex-1 flex items-start gap-4 p-9 overflow-x-auto overflow-y">
        <Columns />
        <AddColumnForm />
      </div>
    </div>
  )
}

export default Board

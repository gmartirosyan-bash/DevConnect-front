import BoardName from './BoardName'
import AddColumnForm from './AddColumnForm'
import Columns from './Columns'
import { deleteBoard } from '../redux/dashboardSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Board({ board, sidebarOpen }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className='flex-1 bg-gradient-to-t from-green-950 to-green-700 transition-all duration-300 custom-scrollbar'>
      <div className={`flex justify-between bg-blue-950/50 px-3.5 py-2.5 absolute right-0 transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-10'}`} >
        <BoardName
          className="hover:cursor-text text-white/75 font-sm text-lg"
          board={board}/>
        <button
          className="group text-neutral-300 bg-neutral-800 py-1 px-2 text-sm hover:cursor-pointer hover:bg-neutral-900 active:bg-neutral-800 active:text-red-700 rounded-md"
          type="button"
          onClick={() => dispatch(deleteBoard({ boardId: board.id, navigate}))}
        >
          Delete board
          <span className="font-mono group-hover:text-red-700 text-lg m-0 px-1">&times;</span>
        </button>
      </div>
      <div className="flex items-start gap-4 p-9 overflow-x-auto overflow-y mt-15">
        <Columns />
        <AddColumnForm />
      </div>
    </div>
  )
}

export default Board

import { useSelector, useDispatch } from 'react-redux'
import { setBoardName, createBoard } from '../../redux/dashboardSlice'
import { useNavigate } from 'react-router-dom'

function BoardEmpty() {
  const boardName = useSelector(state => state.dashboard.boardName)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddBoard = (e) => {
    e.preventDefault()
    dispatch(createBoard({ navigate }))
  }

  return (
    <div className="w-full flex flex-col items-center justify-center text-center text-white px-4 py-20 bg-gradient-to-t from-green-950 to-green-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 mb-6 text-green-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h6m-6 0v6m6-6v6" />
      </svg>
      <h2 className="text-2xl font-semibold mb-2">No board selected</h2>
      <p className="text-green-200 mb-6">Choose an existing board or create a new one to get started.</p>

      <div className="flex gap-2 items-center">
        <form onSubmit={handleAddBoard}>
          <input
            type="text"
            value={boardName}
            onChange={e => dispatch(setBoardName(e.target.value))}
            placeholder="Board name"
            className="px-3 py-2 rounded bg-neutral-800 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 hover:cursor-pointer active:bg-green-400 ml-1.5"
          >
            + Create New Board
          </button>
        </form>
      </div>
    </div>
  )
}

export default BoardEmpty

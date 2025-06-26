import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectBoard } from '../redux/dashboardSlice'

function BoardSelect() {
  const boards = useSelector(state => state.dashboard.boards)

  const fetchIdRef = useRef(0)
  const boardCache = useRef({})

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleSelect = (chosen) => {
    dispatch(selectBoard({ chosen, navigate, fetchIdRef, boardCache}))
  }

  return (
    <div className="text-left divide-y divide-neutral-400/15 mt-2">
      {boards.map(board => (
        <div
          className="whitespace-pre-wrap break-words p-2 hover:cursor-pointer hover:bg-neutral-300/5 active:bg-neutral-300/20"
          onClick={() => handleSelect(board.id)}
          key={board.id}
        >
          {board.name}
        </div>
      ))}
    </div>
  )
}

export default BoardSelect

import { useDispatch } from 'react-redux'
import { renameBoard } from '../redux/dashboardSlice'

function BoardName({ className, board }) {
  const name = board.name
  const dispatch = useDispatch()

  const handleRenameBoard = (newName) => {
    dispatch(renameBoard({ boardId: board.id, newName }))
  }

  const handleBlur = (e) => {
    const newName = e.target.innerText
    if (name === newName.trim())
      return
    if (!newName.trim())
      return e.target.innerText = name
    handleRenameBoard(newName.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
    if (e.key === 'Escape') {
      e.target.innerText = name
      e.target.blur()
    }
  }

  return (
    <h2
      className={`truncate overflow-hidden whitespace-nowrap ${className}`}
      contentEditable
      suppressContentEditableWarning
      style={{ outline: 'none' }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {name}
    </h2>
  )
}

export default BoardName

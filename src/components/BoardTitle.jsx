import { useContext } from 'react'
import { DashboardContext } from '../context/DashboardContext'

function BoardTitle({ className }) {
  const { board, handleRenameBoard } = useContext(DashboardContext)
  const title = board.title

  const handleBlur = (e) => {
    const newTitle = e.target.innerText
    if (title === newTitle.trim())
      return
    if (!newTitle.trim())
      return e.target.innerText = title
    handleRenameBoard(newTitle.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
    if (e.key === 'Escape') {
      e.target.innerText = title
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
      {title}
    </h2>
  )
}

export default BoardTitle

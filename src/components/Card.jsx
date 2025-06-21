import { useContext } from 'react'
import { DashboardContext } from '../context/DashboardContext'

function Card({ card }) {
  const { handleDeleteCard, handleRenameCard } = useContext(DashboardContext)

  const handleBlur = (e) => {
    const newName = e.target.innerText
    if (card.title === newName.trim())
      return
    if (!newName.trim())
      return e.target.innerText = card.title
    handleRenameCard(card.id, newName.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
    if (e.key === 'Escape') {
      e.target.innerText = card.title
      e.target.blur()
    }
  }

  return (
    <div className={` ${card.optimistic ? 'pointer-events-none' : ''} flex 
      items-center justify-between bg-neutral-800/70 hover:bg-neutral-700/70 
      my-2 px-3 py-2 rounded-lg shadow-sm shadow-neutral-700 text-white 
      max-w-64 group`}
    >
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="hover:cursor-text text-sm max-w-50 text-neutral-200 font-medium whitespace-pre-wrap break-words pr-2"
      >
        {card.title}
      </p>
      <button
        className="hover:cursor-pointer text-neutral-400 text-lg bg-neutral-900/40
          rounded hover:bg-red-800 active:bg-red-700 hover:text-white
          transition px-2 py-0.5 opacity-0 group-hover:opacity-100"
        type="button"
        onClick={() => handleDeleteCard(card.id)}
        title="Delete card"
      >
        &times;
      </button>
    </div>
  )
}

export default Card

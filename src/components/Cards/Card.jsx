import { useDispatch } from 'react-redux'
import { renameCard, deleteCard } from '../../redux/dashboardSlice'

function Card({ card }) {
  const dispatch = useDispatch()

  const handleBlur = (e) => {
    const newName = e.target.innerText
    if (card.name === newName.trim())
      return
    if (!newName.trim())
      return e.target.innerText = card.name
    dispatch(renameCard({ cardId: card.id, newName: newName.trim() }))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
    if (e.key === 'Escape') {
      e.target.innerText = card.name
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
        className="hover:cursor-text text-sm max-w-40 text-neutral-200 font-medium whitespace-pre-wrap break-words px-1"
      >
        {card.name}
      </p>
      <button
        className="hover:cursor-pointer text-neutral-400 text-lg bg-neutral-900/40
          rounded hover:bg-red-800 active:bg-red-700 hover:text-white
          transition px-2 py-0.5 opacity-0 group-hover:opacity-100"
        type="button"
        onClick={() => dispatch(deleteCard({ cardId:card.id }))}
        name="Delete card"
      >
        &times;
      </button>
    </div>
  )
}

export default Card

import { useContext, useEffect, useRef, useState } from 'react'
import { DashboardContext } from '../context/DashboardContext'

function AddCardForm({ columnId }) {
  const { cardTitle, setCardTitle, handleAddCard } = useContext(DashboardContext)
  const [addCard, setAddCard] = useState(true)
  const formRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!addCard) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
      const handleClickOutside = (e) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
          setAddCard(true)
          setCardTitle('')
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [addCard, setCardTitle])

  const onFormSubmit = (e) => {
    handleAddCard(e, columnId)
    setAddCard(true)
  }

  const onFormReject = () => {
    setAddCard(true)
    setCardTitle('')
  }

  return (
    <div
      className="mt-4"
    >
      {addCard
        ? (
            <button
              className="text-neutral-300 bg-neutral-700/45 px-4 pt-1 pb-3
            hover:cursor-pointer hover:bg-neutral-700/65 active:bg-neutral-600/85 rounded-xl"
              type="button"
              onClick={() => setAddCard(prev => !prev)}
            >
              <span
                className="text-2xl"
              >
                +
              </span>
              {' '}
              Add another card
            </button>
          )
        : (
            <form
              className="bg-neutral-900 p-2 rounded-md text-left max-w-52"
              onSubmit={onFormSubmit}
              ref={formRef}
            >
              <label htmlFor="cardTitle" style={{ display: 'none' }}>Card Title</label>
              <textarea
                className="overflow-hidden w-full bg-neutral-800 text-neutral-200 mb-3 rounded-xs p-1 placeholder:text-neutral-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    onFormSubmit(e)
                  }
                }}
                maxlength="50"
                id="cardTitle"
                type="text"
                ref={inputRef}
                name="cardTitle"
                placeholder="Enter card name..."
                required
                value={cardTitle}
                onChange={e => setCardTitle(e.target.value)}
              />
              <button
                className="text-neutral-300 bg-blue-950 p-1.5 text-sm
            hover:cursor-pointer hover:bg-blue-900 active:bg-blue-800 rounded-sm"
                type="submit"
              >
                Add card
              </button>
              <button
                className="text-neutral-300 bg-transparent px-2 pb-1 ml-1 text-xl
            hover:cursor-pointer hover:bg-neutral-800 active:bg-neutral-700 rounded-sm"
                type="button"
                onClick={onFormReject}
              >
                &times;
              </button>
            </form>
          )}
    </div>
  )
}

export default AddCardForm

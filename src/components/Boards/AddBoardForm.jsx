import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setBoardName, createBoard } from '../../redux/dashboardSlice'
import { useNavigate } from 'react-router-dom'

export function AddBoardForm() {
  const boardName = useSelector(state => state.dashboard.boardName)

  const [popup, setPopup] = useState(false)

  const formRef = useRef(null)
  const inputRef = useRef(null)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (popup) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
      const handleClickOutside = (e) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
          setPopup(false)
          dispatch(setBoardName(''))
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [popup, dispatch])

  const onFormSubmit = (e) => {
    e.preventDefault()
    dispatch(createBoard({ navigate }))
    setPopup(false)
  }

  const onFormReject = () => {
    setPopup(prev => !prev)
    dispatch(setBoardName(''))
  }

  return (
    <div ref={formRef} className="relative flex justify-between">
      <p className="my-1">Your board</p>
      {popup
        && (
          <div className="absolute max-w-60 text-right -top-5 -right-63 overflow-visible bg-neutral-950 p-2 rounded-md">
            <button
              className="hover:cursor-pointer active:bg-neutral-600 hover:bg-neutral-700 text-xl px-2 pb-1 mt-1 mr-2 rounded-xs"
              type="button"
              onClick={onFormReject}
            >
              &times;
            </button>
            <div
              className="text-center mb-5"
            >
              Create Board
            </div>
            <form
              onSubmit={onFormSubmit}
            >
              <label
                htmlFor="boardName"
                style={{ display: 'none' }}
              >
                Board Name
              </label>
              <textarea
                className="overflow-hidden w-full bg-neutral-800  focus:text-white
                mr-5 p-1 rounded-xs focus:bg-gray-900"
                id="boardName"
                maxLength={50}
                type="text"
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    onFormSubmit(e)
                  }
                }}
                name="boardName"
                placeholder="Add a new board..."
                required
                value={boardName}
                onChange={e => dispatch(setBoardName(e.target.value))}
              />
              <button
                className="bg-neutral-800 hover:cursor-pointer hover:bg-neutral-700
            p-1 mt-4 mb-2 mr-4 rounded-sm active:bg-neutral-600 hover:text-white"
                type="submit"
              >
                Add board
              </button>
            </form>
          </div>
        )}
      <button
        className="hover:cursor-pointer  hover:bg-neutral-700
      text-xl px-2 pb-1 rounded-xs active:bg-neutral-600"
        type="button"
        onClick={onFormReject}
      >
        +
      </button>
    </div>
  )
}

export default AddBoardForm

import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setColumnName, createColumn } from '../redux/dashboardSlice'

function AddColumnForm() {
  const columnName = useSelector(state => state.dashboard.columnName)
  const boardId = useSelector(state => state.dashboard.boardId)
  const [addColumn, setAddColumn] = useState(false)
  const formRef = useRef(null)
  const inputRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (addColumn) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
      const handleClickOutside = (e) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
          dispatch(setColumnName(''))
          setAddColumn(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [addColumn, dispatch])

  const onFormSubmit = (e) => {
    e.preventDefault()
    dispatch(createColumn({ boardId }))
    setAddColumn(false)
  }

  const onFormReject = () => {
    setAddColumn(false)
    dispatch(setColumnName(''))
  }

  return (
    <div className="min-w-51">
      {!addColumn
        ? (
            <button
              className="text-neutral-300 bg-neutral-800/45
            hover:cursor-pointer hover:bg-neutral-800/65
            rounded-xl pb-3 pt-1 px-4 active:bg-neutral-800/45"
              type="button"
              onClick={() => setAddColumn(prev => !prev)}
            >
              <span className="text-2xl">+</span>
              Add another column
            </button>
          )
        : (
            <form
              className="bg-neutral-900 p-2 rounded-md text-left max-w-52"
              onSubmit={onFormSubmit}
              ref={formRef}
            >
              <label
                htmlFor="columnName"
                style={{ display: 'none' }}
              >
                Column Name
              </label>
              <textarea
                className="overflow-hidden w-full bg-neutral-800 text-neutral-200 mb-3 rounded-xs p-1 placeholder:text-neutral-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    onFormSubmit(e)
                  }
                }}
                id="columnName"
                maxLength={50}
                type="text"
                name="columnName"
                placeholder="Enter column name..."
                ref={inputRef}
                required
                value={columnName}
                onChange={e => dispatch(setColumnName(e.target.value))}
              />
              <button
                className="text-neutral-300 bg-blue-950 p-1.5
            hover:cursor-pointer hover:bg-blue-900
            rounded-sm text-sm active:bg-blue-800"
                type="submit"
              >
                Add column
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

export default AddColumnForm

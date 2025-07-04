import Cards from '../Cards/Cards'
import AddCardForm from '../Cards/AddCardForm'
import { useDispatch } from 'react-redux'
import { renameColumn, deleteColumn } from '../../redux/dashboardSlice'

function Column({ column }) {
  const dispatch = useDispatch()

  const handleBlur = (e) => {
    const newName = e.target.innerText
    if (column.name === newName.trim())
      return
    if (!newName.trim())
      return e.target.innerText = column.name
    dispatch(renameColumn({ columnId: column.id, newName: newName.trim() }))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
    if (e.key === 'Escape') {
      e.target.innerText = column.name
      e.target.blur()
    }
  }

  return (
    <div className={` ${column.optimistic ? 'pointer-events-none' : ''} 
      min-w-[18rem] bg-[#0f1e17]/80 p-4 rounded-2xl shadow-md shadow-black/40 
      space-y-4 max-w-64`}
    >
      <div className="flex justify-between items-center">
        <h3
          className=" hover:cursor-text break-words whitespace-pre-wrap max-w-53 text-white text-base font-semibold outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        >
          {column.name}
        </h3>
        <button
          className="hover:cursor-pointer text-neutral-200 text-lg bg-neutral-900/70 rounded hover:bg-red-800 active:bg-red-700 hover:text-white transition px-2 py-0.5"
          type="button"
          onClick={() => dispatch(deleteColumn({ columnId: column.id }))}
          name="Delete column"
        >
          &times;
        </button>
      </div>

      <Cards columnId={column.id} />
      <AddCardForm columnId={column.id} />
    </div>
  )
}

export default Column

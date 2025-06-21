import { useContext } from 'react'
import { DashboardContext } from '../context/DashboardContext'
import AddBoardForm from './AddBoardForm'
import BoardSelect from './BoardSelect'

function BoardSidebar({ className }) {
  const { isLoadingBoard } = useContext(DashboardContext)
  return (
    <div className={`${className} ${isLoadingBoard ? 'pointer-events-none opacity-50' : ''}`}>
      <AddBoardForm />
      <BoardSelect />
    </div>
  )
}

export default BoardSidebar

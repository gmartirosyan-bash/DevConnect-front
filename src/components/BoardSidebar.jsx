import AddBoardForm from './AddBoardForm'
import BoardSelect from './BoardSelect'
import { useSelector } from 'react-redux'

function BoardSidebar({ className }) {
  const isLoadingBoard = useSelector(state => state.dashboard.isLoadingBoard)

  return (
    <div className={`${className} ${isLoadingBoard ? 'pointer-events-none opacity-50' : ''}`}>
      <AddBoardForm />
      <BoardSelect />
    </div>
  )
}

export default BoardSidebar

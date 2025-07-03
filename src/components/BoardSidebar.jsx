import AddBoardForm from './AddBoardForm'
import BoardSelect from './BoardSelect'
import { useSelector } from 'react-redux'

function BoardSidebar() {
  const isLoadingBoard = useSelector(state => state.dashboard.isLoadingBoard)

  return (
    <div className={`relative p-3 ${isLoadingBoard ? 'pointer-events-none opacity-50' : ''}`}>
      {isLoadingBoard && <div
        className="h-1.5 w-full bg-neutral-400 bg-[length:40px_100%] bg-repeat-x rounded-md mb-8"
        style={{
          backgroundImage:
          'repeating-linear-gradient(125deg, rgba(0,0,0) 0, rgba(0,0,0) 2px, transparent 2px, transparent 10px)',
          animation: 'slideLines 2s linear infinite',
        }}
      ></div>}

      <AddBoardForm />
      <BoardSelect />
    </div>
  )
}

export default BoardSidebar

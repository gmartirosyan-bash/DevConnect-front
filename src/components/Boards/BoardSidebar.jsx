import AddBoardForm from './AddBoardForm'
import BoardSelect from './BoardSelect'
import { useSelector } from 'react-redux'

function BoardSidebar() {
  const isLoadingBoard = useSelector(state => state.dashboard.isLoadingBoard)

  return (
    <div className={`relative p-3 ${isLoadingBoard ? 'pointer-events-none opacity-50' : ''}`}>
      {isLoadingBoard && <div
        className="h-1.5 w-full bg-neutral-400 bg-[length:40px_100%] rounded-md mb-8"
        style={{
          backgroundImage:
            'repeating-linear-gradient(130deg, rgba(0,0,0,0.7) 0, rgba(0,0,0,0.7) 3px, rgba(0,0,0,0) 5px, transparent 15px)',
          animation: 'slideLines 1s linear infinite',
        }}
      ></div>}

      <AddBoardForm />
      <BoardSelect />
    </div>
  )
}

export default BoardSidebar

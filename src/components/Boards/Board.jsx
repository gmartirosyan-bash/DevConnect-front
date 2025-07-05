import BoardName from './BoardName'
import AddColumnForm from '../Columns/AddColumnForm'
import Columns from '../Columns/Columns'
import { deleteBoard, setCards } from '../../redux/dashboardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DragDropContext } from '@hello-pangea/dnd'
import cardsApi from '../../api/cards'
import handleApiError from '../../utils/handleApiError'
import { setAlertMsg } from '../../redux/uiSlice'

function Board({ board, sidebarOpen }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.user.token)
  const cards = useSelector(state => state.dashboard.cards)

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return

    const oldCard = cards.find(card => card.id === draggableId)
    if (!oldCard) return

    const newCard = { ...oldCard }
    const sortedCards = cards.filter(card => card.column === destination.droppableId && card.id !== draggableId).sort((a, b) => a.order - b.order)
    const beforeCard = sortedCards[destination.index - 1] || null
    const afterCard = sortedCards[destination.index] || null

    if (!beforeCard && afterCard) {
      newCard.order = afterCard.order - 1
    } else if (beforeCard && afterCard) {
      newCard.order = (beforeCard.order + afterCard.order) / 2
    } else if (beforeCard && !afterCard) {
      newCard.order = beforeCard.order + 1
    } else {
      newCard.order = 0
    }

    newCard.column = destination.droppableId
    
    const optimisticCards = cards.map(card => card.id === draggableId ? newCard : card)
    dispatch(setCards(optimisticCards))
    
    try {
      await cardsApi.dragCard(draggableId, { index: destination.index, columnId: destination.droppableId }, token)
    } catch (err) {
      dispatch(setCards(optimisticCards.map(card => card.id === draggableId ? oldCard : card)))
      const message = handleApiError(err, 'Failed to move the card. Please try again')
      dispatch(setAlertMsg(message))
    }
  }

  return (
    <div className='flex-1 bg-gradient-to-t from-green-950 to-green-700 transition-all duration-300 custom-scrollbar'>
      <div className={`flex justify-between bg-blue-950/50 px-3.5 py-2.5 absolute right-0 transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-10'}`} >
        <BoardName
          className="hover:cursor-text text-white/75 font-sm text-lg"
          board={board}/>
        <button
          className="group text-neutral-300 bg-neutral-800 py-1 px-2 text-sm hover:cursor-pointer hover:bg-neutral-900 active:bg-neutral-800 active:text-red-700 rounded-md"
          type="button"
          onClick={() => dispatch(deleteBoard({ boardId: board.id, navigate}))}
        >
          Delete board
          <span className="font-mono group-hover:text-red-700 text-lg m-0 px-1">&times;</span>
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex items-start gap-4 p-9 overflow-x-auto overflow-y mt-15">
          <Columns />
          <AddColumnForm />
        </div>
      </DragDropContext>
    </div>
  )
}

export default Board

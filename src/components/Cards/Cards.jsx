import { useSelector } from 'react-redux'
import Card from './Card'
import { Draggable } from '@hello-pangea/dnd'

function Cards({ columnId }) {
  const cards = useSelector(state => state.dashboard.cards)

  const filteredSortedCards = cards
    .filter(card => card.column === columnId)
    .sort((a, b) => a.order - b.order)

  return (
    <div>
      {filteredSortedCards.map((card, index) => (
        <Draggable key={card.id} draggableId={card.id} index={index} isDragDisabled={!!card.optimistic}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Card card={card} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  )
}

export default Cards


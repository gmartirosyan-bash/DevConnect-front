import { useSelector } from 'react-redux'
import Card from './Card'

function Cards({ columnId }) {
  const cards = useSelector(state => state.dashboard.cards)

  return (
    <div>
      {cards.map(card =>
        card.column === columnId
          ? (
              <Card
                card={card}
                key={card.id}
              />
            )
          : null)}
    </div>
  )
}

export default Cards

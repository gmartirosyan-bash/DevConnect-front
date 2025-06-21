import { useContext } from 'react'
import { DashboardContext } from '../context/DashboardContext'
import Card from './Card'

function Cards({ columnId }) {
  const { cards } = useContext(DashboardContext)

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

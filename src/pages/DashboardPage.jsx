import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import boardsApi from '../api/boards'
import cardsApi from '../api/cards'
import columnsApi from '../api/columns'
import { AppContext } from '../context/AppContext'
import handleApiError from '../utils/handleApiError'
import CustomAlert from '../components/CustomAlert'
import DashboardBoard from '../components/DashboardBoard'
import { DashboardContext } from '../context/DashboardContext'

function DashboardPage() {
  const { token, user, handleLogout } = useContext(AppContext)
  const [boards, setBoards] = useState([])
  const [columns, setColumns] = useState([])
  const [cards, setCards] = useState([])
  const [boardTitle, setBoardTitle] = useState('')
  const [columnTitle, setColumnTitle] = useState('')
  const [cardTitle, setCardTitle] = useState('')
  const { boardId } = useParams()
  const board = boards.find(b => b.id === boardId)
  const [loading, setLoading] = useState(false)
  const [isLoadingBoard, setIsLoadingBoard] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

  const navigate = useNavigate()

  const fetchIdRef = useRef(0)
  const didReload = useRef(true)

  useEffect(() => {
    if (!token)
      return
    const fetchBoards = async () => {
      setLoading(true)
      try {
        const data = await boardsApi.getBoards()
        setBoards(data)
      }
      catch (err) {
        const message = handleApiError(err, 'Failed to load the boards. Please try again')
        setAlertMsg(message)
      }
      finally {
        setLoading(false)
      }
    }
    fetchBoards()
  }, [token])

  useEffect(() => {
    if (!boardId || !token || !didReload.current)
      return
    const fetchBoard = async () => {
      try {
        const data = await boardsApi.getFullBoard(boardId)
        setColumns(data.columns)
        setCards(data.cards)
      }
      catch (err) {
        const message = handleApiError(err, 'Failed to load the board. Please try again')
        setAlertMsg(message)
      }
    }
    fetchBoard()
  }, [boardId, token])

  const handleAddBoard = async (e) => {
    e.preventDefault()
    const title = boardTitle.trim()
    if (!title)
      return setAlertMsg('board name is required')

    const tempId = `temp-${Date.now()}`
    const optimisticBoard = {
      id: tempId,
      title,
      optimistic: true,
    }

    setBoards(prev => [...prev, optimisticBoard])
    setBoardTitle('')
    setColumns([])
    setCards([])
    setIsLoadingBoard(true)
    try {
      const realBoard = await boardsApi.createBoard({ title })
      setBoards(prev => prev.map(board => board.id === tempId ? realBoard : board))
      navigate(`/dashboard/${realBoard.id}`)
    }
    catch (err) {
      setBoards(prev => prev.filter(board => board.id !== tempId))
      const message = handleApiError(err, 'Failed to create the board. Please try again')
      setAlertMsg(message)
    }
    setIsLoadingBoard(false)
  }

  const handleDeleteBoard = async () => {
    const tempBoards = [...boards]
    const tempColumns = [...columns]
    const tempCards = [...cards]

    setBoards(boards.filter(b => b.id !== board.id))
    setColumns([])
    setCards([])
    navigate('/dashboard')
    try {
      await boardsApi.deleteBoard(boardId)
    }
    catch (err) {
      setBoards(tempBoards)
      setColumns(tempColumns)
      setCards(tempCards)
      const message = handleApiError(err, 'Failed to delete the board. Please try again')
      setAlertMsg(message)
    }
  }

  const handleRenameBoard = async (newTitle) => {
    try {
      const updatedBoard = await boardsApi.renameBoard(boardId, { title: newTitle })
      setBoards(boards.map(b => b.id === board.id ? { ...b, title: updatedBoard.title } : b))
    }
    catch (err) {
      const message = handleApiError(err, 'Failed to rename the board. Please try again')
      setAlertMsg(message)
    }
  }

  const handleAddColumn = async (e) => {
    e.preventDefault()
    const title = columnTitle.trim()
    if (!title)
      return

    setColumnTitle('')

    const tempId = `temp-${Date.now()}`
    const tempColumn = {
      id: tempId,
      name: title,
      board: boardId,
      optimistic: true,
    }
    setColumns(prev => [...prev, tempColumn])

    try {
      const newColumn = await columnsApi.createColumn({ name: title, boardId })
      setColumns(prev => prev.map(column => column.id === tempId ? newColumn : column))
    }
    catch (err) {
      setColumns(columns.filter(column => column.id !== tempId))
      const message = handleApiError(err, 'Failed to create the column. Please try again')
      setAlertMsg(message)
    }
  }

  const handleRenameColumn = async (columnId, newName) => {
    try {
      const updatedColumn = await columnsApi.renameColumn(columnId, { name: newName })
      setColumns(columns.map(col => col.id === columnId ? { ...col, name: updatedColumn.name } : col))
    }
    catch (err) {
      const message = handleApiError(err, 'Failed to rename the column. Please try again')
      setAlertMsg(message)
    }
  }

  const handleDeleteColumn = async (columnId) => {
    const tempColumns = [...columns]
    const tempCards = [...cards]
    setColumns(columns.filter(column => column.id !== columnId))
    setCards(cards.filter(card => card.column.toString() !== columnId))
    try {
      await columnsApi.deleteColumn(columnId)
    }
    catch (err) {
      setColumns(tempColumns)
      setCards(tempCards)
      const message = handleApiError(err, 'Failed to delete the column. Please try again')
      setAlertMsg(message)
    }
  }

  const handleAddCard = async (e, columnId) => {
    e.preventDefault()
    const newName = cardTitle.trim()
    if (!newName)
      return setAlertMsg('Name is required')

    setCardTitle('')

    const tempId = `temp-${Date.now()}`
    const tempCard = {
      id: tempId,
      title: newName,
      column: columnId,
      board: boardId,
      owner: board.owner,
      optimistic: true,
    }

    setCards(prev => [...prev, tempCard])

    try {
      const createdCard = await cardsApi.createCard({ title: newName, columnId })
      setCards(prev => prev.map(card => card.id === tempId ? createdCard : card))
    }
    catch (err) {
      setCards(prev => prev.filter(card => card.id !== tempId))
      const message = handleApiError(err, 'Failed to create the card. Please try again')
      setAlertMsg(message)
    }
  }

  const handleRenameCard = async (cardId, newTitle) => {
    try {
      const updatedCard = await cardsApi.renameCard(cardId, { title: newTitle })
      setCards(cards.map(c => c.id === cardId ? { ...c, title: updatedCard.title } : c))
    }
    catch (err) {
      const message = handleApiError(err, 'Failed to rename the card. Please try again')
      setAlertMsg(message)
    }
  }

  const handleDeleteCard = async (cardId) => {
    const tempCards = [...cards]
    setCards(cards.filter(card => card.id !== cardId))
    try {
      await cardsApi.deleteCard(cardId)
    }
    catch (err) {
      setCards(tempCards)
      const message = handleApiError(err, 'Failed to delete the card. Please try again')
      setAlertMsg(message)
    }
  }

  const boardCache = useRef({})

  const handleSelect = async (chosen) => {
    didReload.current = false
    const fetchId = ++fetchIdRef.current
    navigate(`/dashboard/${chosen}`)
    setIsLoadingBoard(true)
    const cached = boardCache.current[chosen]
    if (cached) {
      setColumns(cached.columns)
      setCards(cached.cards)
      setLoading(false)
      setIsLoadingBoard(false)
    }

    try {
      const data = await boardsApi.getFullBoard(chosen)
      if (fetchIdRef.current !== fetchId)
        return
      boardCache.current[chosen] = data
      setColumns(data.columns)
      setCards(data.cards)
    }
    catch (err) {
      const message = handleApiError(err, 'Failed to load the board. Please try again')
      setAlertMsg(message)
    }
    setIsLoadingBoard(false)
  }

  return (
    <div className="text-center text-black bg-neutral-800 flex flex-col h-screen">
      {alertMsg
        && (<CustomAlert message={alertMsg} onClose={() => setAlertMsg('')} />
        )}
      <DashboardContext.Provider value={{
        handleSelect,
        boards,
        boardTitle,
        setBoardTitle,
        handleAddBoard,

        board,
        handleRenameBoard,
        columnTitle,
        setColumnTitle,
        handleAddColumn,
        columns,
        handleDeleteColumn,
        handleRenameColumn,
        handleDeleteBoard,

        cards,
        cardTitle,
        setCardTitle,
        handleAddCard,
        handleDeleteCard,
        handleRenameCard,

        isLoadingBoard,

        user,
        handleLogout,
      }}
      >
        {loading
          ? (
              <div className="bg-green-800 flex justify-center items-center h-full">
                <div className=" bg-green-800 animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
              </div>
            )
          : (<DashboardBoard board={board} />)}
      </DashboardContext.Provider>
    </div>
  )
}
export default DashboardPage

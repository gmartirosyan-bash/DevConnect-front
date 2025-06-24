import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import boardsApi from '../api/boards'
import cardsApi from '../api/cards'
import columnsApi from '../api/columns'
import handleApiError from '../utils/handleApiError'
import CustomAlert from '../components/CustomAlert'
import DashboardBoard from '../components/DashboardBoard'
import { DashboardContext } from '../context/DashboardContext'
import { useSelector, useDispatch } from 'react-redux'
import { setBoards, setColumns, setCards, setBoardTitle, setColumnTitle, setCardTitle, setLoading, setIsLoadingBoard } from '../redux/dashboardSlice'

function DashboardPage() {
  const token = useSelector(state => state.user.token)
  const boards = useSelector(state => state.dashboard.boards)
  const columns = useSelector(state => state.dashboard.columns)
  const cards = useSelector(state => state.dashboard.cards)
  const boardTitle = useSelector(state => state.dashboard.boardTitle)
  const columnTitle = useSelector(state => state.dashboard.columnTitle)
  const cardTitle = useSelector(state => state.dashboard.cardTitle)
  const loading = useSelector(state => state.dashboard.loading)
  const isLoadingBoard = useSelector(state => state.dashboard.isLoadingBoard)

  const { boardId } = useParams()
  const board = boards.find(b => b.id === boardId)
  const [alertMsg, setAlertMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchIdRef = useRef(0)
  const didReload = useRef(true)

  useEffect(() => {
    if (!token)
      return
    const fetchBoards = async () => {
      dispatch(setLoading(true))
      try {
        const data = await boardsApi.getBoards(token)
        dispatch(setBoards(data))
      }
      catch (err) {
        const message = handleApiError(err, 'Failed to load the boards. Please try again')
        setAlertMsg(message)
      }
      finally {
        dispatch(setLoading(false))
      }
    }
    fetchBoards()
  }, [token, dispatch])

  useEffect(() => {
    if (!boardId || !token || !didReload.current)
      return
    const fetchBoard = async () => {
      try {
        const data = await boardsApi.getFullBoard(boardId, token)
        dispatch(setColumns(data.columns))
        dispatch(setCards(data.cards))
      }
      catch (err) {
        const message = handleApiError(err, 'Failed to load the board. Please try again')
        setAlertMsg(message)
      }
    }
    fetchBoard()
  }, [boardId, token, dispatch])

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

    const newFakeBoards = [...boards, optimisticBoard]
    dispatch(setBoards(newFakeBoards))
    dispatch(setBoardTitle(''))
    dispatch(setColumns([]))
    dispatch(setCards([]))
    dispatch(setIsLoadingBoard(true))
    try {
      const realBoard = await boardsApi.createBoard({ title }, token)
      dispatch(setBoards(newFakeBoards.map(board => board.id === tempId ? realBoard : board)))
      navigate(`/dashboard/${realBoard.id}`)
    }
    catch (err) {
      dispatch(setBoards(newFakeBoards.filter(board => board.id !== tempId)))
      const message = handleApiError(err, 'Failed to create the board. Please try again')
      setAlertMsg(message)
    }
    dispatch(setIsLoadingBoard(false))
  }

  const handleDeleteBoard = async () => {
    const tempBoards = [...boards]
    const tempColumns = [...columns]
    const tempCards = [...cards]

    dispatch(setBoards(boards.filter(b => b.id !== board.id)))
    dispatch(setColumns([]))
    dispatch(setCards([]))
    navigate('/dashboard')
    try {
      await boardsApi.deleteBoard(boardId, token)
    }
    catch (err) {
      dispatch(setBoards(tempBoards))
      dispatch(setColumns(tempColumns))
      dispatch(setCards(tempCards))
      const message = handleApiError(err, 'Failed to delete the board. Please try again')
      setAlertMsg(message)
    }
  }

  const handleRenameBoard = async (newTitle) => {
    try {
      const updatedBoard = await boardsApi.renameBoard(boardId, { title: newTitle }, token)
      dispatch(setBoards(boards.map(b => b.id === board.id ? { ...b, title: updatedBoard.title } : b)))
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

    dispatch(setColumnTitle(''))

    const tempId = `temp-${Date.now()}`
    const tempColumn = {
      id: tempId,
      name: title,
      board: boardId,
      optimistic: true,
    }

    const newFakeColumns = [...columns, tempColumn]
    dispatch(setColumns(newFakeColumns))

    try {
      const newColumn = await columnsApi.createColumn({ name: title, boardId }, token)
      dispatch(setColumns(newFakeColumns.map(column => column.id === tempId ? newColumn : column)))
    }
    catch (err) {
      dispatch(setColumns(newFakeColumns.filter(column => column.id !== tempId)))
      const message = handleApiError(err, 'Failed to create the column. Please try again')
      setAlertMsg(message)
    }
  }

  const handleRenameColumn = async (columnId, newName) => {
    try {
      const updatedColumn = await columnsApi.renameColumn(columnId, { name: newName }, token)
      dispatch(setColumns(columns.map(col => col.id === columnId ? { ...col, name: updatedColumn.name } : col)))
    }
    catch (err) {
      const message = handleApiError(err, 'Failed to rename the column. Please try again')
      setAlertMsg(message)
    }
  }

  const handleDeleteColumn = async (columnId) => {
    const tempColumns = [...columns]
    const tempCards = [...cards]
    dispatch(setColumns(columns.filter(column => column.id !== columnId)))
    dispatch(setCards(cards.filter(card => card.column.toString() !== columnId)))
    try {
      await columnsApi.deleteColumn(columnId, token)
    }
    catch (err) {
      dispatch(setColumns(tempColumns))
      dispatch(setCards(tempCards))
      const message = handleApiError(err, 'Failed to delete the column. Please try again')
      setAlertMsg(message)
    }
  }

  const handleAddCard = async (e, columnId) => {
    e.preventDefault()
    const newName = cardTitle.trim()
    if (!newName)
      return setAlertMsg('Name is required')

    dispatch(setCardTitle(''))

    const tempId = `temp-${Date.now()}`
    const tempCard = {
      id: tempId,
      title: newName,
      column: columnId,
      board: boardId,
      owner: board.owner,
      optimistic: true,
    }

    const newFakeCards = [...cards, tempCard]
    dispatch(setCards(newFakeCards))

    try {
      const createdCard = await cardsApi.createCard({ title: newName, columnId }, token)
      dispatch(setCards(newFakeCards.map(card => card.id === tempId ? createdCard : card)))
    }
    catch (err) {
      dispatch(setCards(newFakeCards.filter(card => card.id !== tempId)))
      const message = handleApiError(err, 'Failed to create the card. Please try again')
      setAlertMsg(message)
    }
  }

  const handleRenameCard = async (cardId, newTitle) => {
    try {
      const updatedCard = await cardsApi.renameCard(cardId, { title: newTitle }, token)
      dispatch(setCards(cards.map(c => c.id === cardId ? { ...c, title: updatedCard.title } : c)))
    }
    catch (err) {
      const message = handleApiError(err, 'Failed to rename the card. Please try again')
      setAlertMsg(message)
    }
  }

  const handleDeleteCard = async (cardId) => {
    const tempCards = [...cards]
    dispatch(setCards(cards.filter(card => card.id !== cardId)))
    try {
      await cardsApi.deleteCard(cardId, token)
    }
    catch (err) {
      dispatch(setCards(tempCards))
      const message = handleApiError(err, 'Failed to delete the card. Please try again')
      setAlertMsg(message)
    }
  }

  const boardCache = useRef({})

  const handleSelect = async (chosen) => {
    didReload.current = false
    const fetchId = ++fetchIdRef.current
    navigate(`/dashboard/${chosen}`)
    dispatch(setIsLoadingBoard(true))
    const cached = boardCache.current[chosen]
    if (cached) {
      dispatch(setColumns(cached.columns))
      dispatch(setCards(cached.cards))
      dispatch(setIsLoadingBoard(false))
    }

    try {
      const data = await boardsApi.getFullBoard(chosen, token)
      if (fetchIdRef.current !== fetchId)
        return
      boardCache.current[chosen] = data
      dispatch(setColumns(data.columns))
      dispatch(setCards(data.cards))
    }
    catch (err) {
      const message = handleApiError(err, 'Failed to load the board. Please try again')
      setAlertMsg(message)
    }
    dispatch(setIsLoadingBoard(false))
  }

  return (
    <div className="text-center text-black bg-neutral-800  h-full">
      {alertMsg
        && (<CustomAlert message={alertMsg} onClose={() => setAlertMsg('')} />
        )}
      <DashboardContext.Provider value={{
        handleSelect,
        handleAddBoard,

        board,
        handleRenameBoard,
        handleAddColumn,
        handleDeleteColumn,
        handleRenameColumn,
        handleDeleteBoard,

        handleAddCard,
        handleDeleteCard,
        handleRenameCard,

        isLoadingBoard,

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

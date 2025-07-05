import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import boardsApi from '../api/boards'
import columnsApi from '../api/columns'
import cardsApi from '../api/cards'
import handleApiError from '../utils/handleApiError'
import { setAlertMsg } from './uiSlice'

export const createBoard = createAsyncThunk(
  'dashboard/createBoard',
  async ({ navigate }, { getState, dispatch, rejectWithValue}) => {
    const state = getState()
    const name = state.dashboard.boardName.trim()
    const oldColumns = state.dashboard.columns
    const oldCards = state.dashboard.cards

    if (!name){
      dispatch(setAlertMsg('board name is required'))
      return rejectWithValue('Board name is required') 
    }

    const tempId = `temp-${Date.now()}`
    const optimisticBoard = {
      id: tempId,
      name,
      optimistic: true,
    }
    const optimisticColumns = [
      { id: `temp-col-1-${tempId}`, name: 'To Do', boardId: tempId, optimistic: true },
      { id: `temp-col-2-${tempId}`, name: 'Doing', boardId: tempId, optimistic: true },
      { id: `temp-col-3-${tempId}`, name: 'Done', boardId: tempId, optimistic: true },
    ]

    const newFakeBoards = [...state.dashboard.boards, optimisticBoard]
    dispatch(setBoards(newFakeBoards))
    dispatch(setBoardName(''))
    dispatch(setColumns(optimisticColumns))
    dispatch(setCards([]))
    dispatch(setIsLoadingBoard(true))
    try {
      const realBoard = await boardsApi.createBoard({ name }, state.user.token)
      dispatch(setBoards(newFakeBoards.map(board => board.id === tempId ? realBoard : board)))
      dispatch(setColumns(realBoard.columns))
      navigate(`/dashboard/${realBoard.id}`)
    }
    catch (err) {
      dispatch(setColumns(oldColumns))
      dispatch(setCards(oldCards))
      dispatch(setBoards(newFakeBoards.filter(board => board.id !== tempId)))
      const message = handleApiError(err, 'Failed to create the board. Please try again')
      dispatch(setAlertMsg(message))
      return rejectWithValue(message)
    } finally {
      dispatch(setIsLoadingBoard(false))
    }
  }
)

export const createColumn = createAsyncThunk(
  'dashboard/createColumn',
  async ({ boardId }, { getState, dispatch, rejectWithValue}) => {
    const state = getState()
    const name = state.dashboard.columnName.trim()
    if (!name){
      dispatch(setAlertMsg('Column name is required'))
      return rejectWithValue('Column name is required')
    }

    dispatch(setColumnName(''))

    const tempId = `temp-${Date.now()}`
    const tempColumn = {
      id: tempId,
      name: name,
      board: boardId,
      optimistic: true,
    }

    const newFakeColumns = [...state.dashboard.columns, tempColumn]
    dispatch(setColumns(newFakeColumns))

    try {
      const newColumn = await columnsApi.createColumn({ name: name, boardId }, state.user.token)
      dispatch(setColumns(newFakeColumns.map(column => column.id === tempId ? newColumn : column)))
      return
    }
    catch (err) {
      dispatch(setColumns(newFakeColumns.filter(column => column.id !== tempId)))
      const message = handleApiError(err, 'Failed to create the column. Please try again')
      dispatch(setAlertMsg(message))
      return rejectWithValue(message)
    }
  }
)

export const createCard = createAsyncThunk(
  'dashboard/createCard',
  async ({ board, columnId }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const newName = state.dashboard.cardName.trim()
    
    if (!newName)
      return dispatch(setAlertMsg('Name is required'))
    
    dispatch(setCardName(''))
    
    const tempId = `temp-${Date.now()}`
    const tempCard = {
      id: tempId,
      name: newName,
      column: columnId,
      board: board.id,
      owner: board.owner,
      optimistic: true,
    }
    
    const newFakeCards = [...state.dashboard.cards, tempCard]
    dispatch(setCards(newFakeCards))
    try {
      const createdCard = await cardsApi.createCard({ name: newName, columnId }, state.user.token)
      dispatch(setCards(newFakeCards.map(card => card.id === tempId ? createdCard : card)))
    }
    catch (err) {
      dispatch(setCards(newFakeCards.filter(card => card.id !== tempId)))
      const message = handleApiError(err, 'Failed to create the card. Please try again')
      dispatch(setAlertMsg(message))
      return rejectWithValue(message)
    }
    
  }
)

export const renameBoard = createAsyncThunk(
  'dashboard/renameBoard',
  async ({ boardId, newName }, { getState, dispatch, rejectWithValue }) => {
    const token = getState().user.token
    try {
      const updatedBoard = await boardsApi.renameBoard(boardId, { name: newName }, token)
      return { boardId, name: updatedBoard.name }
    } catch (err) {
      const message = handleApiError(err, 'Failed to rename the board. Please try again')
      dispatch(setAlertMsg(message))
      return rejectWithValue(message)
    }
  }
)

export const renameColumn = createAsyncThunk(
  'dashboard/renameColumn',
  async ({ columnId, newName }, { getState, dispatch, rejectWithValue }) => {
    const token = getState().user.token
    try{
      const updatedColumn = await columnsApi.renameColumn(columnId, { name: newName }, token)
      return { columnId, name: updatedColumn.name }
    } catch (err) {
      const message = handleApiError(err, 'Failed to rename the column. Please try again')
      dispatch(setAlertMsg(message))
      return rejectWithValue(message)
    }
  }
)

export const renameCard = createAsyncThunk(
  'dashboard/renameCard',
  async ({ cardId, newName }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    try {
      const updatedCard = await cardsApi.renameCard(cardId, { name: newName }, state.user.token)
      return { cardId, name: updatedCard.name }
    }
    catch (err) {
      const message = handleApiError(err, 'Failed to rename the card. Please try again')
      dispatch(setAlertMsg(message))
      return rejectWithValue(message)
    }
  }
)

export const deleteBoard = createAsyncThunk(
  'dashboard/deleteBoard',
  async ({ boardId, navigate }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const token = state.user.token

    const tempBoards = [...state.dashboard.boards]
    const tempColumns = [...state.dashboard.columns]
    const tempCards = [...state.dashboard.cards]
    
    dispatch(setBoards(state.dashboard.boards.filter(b => b.id !== boardId)))
    dispatch(setColumns([]))
    dispatch(setCards([]))
    navigate('/dashboard')
    
    try {
      await boardsApi.deleteBoard(boardId, token)
    } catch (err) {
      const message = handleApiError(err, 'Failed to delete the board. Please try again')
      dispatch(setAlertMsg(message))
      dispatch(setBoards(tempBoards))
      dispatch(setColumns(tempColumns))
      dispatch(setCards(tempCards))
      return rejectWithValue(message)
    }
  }
)

export const deleteColumn = createAsyncThunk(
  'dashboard/deleteColumn',
  async ({ columnId }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()

    const tempColumns = [...state.dashboard.columns]
    const tempCards = [...state.dashboard.cards]
    dispatch(setColumns(state.dashboard.columns.filter(column => column.id !== columnId)))
    dispatch(setCards(state.dashboard.cards.filter(card => card.column.toString() !== columnId)))
    try {
      await columnsApi.deleteColumn(columnId, state.user.token)
    }
    catch (err) {
      dispatch(setColumns(tempColumns))
      dispatch(setCards(tempCards))
      const message = handleApiError(err, 'Failed to delete the column. Please try again')
      dispatch(setAlertMsg(message))
      return rejectWithValue(message)
    }
  }
)

export const deleteCard = createAsyncThunk(
  'dashboard/deleteCard',
  async ({ cardId }, { getState, dispatch, rejectWithValue}) => {
    const state = getState()

    const tempCards = [...state.dashboard.cards]
    dispatch(setCards(state.dashboard.cards.filter(card => card.id !== cardId)))
    try {
      await cardsApi.deleteCard(cardId, state.user.token)
    }
    catch (err) {
      dispatch(setCards(tempCards))
      const message = handleApiError(err, 'Failed to delete the card. Please try again')
      dispatch(setAlertMsg(message))
      return rejectWithValue(message)
    }
  }
)

export const selectBoard = createAsyncThunk(
  'dashboard/selectBoard',
  async ({ chosen, navigate, fetchIdRef, boardCache }, { getState, dispatch, rejectWithValue }) => {
    const state = getState()
    const fetchId = ++fetchIdRef.current

    dispatch(setBoardId(chosen))

    navigate(`/dashboard/${chosen}`)
    dispatch(setIsLoadingBoard(true))
    const cached = boardCache.current[chosen]
    if (cached) {
      dispatch(setColumns(cached.columns))
      dispatch(setCards(cached.cards))
      dispatch(setIsLoadingBoard(false))
    }

    try {
      const data = await boardsApi.getFullBoard(chosen, state.user.token)
      if (fetchIdRef.current !== fetchId)
        return
      boardCache.current[chosen] = data
      dispatch(setColumns(data.columns))
      dispatch(setCards(data.cards))
    }
    catch (err) {
      const message = handleApiError(err, 'Failed to load the board. Please try again')
      dispatch(setAlertMsg(message))
      return rejectWithValue(message)
    } finally {
      dispatch(setIsLoadingBoard(false))
    }
  }
)

const initialState = {
  boards: [],
  columns: [],
  cards: [],
  boardId: null,
  board: null,

  boardName: '',
  columnName: '',
  cardName: '',

  isLoadingBoard: false,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setBoards(state, action) {
      state.boards = action.payload
    },
    setColumns(state, action) {
      state.columns = action.payload
    },
    setCards(state, action) {
      state.cards = action.payload
    },
    setBoardId(state, action) {
      state.boardId = action.payload
    },
    setBoard(state, action) {
      state.board = action.payload
    },
    setBoardName(state, action) {
      state.boardName = action.payload
    },
    setColumnName(state, action) {
      state.columnName = action.payload
    },
    setCardName(state, action) {
      state.cardName = action.payload
    },
    setIsLoadingBoard(state, action) {
      state.isLoadingBoard = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.
      addCase(renameBoard.fulfilled, (state, action) => {
        const { boardId, name } = action.payload
        state.boards = state.boards.map(board => board.id === boardId ? { ...board, name } : board)
      })

      .addCase(renameColumn.fulfilled, (state, action) => {
        const { columnId, name } = action.payload
        state.columns = state.columns.map(column => column.id === columnId ? { ...column, name } : column)
      })

      .addCase(renameCard.fulfilled, (state, action) => {
        const { cardId, name } = action.payload
        state.cards = state.cards.map(card => card.id === cardId ? { ...card, name } : card)
      })
  }
})

export const {
  setBoards, setColumns, setCards, setBoardId, setBoard, setBoardName, setColumnName, setCardName, setIsLoadingBoard
} = dashboardSlice.actions

export default dashboardSlice.reducer
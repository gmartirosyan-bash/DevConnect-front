import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

const initialState = {
  boards: [],
  columns: [],
  cards: [],

  boardTitle: '',
  columnTitle: '',
  cardTitle: '',

  isLoadingBoard: false,
  loading: false,
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
    setBoardTitle(state, action) {
      state.boardTitle = action.payload
    },
    setColumnTitle(state, action) {
      state.columnTitle = action.payload
    },
    setCardTitle(state, action) {
      state.cardTitle = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setIsLoadingBoard(state, action) {
      state.isLoadingBoard = action.payload
    }
  }
})

export const {
  setBoards, setColumns, setCards, setBoardTitle, setColumnTitle, setCardTitle, setIsLoadingBoard, setLoading
} = dashboardSlice.actions

export default dashboardSlice.reducer
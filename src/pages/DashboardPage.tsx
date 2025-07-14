import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import boardsApi from '../api/boards'
import handleApiError from '../utils/handleApiError'
import CustomAlert from '../components/UI/CustomAlert'
import DashboardBoard from '../components/Boards/DashboardBoard'
import { useSelector, useDispatch } from 'react-redux'
import { setBoards, setColumns, setCards, setBoardId, setBoard } from '../redux/dashboardSlice'
import { setLoading, setAlertMsg } from '../redux/uiSlice'
import { RootState, AppDispatch } from '../redux/store'

interface Board {
  id: string
  name: string
  owner: string
  columns: string[]
}

function DashboardPage() {
  const token = useSelector((state: RootState) => state.user.token)
  const boards = useSelector((state: RootState) => state.dashboard.boards as Board[])
  const loading = useSelector((state: RootState) => state.ui.loading as boolean)
  const alertMsg = useSelector((state: RootState) => state.ui.alertMsg as string | null)

  const { boardId } = useParams<{ boardId?: string }>()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if(boards.some(board => board.id.includes('opt')) || boardId?.includes('opt'))
      return
    if(boardId){
      const board = boards.find(b => b.id === boardId)
      dispatch(setBoard(board ?? null))
      dispatch(setBoardId(boardId))
    }
    else{
      dispatch(setBoard(null))
      dispatch(setBoardId(null))
      dispatch(setColumns([]))
      dispatch(setCards([]))
    }
  }, [boardId, boards, dispatch])

  useEffect(() => {
    if (!token)
      return
    const fetchBoards = async (): Promise<void> => {
      dispatch(setLoading(true))
      try {
        const data = await boardsApi.getBoards(token)
        dispatch(setBoards(data))
      }
      catch (err) {
        const message = handleApiError(err, 'Failed to load the boards. Please try again')
        dispatch(setAlertMsg(message))
      }
      finally {
        dispatch(setLoading(false))
      }
    }
    fetchBoards()
  }, [token, dispatch])

  useEffect(() => {
    if (!boardId || !token)
      return
    const fetchBoard = async (): Promise<void> => {
      try {
        const data = await boardsApi.getFullBoard(boardId, token)
        dispatch(setColumns(data.columns))
        dispatch(setCards(data.cards))
      }
      catch (err) {
        const message = handleApiError(err, 'Failed to load the board. Please try again')
        dispatch(setAlertMsg(message))
      }
    }
    fetchBoard()
  }, [token, dispatch])

  return (
    <div className="text-center text-black bg-neutral-800  h-full">
      {alertMsg
        && (<CustomAlert message={alertMsg} onClose={() => dispatch(setAlertMsg(''))} />
        )}
      {loading
        ? (
            <div className="bg-green-800 flex justify-center items-center h-full">
              <div className=" bg-green-800 animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
            </div>
          )
        : (<DashboardBoard />)}
    </div>
  )
}
export default DashboardPage

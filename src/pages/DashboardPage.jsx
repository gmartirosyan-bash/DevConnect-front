import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import boardsApi from '../api/boards'
import handleApiError from '../utils/handleApiError'
import CustomAlert from '../components/UI/CustomAlert'
import DashboardBoard from '../components/DashboardBoard'
import { useSelector, useDispatch } from 'react-redux'
import { setBoards, setColumns, setCards, setBoardId, setBoard } from '../redux/dashboardSlice'
import { setLoading, setAlertMsg } from '../redux/uiSlice'

function DashboardPage() {
  const token = useSelector(state => state.user.token)
  const boards = useSelector(state => state.dashboard.boards)
  const loading = useSelector(state => state.ui.loading)
  const alertMsg = useSelector(state => state.ui.alertMsg)

  const { boardId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if(boardId){
      dispatch(setBoard(boards.find(b => b.id === boardId)))
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
    const fetchBoards = async () => {
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
    const fetchBoard = async () => {
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

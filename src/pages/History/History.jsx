import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getHistory, deleteHistoryItem } from '../../redux/actions'
import './History.css'

const History = () => {
  const { history, isHistoryLoading } = useSelector(state => state.bucketsReducer)

  const dispatch = useDispatch()
  const getHistoryData = useCallback(() => dispatch(getHistory()), [dispatch])
  const deleteHistory = useCallback((id) => dispatch(deleteHistoryItem(id)), [dispatch])

  useEffect(() => {
    getHistoryData()
  }, [getHistoryData])

  const handleDelete = (id) => {
    deleteHistory(id)
  }

  if (isHistoryLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className='history'>
        <div className='top'>
          <h1>History page</h1>
          <Link to='/' className='goBackButton'>
            Go back to homepage
          </Link>
        </div>
        <div className='history-main-container'>
          {history?.reverse()?.map((item, index) => {
            return (
              <div key={index} className='single-log'>
                <p>Title: {item?.title}</p>
                <p>Link : {item?.link}</p>
                <p>Last played on: {item?.time?.slice(0, 25)}</p>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default History

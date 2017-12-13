import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import {BATCH_CREATED} from './subscribe'

const api = new API()

export default (batch) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/batches', batch)
      .then(() => {
        dispatch({ type: BATCH_CREATED })

        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

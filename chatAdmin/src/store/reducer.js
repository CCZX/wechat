import { combineReducers } from 'redux-immutable'
import { reducer as appReducer } from './modules/app'

export default combineReducers({
  app: appReducer
})

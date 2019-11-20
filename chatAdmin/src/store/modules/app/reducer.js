import { fromJS } from 'immutable'
import * as constants from './constants'

const initState = fromJS({
  loading: false
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.TOGGLE_LOADING:
      return state.set('loading', action.value)
    default:
      return state
  }
}

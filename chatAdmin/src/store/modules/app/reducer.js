import { fromJS } from 'immutable'
import * as constants from './constants'

const adminInfo = window.localStorage.getItem('adminInfo')
console.log(adminInfo, typeof adminInfo)

const initState = fromJS({
  loading: false,
  /**当前管理员信息 */
  currAdminInfo: JSON.parse(window.localStorage.getItem('adminInfo') || '{}')
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.TOGGLE_LOADING:
      return state.set('loading', action.value)
    case constants.SET_CURR_ADMIN:
      console.log(action, 123123)
      window.localStorage.setItem('adminInfo', JSON.stringify(action.value))
      return state.set('currAdminInfo', action.value)
    default:
      return state
  }
}

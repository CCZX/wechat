import * as constants from './constants'

export const toggleLoading = (value) => ({
  type: constants.TOGGLE_LOADING,
  value
})

export const setCurrAdmin = (value) => ({
  type: constants.SET_CURR_ADMIN,
  value
})

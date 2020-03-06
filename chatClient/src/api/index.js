import user from './modules/user'
import friendly from './modules/friendly'
import group from './modules/group'
import news from './modules/news'
import sys from './modules/sys'
import validate from './modules/validate'
import pyq from './modules/pyq'
import file from './modules/file'

export const API = 'api/v1'

export default {
  ...user,
  ...friendly,
  ...group,
  ...news,
  ...sys,
  ...validate,
  ...pyq,
  ...file
}

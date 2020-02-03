import user from './modules/user'
import friendly from './modules/friendly'
import group from './modules/group'
import news from './modules/news'
import sys from './modules/sys'
import validate from './modules/validate'

export default {
  ...user,
  ...friendly,
  ...group,
  ...news,
  ...sys,
  ...validate
}

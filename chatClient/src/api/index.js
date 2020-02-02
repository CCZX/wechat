import user from './modules/user'
import friendly from './modules/friendly'
import group from './modules/group'
import news from './modules/news'
import sys from './modules/sys'

export default {
  ...user,
  ...friendly,
  ...group,
  ...news,
  ...sys
}

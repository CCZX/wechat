import user from './modules/user'
import friendly from './modules/friendly'
import group from './modules/group'

export default {
  ...user,
  ...friendly,
  ...group
}

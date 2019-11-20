import Vue from 'vue'
import VueX from 'vuex'

import user from './modules/user'

Vue.use(VueX)

export default new VueX.Store({
  modules: {
    user
  }
})

import Vue from 'vue'
import VueX from 'vuex'

import user from './modules/user'
import news from './modules/news'

Vue.use(VueX)

export default new VueX.Store({
  modules: {
    user,
    news
  }
})

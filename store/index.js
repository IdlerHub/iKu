import Vue from 'vue'
import Vuex from 'vuex'
import Scroll from './modules/scroll'
import Address from './modules/address'
import Video from './modules/video'
import Record from './modules/record'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Scroll,
    Address,
    Video,
    Record
  }
})

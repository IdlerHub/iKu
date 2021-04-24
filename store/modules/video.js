export default {
  namespaced: true,
  state: {
    info: {},
    liveshow: false
  },
  getters: {},
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    setLiveShow (state, info) {
      state.liveshow = info
    }
  },
  actions: {}
}

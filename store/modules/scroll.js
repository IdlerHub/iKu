export default {
  namespaced: true,
  state: {
    left_index: 0,
    right_index: ''
  },
  getters: {},
  mutations: {
    setLeftIndex (state, index) {
      if (state.left_index !== index) {
        state.left_index = index
      }
    },
    setRightIndex (state, index) {
      if (state.right_index !== index) {
        state.right_index = index
      }
    }
  },
  actions: {}
}

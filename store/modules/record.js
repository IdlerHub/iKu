export default {
  namespaced: true,
  state: {
    record: {
      page: '',
      content_type: '',
      content_id: ''
    },
    browse_id: ''
  },
  mutations: {
    setRecord (state, info) {
      state.record = { ...state.record, content_type: '', content_id: '', ...info }
    },
    setBrowseID (state, info) {
      state.browse_id = info
    }
  }
}

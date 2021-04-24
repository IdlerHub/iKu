export default {
  data () {
    return {
      // 列表
      list: [],
      // 二维数组列表
      DimensionList: [],
      // 页数
      page: 1,
      // 间隔
      limit: 10,
      // 总页数
      total_pages: 0,
      total_items: 0,
      // 是否在获取列表的过程中
      IsGetList: false,
      noMore: null,
      close_mounted: false
    }
  },
  methods: {
    ListFun () {
      if (typeof this.GetList === 'function') {
        this.IsGetList = true
        this.GetList()
      }
    },
    // 刷新数据
    RefreshList () {
      this.page = 1
      this.IsGetList = true
      this.list = []
      this.DimensionList = []
      this.noMore = null
      this.ListFun()
    },
    // 处理回调数据
    HandleRes (data) {
      this.total_pages = parseInt(data.total_pages) || 0
      this.total_items = parseInt(data.total_items) || 0
      if (this.page === 1) {
        this.list = JSON.parse(JSON.stringify(data.items))
      } else {
        this.list = JSON.parse(JSON.stringify(this.list.concat(data.items)))
      }

      this.noMore = false

      if (this.total_pages === 1 && this.total_items < 1) {
        this.noMore = false
      } else {
        this.noMore = this.list.length > 0 ? true : this.noMore
      }

      this.IsGetList = false
    },
    // 处理回调数据(二维数组)
    HandleResDimension (data) {
      this.total_pages = data.total_pages || 0
      this.DimensionList[this.page - 1] = JSON.parse(JSON.stringify(data.items))
      this.IsGetList = false
    },
    GetMore () {
      let loadmore = false
      if (typeof this.load_more === 'undefined' || this.load_more) {
        loadmore = true
      }
      if (this.total_pages !== this.page && loadmore && this.total_pages !== 0) {
        this.page++
        this.ListFun()
      }
    }
  },
  mounted () {
    if (!this.close_mounted) {
      this.page = 1
      this.ListFun()
    }
  },
  onReachBottom () {
    this.GetMore()
  },
  computed: {
    ListShow () {
      return this.list.length > 0
    }
  },
  onPullDownRefresh () {
    this.RefreshList()
    wx.stopPullDownRefresh()
  }
}

export default {
  data () {
    return {
      uid: '',
      t: '',
      shareContentData: '',
      sharePageTitle: ''
    }
  },
  onShow () {
    if (!this.close_shareContent) {
      this.getUid()
      this.shareContent()
      console.log('请开启获取分享页面的分享标题-Pageshare.js')
      if (this.Showfun) {
        this.Showfun()
      }
    }
  },
  methods: {
    //  uid=123 用户id, t=s 分享类型 页面分享：share， 二维码分享：posters
    shareContent () {
      let args = {
        url: this.api('shareContent'),
        data: {},
        loading: false
      }
      this.get(args).then(res => {
        if (res.status) {
          this.shareContentData = res.data
          this.SetSharePageTitle()
          console.log(' this.sharePageTitle', this.sharePageTitle)
        }
      })
    },
    SetSharePageTitle () {
      this.sharePageTitle = this.sharePageKey ? this.shareContentData[this.sharePageKey] : ''
    },
    getUid () {
      wx.getStorage({
        key: 'uid',
        success: res => {
          this.uid = res.data
        }
      })
    }
  }
}

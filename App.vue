<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      updateTime: null,
      imgProcess: this.$imgProcess
    }
  },
  mounted () {
    this.getRecommendId()
    this.updatinBrowseLog()
    this.getLiveCount()
    // wx.onAppHide(()=>{
    //    wx.setStorageSync('authPhone', '')
    // })
  },
  onShow (options) {
    this.getRecommendId()
    clearInterval(this.updateTime)
    this.updateTime = setInterval(() => {
      this.updatinBrowseLog()
    }, 10000)
    wx.nextTick(() => {
      this.SetCodeProcess(options)
    })
  },
  onLaunch (options) {
    let version = '07.03.16'
    console.log('version ' + version)
  },
  onHide () {
    // console.log('App onHide')
    wx.setStorageSync('appp_on_hide', 1)
    clearInterval(this.updateTime)
  },
  methods: {
    // 获取推荐人id
    getRecommendId () {
      let query =
        this.$root.$mp.appOptions && this.$root.$mp.appOptions.query
          ? this.$root.$mp.appOptions.query
          : {}

      // console.log('this.$root.$mp', this.$root.$mp)
      // console.log('this.$root.$mp.appOptions', this.$root.$mp.appOptions)
      // console.log('query', query)
      if (query.uid) {
        wx.setStorage({
          key: 'recommend_id',
          data: query.uid
        })
      }
      if (query.t) {
        // 页面分享：share， 二维码分享：posters
        wx.setStorage({
          key: 'recommend_source',
          data: query.t
        })
      }
    },
    // 二维码参数处理
    SetCodeProcess (options) {
      let query = options.query || {}
      // console.log(query, 'query')
      if (query.e2) {
        this.chooseConsultant(query.e2)
      }
    },
    // 选为消防专员
    async chooseConsultant (scene) {
      if (scene) {
        let args = {
          url: this.api('chooseConsultant'),
          data: {
            employee_no: scene
          }
        }
        wx.setStorage({
          key: 'employee_no',
          data: scene
        })
        let res = await this.post(args)
        if (res.code === 200) {
          // console.log('专员绑定')
          wx.removeStorageSync('employee_no')
        }
      }
    },
    // 更新统计时长
    updatinBrowseLog () {
      if (this.browse_id) {
        let args = {
          url: this.api('updatinBrowseLog'),
          data: {
            browse_id: this.browse_id
          }
        }
        this.post(args)
      }
    },
    // getLiveCount
    async getLiveCount () {
      let args = {
        url: this.api('getLiveCount')
      }
      let res = await this.post(args)
      if (res.status) {
        this.setLiveShow(res.data.live_count * 1 > 0)
      }
    },
    ...mapMutations('Record', ['setRecord']),
    ...mapMutations('Video', ['setLiveShow'])
  },
  computed: {
    ...mapState('Record', ['record', 'browse_id'])
  }
}
</script>

<style lang="less">
@import "./static/font/CAI/023-CAI978.css";
@import "./static/font/wechatNumber/wechatNumber.css";
// @import url("~mpvue-wxparse/src/wxParse.css");
@import url('./components/common/wxParse/wxParse.css');

page {
  background: #f8f8f8;
}
.caiNumber {
  font-family: "023-CAI978";
}
.wechatNumber {
  font-family: "WeChatNumber-151125";
}
button,
input {
  margin: 0;
  padding: 0;
  min-height: 0;
  border: 0;
  // 不设置line-leight,border-radius
}
button {
  &::before,
  &::after {
    border: 0;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
img, image {
  vertical-align: middle;
}
video {
  line-height: 1;
  top: 0
}
</style>

<template>
  <div class="page">
    <div class="learn-box flex-bc">
      <!-- 标题图片 -->
      <img src="/static/images/my/3.png" class="title-img" mode="widthFix" />
      <img src="/static/images/my/7.png" class="right-icon" mode="widthFix"  @click="$nav('back')" />
      <!-- <div class="more flex-c" @click="$nav('back')">
        <span>返回档案</span>
        <img src="/static/images/archives/more-icon.png" />
      </div>-->
    </div>

    <div class="learn-item" v-for="(item, index) in learn_list" :key="index">
      <LearnItem :item="item" />
    </div>

    <div class="bottom-tool flex-align">
      <div class="tool-item flex-c" @click="GoTop">
        <div class="title">返回顶部</div>
        <img src="/static/images/my/9.png" />
      </div>
      <div class="tool-item flex-c" @click="$nav('back')">
        <div class="title">返回档案</div>
        <img src="/static/images/my/9.png" />
      </div>
    </div>
  </div>
</template>

<script>
import LearnItem from '@/components/my/family/archives/learn-item'
export default {
  data () {
    return {
      page: 1,
      learn_list: [],
      load_status: true
    }
  },
  methods: {
    GoTop () {
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
    GetOrderData () {
      if (!this.load_status) return
      let args = {
        url: this.api('getProfileOrder'),
        data: {
          page: this.page,
          limit: 20
        },
        loading: true
      }
      this.get(args).then(res => {
        if (res.status) {
          if (this.page === 1) {
            this.learn_list = []
          }
          if (res.data.items.length === 0) {
            this.load_status = false
          }
          this.learn_list = [...this.learn_list, ...res.data.items]
        }
      })
    }
  },
  mounted () {
    this.$Tool.SetRecordParameter({ content_type: 'more' })
  },
  components: {
    LearnItem
  },
  onShow () {
    this.GetOrderData()
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
    this.learn_list = []
    this.page = 1
    this.load_status = true
    this.GetOrderData()
  },
  onReachBottom () {
    this.page++
    this.GetOrderData()
  },
  onUnload () {
    this.$Tool.SetBrowseID()
  }
}
</script>

<style lang="less" scoped>
.page /deep/ .btn-list {
  padding: 0 0 30rpx;
}
// .page /deep/ .project-info {
//   margin: 20rpx 0 25rpx;
// }
.page {
  min-height: 100vh;
  padding: 24rpx 24rpx 100rpx;
  box-sizing: border-box;
  background: #f8f8f8;
}
.learn-box {
  padding: 27rpx 24rpx 0;
  background-color: #ffffff;
  border-radius: 20rpx 20rpx 0 0;
  position: relative;
  .title-img {
    width: 500rpx;
    height: 86rpx;
  }
  .right-icon {
    width: 130rpx;
    height: 90rpx;
    position: relative;
    top: -22rpx;
  }
  // .more {
  //   position: absolute;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   right: 0;
  //   font-size: 27rpx;
  //   color: #919191;
  //   img {
  //     width: 29rpx;
  //     height: 29rpx;
  //     margin-left: 6rpx;
  //   }
  // }
}

.learn-item {
  padding: 27rpx 24rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  &:first-child{
    border-radius: 0 0 20rpx 20rpx;
  }
}

.bottom-tool {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  background: #fff;
  height: 94rpx;
  padding: 0 50rpx;
  box-sizing: border-box;
  z-index: 100;
  box-shadow: -9rpx -5rpx 9rpx 1rpx rgba(121, 121, 121, 0.07);
  .tool-item {
    color: #919191;
    font-size: 27rpx;
    &:first-child {
      img {
        transform: rotateZ(-90deg);
      }
    }
    img {
      width: 29rpx;
      height: 29rpx;
      margin-left: 6rpx;
    }
  }
}
</style>

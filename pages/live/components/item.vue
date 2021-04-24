<template>
  <div class="live-item flex-c" @click="GoLive">
    <div class="left">
      <img class="cover" :src="item.share_img" mode="aspectFill" />
      <div class="date-row-wrap">
        <div class="date-row flex-c">
          <div class="text" :class="statusobj.classname">{{statusobj.text}}</div>
          <div class="date" v-if="item.live_status != 101">{{start_time}}</div>
          <div class="date" v-else>{{item.browse_num}}人观看</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">{{item.name}}</div>
      <div class="name">{{item.anchor_name}}</div>
      <subscribe :room-id="item.roomid">
      </subscribe>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {}
  },
  computed: {
    start_time () {
      return this.$Tool.FormatTime(this.item.start_time * 1000, 'YYYY-MM-DD HH:mm')
    },
    statusobj () {
      let text = ''
      let classname = ''
      switch (this.item.live_status * 1) {
        case 101:
          text = '直播中'
          classname = 'text-2'
          break
        case 102:
          text = '预告'
          classname = 'text-1'
          break
        default:
          text = '看回放'
          classname = 'text-3'
          break
      }
      return { text, classname }
    }
  },
  methods: {
    createLiveBrowseLog () {
      let args = {
        url: this.api('createLiveBrowseLog'),
        data: {
          roomid: this.item.roomid
        }
      }
      this.post(args)
    },
    GoLive () {
      this.createLiveBrowseLog()
      wx.navigateTo({ url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${this.item.roomid}` })
    }
  },
  onShow () {},
  watch: {},
  onShareAppMessage () {
    return {
      title: '',
      path: ''
    }
  }
}
</script>
<style lang="less">
.live-item {
  margin-bottom: 20rpx;
  padding: 30rpx 20rpx;
  background: #ffffff;
  position: relative;
  .left {
    width: 360rpx;
    height: 288rpx;
    position: relative;
    .cover {
      width: 360rpx;
      height: 288rpx;
      border-radius: 10rpx;
    }
    .date-row-wrap {
      position: absolute;
      top: 10rpx;
      left: 10rpx;
      .date-row {
        height: 40rpx;
        line-height: 40rpx;
        position: relative;

        .text {
          height: 40rpx;
          line-height: 40rpx;
          padding: 0 10rpx;
          white-space: nowrap;
          background-blend-mode: normal, normal;
          border-radius: 6rpx;
          font-family: SourceHanSansCN-Medium;
          font-size: 28rpx;
          color: #ffffff;
          text-align: center;
          &.text-3 {
            background-image: linear-gradient(-90deg, #7987b0 1%, #b3bcd1 100%),
              linear-gradient(#c4c4c4, #c4c4c4);
          }
          &.text-1 {
            background-image: linear-gradient(-90deg, #0a2d8f 0%, #466bd3 100%),
              linear-gradient(#0a2d8f, #0a2d8f);
          }
          &.text-2 {
            background-image: linear-gradient(-90deg, #ff2c4c 0%, #fb627a 100%),
              linear-gradient(#0a2d8f, #0a2d8f);
          }
        }
        .date {
          height: 40rpx;
          line-height: 40rpx;
          padding: 0 8rpx;
          border-radius: 0rpx 6rpx 6rpx 0rpx;
          background: rgba(0, 0, 0, 0.25);
          font-family: SourceHanSansCN-Medium;
          font-size: 26rpx;
          color: #ffffff;
          position: relative;
          left: -3rpx;
          white-space: nowrap;
        }
      }
    }
  }
  .right {
    flex: 1;
    height: 288rpx;
    padding-left: 20rpx;
    .title {
      .line-clamp-multi(3);
      margin-bottom: 30rpx;
      font-family: SourceHanSansCN-Bold;
      font-size: 30rpx;
      color: #333333;
      font-weight: bold;
      text-align: justify;
    }
    .name {
      font-family: SourceHanSansCN-Regular;
      font-size: 26rpx;
      color: #999999;
    }
  }
}
.subscribe--live-player-subscribe__btn {
  position: absolute !important;
  bottom: 30rpx !important;
  right: 30rpx !important;
  width: 170rpx !important;
  height: 68rpx !important;
  border-radius: 80rpx !important;
  font-size: 26rpx !important;
  line-height: 68rpx !important;
  background: linear-gradient(-90deg, #0a2d8f 0%, #466bd3 100%), linear-gradient(#0a2d8f, #0a2d8f) !important;
}
</style>

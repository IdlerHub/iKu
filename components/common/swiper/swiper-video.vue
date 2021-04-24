<template>
  <div class="carousel">
    <swiper
      class="swiper"
      :indicator-dots="indicatorDots"
      :indicator-color="indicatorColor"
      :indicator-active-color="indicatorActiveColor"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :style="{width: width, height: height}"
      @change="getCurrentIndex"
    >
      <div v-for="(item, index) in imgUrls" :key="index">
        <swiper-item v-if="item.video">
          <video
            :id="'myVideo-'+index"
            :src="item.video"
            :poster="item.video_poster"
            @play="onPlay"
            @click="handleC"
          ></video>
        </swiper-item>
        <swiper-item v-if="item.img">
          <img :lazy-load="true" mode="aspectFill" :src="item.img + imgProcess.w375" />
        </swiper-item>
      </div>
    </swiper>
    <div class="video-symbol" v-if="imgUrls[currentIndex].video">视频</div>
    <div class="number flex-cc">
      <span class="current">{{ currentIndex + 1 }}</span>
      <span>/{{ imgUrls.length }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '750rpx'
    },
    height: {
      type: String,
      default: '750rpx'
    },
    imgUrls: {
      type: [Array],
      default () {
        return []
      }
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      indicatorDots: false,
      indicatorColor: 'rgba(255, 255, 255, .7)',
      indicatorActiveColor: '#fefefe',
      interval: 3000,
      duration: 1000,
      currentIndex: 0,
      videoDom: {},
      imgProcess: this.$imgProcess
    }
  },
  mounted () {},
  methods: {
    handleC (e) {
      console.log('c', e)
    },
    getCurrentIndex ({ target: { current } }) {
      console.log('current', current)
      this.currentIndex = current
    },
    onPlay () {
      this.$emit('pauseDetailVideo')
      this.setVideoStatus()
    },
    setVideoStatus () {
      this.imgUrls.forEach((i, index) => {
        if (i.isVideo !== undefined && i.isVideo === true) {
          let key = `myVideo-${index}`
          if (this.videoDom && this.videoDom[key]) {
          } else {
            this.videoDom[key] = wx.createVideoContext(key)
          }

          if (this.currentIndex !== index) {
            this.videoDom[key].pause()
            console.log('停止-key：', key)
          }
        }
      })
    },
    // 暂停所有视频
    pauseAll () {
      this.imgUrls.forEach((i, index) => {
        if (i.isVideo !== undefined && i.isVideo === true) {
          let key = `myVideo-${index}`
          this.videoDom[key] = wx.createVideoContext(key)
          this.videoDom[key].pause()
          console.log('停止-key：', key)
        }
      })
    }
  },
  watch: {
    currentIndex (n) {
      this.setVideoStatus()
    }
  }
}
</script>
<style lang="less" scoped>
.carousel {
  position: relative;
  .swiper {
    img,
    video {
      width: 100%;
      height: 100%;
    }
  }
  video {
    top: 0;
    .lh(1);
    margin-top: 0;
    padding-top: 0;
    vertical-align: middle;
  }
  .video-symbol {
    position: absolute;
    bottom: 20rpx;
    right: 115rpx;
    width: 70rpx;
    height: 40rpx;
    .lh(40rpx);
    background: linear-gradient(-90deg, @theme-color 0%, #466bd3 100%),
      linear-gradient(@theme-color, @theme-color);
    font-size: 24rpx;
    .c;
    text-align: center;
    border-radius: 20rpx;
  }
  .number {
    position: absolute;
    bottom: 20rpx;
    right: 30rpx;
    .bg(#f9f9f9);
    .w(70rpx);
    .h(40rpx);
    .fz(24rpx);
    .c(#999);
    .br(20rpx);
    .current {
      .c(#333);
    }
  }
}
</style>

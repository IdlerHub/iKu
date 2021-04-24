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
      <div
        v-for="(item, index) in imgUrls"
        :key="index"
      >
        <swiper-item>
          <img :lazy-load="true" mode="aspectFill" :src="item + imgProcess.w375">
        </swiper-item>
      </div>
    </swiper>
    <div class="number flex-cc">
      <span class="current">{{ currentIndex + 1 }}</span>/{{ imgUrls.length }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    componentItem: {
      type: Object,
      default () {
        return {}
      }
    },
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
    }
  },
  data () {
    return {
      imgProcess: this.$imgProcess,
      indicatorDots: false,
      indicatorColor: 'rgba(255, 255, 255, .7)',
      indicatorActiveColor: '#fefefe',
      autoplay: true,
      interval: 3000,
      duration: 1000,
      currentIndex: 0
    }
  },
  methods: {
    getCurrentIndex (e) {
      this.currentIndex = e.target.current
    }
  }
}
</script>
<style lang="less" scoped>
.swiper {
  // width: 750rpx;
  // height: 300rpx;
  img {
    width: 100%;
    height: 100%;
  }
}
.carousel {
    position: relative;
}
.number {
    position: absolute;
    bottom: 20rpx;
    right: 30rpx;
    .bg(rgba(244,244,244,0.5));
    border-radius: 16rpx;
    font-family: SimHei;
    .w(65rpx);
    .h(32rpx);
    .fz(24rpx);
    .c(#999);
    .current {
        .c(#333);
    }
}
</style>
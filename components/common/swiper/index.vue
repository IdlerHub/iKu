<template>
  <div class="carousel">
    <swiper
      class="swiper"
      :circular="circular"
      :indicator-dots="indicatorDots"
      :indicator-color="indicatorColor"
      :indicator-active-color="indicatorActiveColor"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :style="{width: width, height: height}"
    >
      <div
        v-for="(item, index) in swiper_list"
        :key="index"
        @click="$emit('clickSwiper', item)"
      >
        <swiper-item>
          <img :lazy-load="true" mode="aspectFill" :src="item.img + imgProcess.w375">
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>
<script>
export default {
  props: {
    swiper_list: {
      type: Array
    },
    width: {
      type: String,
      default: '750rpx'
    },
    height: {
      type: String,
      default: '300rpx'
    },
    circular: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      imgProcess: this.$imgProcess,
      indicatorDots: true,
      indicatorColor: 'rgba(255, 255, 255, .7)',
      indicatorActiveColor: '#fefefe',
      autoplay: true,
      interval: 3000,
      duration: 1000
    }
  },
  methods: {}
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
</style>

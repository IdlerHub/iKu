<template>
  <img :lazy-load="true" class="banner" mode="aspectFill" :src="banner.img+imgProcess.w375" @click="clickBanner">
</template>

<script>
import { imgProcess } from '@/utils/imgProcess'
export default {
  data () {
    return {
      imgProcess
    }
  },
  props: {
    banner: {
      type: Object
    }
  },
  methods: {
    clickBanner () {
      // let list = {
      //   'goods': '/pages/mall/detail/main?product_sn=',
      //   'employee': '/pages/classroom/consult/main?id='
      // }
      // if (list[this.banner.target_type]) {
      //   uni.navigateTo({
      //     url: list[this.banner.target_type] + this.banner.target
      //   })
      // }
      let type = this.banner.target_type
      switch (type) {
        case 'goods':
          this.$nav('goodsDetail', {product_sn: this.banner.target})
          break
        case 'employee':
          this.$nav('consult', {id: this.banner.target})
          break
        case 'class':
          this.$nav('class', {id: this.banner.target})
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less">
.banner {
  width: 750rpx;
  height: 260rpx;
}
</style>

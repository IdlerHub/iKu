<template>
  <div class="goods-certification" v-if="!loading">
    <div class="content" v-if="detail.certificate">
      <wxParse :content="detail.certificate"></wxParse>
    </div>
    <MenuShare></MenuShare>
    <MenuCart></MenuCart>
  </div>
</template>

<script>
import MenuShare from '@/components/common/menu/share'
import MenuCart from '@/components/common/menu/cart'
// import wxParse from 'mpvue-wxparse'
import wxParse from '@/components/common/wxParse/wxParse'

export default {
  components: {
    MenuShare,
    MenuCart,
    wxParse
  },
  data () {
    return {
      loading: true,
      product_sn: 0, // 商品id
      detail: ''
    }
  },
  onShow () {
    this.product_sn = this.$root.$mp.query.id
    this.getGoodsDetail()
  },
  methods: {
    async getGoodsDetail () {
      let args = {
        url: this.api('getGoodsDetail'),
        data: {
          product_sn: this.product_sn
        },
        loading: this.loading
      }
      let res = await this.get(args)
      if (res.status) {
        let re = res.data

        this.detail = re
      } else {
        uni.showToast({
          title: res.msg ? res.msg : '系统繁忙,请稍候',
          icon: 'none'
        })
      }
      this.loading = false
    }
  },
  onShareAppMessage () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.goods-certification {
  .content {
    margin: 30rpx;
    .bg(#fff);
    min-height: 1000rpx;
    box-shadow: 0 12rpx 36rpx 0 
      rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
  }
}
</style>

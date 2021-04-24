<template>
  <div class="scroll-class">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="{'mr-0': index === list.length - 1}"
      class="item"
      @click="$nav('goodsDetail', { product_sn: item.product_sn })"
    >
      <img :lazy-load="true" :src="item.thumb + imgProcess.wh130" mode="aspectFit">
      <div class="product-title">{{ item.product_name }}</div>
      <div class="price">
        <span class="fz-26">￥</span>
        {{ item.product_sale_price }}
      </div>
    </div>
    <div v-if="list.length == 0" class="no-data">
      <NoData></NoData>
    </div>
  </div>
</template>
<script>
import NoData from '@/components/common/no-data/no-list'
export default {
  components: {
    NoData
  },
  data () {
    return {
      imgProcess: this.$imgProcess
    }
  },
  props: {
    list: {
      type: [Array],
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-class {
  width: 100%;
  box-sizing: border-box;
  overflow-x: scroll;
  display: flex;
  align-items: center;
  position: relative;
  -webkit-overflow-scrolling: touch;
  .item {
    position: relative;
    margin-right: 29rpx;
    flex-shrink: 0;
    width: 260rpx;
    img {
      width: 261rpx;
      height: 261rpx;
      border-radius: 10rpx;
    }
    .product-title {
      .line-clamp-multi(2);
      margin: 20rpx 0;
      font-size: 26rpx;
    }
    .price {
      color: #fb2142;
      font-size: 28rpx;
      font-weight: bold;
    }
    .fz-26 {
      font-size: 26rpx;
    }
  }
  .mr-0 {
    margin-right: 0 !important;
  }
  .no-data {
    padding: 50rpx;
  }
}
</style>

<template>
	<div class="goods-item" @click="toDetail">
		<div class="title line-clamp">{{ item.product_name }}</div>
		<div class="flex-b">
			<img :lazy-load="true" mode="aspectFill" :src="item.thumb + imgProcess.wh200">
			<div class="content">
				<div class="desc">{{ item.description }}</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      imgProcess: this.$imgProcess
    }
  },
  props: {
    item: {
      type: [Object],
      default () {
        return {}
      }
    }
  },
  methods: {
    toDetail () {
      uni.navigateTo({
        url: `/pages/mall/detail/main?product_sn=${
          this.item.product_sn
        }`
      })
    }
  }
}
</script>
<style lang="less" scoped>
.goods-item {
  box-sizing: border-box;
	margin-bottom: 20rpx;
	padding: 30rpx 20rpx;
	.h(370rpx);
	.bg(#fff);
  .br;
  .title {
    margin-bottom: 20rpx;
    font-weight: bold;
    .fz(30rpx);
    .c(#333);
    text-align: right;
  }
	img {
		flex-shrink: 0;
		.w(260rpx);
		.h(260rpx);
		.br;
	}
	.content {
    margin-left: 20rpx;
		text-align: right;
		.desc {
			.fz(26rpx);
			.c(#999);
			.line-clamp-multi(3);
		}
	}
}
</style>

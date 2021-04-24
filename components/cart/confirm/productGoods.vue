<template>
	<div class="product-item border-1px-b flex">
		<img :lazy-load="true" mode="aspectFill" :src="goods.thumb + imgProcess.wh200">
		<div class="right flex-1 flex-cb">
			<div>
				<div class="title line-clamp">{{ goods.product_name }}</div>
				<div class="guige">{{ goods.spec_name }}</div>
			</div>
			<div class="flex-bc">
				<div class="now">￥{{ goods.spec_price }}</div>
				<div class="num">x{{ goods.goods_num }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    goods: Object
  },
  data () {
    return {
      imgProcess: this.$imgProcess
    }
  }
}
</script>
<style lang="less" scoped>
.product-item {
	padding: 34rpx 0;
	img {
		flex-shrink: 0;
		margin-right: 20rpx;
		.w(200rpx);
		.h(200rpx);
		.br;
	}
	.right {
		font-size: 28rpx;
		color: #333333;
		overflow: hidden;
		.guige {
			font-size: 26rpx;
			color: #999999;
		}
		.now,
		.num {
			font-size: 30rpx;
		}
		.num {
			color: #555555;
		}
	}
}
</style>

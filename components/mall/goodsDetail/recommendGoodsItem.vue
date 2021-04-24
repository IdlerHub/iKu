<template>
	<div class="recommend-goods-item" @click="$nav('goodsDetail', {'product_sn': item.product_sn})">
		<div class="title line-clamp">{{ item.product_name }}</div>
		<div class="content flex">
			<img :lazy-load="true" mode="aspectFill" :src="item.thumb + imgProcess.wh200">
			<div class="right flex-1 flex-cb">
				<div class="desc">{{ item.description }}</div>
				<div class="price">
					<span>￥</span>
					<span class="lg">{{ item.price }}</span>
				</div>
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
    item: Object
  }
}
</script>
<style lang="less" scoped>
.recommend-goods-item {
	flex-shrink: 0;
	box-sizing: border-box;
	margin-right: 20rpx;
	padding: 30rpx 20rpx;
	.w(580rpx);
	.bg;
	.br;
	text-align: right;
	.title {
		margin-bottom: 20rpx;
		font-weight: bold;
		font-size: 30rpx;
		color: #333333;
	}
	.content {
		img {
			flex-shrink: 0;
			margin-right: 20rpx;
			.w(260rpx);
			.h(260rpx);
			.br;
		}
		.desc {
			font-size: 26rpx;
			color: #999999;
			.line-clamp-multi(3);
		}
		.price {
			.f(24);
			.c(@price-color);
			.lg {
				.f(32);
			}
		}
	}
}
</style>

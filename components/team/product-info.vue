<template>
	<div class="product-box">
		<img :lazy-load="true" :src="info.product_thumb + imgProcess.wh280" class="product-img" />
		<div class="product-info">
			<div class="name line-clamp">{{ info.product_name }}</div>
			<div class="price-number">
				<span>￥</span>
				<span class="price">{{ info.group_price }}</span>
				<span class="number">×{{ info.goods_num }}</span>
			</div>
			<div class="team-number">{{ info.group_needs }}人成团</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		info: Object
	},
	data() {
		return {
			imgProcess: this.$imgProcess
		};
	}
};
</script>

<style lang="less" scoped>

.product-box {
	margin: 20rpx 20rpx 0 20rpx;
	.h(220rpx);
	.bg(#fff);
	.br(10rpx);
	display: flex;
	.product-img {
		float: left;
		.w(163rpx);
		.h(163rpx);
		.br(10rpx);
		margin: 28rpx 21rpx 0 28rpx;
	}
	.product-info {
		flex: 1;
		padding-top: 39rpx;
		.name {
			.c(#333);
			.fz(28rpx);
			.w(468rpx);
		}
		.price-number {
			padding-right: 31rpx;
			.fz(28rpx);
			.c(#333);
			margin-top: 33rpx;
			.price {
				.fz(28rpx);
				.c(#333);
			}
			.number {
				float: right;
			}
		}
		.team-number {
			.c(#fb2142);
			.fz(23rpx);
			margin-top: 10rpx;
		}
	}
}
</style>

<template>
	<div class="current-item">
		<img :lazy-load="true" mode="aspectFill" :src="detail.img + imgProcess.wh300" />
		<div class="right">
			<div class="top">
				<div class="title line-clamp">{{ detail.product_name }}</div>
			</div>
			<div class="bottom">
				<div class="mb6">最近购入 {{ detail.order_date }}</div>
				<div>拥有数量 {{ detail.order_count }}个</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			imgProcess: this.$imgProcess
		};
	},
	props: {
		detail: {
			type: Object
		}
	}
};
</script>
<style lang="less" scoped>

.current-item {
	margin: 20rpx 30rpx;
	padding: 20rpx;
	display: flex;
	.bg;
	border-radius: 10rpx;
	img {
		margin-right: 16rpx;
		width: 220rpx;
		height: 220rpx;
	}
	.right {
		flex: 1;
		padding-bottom: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.fz(26rpx);
		.c(#666);
		.title {
			font-weight: bold;
			.fz(30rpx);
			.c(#333);
		}
	}
	.mb6 {
		margin-bottom: 6rpx;
	}
}
</style>

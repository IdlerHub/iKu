<template>
	<div class="panel orders">
		<div class="heading flex-bc" @click="$nav('orders')">
			<span class="title">我的订单</span>
			<div class="more flex-c">
				<span>查看全部</span>
				<i class="iconfont icon-right"></i>
			</div>
		</div>
		<div class="content">
			<div class="box" @click="$nav('orders', { tab_index: 1 })">
				<div class="badge" v-if="order.wait_pay > 0">{{ order.wait_pay }}</div>
				<i class="iconfont icon-pay"></i>
				<span>待付款</span>
			</div>
			<div class="box" @click="$nav('orders', { tab_index: 2 })">
				<div class="badge" v-if="order.wait_ship > 0">{{ order.wait_ship }}</div>
				<i class="iconfont icon-send"></i>
				<span>待发货</span>
			</div>
			<div class="box" @click="$nav('orders', { tab_index: 3 })">
				<div class="badge" v-if="order.wait_accept > 0">{{ order.wait_accept }}</div>
				<i class="iconfont icon-deliver"></i>
				<span>待收货</span>
			</div>
			<div class="box" @click="$nav('orders', { tab_index: 4 })">
				<div class="badge" v-if="order.finish > 0">{{ order.finish }}</div>
				<i class="iconfont icon-squarecheck"></i>
				<span>已签收</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		order: {
			type: Object,
			default: {}
		}
	}
};
</script>
<style lang="less">

.orders {
	margin-top: 20rpx;
	.bg;
	border-radius: 10rpx;
	.heading {
		padding: 30rpx;
		line-height: 1;
		border-bottom: 1rpx solid #e5e5e5;
		.title {
			font-weight: bold;
			.fz(32rpx);
			.c(#333);
		}
		.more {
			.fz(26rpx);
			.c(#999);
		}
		.iconfont {
			.fz(26rpx);
			.c(#c4c4c4);
		}
	}
	.content {
		padding-bottom: 45rpx;
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		.box {
			position: relative;
			box-sizing: border-box;
			flex-basis: 25%;
			padding: 45rpx 30rpx 0 30rpx;
			.fz(28rpx);
			.c(@font-color-second);
		}
		.iconfont {
			margin-bottom: 10rpx;
			.fz(44rpx);
			.c(#333);
		}
		.badge {
			position: absolute;
			top: 24rpx;
			right: 24rpx;
			// padding: 6rpx 10rpx;
			min-width: 30rpx;
			height: 30rpx;
			background: @price-color;
			font-size: 24rpx;
			color: #fff;
			.lh(30rpx);
			.br(50%);
		}
	}
}
</style>

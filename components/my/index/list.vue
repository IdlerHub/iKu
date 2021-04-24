<template>
	<div class="list">
		<div class="line border flex-c" @click.stop="$nav('couponMy')">
			<div class="left flex-cc"><i class="iconfont icon-ticket"></i></div>
			<div class="right flex-bc">
				<span>我的优惠券</span>
				<i class="iconfont icon-right"></i>
			</div>
		</div>
		<div class="line border flex-c" @click.stop="$nav('address')">
			<div class="left flex-cc"><i class="iconfont icon-location"></i></div>
			<div class="right flex-bc">
				<span>收货地址</span>
				<i class="iconfont icon-right"></i>
			</div>
		</div>
		<div class="line border flex-c">
			<div class="left flex-cc"><i class="iconfont icon-calendar"></i></div>
			<div class="right flex-bc" @click="$nav('stop')">
				<span>我的预约</span>
				<i class="iconfont icon-right"></i>
			</div>
		</div>
		<div class="line border flex-c" @click.stop="$nav('contact')">
			<div class="left flex-cc"><i class="iconfont icon-comment"></i></div>
			<div class="right flex-bc">
				<span>留言回复</span>
				<i class="iconfont icon-right"></i>
			</div>
		</div>
		<div class="line border flex-c" @click.stop="$nav('returnGoods')">
			<div class="left flex-cc"><i class="iconfont icon-tuihuo"></i></div>
			<div class="right flex-bc">
				<span>退换货</span>
				<i class="iconfont icon-right"></i>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>

.list {
	margin-top: 20rpx;
	.bg;
	border-radius: 10rpx;
	.line {
		height: 114rpx;
		.left {
			width: 100rpx;
			.iconfont {
				.fz(44rpx);
				.c(#333);
			}
		}
		.right {
			flex: 1;
			.fz(28rpx);
			.c(#666);
			.iconfont {
				margin-right: 30rpx;
				.fz(26rpx);
				.c(#c4c4c4);
			}
		}
	}
	.border {
		position: relative;
		overflow: hidden;
		&::before {
			content: '';
			position: absolute;
			bottom: 0;
			left: 100rpx;
			right: 0;
			width: 200%;
			height: 1rpx;
			.c(#e5e5e5);
			border-bottom: 1rpx solid #e5e5e5;
			transform-origin: 0 0;
			transform: scale(0.5);
		}
	}
}
</style>

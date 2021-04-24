<template>
	<div class="step-box">
		<div class="step step-1">
			<img src="/static/images/team/step-1.png" mode="aspectFit" />
			<div class="step-title">1.选择商品开团/参团</div>
			<span class="iconfont icon-right"></span>
		</div>
		<div class="step step-2">
			<img src="/static/images/team/step-2.png" mode="aspectFit" />
			<div class="step-title">2.邀请好友参团</div>
			<span class="iconfont icon-right"></span>
		</div>
		<div class="step step-3">
			<img src="/static/images/team/step-3.png" mode="aspectFit" />
			<div class="step-title">3.人满成团</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>

.step-box {
	margin: 20rpx 20rpx 0 20rpx;
	.w(710rpx);
	.h(170rpx);
	.bg(#ffffff);
	.br(10rpx);
	.step {
		.h(100%);
		float: left;
		text-align: center;
		position: relative;
		img {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
		.step-title {
			.fz(24rpx);
			.c(#666);
			margin-top: 105rpx;
		}
		.icon-right {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	.step-1 {
		.w(287rpx);
		img {
			.w(51rpx);
			.h(39rpx);
			top: 46rpx;
		}
	}
	.step-2 {
		.w(246rpx);
		img {
			.w(52rpx);
			.h(51rpx);
			top: 40rpx;
		}
	}
	.step-3 {
		.w(177rpx);
		img {
			.w(48rpx);
			.h(48rpx);
			top: 42rpx;
		}
	}
}
</style>

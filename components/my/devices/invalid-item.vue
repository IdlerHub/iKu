<template>
	<div class="invalid-item">
		<img :lazy-load="true" mode="aspectFill" :src="detail.img + imgProcess.wh300" />
		<div class="right">
			<div class="top">
				<div class="title line-clamp mb6">{{ detail.product_name }}</div>
				<div class="time">有效期 {{ detail.effective_year }}年</div>
			</div>
			<div class="bottom ">
				<div>
					<div class="mb6" v-if="detail.day > 0">
						<span>距过期还有</span>
						<span class="num">{{ detail.day }}</span>
						<span>天</span>
					</div>
					<div class="mb6" v-if="detail.day === 0"><span>今天过期</span></div>
					<div>更换日期 {{ detail.expire_date }}</div>
				</div>
				<button @click="toGoods">重新购入</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		detail: {
			type: Object
		}
	},
	data() {
		return {
			imgProcess: this.$imgProcess
		};
	},
	methods: {
		toGoods() {
			let url = `/pages/mall/detail/main?product_sn=${this.detail.product_sn}`;

			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>
<style lang="less" scoped>

button {
	background: linear-gradient(-90deg, #0a2d8f 0%, #466bd3 100%), linear-gradient(#0a2d8f, #0a2d8f);
	color: #fff;
	box-shadow: 0 10rpx 20rpx 0 rgba(10, 45, 143, 0.2);
	border-radius: 80rpx;
	&::after {
		border: none;
	}
}
.invalid-item {
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
		padding-bottom: 10rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.fz(26rpx);
		.c(#666);
		.bottom {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
		}
		.title {
			font-weight: bold;
			.fz(30rpx);
			.c(#333);
		}
		.num {
			margin: 0 10rpx;
			.c(#dc1c1c);
		}
		button {
			width: 140rpx;
			height: 58rpx;
			line-height: 58rpx;
			background: linear-gradient(-90deg, #0a2d8f 0%, #466bd3 100%), linear-gradient(#0a2d8f, #0a2d8f);
			.fz(26rpx);
			.c(#fff);
			box-shadow: 0 8rpx 18rpx 0 rgba(10, 45, 143, 0.2);
			border-radius: 30px;
		}
	}
	.mb6 {
		margin-bottom: 6rpx;
	}
}
</style>

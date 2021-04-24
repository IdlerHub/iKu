<template>
	<div class="team-history">
		<div class="title">参团记录</div>
		<div class="join-item" v-for="(item, index) in join_list" :key="index">
			<img :src="item.userpic" />
			<div class="name line-clamp">{{ item.nickname }}</div>
			<div class="leader" v-if="item.is_leader === 1">团长</div>
			<div class="time">{{ item.join_time }} {{ item.is_leader === 1 ? '开团' : '参团' }}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		join_list: Array
	}
};
</script>

<style lang="less" scoped>

.team-history {
	.bg(#fff);
	.br(10rpx);
	margin: 20rpx;
	padding-bottom: 40rpx;
	.title {
		.c(#333);
		.fz(30rpx);
		padding-top: 38rpx;
		text-align: center;
		font-weight: 700;
		margin-bottom: 40rpx;
	}

	.join-item {
		.h(86rpx);
		.lh(86rpx);
		padding: 0 32rpx 0 30rpx;
		margin-bottom: 40rpx;
		&:last-child {
			margin-bottom: 0;
		}
		img {
			.w(86rpx);
			.h(86rpx);
			.br(43rpx);
			float: left;
		}
		.name {
			float: left;
			max-width: 190rpx;
			.fz(28rpx);
			.c(#333);
			margin-left: 14rpx;
		}
		.leader {
			float: left;
			margin-left: 9rpx;
			.w(60rpx);
			.h(30rpx);
			.lh(30rpx);
			margin-top: 28rpx;
			text-align: center;
			.c(#fff);
			.fz(22rpx);
			.bg(#fb2142);
			.br(15rpx);
		}
		.time {
			float: right;
			.fz(24rpx);
			.c(#333);
		}
	}
}
</style>

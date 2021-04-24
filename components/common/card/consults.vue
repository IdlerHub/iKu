<template>
	<div class="consult-item flex" @click="toDetail">
		<img :lazy-load="true" mode="aspectFill" :src="item.photo_url + imgProcess.wh110" />
		<div class="content">
			<div class="mb">
				<div class="flex-bc">
					<p class="title line-clamp">{{ item.employee_name }}</p>
					<div class="flex">
						<i v-for="(star, s_index) in [1, 2, 3, 4, 5]" :key="s_index" class="iconfont icon-favorfill" :class="{ bright: star <= item.star_level }"></i>
					</div>
				</div>
				<div class="desc">简介：{{ item.title ? item.title : '-' }}</div>
			</div>
			<div class="thumbs">
				<i class="iconfont icon-dianzan1"></i>
				<div>{{ item.number }}</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		item: {
			typs: Object
		}
	},
	data() {
		return {
			imgProcess: this.$imgProcess
		};
	},
	methods: {
		toDetail(item) {
			uni.navigateTo({
				url: `/pages/classroom/consult/main?id=${this.item.employee_no}`
			});
		}
	}
};
</script>
<style lang="less" scoped>

.consult-item {
	display: flex;
	margin-bottom: 20rpx;
	padding: 34rpx 20rpx;
	.h(184rpx);
	.bg(#fff);
	.br;
	img {
		flex-shrink: 0;
		.w(110rpx);
		.h(110rpx);
		.br(50%);
	}
	.content {
		margin-left: 20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
		.iconfont {
			.fz(26rpx);
			.c(#c4c4c4);
			margin-left: 8rpx;
		}
		.bright {
			.c(#f6cb00);
		}
		.flex {
			display: flex;
		}
		.title {
			.fz(30rpx);
			font-weight: bold;
			.c(#333);
		}
		.desc {
			.fz(26rpx);
			.c(#999);
			margin-top: 25rpx;
			.line-clamp-multi;
		}
		.thumbs {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.c(#c4c4c4);
			.fz(26rpx);
			.iconfont {
				margin-right: 10rpx;
				.fz(36rpx);
			}
		}
	}
	.mb {
		margin-bottom: 10rpx;
	}
}
</style>

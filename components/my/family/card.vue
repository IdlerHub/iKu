<template>
	<div class="family-card">
		<img src="/static/images/common/bg.png" class="bg" />
		<div class="content">
			<div>
				<p class="name">{{ info.consumer_name }}</p>
				<!-- <p class="line">
                    <i v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index" class="iconfont icon-favorfill" :class="{'yellow': item <= star}"></i>
                </p>
                <p>4星客户，享免费一对一安全专员服务</p> -->
			</div>
			<img :src="info.userpic" class="avatar" />
		</div>
	</div>
</template>
<script>
export default {
	props: {
		star: {
			type: [Number, String],
			default: 5
		},
		info: {
			type: Object,
			default() {
				return {};
			}
		}
	}
};
</script>

<style lang="less" scoped>

.family-card {
	padding: 30rpx 34rpx;
	position: relative;
	.w(100%);
	.h(225rpx);
	box-sizing: border-box;
	.bg {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		z-index: -1;
		.h(225rpx);
	}
	.content {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		color: #fff;
		.name {
			font-size: 42rpx;
		}
		.avatar {
			.w(110rpx);
			.h(110rpx);
			.br(50%);
		}
		.line {
			display: flex;
			align-items: center;
			margin: 10rpx 0;
		}
		.yellow {
			color: #f6cb00;
		}
	}
}
</style>

<template>
	<div class="ticket-group">
		<div
			class="ticket-item"
			@click="show_desc = !show_desc"
			:class="{
				'show-desc': show_desc
			}"
		>
			<div
				class="ticket-btn"
				:class="{
					use: !info.btn_bg,
					none: info.btn_bg
				}"
				@click.stop="$emit('btnClick', { ...info, index })"
			>
				{{ info.btn_title }}
			</div>
			<div class="title">{{ info.coupon_name }}</div>
			<div class="desc line-clamp">
				使用说明
				<span class="iconfont icon-right"></span>
			</div>
			<div class="line"><span></span></div>
			<div class="time">有效期：{{ expire_time }}</div>
		</div>
		<div class="ticket-desc" v-if="show_desc">{{ info.condition_text }}</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			show_desc: false
		};
	},
	props: {
		info: Object,
		index: {
			type: null,
			default: 0
		}
	},
	computed: {
		expire_time() {
			let time = this.info.expire_time.split(' - ');
			time[0] = time[0].replace(/-/g, '.');
			time[1] = time[1].replace(/-/g, '.');
			return time.join(' - ');
		}
	}
};
</script>

<style lang="less" scoped>

.ticket-group {
	margin: 0 20rpx 20rpx;
}
.ticket-desc {
	.br(0 0 10rpx 10rpx);
	.bg(#fff);
	.fz(24rpx);
	.c(#999);
	padding: 57rpx 31rpx 44rpx;
	margin-top: -23rpx;
	position: relative;
	z-index: 9;
}
.ticket-item {
	.bg(#fff);
	.br(12rpx);
	.h(208rpx);
	position: relative;
	box-sizing: border-box;
	padding-top: 28rpx;
	z-index: 10;
	&.show-desc {
		box-shadow: 0.1rpx 5rpx 28.8rpx 1.2rpx rgba(0, 0, 0, 0.05);
		.desc {
			.iconfont {
				transform: rotateZ(-90deg);
			}
		}
	}
	.ticket-btn {
		width: 140rpx;
		height: 48rpx;
		border-radius: 24rpx;
		text-align: center;
		.fz(26rpx);
		.lh(48rpx);
		.c(#fff);
		position: absolute;
		top: 42rpx;
		right: 30rpx;
		&.use {
			background-image: linear-gradient(-90deg, #0a2d8f 0%, #466bd3 100%), linear-gradient(#ff2c4c, #ff2c4c);
			background-blend-mode: normal, normal;
			box-shadow: 0rpx 10rpx 20rpx 0rpx rgba(10, 45, 143, 0.2);
		}
		&.none {
			background-color: #c4c4c4;
		}
	}

	.title {
		.c(#333);
		.fz(30rpx);
		font-weight: 750;
		padding-left: 35rpx;
	}

	.desc {
		.c(#999);
		.fz(26rpx);
		margin-top: 18rpx;
		padding-left: 35rpx;
		.w(420rpx);
		.iconfont {
			transform: rotateZ(90deg);
			display: inline-block;
			font-size: 22rpx;
			margin-left: 7rpx;
		}
	}

	.time {
		.fz(#999999);
		.fz(24rpx);
		padding-left: 35rpx;
		margin-top: 6rpx;
	}

	.line {
		.h(20rpx);
		.w(100%);
		margin-top: 14rpx;
		position: relative;
		overflow: hidden;
		span {
			border-top: 2rpx dashed #e5e5e5;
			position: absolute;
			left: 22rpx;
			right: 22rpx;
			top: 12rpx;
		}
		&::after {
			.w(20rpx);
			.h(20rpx);
			content: '';
			position: absolute;
			left: -10rpx;
			top: 0;
			.br(10rpx);
			.bg(#f8f8f8);
		}
		&::before {
			.w(20rpx);
			.h(20rpx);
			content: '';
			position: absolute;
			right: -10rpx;
			top: 0;
			.br(10rpx);
			.bg(#f8f8f8);
		}
	}
}
</style>

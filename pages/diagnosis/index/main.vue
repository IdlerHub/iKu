<template>
	<div class="diagnosis">
		<img src="/static/images/common/no_data.png" />
		<div>精彩内容，敬请期待！</div>
		<MenuGroup></MenuGroup>
	</div>
</template>

<script>
import MenuGroup from '@/components/common/menu/menuGroup';

export default {
	components: {
		MenuGroup
	},
	onShareAppMessage() {
		return {};
	}
};
</script>
<style lang="less" scoped>

.diagnosis {
	padding: 300rpx 30rpx;
	text-align: center;
	.fz(28rpx);
	.c(#999);
	img {
		.w(270rpx);
		.h(245rpx);
		margin-bottom: 50rpx;
	}
}
</style>

<template>
	<div class="tab-container">
		<div class="flex-1" v-for="(tab, tab_i) in tab_list" :key="tab_i">
			<div class="tab-item flex-cbc" :class="{ active: tab_index === tab_i }" @click="clickTab(tab_i)">
				<div class="flex-1 flex-cc">{{ tab.name }}</div>
				<div class="bottom-border"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		tab_list: {
			type: Array,
			default: [
				{
					name: '产品',
					type: 1
				},
				{
					name: '顾问',
					type: 2
				}
			]
		},
		tab_index: {
			type: Number,
			default: 0
		}
	},
	methods: {
		clickTab(i) {
			this.$emit('update:tab_index', i);
			this.$emit('clickTab', i);
		}
	}
};
</script>
<style lang="less">

.tab-container {
	display: flex;
	height: 104rpx;
	.bg;
	.tab-item {
		height: 100%;
		.fz(32rpx);
		color: #666666;
		.bottom-border {
			width: 30rpx;
			height: 8rpx;
			.bg;
			.br(4rpx);
			transition: linear 300ms;
		}
	}
	.active {
		position: relative;
		font-weight: bold;
		color: #333333;
		.bottom-border {
			.bg(@theme-color);
		}
	}
}
</style>

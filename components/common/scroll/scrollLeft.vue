<template>
	<scroll-view scroll-y class="scroll-left" :style="customStyle">
		<div
			v-for="(tab, t_index) in list"
			class="tab flex-cc"
			:class="{
				'border-bottom': t_index != list.length - 1 && t_index != chosen_index && t_index != chosen_index - 1,
				'tab-active': chosen_index == t_index,
				'pd-30': tab.cate_name && tab.cate_name.length % 4 == 0
			}"
			:key="t_index"
			@click="changeTab(t_index)"
		>
			<div v-if="chosen_index == t_index" class="active-block"></div>
			<p
				:class="{
					'fz-28': tab.cate_name && tab.cate_name.length % 4 == 0,
					'fz-26': tab.cate_name && tab.cate_name.length % 4 != 0
				}"
			>
				{{ tab.cate_name }}
			</p>
		</div>
	</scroll-view>
</template>
<script>
export default {
	props: {
		height: {
			type: [Number],
			defalut: 500
		},
		list: {
			type: [Array],
			defalut() {
				return [];
			}
		},
		chosen_index: {
			type: Number,
			default: 0
		},
		customStyle: {
			default: ''
		}
	},
	methods: {
		changeTab(index) {
			// this.chosen_index = index
			this.$emit('changeTab', index);
		}
	}
};
</script>
<style lang="less" scoped>

.scroll-left {
	.w(130rpx);
	.bg(#fff);
	.fz-28 {
		.fz(28rpx);
	}
	.fz-26 {
		.fz(26rpx);
	}
	.pd-30 {
		padding: 30rpx !important;
	}
	.tab {
		.c(#999);
		min-height: 100rpx;
		padding: 30rpx 25rpx;
		position: relative;
		p {
			text-align: center;
		}
	}
	.tab-active {
		.bg(#eff3ff);
		.fz(30rpx);
		font-weight: bold;
		.c(@theme-color);
	}
	.active-block {
		.w(8rpx);
		.h(30rpx);
		.bg(@theme-color);
		position: absolute;
		left: 0;
		top: 40%;
		border-radius: 4rpx;
	}
	.border-bottom {
		border-bottom: 1px solid #e5e5e5;
	}
}
</style>

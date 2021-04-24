<template>
	<scroll-view class="scroll-left" scroll-y :scroll-into-view="'left' + left_index" scroll-with-animation="true" :style="'height:' + windowHeight + 'px;'">
		<div
			v-for="(tab, t_index) in list"
			class="tab flex-cc"
			:class="{
				'border-bottom': t_index != list.length - 1 && t_index != left_index && t_index != left_index - 1,
				'tab-active': left_index == t_index,
				'pd-30': tab.cate_name.length % 4 == 0
			}"
			:id="'left' + t_index"
			:key="t_index"
			@click="changeTab(t_index)"
		>
			<div v-if="left_index == t_index" class="active-block"></div>
			<p :class="{ 'fz-28': tab.cate_name.length % 4 == 0, 'fz-26': tab.cate_name.length % 4 != 0 }">{{ tab.cate_name }}</p>
		</div>
	</scroll-view>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

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
		leftToRight: {
			type: Array,
			default: []
		}
	},
	computed: {
		...mapState('Scroll', ['left_index'])
	},
	data() {
		return {
			windowHeight: 300,
			space: 195
		};
	},
	mounted() {
		let systemInfo = uni.getSystemInfoSync();
		let windowHeight = systemInfo.windowHeight;
		this.windowHeight = windowHeight - this.space;
		console.log('windowHeight', this.windowHeight);
	},
	methods: {
		...mapMutations('Scroll', ['setLeftIndex', 'setRightIndex']),
		changeTab(index) {
			console.log('changeTab', this.left_index);

			if (this.left_index !== index) {
				// 这里先设置 left_index，是为了造成“点击左栏，从而右栏滚动”的效果
				// 而不是等到右栏滚动后，才改变left_index，这样的效果就是“右栏滚动，从而改变左栏”
				this.setLeftIndex(index);

				let right = this.leftToRight[index];
				this.setRightIndex(right); // 会引发scroll，从而改变left_index
			}
		}
	}
};
</script>
<style lang="less" scoped>

.scroll-left {
	.w(130rpx);
	.h(600rpx);
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

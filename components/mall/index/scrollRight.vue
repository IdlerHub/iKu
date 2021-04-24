<template>
	<scroll-view class="scroll-right" scroll-y :scroll-into-view="'right' + right_index" scroll-with-animation="true" @scroll="scroll">
		<template v-if="loadSuccess">
			<div v-for="(item, index) in list" class="item" :id="'right' + index" :key="index" @click="toDetail(item.product_sn)">
				<div class="title line-clamp">{{ item.product_name }}</div>
				<div class="content">
					<img :src="item.thumb + imgProcess.wh130" mode="aspectFill" lazy-load="true" v-if="item.thumb" />
					<img src="/static/images/common/default.png" mode="aspectFill" v-else />
					<div class="right flex-1">
						<div class="desc">{{ item.description }}</div>
					</div>
				</div>
			</div>
			<template v-if="list.length == 0">
				<NoList></NoList>
			</template>
		</template>
	</scroll-view>
</template>
<script>
import NoList from '@/components/common/no-data/no-list';
import { mapState, mapMutations } from 'vuex';

export default {
	data() {
		return {
			imgProcess: this.$imgProcess
		};
	},
	components: {
		NoList
	},
	props: {
		list: {
			type: [Array],
			default() {
				return [];
			}
		},
		height: {
			type: [Number],
			default: 400
		},
		loadSuccess: {
			type: [Boolean],
			default: false
		},
		rightToLeft: {
			type: Array,
			default: []
		}
	},
	computed: {
		...mapState('Scroll', ['right_index'])
	},
	methods: {
		...mapMutations('Scroll', ['setLeftIndex', 'setRightIndex']),
		toDetail(sn) {
			uni.navigateTo({
				url: `/pages/mall/detail/main?product_sn=${sn}`
			});
		},
		scroll(e) {
			// 1个：185+210 = 195 这里要用px 滚动的单位是px
			let top = e.detail.scrollTop;
			let i = Math.floor(top / 195);
			let left = this.rightToLeft[i];

			// 这里之所以设为空，是不让scroll-into-view保持有值的情况
			// scroll-into-view 有值的话，当滚动到改变left_index的时候，会触发重新滚到 scroll-into-view 的情况
			// 这个是为什么触发呢？
			this.setRightIndex('');
			this.setLeftIndex(left);
		}
	}
};
</script>
<style lang="less" scoped>

.scroll-right {
	box-sizing: border-box;
	padding: 20rpx;
	.w(620rpx);
	.item {
		margin-bottom: 10px;
		box-sizing: border-box;
		padding: 15px 10px;
		.bg(#fff);
		.w(580rpx);
		.h(185px);
		.br;
		.title {
			margin-bottom: 10px;
			font-weight: bold;
			.fz(30rpx);
			.c(#333);
			.lh;
			text-align: right;
		}
		.content {
			display: flex;
			img {
				flex-shrink: 0;
				margin-right: 20rpx;
				.w(130px);
				.h(130px);
			}
		}
		.right {
			overflow: hidden;
			.desc {
				.fz(26rpx);
				.c(#999);
				text-align: right;
				.line-clamp-multi(3);
			}
		}
	}
}
</style>

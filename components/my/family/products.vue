<template>
	<div class="products">
		<div v-for="(item, index) in list" :key="index" class="item" :class="{ 'bd-b': index !== list.length - 1, 'pb-0': index === list.length - 1 }">
			<img :src="item.thumb + imgProcess.wh300" mode="aspectFill" :lazy-load="true" @click="$nav('goodsDetail', { product_sn: item.product_sn })" />
			<div class="item-right">
				<div>
					<p class="main">{{ item.product_name }}</p>
					<p class="c-theme" @click="nav(item.jump_class_id)">
						<i class="iconfont icon-video"></i>
						安装使用视频
					</p>
				</div>
				<div class="item-bottom">
					<template v-if="item.day >= 0">
						<div class="line">
							拥有数量
							<p>x{{ item.order_count }}</p>
						</div>
						<div class="line">
							有效期
							<p>
								<span style="color: #fb2142">{{ item.effective_year }}</span>
								年
							</p>
						</div>
						<div class="line">
							距过期
							<p>
								<span style="color: #fb2142">{{ item.f_day }}</span>
							</p>
						</div>
						<div class="line">
							更换日期
							<p>{{ item.expire_date }}</p>
						</div>
					</template>
					<template v-else>
						<p style="color: #fb2142">已过期，请及时更换</p>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			imgProcess: this.$imgProcess
		};
	},
	methods: {
		nav(id) {
			parseInt(id) && this.$nav('classDetail', { id: id });
		}
	}
};
</script>
<style lang="less" scoped>

.products {
	.w(100%);
	.item {
		display: flex;
		padding: 30rpx 0;
		img {
			.w(220rpx);
			.h(220rpx);
			.br(10rpx);
			margin-right: 16rpx;
		}
		.item-right {
			align-self: stretch;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			flex: 1;
			.main {
				font-weight: bold;
				.line-clamp-multi(1);
				font-size: 30rpx;
			}
			.c-theme {
				color: @theme-color;
				display: flex;
				.iconfont {
					font-size: 34rpx;
					margin-right: 9rpx;
					color: @theme-color;
				}
			}
			.item-bottom {
				color: #999;
				font-size: 26rpx;
				.line {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
	.bd-b {
		border-bottom: 1px solid #e5e5e5;
	}
	.pb-0 {
		padding-bottom: 0;
	}
}
</style>

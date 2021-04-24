<template>
	<div class="package-item">
		<div class="title line-clamp">{{ item.package_name }}</div>
		<div class="content" v-for="(el, el_i) in item.goods_items" :key="el_i">
			<div class="line flex">
				<img :lazy-load="true" mode="aspectFill" :src="el.thumb + imgProcess.wh200" />
				<div class="right flex-1 flex-cb">
					<div>
						<div class="name line-clamp">{{ el.product_name }}</div>
						<div class="guige">{{ el.spec }}</div>
					</div>
					<template v-if="type === 4">
						<div class="flex-bc" style="transform: translateY(30rpx);">
							<span class="money">￥{{ el.sale_price }}</span>
							<span class="num">×{{ el.order_count }}</span>
						</div>
						<div class="flex-bc">
							<span class="money old">￥{{ el.original_price }}</span>
						</div>
					</template>
					<template v-else>
						<div class="flex-bc">
							<span class="money">￥{{ el.sale_price }}</span>
							<span class="num">×{{ el.order_count }}</span>
						</div>
					</template>
				</div>
			</div>
			<div class="flex-e" v-if="(status == 4 || status == 6) && el.is_apply == 0">
				<Btn name="申请退换" size="M" type="infoB" @clickBtn="$nav('orderApply', { order_sn: order_sn, record_id: el.id })"></Btn>
			</div>
		</div>
	</div>
</template>

<script>
import Btn from '@/components/common/button/button';

export default {
	data() {
		return {
			imgProcess: this.$imgProcess
		};
	},
	components: { Btn },
	props: {
		item: Object,
		status: {
			type: [Number, String],
			default: 1
		},
		order_sn: String,
		type: null
	}
};
</script>
<style lang="less" scoped>

.package-item {
	.bg;
	.title {
		margin: 30rpx 0;
		font-size: 28rpx;
		color: #333333;
		.lh;
	}
	.content {
		margin-bottom: 30rpx;
		.flex-e {
			margin-top: 10rpx;
		}
	}
	img {
		flex-shrink: 0;
		margin-right: 20rpx;
		width: 200rpx;
		height: 200rpx;
		.br;
	}
	.right {
		overflow: hidden;
		.name {
			font-size: 28rpx;
			color: #333333;
		}
		.guige {
			font-size: 26rpx;
			color: #999999;
		}
		.money {
			font-size: 30rpx;
			color: #333333;
			&.old {
				.c(#999);
				.fz(26rpx);
				text-decoration: line-through;
			}
		}
		.num {
			font-size: 30rpx;
			color: #999999;
		}
	}
}
</style>

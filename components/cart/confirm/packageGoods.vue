<template>
	<div class="package-item">
		<div class="title line-clamp">{{ item.product_name }}</div>
		<div class="desc">套餐标准数量为{{ item.goods_num }}，已选{{ item.select_goods_num }}</div>
		<div class="grid border-1px-b flex" v-for="(goods, goods_i) in item.items" :key="goods_i">
			<img :lazy-load="true" mode="aspectFill" :src="goods.thumb + imgProcess.wh200">
			<div class="right flex-1 flex-cb">
				<div>
					<div class="name line-clamp">{{ goods.product_name }}</div>
					<div class="guige line-clamp">{{ goods.spec_name }}</div>
				</div>
				<div class="flex-bc">
					<div>
						<div class="now">￥{{ goods.discount_price }}</div>
						<div class="old">￥{{ goods.spec_price }}</div>
					</div>
					<div class="num">x{{ goods.goods_num }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      imgProcess: this.$imgProcess
    }
  }
}
</script>
<style lang="less" scoped>
.package-item {
	padding-top: 25rpx;
	font-size: 28rpx;
	color: #333333;
	.desc,
	.guige,
	.old {
		font-size: 26rpx;
		color: #999999;
	}
	.grid {
		padding: 34rpx 0;
		img {
			flex-shrink: 0;
			margin-right: 20rpx;
			.w(200rpx);
			.h(200rpx);
			.br;
		}
		.right {
			overflow: hidden;
			.now,
			.num {
				font-size: 30rpx;
			}
			.old {
				text-decoration: line-through;
			}
			.num {
				color: #555555;
			}
		}
	}
}
</style>

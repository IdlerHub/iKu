<template>
	<div class="product-goods flex" @click="$nav('goodsDetail', {product_sn: item.product_sn})">
		<img :lazy-load="true" mode="aspectFill" :src="item.thumb + imgProcess.wh200">
		<div class="right flex-1 flex-cb">
			<div>
				<div class="name line-clamp">{{ item.product_name }}</div>
				<div class="guige">{{ item.spec }}</div>
			</div>
			<div class="flex-bc">
				<span class="money">￥{{ item.sale_price }}</span>
				<span class="num">×{{ item.goods_num }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import Btn from '@/components/common/button/button'

export default {
  components: { Btn },
  props: {
    item: Object,
    status: {
      type: [Number, String],
      default: 1
    },
    order_sn: String
  },
  data () {
    return {
      imgProcess: this.$imgProcess
    }
  }
}
</script>
<style lang="less" scoped>
.product-goods {
	margin: 30rpx 0;
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
		}
		.num {
			font-size: 30rpx;
			color: #999999;
		}
	}
}
</style>

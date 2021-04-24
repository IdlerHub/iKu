<template>
	<div class="product-item flex-c">
		<div class="icon-box flex-c" @click="$emit('selectItem', index, item)">
			<i class="iconfont icon-roundcheckfill" v-if="checked"></i>
			<i class="iconfont icon-round" v-else></i>
		</div>
		<img :lazy-load="true" mode="aspectFill" :src="detail.thumb + imgProcess.wh200" @click="$nav('goodsDetail', { product_sn: detail.product_sn })" />
		<div class="right flex-1 flex-cb" @click="$nav('goodsDetail', { product_sn: detail.product_sn })">
			<div>
				<div class="title line-clamp">{{ detail.product_name }}</div>
				<div class="type">{{ detail.spec_name }}</div>
			</div>
			<div class="flex-bc">
				<span>￥{{ detail.spec_price }}</span>
				<Stepper :stepper_value.sync="detail.goods_num" :limit="detail.limit" :max="detail.max" @updateNum="changeCartNum"></Stepper>
			</div>
		</div>
	</div>
</template>

<script>
import Stepper from '@/components/common/stepper/square-car';

export default {
	components: {
		Stepper
	},
	props: {
		checked: Boolean,
		item: Object,
		index: Number
	},
	data() {
		return {
			imgProcess: this.$imgProcess
		};
	},
	computed: {
		detail: function() {
			return this.item.items[0];
		}
	},
	// onShow () {
	//   this.detail = this.item.items[0]
	// },
	methods: {
		async changeCartNum() {
			if (parseInt(this.detail.is_show) === 1) {
				let args = {
					url: this.api('changeCartNum'),
					data: {
						cart_id: this.detail.id,
						goods_num: this.detail.goods_num
					}
				};
				let res = await this.post(args);

				if (res.status) {
					if (this.item.checked) {
						this.$emit('calCart');
					}
				} else {
					this.$toast(res.msg);
				}
			}
			setTimeout(() => {
				this.getCartList();
			}, 300);
		},
		// 获取购物车，设置tabbar角标
		async getCartList() {
			let openId = uni.getStorageSync('loginUserinfo') ? uni.getStorageSync('loginUserinfo').openId : '';
			let args = {
				url: this.api('getMyCartNum'),
				loading: false,
				open_id: openId
			};
			let res = await this.get(args);
			if (res.status && res.data && parseInt(res.data.shop_cart_goods_num) > 0) {
				let qq = res.data.shop_cart_goods_num.toString();
				console.log('qq', qq);
				// 购物车角标
				wx.setTabBarBadge({
					index: 3,
					text: qq
				});
			} else {
				wx.removeTabBarBadge({
					index: 3
				});
			}
		}
	}
};
</script>
<style lang="less" scoped>

.product-item {
	margin-bottom: 20rpx;
	padding: 30rpx 20rpx;
	box-sizing: border-box;
	.bg;
	.br;
	.icon-box {
		margin-right: 20rpx;
		align-self: stretch;
		.iconfont {
			.f(44);
		}
	}
	img {
		margin-right: 20rpx;
		.w(200rpx);
		.h(200rpx);
		.br;
	}
	.right {
		align-self: stretch;
		font-size: 30rpx;
		color: #333333;
		overflow: hidden;
		.title {
			font-size: 28rpx;
		}
		.type {
			font-size: 26rpx;
			color: #999999;
		}
	}
}
</style>

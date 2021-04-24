<template>
	<div class="package-item flex-c">
		<div class="icon-box flex-c" @click="$emit('selectItem', index, item)">
			<i class="iconfont icon-roundcheckfill" v-if="checked"></i>
			<i class="iconfont icon-round" v-else></i>
		</div>
		<div class="right flex-1" @click="$nav('goodsDetail', { product_sn: item.product_sn })">
			<div class="title line-clamp">{{ item.product_name }}</div>
			<div class="num">套餐标准数量为{{ item.goods_num }}，已选{{ item.select_num }}</div>

			<block v-for="(goods, goods_i) in item.items" :key="goods_i">
				<div class="item flex-bc">
					<div class="item-left"><img :lazy-load="true" class="cover" :src="goods.thumb + imgProcess.wh200" /></div>
					<div class="item-right flex-cb">
						<div class="item-r-top">
							<div class="name">{{ goods.product_name }}</div>
							<div class="attr">{{ goods.spec_name }}</div>
						</div>
						<div class="item-r-bottom flex-bc">
							<div class="item-price">
								<div class="now">￥{{ goods.discount_price }}</div>
								<div class="old">￥{{ goods.spec_price }}</div>
							</div>
							<div class="stepper-wrap">
								<Stepper
									:stepper_value.sync="goods.goods_num"
									min="0"
									:max="item.max"
									:limit="item.limit"
									:isMin="isMin"
									@updateNum="changeCartNum(goods)"
								></Stepper>
							</div>
						</div>
					</div>
				</div>
			</block>

			<!-- <div class="line" v-for="(goods, goods_i) in item.items" :key="goods_i">
        <div class="line-wrap flex-bc">
          <img :src="goods.thumb" />
          <div class="info">
            <div>
              <div class="name line-clamp">{{ goods.product_name }}</div>
              <div class="guige line-clamp">{{ goods.spec_name }}</div>
            </div>
            <div class="bottom-row flex-bc">
              <div class="left">
                <div class="now">￥{{ goods.discount_price }}</div>
                <div class="old">￥{{ goods.spec_price }}</div>
              </div>
              <div class="right">
                <Stepper
                  :stepper_value.sync="goods.goods_num"
                  min="0"
                  :max="item.max"
                  :limit="item.limit"
                  :isMin="isMin"
                  @updateNum="changeCartNum(goods)"
                ></Stepper>
              </div>
            </div>
          </div>
        </div>
      </div>-->
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
		isMin: function() {
			if (Number(this.item.goods_num) >= this.item.select_num) {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		getSelectNum() {
			let num = 0;
			this.item.items.forEach(el => {
				num += el.goods_num * 1;
			});
			this.item.select_num = num;
		},
		async changeCartNum(goods) {
			console.log(goods);
			if (parseInt(goods.is_show) === 1) {
				this.getSelectNum();

				let args = {
					url: this.api('changeCartNum'),
					data: {
						cart_id: goods.id,
						goods_num: goods.goods_num
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
			console.log(this.item.select_num);

			setTimeout(() => {
				this.getCartList();
			}, 300);
		},
		// 获取购物车，设置tabbar角标
		async getCartList2() {
			let openId = uni.getStorageSync('loginUserinfo') ? uni.getStorageSync('loginUserinfo').openId : '';
			let args = {
				url: this.api('getMyCartNum'),
				loading: false,
				open_id: openId
			};
			let res = await this.get(args);
			if (res.status && res.data && parseInt(res.data.shop_cart_goods_num) > 0) {
				// 购物车角标
				wx.setTabBarBadge({
					index: 3,
					text: res.data.shop_cart_goods_num.toString()
				});
			} else {
				wx.removeTabBarBadge({
					index: 3
				});
			}
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

.package-item {
	margin-bottom: 20rpx;
	padding: 0 20rpx;
	font-size: 28rpx;
	color: #333333;
	.bg;
	.br;
	.icon-box {
		margin-right: 20rpx;
		align-self: stretch;
		.iconfont {
			.f(44);
		}
	}
	.iconfont {
		.f(44);
	}
	img {
		margin-right: 20rpx;
		.w(200rpx);
		.h(200rpx);
		.br;
	}
	.right {
		padding-top: 30rpx;
		font-size: 28rpx;
		color: #333333;
		.num {
			margin-top: 10rpx;
			font-size: 26rpx;
			color: #999999;
		}
	}

	.item {
		padding: 30rpx 0;
		.item-left {
			.cover {
				margin-right: 20rpx;
				.w(200rpx);
				.h(200rpx);
				.br;
			}
		}
		.item-right {
			flex: 1;
			height: 200rpx;
			.item-r-top {
				.name {
					.line-clamp-multi(1);
					width: 100%;
					font-size: 30rpx;
					color: #333333;
				}
				.attr {
					.line-clamp-multi(1);
					width: 100%;
					font-size: 26rpx;
					color: #999999;
				}
			}
			.item-r-bottom {
				.item-price {
					.now {
						color: #333333;
						font-size: 30rpx;
					}
					.old {
						font-size: 26rpx;
						color: #999999;
						text-decoration: line-through;
					}
				}
			}
		}
	}
}
</style>

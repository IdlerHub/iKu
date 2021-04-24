<template>
	<div class="order-detail" v-if="!loading">
		<div class="status-panel">
			<img mode="aspectFill" src="/static/images/common/my_bg.png" />
			<p>{{ detail.order_status_name }}</p>
		</div>
		<div class="address-panel">
			<div class="mb">
				<span class="name">{{ address.receiver_name }}</span>
				<span class="phone">{{ address.mobile }}</span>
			</div>
			<div class="address flex">
				<div class="default" v-if="address.is_default_address == 1">默认</div>
				<div class="content">{{ address.address_content }}</div>
			</div>
		</div>
		<div class="list">
			<div class="list-item" v-for="(item, index) in goods_list" :key="index">
				<template v-if="item.type == 1">
					<div v-for="(goods, goods_i) in item.goods_items" :key="goods_i">
						<ProductGoods :item="goods" :status="detail.order_status" :order_sn="order_sn"></ProductGoods>
					</div>
				</template>
				<template v-if="item.type == 2">
					<PackageGoods :item="item" :status="detail.order_status" :order_sn="order_sn"></PackageGoods>
				</template>
			</div>
		</div>
		<div class="panel">
			<div class="flex">
				<div class="left">订单编号</div>
				<div class="right">{{ order_sn }}</div>
			</div>
			<div class="flex">
				<div class="left">购买时间</div>
				<div class="right">{{ detail.format_time }}</div>
			</div>
			<div class="flex">
				<div class="left">支付方式</div>
				<div class="right">{{ detail.pay_type == 1 ? '线上支付' : '货到付款' }}</div>
			</div>
			<div class="flex" v-if="detail.shipping_name">
				<div class="left">快递公司</div>
				<div class="right">{{ detail.shipping_name }}</div>
			</div>
			<div class="flex" v-if="detail.shipping_sn">
				<div class="left">快递单号</div>
				<div class="right">{{ detail.shipping_sn }}</div>
			</div>
		</div>
		<div class="panel" v-if="detail.order_status == 3">
			<div class="flex">
				<div class="left">自动收货</div>
				<div class="right price" style="font-weight: normal;">{{ countdown.day }}天{{ countdown.hour }}时{{ countdown.min }}分</div>
			</div>
		</div>
		<div class="panel" v-if="detail.bill_type > 0">
			<div class="flex">
				<div class="left">发票抬头</div>
				<div class="right">{{ detail.bill_title }}</div>
			</div>
			<div class="flex" v-if="detail.bill_type == 2">
				<div class="left">信用代码</div>
				<div class="right">{{ detail.bill_code }}</div>
			</div>
		</div>
		<div class="panel">
			<div class="flex">
				<div class="left">商品总额</div>
				<div class="right">{{ detail.total_goods_price }} 元</div>
			</div>
			<div class="flex" v-if="detail.pay_type != 1">
				<div class="left">已支付</div>
				<div class="right price">{{ detail.pay_money }} 元</div>
			</div>
		</div>
		<div class="group-btn" v-if="detail.type == 4 && detail.group_order_status <= 2 && detail.order_status > 1 && detail.order_status < 5" @click="LookGroup">查看分享</div>

		<div class="bottom-tips-wrap">
			<div class="bottom-tips">
				{{ leveltext }}{{ detail.integration ? detail.integration.shopping_integration : 0 }}倍返勋章，本单返{{
					detail.integration ? detail.integration.issue_integration : 0
				}}勋章
			</div>
			<div class="tips-btn-row">
				<div class="tips-btn" @click="$nav('archives')">管理消防产品</div>
				<div class="tips-btn-2" @click="$nav('mall')">勋章抵现金购物</div>
				<div class="tips-btn" @click="$nav('home')">返回首页</div>

				<!-- <div class="bottom-tips bottom-tips-btn" @click="$nav('archives')">管理消防产品</div>
        <div class="bottom-tips bottom-tips-btn" @click="$nav('userCenter')">勋章抵现金购物</div>
        <div class="bottom-tips bottom-tips-btn" @click="$nav('home')">返回首页</div>-->
			</div>
		</div>

		<div class="bottom-fixed-h"></div>
		<div class="bottom-fixed flex-c" v-if="detail.order_status == 1">
			<Btn name="再来一单" size="L" type="infoB" @clickBtn="CheckGroup"></Btn>
			<div class="ml"></div>
			<Btn name="取消订单" size="L" type="infoB" @clickBtn="onEvent('cancel', order_sn)"></Btn>
			<template v-if="detail.pay_type == 1">
				<div class="ml"></div>
				<Btn name="去支付" size="L" @clickBtn="onEvent('pay', order_sn)"></Btn>
			</template>
		</div>
		<div class="bottom-fixed flex-c" v-if="detail.order_status == 3">
			<Btn name="查看物流" size="L" type="infoB" @clickBtn="$nav('orderShip', { order_sn: order_sn })"></Btn>
			<div class="ml"></div>
			<Btn name="确认收货" size="L" @clickBtn="onEvent('receive', order_sn)"></Btn>
		</div>
		<div class="bottom-fixed flex-c" v-if="detail.order_status == 4"><Btn name="删除订单" size="L" type="infoB" @clickBtn="onEvent('del', order_sn)"></Btn></div>
	</div>
</template>

<script>
import Btn from '@/components/common/button/button';
import ProductGoods from '@/components/order/list/productGoods';
import PackageGoods from '@/components/order/list/packageGoods';
import FormatMixin from '@/assets/mixins/format';
import CountdownMixin from '@/assets/mixins/countdown';
import OrderMixin from '@/assets/mixins/order';

export default {
	mixins: [FormatMixin, CountdownMixin, OrderMixin],
	components: {
		Btn,
		ProductGoods,
		PackageGoods
	},
	data() {
		return {
			loading: true,
			list: ['全部', '待付款', '待发货', '待收货', '已签收', '已取消'],
			order_sn: '',
			address: '',
			goods_list: '',
			detail: ''
		};
	},
	onLoad() {
		Object.assign(this, this.$options.data());
	},
	onShow() {
		this.order_sn = this.$root.$mp.query.order_sn;
		this.getOrderDetail();
	},
	methods: {
		CheckGroup() {
			if (Number(this.detail.type) === 4) {
				if (Number(this.detail.goods_list[0].type) === 1) {
					this.productJump(this.detail);
				} else {
					this.packageJump(this.detail);
				}
			} else {
				this.onEvent('re', this.order_sn);
			}
		},
		async productJump(info) {
			let args = {
				url: this.api('groupConfirmOrder'),
				data: {
					goods_id: info.goods_list[0].goods_items[0].goods_id,
					coupon_instance_id: '',
					group_head_order_sn: ''
				},
				loading: true
			};
			let res = await this.get(args);
			if (res.status) {
				const re = res.data;
				const q = {
					goods_id: info.goods_list[0].goods_items[0].goods_id,
					goods_num: 1,
					spec_id: '',
					address: JSON.stringify(re.address),
					goods_list: JSON.stringify(re.goods_list || []),
					total_price: re.total_price,
					is_group: 1,
					coupon_list: JSON.stringify(re.coupon.coupon_instances || []),
					group_head_order_sn: '',
					is_coupon: re.group_detail.is_coupon
				};
				this.$nav('productConfirm', q);
			} else {
				this.$toast(res.msg);
			}
		},
		packageJump(info) {
			wx.setStorage({
				key: 'package_ids',
				data: []
			});
			this.$nav('packageConfirm', {
				goods_id: info.goods_list[0].package_id,
				is_group: 1,
				group_head_order_sn: ''
			});
		},
		LookGroup() {
			console.log(this.detail);
			const productType = Number(this.detail.goods_list[0].type) === 1 ? 0 : 1;
			this.$nav('team', {
				order_sn: this.detail.order_sn,
				group_head_order_sn: this.detail.group_head_order_sn,
				product_type: productType
			});
		},
		refresh() {
			clearTimeout(this.countdownTimer);
			this.getOrderDetail();
		},
		async getOrderDetail() {
			let args = {
				url: this.api('getOrderDetail'),
				data: {
					order_sn: this.order_sn
				},
				loading: this.loading
			};
			let res = await this.get(args);
			if (res.status) {
				let re = res.data;
				this.address = re.address;
				this.goods_list = re.goods_list;
				this.detail = re;
				this.detail.format_time = this.formatTime(this.detail.add_time);

				if (Number(re.order_status) === 3) {
					this.countDown(re.receive_count_down);
				}
			} else {
				this.$toast(res.msg);
			}
			this.loading = false;
		}
	},
	computed: {
		leveltext() {
			let text = '会员';

			// 用户当前的身份 user会员 archives 党员  propaganda 义务宣传员
			switch (this.detail.user_identity) {
				case 'user':
					text = '会员';
					break;
				case 'archives':
					text = '档员';
					break;
				case 'propaganda':
					text = '义务宣传员';
					break;
			}

			return text;
		}
	}
};
</script>
<style lang="less" scoped>

.group-btn {
	margin: 140rpx 24rpx 0;
	.h(80rpx);
	.lh(80rpx);
	.br(40rpx);
	text-align: center;
	.c(#fff);
	.fz(32rpx);
	background-image: linear-gradient(-90deg, #0a2d8f 0%, #466bd3 100%), linear-gradient(#ff2c4c, #ff2c4c);
	background-blend-mode: normal, normal;
	box-shadow: 0rpx 8rpx 18rpx 0rpx rgba(10, 45, 143, 0.2);
}
.order-detail {
	padding-bottom: 100rpx;
	.status-panel {
		position: relative;
		height: 225rpx;
		font-size: 46rpx;
		.c;
		.lh(140rpx);
		text-align: center;
		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}
	}
	.address-panel {
		margin: -86rpx 24rpx 0 24rpx;
		padding: 30rpx 20rpx;
		.bg;
		.f(32);
		.br;
		z-index: 10;
		.mb {
			margin-bottom: 20rpx;
			.lh(1);
		}
		.name {
			margin-right: 30rpx;
			color: #000000;
		}
		.phone {
			color: #333333;
		}
		.placeholder {
			font-size: 28rpx;
			color: #999999;
		}
		.address {
			justify-content: flex-start;
			font-size: 28rpx;
			color: #333333;
			.default {
				flex-shrink: 0;
				margin-top: 6rpx;
				margin-right: 10rpx;
				width: 70rpx;
				height: 30rpx;
				line-height: 30rpx;
				background: @theme-color;
				font-size: 22rpx;
				color: #ffffff;
				text-align: center;
				.br(15rpx);
			}
		}
	}
	.list {
		margin: 20rpx 24rpx;
		.bg;
		.list-item {
			padding: 1rpx 30rpx;
		}
	}
	.panel {
		margin: 20rpx 24rpx;
		padding: 30rpx 20rpx 1rpx 20rpx;
		.bg;
		font-size: 28rpx;
		color: #333333;
		.br;
		.flex {
			margin-bottom: 20rpx;
		}
		.left {
			flex-shrink: 0;
			width: 150rpx;
			font-size: 28rpx;
			color: #999999;
		}
	}
	.bottom-fixed,
	.bottom-fixed-h {
		height: 100rpx;
	}
	.bottom-fixed {
		padding: 0 20rpx;
		justify-content: flex-end;
		.bg;
		.ml {
			.w(20rpx);
		}
	}
}

.bottom-tips-wrap {
	padding: 50rpx 20rpx 0;
	.bottom-tips {
		height: 60rpx;
		line-height: 60rpx;
		margin-bottom: 30rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		background-color: #e8eeff;
		border-radius: 10rpx;
		text-align: center;
		font-family: SourceHanSansCN-Regular;
		font-size: 28rpx;
		color: #0a2d8f;
	}
	.tips-btn {
		min-width: 224rpx;
		// margin: 0 20rpx;
		padding: 0 16rpx;
		height: 80rpx;
		line-height: 80rpx;
		box-sizing: border-box;
		border-radius: 80rpx;
		border: solid 1rpx #0a2d8f;
		font-family: SourceHanSansCN-Regular;
		font-size: 28rpx;
		color: #0a2d8f;
		text-align: center;
	}
	.tips-btn-2 {
		.tips-btn;
		background-image: linear-gradient(-90deg, #0a2d8f 0%, #466bd3 100%), linear-gradient(#f8f8f8, #f8f8f8);
		background-blend-mode: normal, normal;
		box-shadow: 0rpx 8rpx 18rpx 0rpx rgba(10, 45, 143, 0.2);
		color: #ffffff;
	}

	.tips-btn-row {
		display: flex;
		justify-content: space-between;
	}
}
</style>

<template>
	<div class="order-list">
		<div class="top-fixed"><Tab :tab_list="tab_list" :tab_index.sync="tab_index" @clickTab="clickTab"></Tab></div>
		<template v-if="list && list.length > 0">
			<div class="list">
				<div class="list-item" v-for="(item, index) in list" :key="index" @click="$nav('orderDetail', { order_sn: item.order_sn })">
					<div class="flex-bc">
						<span>订单号: {{ item.order_sn }}</span>
						<span class="status">{{ item.order_status_name }}</span>
					</div>
					<div v-for="(goods, goods_i) in item.items" :key="goods_i">
						<template v-if="goods.type == 1">
							<div v-for="(el, el_i) in goods.goods_items" :key="el_i">
								<ProductGoods :item="el" :type="item.type" :status="item.order_status" :order_sn="item.order_sn"></ProductGoods>
							</div>
						</template>
						<template v-if="goods.type == 2">
							<PackageGoods :item="goods" :type="item.type" :status="item.order_status" :order_sn="item.order_sn"></PackageGoods>
						</template>
					</div>
					<div class="ft">
						<div class="buy-date">
							<div class="group-icon" v-if="item.type == 4">拼团订单</div>
							购买时间: {{ item.format_time }}
						</div>
						<div class="countdown" v-if="item.order_status == 3">
							待收货倒计时 {{ item.countdown.day }}天{{ item.countdown.hour }}时{{ item.countdown.min }}分{{ item.countdown.sec }}
						</div>
						<div class="flex-ec">
							<div class="mr">共{{ item.order_goods_num }}件商品</div>
							<div>合计:</div>
							<div class="money mr">￥{{ item.total_goods_price }}</div>
							<div>({{ item.pay_type == 1 ? '线上支付' : '货到付款' }})</div>
						</div>
						<!-- 待收款 -->
						<div class="btn-box" v-if="item.order_status == 1">
							<Btn name="再来一单" size="M" type="infoB" @clickBtn="checkGroup(item)"></Btn>
							<div class="ml"></div>
							<Btn name="取消订单" size="M" type="infoB" @clickBtn="onEvent('cancel', item.order_sn)"></Btn>
							<template v-if="item.pay_type == 1">
								<div class="ml"></div>
								<Btn name="去支付" size="M" @clickBtn="onEvent('pay', item.order_sn)"></Btn>
							</template>
						</div>
						<!-- 待收货 -->
						<div class="btn-box" v-if="item.order_status == 3">
							<Btn name="查看物流" size="M" type="infoB" @clickBtn="$nav('orderShip', { order_sn: item.order_sn })"></Btn>
							<div class="ml"></div>
							<Btn name="确认收货" size="M" @clickBtn="onEvent('receive', item.order_sn)"></Btn>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<NoData></NoData>
		</template>
	</div>
</template>

<script>
import Btn from '@/components/common/button/button';
import Tab from '@/components/common/tab/tab';
import ProductGoods from '@/components/order/list/productGoods';
import PackageGoods from '@/components/order/list/packageGoods';
import NoData from '@/components/common/no-data/no-search';
import FormatMixin from '@/assets/mixins/format';
import OrderMixin from '@/assets/mixins/order';

export default {
	mixins: [FormatMixin, OrderMixin],
	components: {
		Btn,
		Tab,
		ProductGoods,
		PackageGoods,
		NoData
	},
	data() {
		return {
			init: true,
			tab_list: [
				{
					name: '全部',
					type: 0,
					list: [],
					page: 1,
					limit: 10,
					total_pages: 1
				},
				{
					name: '待付款',
					type: 1,
					list: [],
					page: 1,
					limit: 10,
					total_pages: 1
				},
				{
					name: '待发货',
					type: 2,
					list: [],
					page: 1,
					limit: 10,
					total_pages: 1
				},
				{
					name: '待收货',
					type: 3,
					list: [],
					page: 1,
					limit: 10,
					total_pages: 1
				},
				{
					name: '已签收',
					type: 4,
					list: [],
					page: 1,
					limit: 10,
					total_pages: 1
				}
			],
			tab_index: 0
		};
	},
	computed: {
		list: function() {
			let arr = this.tab_list[this.tab_index].list;
			return arr;
		}
	},
	mounted() {
		this.getQuery();
		this.getOrderList();
	},
	onShow() {
		if (!this.init) {
			this.getOrderList();
		}
	},
	methods: {
		checkGroup(info) {
			console.log(info);
			if (Number(info.type) === 4) {
				if (Number(info.items[0].type) === 1) {
					this.productJump(info);
				} else {
					this.packageJump(info);
				}
			} else {
				this.onEvent('re', info.order_sn);
			}
		},
		async productJump(info) {
			let args = {
				url: this.api('groupConfirmOrder'),
				data: {
					goods_id: info.items[0].goods_items[0].goods_id,
					coupon_instance_id: '',
					group_head_order_sn: ''
				},
				loading: true
			};
			let res = await this.get(args);
			if (res.status) {
				const re = res.data;
				const q = {
					goods_id: info.items[0].goods_items[0].goods_id,
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
				goods_id: info.items[0].package_id,
				is_group: 1,
				group_head_order_sn: ''
			});
		},
		getQuery() {
			let i = Number(this.$root.$mp.query.tab_index);
			if (i) {
				this.tab_index = i;
			}
		},
		clickTab() {
			this.tab_list[this.tab_index].list = [];
			if (!this.list || this.list.length === 0) {
				this.getOrderList();
			}
		},
		refresh() {
			let target = this.tab_list[this.tab_index];
			target.page = 1;
			target.list = [];
			this.getOrderList();
		},
		async getOrderList() {
			let target = this.tab_list[this.tab_index];
			let args = {
				url: this.api('getOrderList'),
				data: {
					type: target.type,
					page: target.page,
					limit: target.limit
				},
				loading: !target.list || target.list.length === 0
			};
			let res = await this.get(args);
			if (res.status) {
				let re = res.data;

				let arr = [];
				if (re.order_list) {
					re.order_list.forEach((item, index) => {
						item.format_time = this.formatTime(item.add_time);
						item.order_status = Number(item.order_status);
						item.type = Number(item.type);

						if (item.order_status * 1 === 3) {
							let obj = {
								end: item.receive_count_down,
								index: index
							};
							arr.push(obj);
							item.countdown = '';
							item.countdownTimer = 0;
						}
					});
					if (target.page > 1) {
						target.list = target.list.concat(re.order_list);
					} else {
						target.list = re.order_list;
					}
				}
				target.total_pages = re.total_pages;

				if (arr.length > 0) {
					arr.forEach(item => {
						this.countDown(item.end, this.tab_index, item.index);
					});
				}
			} else {
				this.$toast(res.msg);
			}
			this.init = false;
		},
		countDown(end, tab, index) {
			let newTime = new Date().getTime();
			let endTime = new Date(end * 1000).getTime();
			let target = this.tab_list[tab].list[index];
			// 未结束
			if (endTime - newTime > 0) {
				let time = (endTime - newTime) / 1000;
				let day = parseInt(time / (3600 * 24));
				let hour = parseInt((time % (3600 * 24)) / 3600);
				let min = parseInt(((time % (3600 * 24)) % 3600) / 60);
				let sec = parseInt(((time % (3600 * 24)) % 3600) % 60);

				target.countdown = {
					is_end: false,
					day: this.timeFormat(day),
					hour: this.timeFormat(hour),
					min: this.timeFormat(min),
					sec: this.timeFormat(sec)
				};
			} else {
				// 已结束
				target.countdown = {
					is_end: true,
					day: '00',
					hour: '00',
					min: '00',
					sec: '00'
				};
			}
			clearTimeout(target.countdownTimer);

			target.countdownTimer = setTimeout(() => {
				this.countDown(end, tab, index);
			}, 1000);
			// console.log(target, target.countdown, target.countdownTimer)
		},
		timeFormat(time) {
			return time < 10 ? '0' + time : time;
		}
	},
	onPullDownRefresh() {
		uni.hideNavigationBarLoading(); // 完成停止加载
		uni.stopPullDownRefresh(); // 停止下拉刷新

		this.refresh();
	},
	onReachBottom() {
		let target = this.tab_list[this.tab_index];
		if (target.page < target.total_pages) {
			target.page++;
			this.getOrderList();
		}
	}
};
</script>
<style lang="less" scoped>

.order-list {
	padding-top: 104rpx;
	.list {
		padding: 20rpx 24rpx;
	}
	.list-item {
		margin-bottom: 20rpx;
		padding: 30rpx 20rpx;
		.bg;
		font-size: 26rpx;
		color: #666666;
		position: relative;
		.status {
			.c(@theme-color);
		}
		.ft {
			font-size: 26rpx;
			color: #333333;
			text-align: right;
			.buy-date {
				margin-top: 20rpx;
				// margin-bottom: 10rpx;
				font-size: 28rpx;
				color: #999999;
				position: relative;
				.group-icon {
					position: absolute;
					top: 0;
					left: 10rpx;
					width: 117rpx;
					height: 35rpx;
					line-height: 35rpx;
					background-image: linear-gradient(-90deg, #e51423 0%, #ff4866 100%), linear-gradient(#388bff, #388bff);
					background-blend-mode: normal, normal;
					box-shadow: 0rpx 4rpx 14rpx 0rpx rgba(255, 44, 76, 0.2);
					border-radius: 17.5rpx;
					.c(#fff);
					.fz(20rpx);
					text-align: center;
				}
			}
			.countdown {
				font-size: 28rpx;
				.c(@theme-color);
			}
			.money {
				margin: 0 4rpx;
				font-weight: bold;
				font-size: 34rpx;
				color: #333333;
			}
			.btn-box {
				margin-top: 30rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.ml {
					.w(20rpx);
					.h(20rpx);
				}
			}
			.mr {
				margin-right: 10rpx;
			}
		}
	}
}
</style>

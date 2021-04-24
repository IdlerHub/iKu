<template>
	<div class="return-order">
		<div class="top-fixed"><Tab :tab_list="tab_list" :tab_index.sync="tab_index" @clickTab="clickTab"></Tab></div>
		<template v-if="list && list.length > 0">
			<div class="list">
				<div class="list-item" v-for="(item, index) in list" :key="index">
					<div class="flex-bc">
						<span>订单号: {{ item.order_sn }}</span>
						<span class="status">{{ tab_list[item.status - 1].name }}</span>
					</div>
					<template v-if="item.goods.type == 1">
						<ProductGoods :item="item.goods"></ProductGoods>
					</template>
					<template v-if="item.goods.type == 2">
						<PackageGoods :item="item.goods" :status="item.order_status" :order_sn="item.order_sn"></PackageGoods>
					</template>
					<div class="ft">
						<div class="buy-date">购买时间: {{ item.format_time }}</div>
						<div class="flex-ec">
							<div class="mr">共{{ item.goods.goods_num }}件商品</div>
							<div>合计:</div>
							<div class="money">￥{{ item.total_price }}</div>
						</div>
						<div class="btn-box" v-if="item.status == 1"><Btn name="取消申请" size="M" type="infoB" @clickBtn="onEvent('cancel', item.id)"></Btn></div>
						<div class="btn-box" v-if="item.status == 2"><Btn name="重新申请" size="M" type="infoB" @clickBtn="onEvent('re', item.id)"></Btn></div>
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
import Tab from '@/components/common/tab/tab';
import Btn from '@/components/common/button/button';
import ProductGoods from '@/components/my/return/productGoods';
import PackageGoods from '@/components/my/return/packageGoods';
import NoData from '@/components/common/no-data/no-search';
import FormatMixin from '@/assets/mixins/format';
import ReturnMixin from '@/assets/mixins/return';

export default {
	mixins: [FormatMixin, ReturnMixin],
	components: {
		Btn,
		Tab,
		ProductGoods,
		PackageGoods,
		NoData
	},
	data() {
		return {
			tab_list: [
				{
					name: '处理中',
					type: 1,
					list: [],
					limit: 10,
					page: 1,
					total_pages: 1
				},
				{
					name: '拒绝退换',
					type: 2,
					list: [],
					limit: 10,
					page: 1,
					total_pages: 1
				},
				{
					name: '退换成功',
					type: 3,
					list: [],
					limit: 10,
					page: 1,
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
		this.getReturnOrderList();
	},
	methods: {
		clickTab() {
			if (!this.list || this.list.length === 0) {
				this.getReturnOrderList();
			}
		},
		refresh() {
			let target = this.tab_list[this.tab_index];
			target.page = 1;
			target.list = [];
			this.getReturnOrderList();
		},
		async getReturnOrderList() {
			let target = this.tab_list[this.tab_index];
			let args = {
				url: this.api('getReturnOrderList'),
				data: {
					type: target.type,
					limit: target.limit,
					page: target.page
				},
				loading: !target.list || target.list.length === 0
			};
			let res = await this.get(args);
			if (res.status) {
				let re = res.data;

				if (re.items) {
					re.items.forEach((item, index) => {
						item.format_time = this.formatTime(item.add_time);
						item.status = Number(item.status);
					});
					if (target.page > 1) {
						target.list = target.list.concat(re.items);
					} else {
						target.list = re.items;
					}
				}
				target.total_pages = re.total_pages;
			} else {
				this.$toast(res.msg);
			}
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
			this.getReturnOrderList();
		}
	}
};
</script>
<style lang="less" scoped>

.return-order {
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
		.status {
			.c(@theme-color);
		}
		.ft {
			font-size: 26rpx;
			color: #333333;
			text-align: right;
			.buy-date {
				margin-top: 20rpx;
				font-size: 28rpx;
				color: #999999;
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
			}
			.mr {
				margin-right: 10rpx;
			}
		}
	}
}
</style>

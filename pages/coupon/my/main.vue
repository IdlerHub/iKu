<template>
	<div class="coupon-list" v-if="page_show">
		<div class="top-fixed"><Tab :tab_list="tab_list" :tab_index.sync="tab_index" @clickTab="clickTab"></Tab></div>
		<!-- <div style="padding-top: 20rpx;"><couponTicket v-for="(item, index) in deal_list" :info="item" :key="index" @btnClick="btnClick"></couponTicket></div> -->
		<div class="no-data flex-ccc" v-if="coupon_list.length == 0">
			<img src="/static/images/common/no_result.png" />
			<div class="desc">暂无该类别的优惠卷</div>
		</div>
	</div>
</template>

<script>
// import couponTicket from '@/components/coupon/couponTicket';
import Tab from '@/components/common/tab/tab';
export default {
	data() {
		return {
			tab_list: [
				{
					name: '未使用'
				},
				{
					name: '已使用'
				},
				{
					name: '已过期'
				}
			],
			page_show: false,
			tab_index: 0,
			page: 1,
			coupon_list: []
		};
	},
	methods: {
		clickTab() {
			this.page = 1;
			this.getMyCoupon();
		},
		btnClick(info) {
			if (Number(info.coupon_instance_status) === 0) {
				this.$nav('mall');
			}
		},
		getMyCoupon(loadmore = false) {
			this.get({
				url: this.api('myCoupon'),
				data: {
					coupon_instance_status: this.tab_index,
					page: this.page
				},
				loading: true
			}).then(res => {
				this.page_show = true;
				if (res.code === 200) {
					const list = res.data.lists || [];
					if (loadmore) {
						this.coupon_list = [...this.coupon_list, ...list];
					} else {
						this.coupon_list = list;
					}
				} else {
					this.$toast(res.msg);
				}
			});
		}
	},
	computed: {
		deal_list() {
			return this.coupon_list.map(item => {
				let text;
				let btnBg;
				switch (Number(item.coupon_instance_status)) {
					case 0:
						text = '去使用';
						btnBg = 0;
						break;
					case 1:
						text = '已使用';
						btnBg = 1;
						break;
					case 2:
						text = '不可使用';
						btnBg = 2;
						break;
				}
				return {
					...item,
					btn_title: text,
					btn_bg: btnBg
				};
			});
		}
	},
	components: {
		Tab,
		// couponTicket
	},
	onShow() {
		this.getMyCoupon();
	},
	onPullDownRefresh() {
		this.page = 1;
		this.getMyCoupon();
	}
};
</script>

<style lang="less" scoped>

.coupon-list {
	padding-top: 104rpx;
	-webkit-overflow-scrolling: touch;
}
.no-data {
	position: fixed;
	top: 104rpx;
	bottom: 0;
	.w(750rpx);
	img {
		.w(200rpx);
		.h(166rpx);
	}
	.desc {
		.fz(32rpx);
		.c(#999);
		margin-top: 30rpx;
	}
}
</style>

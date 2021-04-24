<template>
	<div v-if="page_show" class="coupon-page">
		<!-- <couponTicket v-for="(item, index) in deal_list" :info="item" :index="index" :key="index" @btnClick="btnClick"></couponTicket> -->
		<div class="no-data flex-ccc" v-if="list.length == 0">
			<img src="/static/images/common/no_result.png" />
			<div class="desc">暂无可领取的优惠卷</div>
		</div>
	</div>
</template>

<script>
// import couponTicket from '@/components/coupon/couponTicket';
export default {
	data() {
		return {
			list: [],
			page_show: false,
			page: 1
		};
	},
	methods: {
		getCoupon(loadmore = false) {
			this.get({
				url: this.api('getCouponCenter'),
				data: {
					page: this.page
				}
			}).then(res => {
				if (loadmore) {
					this.list = [...this.list, ...res.data.lists];
				} else {
					this.list = res.data.lists || [];
				}
				this.page_show = true;
				wx.stopPullDownRefresh();
			});
		},
		btnClick(info) {
			if (!Number(info.is_get)) {
				const couponId = info.coupon_id;

				this.post({
					url: this.api('receiveCoupon'),
					data: {
						coupon_id: couponId
					}
				}).then(res => {
					if (res.code === 200) {
						this.$toast('领取成功', 'success');
						this.list[info.index].is_get = 1;
					} else {
						this.$toast(res.msg);
					}
				});
			} else {
				this.$nav('mall');
			}
		}
	},
	computed: {
		deal_list() {
			return this.list.map(item => ({
				...item,
				btn_title: Number(item.is_get) ? '去使用' : '领取',
				btn_bg: 0
			}));
		}
	},
	components: {
		// couponTicket
	},
	onShow() {
		this.getCoupon();
	},
	onPullDownRefresh() {
		this.page = 1;
		this.getCoupon();
	},
	onReachBottom() {
		this.page++;
		this.getCoupon(true);
	}
};
</script>

<style lang="less" scoped>

.coupon-page {
	padding-top: 20rpx;
}
.no-data {
	.w(100vw);
	.h(100vh);
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

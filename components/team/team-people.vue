<template>
	<div class="team-people">
		<!-- 剩余时间 -->
		<div class="number-time" v-if="group_status === 1">
			差
			<span class="people-number">{{ last_people_number }}</span>
			人成团，还剩
			<span class="time">
				<span class="time-item">{{ RemainTime.h }}</span>
				<span class="maohao">:</span>
				<span class="time-item">{{ RemainTime.m }}</span>
				<span class="maohao">:</span>
				<span class="time-item">{{ RemainTime.s }}</span>
			</span>
			结束
		</div>

		<!-- 拼团成功 -->
		<div class="pin-success" v-if="group_status === 2">恭喜！拼团成功</div>

		<!-- 参团人员 -->
		<div class="team-member">
			<div class="head-img-item" v-for="(item, index) in join_list" :key="index">
				<div class="captain-label" v-if="item.is_leader === 1">团长</div>
				<img :src="item.userpic" class="head-img" />
			</div>
			<div class="head-img-item quest-item" v-for="item in last_people_number" :key="item" v-if="group_status === 1">?</div>
		</div>

		<!-- 按钮 -->
		<div class="btn-list flex-cc">
			<template v-if="group_status === 1">
				<teamBtn title="邀请好友拼团" size="lg" openType="share" color="red" v-if="!is_join" />
				<teamBtn title="一键参团" size="lg" color="red" v-if="is_join" @clickBtn="$emit('joinGroup')" />
			</template>
			<template v-else-if="group_status == 2">
				<teamBtn title="查看订单" size="sm" type="yellow" @clickBtn="GoToDetail" />
				<teamBtn title="再来一单" size="sm" type="red" @clickBtn="AgainOrder" />
			</template>
		</div>
	</div>
</template>

<script>
import teamBtn from '@/components/team/team-btn';
export default {
	methods: {
		GoToDetail() {
			this.$nav('orderDetail', { order_sn: this.order_sn });
		},
		AgainOrder() {
			let productType = this.$root.$mp.query.product_type;
			// 0-单品，1-套餐
			if (!Number(productType)) {
				// 单品情况下先请求再跳转
				this.productJump();
			} else {
				// 如果是套餐则直接跳
				this.packageJump();
			}
		},
		async productJump() {
			let args = {
				url: this.api('groupConfirmOrder'),
				data: {
					goods_id: this.product_info.goods_id,
					coupon_instance_id: '',
					group_head_order_sn: ''
				},
				loading: true
			};
			let res = await this.get(args);
			if (res.status) {
				const re = res.data;
				const q = {
					goods_id: this.product_info.goods_id,
					goods_num: 1,
					spec_id: '',
					address: JSON.stringify(re.address),
					goods_list: JSON.stringify(re.goods_list || []),
					total_price: re.total_price,
					is_group: 1,
					coupon_list: JSON.stringify(re.coupon.coupon_instance || []),
					group_head_order_sn: '',
					is_coupon: Number(re.group_detail.is_coupon)
				};
				this.$nav('productConfirm', q);
			} else {
				this.$toast(res.msg);
			}
		},
		packageJump() {
			wx.setStorage({
				key: 'package_ids',
				data: []
			});
			this.$nav('packageConfirm', {
				goods_id: this.product_info.goods_id,
				is_group: 1,
				group_head_order_sn: ''
			});
		}
	},
	components: {
		teamBtn
	},
	props: {
		join_list: Array,
		group_status: Boolean,
		remain_time: Number,
		is_join: null,
		order_sn: null,
		product_info: null,
		last_people_number: null
	},
	computed: {
		RemainTime() {
			const time = this.remain_time;
			var h = Math.floor(time / 3600) < 10 ? '0' + Math.floor(time / 3600) : Math.floor(time / 3600);
			var m = Math.floor((time / 60) % 60) < 10 ? '0' + Math.floor((time / 60) % 60) : Math.floor((time / 60) % 60);
			var s = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
			return { h, m, s };
		}
	}
};
</script>

<style lang="less" scoped>

.team-people {
	margin: 20rpx 20rpx 0 20rpx;
	.br(10rpx);
	.bg(#fff);
	box-sizing: border-box;
	padding-top: 34rpx;
	padding-bottom: 34rpx;

	.number-time {
		.h(40rpx);
		.lh(40rpx);
		.fz(26rpx);
		text-align: center;
		.people-number {
			.c(#fb2142);
			font-family: MicrosoftYaHei-Bold;
			font-weight: normal;
		}
		.time {
			margin: 0 14rpx;
		}
		.maohao {
			margin: 0 10rpx;
		}
		.time-item {
			.w(40rpx);
			.h(40rpx);
			.lh(40rpx);
			text-align: center;
			.c(#fff);
			.bg(#fb2142);
			display: inline-block;
			.fz(26rpx);
			.br(4rpx);
		}
	}

	.pin-success {
		.c(#fb2142);
		.fz(30rpx);
		text-align: center;
		font-weight: bold;
	}

	.team-member {
		margin-top: 52rpx;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 50rpx;
		.head-img-item {
			.w(100rpx);
			.h(100rpx);
			position: relative;
			margin: 0 30rpx;
			margin-bottom: 30rpx;
			.captain-label {
				.w(58rpx);
				.h(58rpx);
				.lh(50rpx);
				.br(29rpx);
				.bg(#ff2c4c);
				.c(#fff);
				.fz(20rpx);
				box-sizing: border-box;
				border: 4rpx solid #ffffff;
				position: absolute;
				top: -26rpx;
				left: 59rpx;
				text-align: center;
			}
			.head-img {
				.w(100rpx);
				.h(100rpx);
				.br(50rpx);
				box-sizing: border-box;
				float: left;
				border: 4rpx solid #fb2142;
			}
		}

		.quest-item {
			.w(100rpx);
			.h(100rpx);
			.lh(100rpx);
			.c(#fb2142);
			.fz(46rpx);
			.br(50rpx);
			position: relative;
			border: 2rpx dashed #fb2142;
			text-align: center;
		}
	}

	.btn-list {
		padding: 25rpx 30rpx 0;
	}
}
</style>

<template>
	<div class="apply-return">
		<div class="goods">
			<div class="heading">购买时间: {{ buy_time }}</div>
			<div class="flex">
				<img mode="aspectFill" :src="goods.thumb + imgProcess.wh200" />
				<div class="right flex-1 flex-cb">
					<div>
						<div class="title line-clamp">{{ goods.product_name }}</div>
						<div class="guige">{{ goods.spec }}</div>
					</div>
					<div class="flex-bc">
						<div class="now">￥{{ goods.sale_price }}</div>
						<div class="num">x{{ goods.goods_num }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="radio-panel">
			<div class="title">申请类型</div>
			<div class="flex">
				<div class="left flex-c" @click="type = 1">
					<i class="iconfont icon-radiobox" v-if="type == 1"></i>
					<i class="iconfont icon-round" v-else></i>
					<span>退货退款</span>
				</div>
				<div class="flex-c" @click="type = 2">
					<i class="iconfont icon-radiobox" v-if="type == 2"></i>
					<i class="iconfont icon-round" v-else></i>
					<span>换货</span>
				</div>
			</div>
		</div>
		<div class="picker flex-bc" @click="reason_popup_show = !reason_popup_show">
			<div>退款原因</div>
			<div class="right flex-1">
				<span v-if="reason">{{ reason }}</span>
				<span class="placeholder" v-else>请选择退款原因</span>
			</div>
			<i class="iconfont icon-right"></i>
		</div>
		<div class="desc">
			<div class="hd border-1px-b">原因描述</div>
			<div class="bd">
				<textarea v-if="!reason_popup_show" v-model="reason_desc" placeholder="请输入退换原因"></textarea>
				<p v-else :class="{ 'c-333': reason_desc, 'c-999': !reason_desc }">{{ reason_desc || '请输入退换原因' }}</p>
			</div>
		</div>
		<div class="contact">
			<button class="flex-cc" open-type="contact">
				<i class="iconfont icon-servicefill"></i>
				<span>联系客服</span>
			</button>
		</div>
		<div class="bottom-fixed"><Btn name="提交" @clickBtn="applyRetun"></Btn></div>
		<!-- 退款原因 -->
		<ReasonPopup :show.sync="reason_popup_show" :list="reason_list" @updateReason="updateReason"></ReasonPopup>
	</div>
</template>

<script>
import Btn from '@/components/common/button/button';
import ReasonPopup from '@/components/order/apply/reasonPopup';

export default {
	components: { Btn, ReasonPopup },
	data() {
		return {
			imgProcess: this.$imgProcess,
			order_sn: '',
			record_id: 0,
			type: 1,
			goods: '',
			buy_time: '',
			reason_list: ['缺件少件', '不想要了', '商品降价', '发错货', '质量问题', '商品与页面描述不符'],
			reason_popup_show: false,
			reason: '', // 选择原因
			reason_desc: '' // 原因描述
		};
	},
	onLoad() {
		Object.assign(this, this.$options.data());
	},
	mounted() {
		this.order_sn = this.$root.$mp.query.order_sn;
		this.record_id = this.$root.$mp.query.record_id;
		this.confirmReturn();
	},
	methods: {
		updateReason(val) {
			this.reason = val;
		},
		async confirmReturn() {
			let args = {
				url: this.api('confirmReturn'),
				data: {
					order_sn: this.order_sn,
					record_id: this.record_id
				},
				loading: true
			};
			let res = await this.post(args);

			if (res.status) {
				let re = res.data;
				this.goods = re.goods_list;
				this.buy_time = re.add_time;
			} else {
				this.$toast(res.msg);
			}
		},
		async applyRetun() {
			let args = {
				url: this.api('applyRetun'),
				data: {
					order_sn: this.order_sn,
					record_id: this.record_id,
					reason_type: this.reason,
					reason: this.reason_desc,
					type: this.type
				},
				loading: true,
				title: '提交中'
			};
			let res = await this.post(args);

			if (res.status) {
				this.$toast('提交成功', 'success');

				setTimeout(() => {
					this.$nav('back');
				}, 1500);
			} else {
				this.$toast(res.msg);
			}
		}
	}
};
</script>
<style lang="less" scoped>

.apply-return {
	padding: 20rpx 24rpx 120rpx 24rpx;
	.goods,
	.radio-panel,
	.picker,
	.desc,
	.contact {
		margin-bottom: 20rpx;
	}
	.goods {
		padding: 30rpx 20rpx;
		.bg;
		.heading {
			margin-bottom: 30rpx;
			.lh;
			font-size: 28rpx;
			color: #999999;
		}
		img {
			flex-shrink: 0;
			margin-right: 20rpx;
			.w(200rpx);
			.h(200rpx);
			.br;
		}
		.right {
			font-size: 28rpx;
			color: #333333;
			overflow: hidden;
			.guige {
				font-size: 26rpx;
				color: #999999;
			}
			.now,
			.num {
				font-size: 30rpx;
			}
			.num {
				color: #555555;
			}
		}
	}
	.radio-panel {
		padding: 30rpx 20rpx;
		.bg;
		font-size: 30rpx;
		color: #333333;
		.br;
		.title {
			margin-bottom: 20rpx;
		}
		.iconfont {
			margin-right: 20rpx;
			.f(40);
		}
		.icon-radiobox {
			.c(@theme-color);
		}
		.left {
			margin-right: 100rpx;
		}
	}
	.picker {
		padding: 0 30rpx;
		height: 100rpx;
		.lh;
		.bg;
		font-size: 30rpx;
		color: #333333;
		.br;
		.right {
			text-align: right;
		}
		.placeholder {
			color: #999;
		}
		.iconfont {
			margin-left: 20rpx;
		}
	}
	.desc {
		padding: 0 20rpx;
		.bg;
		font-size: 30rpx;
		.br;
		color: #333333;
		.hd {
			line-height: 100rpx;
		}
		.bd {
			box-sizing: border-box;
			padding: 30rpx 0;
			height: 240rpx;
			textarea {
				width: 100%;
				height: 100%;
			}
			.c-333 {
				color: #333;
			}
			.c-999 {
				color: #999;
			}
		}
	}
	.contact {
		button {
			height: 100rpx;
			.bg;
			font-size: 30rpx;
			color: #333333;
			.br;
		}
		.iconfont {
			margin-right: 20rpx;
			.f(40);
		}
	}
	.bottom-fixed {
		padding: 20rpx 24rpx;
		.bg;
	}
}
</style>

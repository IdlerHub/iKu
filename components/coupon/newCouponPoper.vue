<template>
	<div class="coupon-box top-fixed" v-if="show">
		<div class="coupon-content">
			<div class="bg-img"><image @load="imgloadEvent" src="https://karuike.oss-cn-shenzhen.aliyuncs.com/d/file/module_upload_images/2020/03/5e745b965bac9.png" /></div>
			<!-- 关闭 -->
			<block v-if="isLoadImg">
				<!-- 优惠卷列表 -->
				<scroll-view scroll-y class="coupon-list">
					<div class="counpon-item" v-for="(item, index) in deal_list" :key="index">
						<div class="red-round"></div>
						<div class="left-money">
							<div class="counpon-cut-money">
								<template v-if="item.coupon_type === 0">
									<span class="rmb-icon">￥</span>
									<span class="rmb-number">{{ item.coupon_money }}</span>
								</template>
								<template v-else>
									<span class="rmb-number discount">{{ item.coupon_discount }}</span>
									<span class="rmb-icon discount">折</span>
								</template>
							</div>
							<div class="counpon-more-money line-clamp">{{ item.coupon_name }}</div>
						</div>
						<div class="right-content">
							<div class="title line-clamp">{{ item.condition_text }}</div>
							<div class="time">{{ item.expire_time }}</div>
						</div>
						<div class="coupon">
							<img @click="btnClick(item)" v-if="item.is_get == 0" src="/static/images/coupon/get.png" alt="" />
							<img @click="btnClick(item)" v-if="item.is_get == 1" src="/static/images/coupon/use.png" alt="" />
						</div>
					</div>
				</scroll-view>
				<!-- 底部按钮 -->
				<div class="bottom-btn"><img src="/static/images/coupon/bottom.png" class="round" /></div>
			</block>
			<span class="iconfont icon-close close-btn" @click="$emit('update:show', false)"></span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isLoadImg: false,
			isRequest: false
		};
	},
	methods: {
		btnClick(info) {
			// this.$emit('receive', {})
			console.log('btnClick', this.isRequest);
			if (!Number(info.is_get)) {
				if (this.isRequest) return;
				this.isRequest = true;
				setTimeout(() => {
					this.isRequest = false;
				}, 2000);
				wx.showLoading({
					title: '领取中...', // 提示的内容,
					mask: true, // 显示透明蒙层，防止触摸穿透,
					success: res => {}
				});
				const couponId = info.coupon_id;
				this.post({
					url: this.api('receiveCoupon'),
					data: {
						coupon_id: couponId
					}
				}).then(res => {
					this.isRequest = false;
					wx.hideLoading();
					if (res.code === 200) {
						this.$toast('领取成功', 'success');
					} else {
						this.$toast(res.msg);
					}
					console.log("this.$emit('receive', {})");
					this.$emit('receive', {});
				});
			} else {
				this.$nav('mall');
			}
		},
		imgloadEvent(e) {
			console.log('imgloadEvent', e);
			this.isLoadImg = true;
		},
		GoToGet() {
			this.$emit('update:show', false);
			this.$nav('couponReceive');
		}
	},
	props: {
		show: Boolean,
		list: Array
	},
	computed: {
		deal_list() {
			return this.list.map(item => {
				let time = item.expire_time.split(' - ');
				time[0] = time[0].replace(/-/g, '.');
				time[1] = time[1].replace(/-/g, '.');
				return {
					...item,
					coupon_type: Number(item.coupon_type),
					expire_time: time.join(' - ')
				};
			});
		}
	}
};
</script>

<style lang="less" scoped>

.coupon-box {
	.h(100vh);
	z-index: 200;
	background: rgba(0, 0, 0, 0.5);
	.coupon-content {
		.bg-img {
			text-align: center;
			left: 0;
			width: 100%;
			image {
				.w(625rpx);
				.h(951rpx);
			}
		}
		width: 100%;
		top: 70rpx;
		position: fixed;
		.br(16rpx);
		.close-btn {
			position: absolute;
			.w(28rpx);
			.h(28rpx);
			top: 180rpx;
			right: 40rpx;
			.c(#fff);
		}

		.bottom-btn {
			position: absolute;
			.w(100%);
			bottom: 0rpx;
			text-align: center;
			img {
				.w(639rpx);
				.h(60rpx);
			}
		}

		.proper-title {
			.c(#fff);
			text-align: center;
			margin-top: 31rpx;
			font-weight: 750;
			.fz(38rpx);
		}

		.proper-desc {
			.c(#fff);
			text-align: center;
			margin-top: 16rpx;
			.fz(26rpx);
		}

		.coupon-list {
			position: absolute;
			top: 61%;
			left: 15%;
			.w(547rpx);
			-webkit-overflow-scrolling: touch;
			height: 320rpx;
			margin: 20rpx auto 0;
			overflow: scroll;
			.counpon-item {
				.w(422rpx);
				.h(114rpx);
				.bg(#fff);
				.br(12rpx);
				margin-bottom: 10rpx;
				position: relative;
				box-sizing: border-box;
				display: flex;
				.coupon {
					position: absolute;
					right: -120rpx;
					top: 0;
					margin-left: 16rpx;
					img {
						.w(124rpx);
						.h(111rpx);
					}
				}
				&:last-child {
					margin-bottom: 20rpx;
				}
				.red-round {
					.w(30rpx);
					.h(28rpx);
					.br(17rpx);
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: -17rpx;
					.bg(#ff2c4f);
				}
				.left-money {
					.h(114rpx);
					.w(146rpx);
					border-right: 2rpx dashed #e5e5e5;
					text-align: center;
					.counpon-cut-money {
						.c(#ff2c4f);
						font-weight: 600;
						padding-top: 12rpx;
						margin-bottom: 10rpx;
						display: flex;
						align-items: flex-start;
						.rmb-icon {
							font-family: 'MicrosoftYaHei-Bold';
							.fz(28rpx);
							&.discount {
								margin-left: 6rpx;
							}
						}
						.rmb-number {
							.fz(58rpx);
							font-family: 'WeChatNumber-151125';
							margin-left: 6rpx;
							&.discount {
								margin-left: 0rpx;
							}
						}
					}
					.counpon-more-money {
						font-size: 20rpx;
						color: #666;
					}
				}

				.right-content {
					flex: 1;
					padding: 17rpx 0 0 20rpx;
					.title {
						.c(#000);
						.fz(28rpx);
						.w(270rpx);
						margin-bottom: 12rpx;
						font-family: 'MicrosoftYaHei-Bold';
						font-weight: 800;
					}
					.time {
						.c(#999);
						.fz(22rpx);
					}
				}
			}
		}
	}
}
</style>

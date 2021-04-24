<template>
	<div class="authorize flex-cc">
		<div class="mask"></div>
		<div class="modal">
			<div class="logo"><img src="/static/images/common/info.png" /></div>
			<div class="content">
				<div class="title">安全到位，幸福到家</div>
				<div class="btn-box"><button open-type="getUserInfo" @getuserinfo="getUserInfo">启动服务</button></div>
				<div class="btn-box-cancel"><button @click="nologin">暂不登录</button></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		nologin() {
			uni.navigateBack({
				delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
			});
		},
		getUserInfo(e) {
			// console.log('getUserInfo', e.detail)
			this.isBack();
		},
		isBack() {
			/* eslint-disable no-undef */
			let pages = getCurrentPages();
			console.log('pages', pages);

			if (pages.length === 1) {
				uni.switchTab({
					url: '/pages/index/main'
				});
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
			wx.setStorageSync('appp_on_hide', 1);
			let employee = wx.getStorageSync('employee_no');
			if (employee) {
				this.chooseConsultant(employee);
			}
		},
		// 选为消防专员
		chooseConsultant(employee) {
			let args = {
				url: this.api('chooseConsultant'),
				data: {
					employee_no: employee
				}
			};
			this.post(args);
		}
	},
	onUnload() {
		uni.setStorageSync('isAuth', 0);
	}
};
</script>
<style lang="less" scoped>

.authorize {
	.h(100vh);
	.mask {
		background: #000;
		.h(100vh);
		.w(100vw);
		position: fixed;
		top: 0;
		left: 0;
		opacity: 0.4;
	}
	.modal {
		position: relative;
		border-radius: 20rpx;
		.w(520rpx);
		background: #fff;
		.logo {
			height: 255rpx;
			.w(100%);
			img {
				height: 100%;
				.w(100%);
			}
		}
		.content {
			text-align: center;
			.title {
				padding: 42rpx 40rpx 0 40rpx;
				.c(#333);
				.fz(30rpx);
			}
			.btn-box {
				padding: 50rpx 100rpx 30rpx;
				button {
					.w(320rpx);
					.h(70rpx);
					line-height: 70rpx;
					font-size: 30rpx;
					background: linear-gradient(-90deg, #0a2d8f 0%, #466bd3 100%), linear-gradient(#0a2d8f, #0a2d8f);
					color: #fff;
					box-shadow: 0 10rpx 20rpx 0 rgba(10, 45, 143, 0.2);
					border-radius: 80rpx;
					&::after {
						border: none;
					}
				}
			}
			.btn-box-cancel {
				padding: 0rpx 100rpx 50rpx;
				button {
					.w(320rpx);
					.h(70rpx);
					line-height: 70rpx;
					font-size: 30rpx;
					background: #999999;
					color: #fff;
					border-radius: 80rpx;
				}
			}
		}
		.close {
			position: absolute;
			top: 28rpx;
			right: 28rpx;
			.c(#fff);
			.fz(28rpx);
		}
	}
}
</style>

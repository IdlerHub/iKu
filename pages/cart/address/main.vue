<template>
	<div class="select-address" v-if="!loading">
		<template v-if="list && list.length > 0">
			<div class="list-item" @click="selectAddress(index)" v-for="(item, index) in list" :key="index">
				<div class="flex-c">
					<span class="mr">{{ item.consignee }}</span>
					<span class="mr">{{ item.mobile }}</span>
					<span class="default" v-if="item.is_default == 1">默认</span>
				</div>
				<div class="address">{{ item.location }}{{ item.address }}</div>
				<span class="iconfont icon-bianji" @click.stop="$nav('editAddress', { address_id: item.address_id })"></span>
			</div>
		</template>
		<template v-else>
			<div class="no-data">
				<img src="/static/images/common/no_result.png" />
				<p class="tip">您还没有添加收货地址，请点击下方的“添加新地址”按钮去添加</p>
			</div>
		</template>
		<div class="bottom-fixed"><Btn name="添加新地址" @clickBtn="$nav('addAddress')"></Btn></div>
	</div>
</template>

<script>
import Btn from '@/components/common/button/button';

export default {
	components: {
		Btn
	},
	data() {
		return {
			loading: true,
			list: ''
		};
	},
	onShow() {
		this.getAddressList();
	},
	methods: {
		selectAddress(index) {
			let target = this.list[index];
			wx.setStorage({
				key: 'address',
				data: target,
				success: () => {
					this.$Bus.$emit(this.$EmitType['ChooseAddress'], target);
					this.$nav('back');
				}
			});
		},
		async getAddressList() {
			let args = {
				url: this.api('getAddressList'),
				loading: this.loading
			};
			let res = await this.get(args);
			if (res.status) {
				let re = res.data;
				this.list = re.items;
			} else {
				this.$toast(res.msg);
			}
			this.loading = false;
		}
	},
	onPullDownRefresh() {
		wx.stopPullDownRefresh();

		this.getAddressList();
	}
};
</script>
<style lang="less" scoped>

.select-address {
	padding: 20rpx 24rpx;
	.list-item {
		margin-bottom: 20rpx;
		padding: 30rpx 20rpx;
		position: relative;
		.bg;
		font-size: 32rpx;
		color: #000000;
		.br;
		.mr {
			margin-right: 30rpx;
		}
		.default {
			width: 70rpx;
			height: 30rpx;
			line-height: 30rpx;
			.bg(@theme-color);
			.f(22);
			.c;
			text-align: center;
			.br(15rpx);
		}
		.address {
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #333333;
		}
		.iconfont {
			position: absolute;
			right: 20rpx;
			top: 30rpx;
		}
	}
	.no-data {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		img {
			width: 200rpx;
			height: 166rpx;
		}
		.tip {
			margin-top: 10rpx;
			width: 420rpx;
			font-size: 32rpx;
			color: #999999;
		}
	}
	.bottom-fixed {
		padding: 20rpx 24rpx;
		.bg;
	}
}
</style>

<template>
	<div class="address-panel flex-bc" @click="$nav('selectAddress')">
		<div class="left flex-1">
			<template v-if="item && item.address_id">
				<div class="mb">
					<span class="name">{{ item.consignee }}</span>
					<span class="phone">{{ item.mobile }}</span>
				</div>
				<div class="address flex">
					<div class="default" v-if="item.is_default == 1">默认</div>
					<div class="content">{{ item.location }}{{ item.address }}</div>
				</div>
			</template>
			<div class="placeholder" v-else>地址为空，请前去添加地址</div>
		</div>
		<div class="right flex-c">
			<span v-if="!item">添加地址</span>
			<i class="iconfont icon-right"></i>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			default: () => ({})
		}
	},
	mounted() {
		this.$Bus.$on(this.$EmitType['ChooseAddress'], info => {
			this.$emit('update:item', info);
			this.$emit('change', info);
		});
	},
	watch: {
		item(n, o) {
			// let oid = o && o.address_id ? o.address_id : ''
			// let nid = n && n.address_id ? n.address_id : null
			// // 防止每次返回都触发change
			// if (nid !== oid) {
			//   this.$emit('change')
			// }
		}
	}
};
</script>
<style lang="less" scoped>

.address-panel {
	margin-bottom: 20rpx;
	padding: 30rpx;
	.bg;
	.br;
	.left {
		font-size: 32rpx;
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
	.right {
		font-size: 26rpx;
		color: #999999;
		.lh(1);
		.iconfont {
			margin-left: 20rpx;
		}
	}
}
</style>

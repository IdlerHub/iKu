<template>
	<div class="stepper flex-c">
		<template v-if="num > 0">
			<i class="iconfont icon-jian" @click.stop="minus"></i>
			<span class="num">{{ num }}</span>
		</template>
		<i class="iconfont icon-roundaddfill" @click.stop="plus"></i>
	</div>
</template>

<script>
export default {
	props: {
		item: Object,
		index: {
			type: [Number, String],
			default: 0
		},
		num: {
			type: [Number, String],
			default: 0
		},
		max: {
			type: [Number, String],
			default: 9999
		},
		limit: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		minus() {
			if (this.num > 0) {
				this.$emit('changeNum', this.item, this.index, this.num * 1 - 1);
			}
		},
		plus() {
			if (this.num < this.max) {
				if (this.num * 1 === 0) {
					this.$emit('addCart', this.item, this.index, this.num * 1 + 1);
				} else {
					this.$emit('changeNum', this.item, this.index, this.num * 1 + 1);
				}
			} else {
				const toastMsg = this.limit ? '您好，超出限购数量了' : '您好，库存不够了！';
				this.$toast(toastMsg);
			}
		}
	}
};
</script>
<style lang="less" scoped>

.stepper {
	justify-content: flex-end;
	font-size: 32rpx;
	color: @theme-color;
	.iconfont {
		.f(44);
		color: @theme-color;
	}
	.num {
		margin: 0 24rpx;
	}
}
</style>

<template>
	<div class="stepper flex" @click.stop>
		<div class="minus" @click="minus"></div>
		<input type="number" v-model="value" />
		<div class="plus" @click="plus"></div>
	</div>
</template>

<script>
export default {
	props: {
		min: {
			type: Number,
			default: 1
		},
		max: {
			type: Number,
			default: 9999
		},
		isMin: {
			type: Boolean,
			default: false
		}, // 已是最小
		isMax: {
			type: Boolean,
			default: false
		}, // 已是最大
		stepper_value: {
			type: Number,
			default: 1
		},
		limit: {
			type: Boolean,
			default: false
		} // 是否限购
	},
	data() {
		return {
			value: 1,
			init_state: false
		};
	},
	watch: {
		value(nv, ov) {
			if (nv !== '') {
				this.updateValue();
			}
		},
		stepper_value(nv, ov) {
			if (this.value !== Number(nv)) {
				this.value = Number(nv);
			}
		}
	},
	mounted() {
		this.initVal();
	},
	methods: {
		minus() {
			if (this.isMin) {
				this.$toast('已经是最低套餐标准数，不能再减少数量了');
			} else if (this.value === Number(this.min)) {
				this.$toast('不能再减啦');
			} else if (this.value > this.min) {
				this.value--;
			}
		},
		plus() {
			if (this.isMax || Number(this.value) === Number(this.max) || Number(this.max) === 0) {
				const toastMsg = this.limit ? '您好，超出限购数量了' : '您好，库存不够了！';
				this.$toast(toastMsg);
			} else if (this.value < this.max) {
				this.value++;
			}
		},
		updateValue() {
			if (this.value !== Number(this.stepper_value)) {
				if (this.value > this.max || this.value < this.min) {
					this.value = this.value > this.max ? this.max : this.min;
				}
				this.$emit('update:stepper_value', this.value);
				this.$emit('updateNum');
			}
		},
		initVal() {
			if (this.stepper_value > this.max || this.stepper_value < this.min) {
				this.value = this.value > this.max ? Number(this.max) : Number(this.min);
				this.$emit('update:stepper_value', this.value);
				this.$emit('updateNum');
			} else {
				this.value = this.stepper_value;
			}
		}
	}
};
</script>
<style lang="less" scoped>

.stepper {
	.minus,
	.plus {
		width: 64rpx;
		height: 60rpx;
	}
	.minus {
		position: relative;
		.bg(#f4f4f4);
		.br-tl(8rpx);
		.br-bl(8rpx);
		&::before {
			content: ' ';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 20rpx;
			height: 4rpx;
			background: @font-color-assist;
			transform: translate(-50%, -50%);
		}
	}
	.plus {
		position: relative;
		.bg(#f4f4f4);
		.br-tr(8rpx);
		.br-br(8rpx);
		&::before {
			content: ' ';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 20rpx;
			height: 4rpx;
			background: @font-color-second;
			transform: translate(-50%, -50%);
		}
		&::after {
			content: ' ';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 4rpx;
			height: 20rpx;
			background: @font-color-second;
			transform: translate(-50%, -50%);
		}
	}
	input {
		width: 64rpx;
		height: 60rpx;
		font-size: 32rpx;
		color: #555;
		text-align: center;
	}
}
</style>

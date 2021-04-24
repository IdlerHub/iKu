<template>
  <div class="stepper flex" @click.stop>
    <div class="minus" @click="minus"></div>
    <input type="number" v-model="value">
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
    stepper_value: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      value: 1
    }
  },
  watch: {
    value (nv, ov) {
      this.updateValue()
    }
  },
  methods: {
    minus () {
      if (this.value > this.min) {
        this.value--
      }
    },
    plus () {
      if (this.value < this.max) {
        this.value++
      }
    },
    updateValue () {
      this.$emit('update:stepper_value', this.value)
    }
  },
  mounted () {
    this.value = this.stepper_value
  }
}
</script>
<style lang="less" scoped>
.stepper {
  .minus, .plus {
    width: 60rpx;
    height: 60rpx;
  }
  .minus {
    position: relative;
    .br-tl(30rpx);
    .br-bl(30rpx);
    border: 1rpx solid #e5e5e5;
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
    .br-tr(30rpx);
    .br-br(30rpx);
    border: 1rpx solid #e5e5e5;
    &::before {
      content: ' ';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20rpx;
      height: 4rpx;
      background: @font-color-primary;
      transform: translate(-50%, -50%);
    }
    &::after {
      content: ' ';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 4rpx;
      height: 20rpx;
      background: @font-color-primary;
      transform: translate(-50%, -50%);
    }
  }
  input {
    width: 76rpx;
    height: 60rpx;
    text-align: center;
    border-top: 1rpx solid #e5e5e5;
    border-bottom: 1rpx solid #e5e5e5;
  }
}
</style>

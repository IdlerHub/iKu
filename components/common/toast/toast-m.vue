<template>
  <div class="toast flex-ccc" v-if="show">
    <div class="icon-box">
      <i class="iconfont icon-roundcheckfill"></i>
    </div>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题' // 最好双行
    },
    duaration: {
      type: Number,
      default: 1500
    }
  },
  watch: {
    show (nv, ov) {
      setTimeout(() => {
        this.$emit('update:show', false)
      }, this.duaration)
    }
  }
}
</script>
<style lang="less" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 30rpx 60rpx;
  width: 280rpx;
  background: rgba(0, 0, 0, .5);
  .fz(30rpx);
  .c;
  text-align: center;
  border-radius: 10rpx;
  .icon-box {
    margin-bottom: 10rpx;
    line-height: 1;
    .iconfont {
      .fz(132rpx);
      .c;
    }
  }
}
</style>

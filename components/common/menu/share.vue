<template>
  <button
    class="menu-btn menu-share"
    open-type="share"
    @click.stop
    :style="customstyle"
  >
    <!-- <i class="iconfont icon-fenxiang"></i> -->
    <span>分享</span>
  </button>
</template>
<script>
export default {
  props: {
    customstyle: {
      type: null,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.menu-share {
  z-index: 100;
  position: fixed;
  right: 30rpx;
  bottom: 160rpx;
  font-weight: bolder;
}
</style>

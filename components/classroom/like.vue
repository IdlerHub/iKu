<template>
  <div  v-if="showModal" class="position like" :class="{'ease-in': showModal, 'ease-out': !showModal}">
    <div class="mask" @click.stop="$emit('closeModal')"></div>
    <div class="modal">
      <div class="title">点赞</div>
      <div class="flex-cbc">
        <div class="thumb flex-cc" @click="$emit('like')">
          <i class="iconfont icon-appreciatefill"></i>
        </div>
        <div class="tip">点击按钮即可给我点赞！</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showModal: {
      type: [Boolean],
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
.like {
  z-index: 99;
  .mask {
    position: fixed;
    .h(100vh);
    .w(100vw);
    .bg(rgba(0, 0, 0, 0.5));
    z-index: 99;
  }
  .modal {
    .bg(#fff);
    .br-tl(16rpx);
    .br-tr(16rpx);
    padding: 36rpx 30rpx;
    z-index: 100;
    position: absolute;
    bottom: 0;
    left: 0;
    .w(100vw);
    box-sizing: border-box;
    .fz(26rpx);
    .title {
        font-weight: bold;
        .fz(32rpx);
    }
    .thumb {
      .w(180rpx);
      .h(180rpx);
      margin: 59rpx 0 30rpx 0;
      background-image: linear-gradient(-45deg, 
          #0a2d8f 0%, 
          #6789e9 100%), 
      linear-gradient(
          #1585ec, 
          #1585ec);
      background-blend-mode: normal, 
          normal;
      box-shadow: 0px 10rpx 20rpx 0rpx 
          rgba(10, 45, 143, 0.26);
      .iconfont {
        .fz(62rpx);
        .c;
      }
      .c(#fff);
      border-radius: 50%;
    }
    .tip {
      color: #666;
    }
  }
}
.position {
  position: fixed;
  .w(100vw);
  .h(100vh);
  top: 0;
  left: 0;
}
</style>

<template>
  <div class="none-btn" @click="$emit('clickBtn')">{{title}}</div>
</template>

<script>
  export default {
    props: {
      title: null
    }
  }
</script>

<style lang="less" scoped>
  .none-btn {
    width: 200rpx;
    height: 54rpx;
    line-height: 54rpx;
    margin: 20rpx auto;
    background-image: linear-gradient(
      rgba(150, 195, 255, 0.1),
      rgba(150, 195, 255, 0.1)),
    linear-gradient(0deg,
      #b6d5ff 0%,
      #86a9d8 100%),
    linear-gradient(
      #9dc0ee,
      #9dc0ee);
    background-blend-mode: overlay,
      normal,
      normal;
    box-shadow: 0.4rpx 0.9rpx 1rpx 0rpx
      rgba(0, 0, 0, 0.32),
      inset 0.4rpx 0.9rpx 0rpx 0rpx
      rgba(255, 255, 255, 0.4);
    border-radius: 6rpx;
    text-align: center;
    color: #fff;
    font-size: 28rpx;
  }
</style>

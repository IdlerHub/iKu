<template>
  <div class="heading flex-bc">
    <div class="flex-c flex-1">
      <div class="border"></div>
      <span class="title">{{ title }}</span>
    </div>
    <div class="flex-c" @click="$emit('clickMore')">
      <span class="more">查看更多</span>
      <i class="iconfont icon-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>
<style lang="less">
.heading {
  margin: 20rpx 30rpx;
  line-height: 1;
  .border {
    margin-right: 20rpx;
    width: 10rpx;
    height: 32rpx;
    background: #0a2d8f;
    border-radius: 5rpx;
  }
  .title {
    font-weight: bold;
    font-size: 32rpx;
    color: #333333;
  }
  .more {
    font-size: 26rpx;
    color: #999999;
  }
  .iconfont {
    margin-left: 20rpx;
  }
}
</style>

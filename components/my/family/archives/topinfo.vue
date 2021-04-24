<template>
  <div class="top-info">
    <!-- <img src="/static/images/common/bg-2.png" /> -->
    <img class="cover" src="/static/images/my/bg.png" />
    <div class="text-box">
      <div class="ted-text">
        {{info.nickname}}
        <span>家的消防档案</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: null
  }
}
</script>

<style lang="less" scoped>
.top-info {
  height: 160rpx;
  padding: 20rpx 40rpx 0;
  box-sizing: border-box;
  position: relative;
  z-index: 99;
  .cover {
    width: 750rpx;
    height: 500rpx;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
  }
  .text-box {
    .ted-text {
      font-family: SourceHanSansCN-Regular;
      font-size: 44rpx;
      color: #ffc000;
      letter-spacing: 2.1rpx;
      span {
        margin-left: 15rpx;
        font-size: 22rpx;
      }
    }
  }
}
</style>

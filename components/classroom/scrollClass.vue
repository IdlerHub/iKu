<template>
  <div class="scroll-class">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="{'mr-0': index === list.length - 1}"
      class="item"
      @click="$nav('classDetail', { id: item.id })"
    >
      <img :lazy-load="true" :src="item.thumb + imgProcess.w280h186" mode="aspetFit">
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgProcess: this.$imgProcess
    }
  },
  props: {
    list: {
      type: [Array],
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-class {
  width: 100%;
  box-sizing: border-box;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 190rpx;
  display: flex;
  align-items: center;
  -webkit-overflow-scrolling: touch;
  .item {
    width: 280rpx;
    height: 186rpx;
    border-radius: 10rpx;
    position: relative;
    margin-right: 18rpx;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
    }
    .title {
      position: absolute;
      padding: 12rpx 10rpx;
      background: rgba(0, 0, 0, 0.5);
      .line-clamp-multi(1);
      color: #fff;
      z-index: 2;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      border-radius: 0 0 10rpx 10rpx;
      max-height: 50rpx;
    }
  }
  .mr-0 {
    margin-right: 0 !important;
  }
}
</style>

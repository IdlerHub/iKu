<template>
  <div class="class-item flex" @click="$nav('class', { id: item.id })">
    <img :lazy-load="true" v-if="item.thumb" :src="item.thumb + imgProcess.w390h260" class="thumb" mode="aspectFill">
    <img v-else src="/static/images/classroom/class-pic.png" class="thumb" mode="aspectFill">
    <div class="right flex-cb">
      <p class="title">{{ item.title }}</p>
      <div>
        <p class="time">上传 {{ item.add_time }}</p>
        <p>主讲：{{ item.speaker }}</p>
      </div>
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
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
.class-item {
  margin-bottom: 20rpx;
  padding: 30rpx 20rpx;
  background: #fff;
  .thumb {
    margin-right: 20rpx;
    width: 390rpx;
    height: 260rpx;
    .br;
  }
  .right {
    align-self: stretch;
    font-size: 26rpx;
    color: #999;
    .title {
      font-weight: bold;
      font-size: 30rpx;
      color: #333333;
      .line-clamp-multi(2);
    }
    .time {
      margin-bottom: 10rpx;
    }
  }
}
</style>

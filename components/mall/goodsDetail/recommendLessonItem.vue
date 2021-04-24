<template>
	<div class="recommend-lesson-item" @click="$nav('class', {id: item.recommend_class_id})">
		<img :lazy-load="true" mode="aspectFill" :src="item.thumb + imgProcess.wh200">
    <div class="title line-clamp">{{ item.title }}</div>
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
    item: Object
  }
}
</script>
<style lang="less" scoped>
.recommend-lesson-item {
  flex-shrink: 0;
  margin-right: 20rpx;
  position: relative;
  .w(280rpx);
  .h(186rpx);
  img {
    width: 100%;
    height: 100%;
    .br;
  }
  .title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12rpx 20rpx;
    background: rgba(0, 0, 0, .35);
    font-size: 26rpx;
    color: #ffffff;
    text-align: center;
    .br-bl;
    .br-br;
  }
}
</style>

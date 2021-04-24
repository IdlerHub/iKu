<template>
  <div class="no-search flex-cbc" :style="customStyle">
    <img :src="pic" :style="{ width: size.w, height: size.h }">
    <div class="tip">{{ tip }}</div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Object,
      default: {
        w: '270rpx',
        h: '245rpx'
      }
    },
    pic: {
      type: String,
      default: '/static/images/common/no_data.png'
    },
    tip: {
      type: String,
      default: 'sorry，什么也没有！'
    },
    customStyle: {
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.no-search {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // img {
  // 	width: 270rpx;
	//   height: 245rpx;
  // }
  .tip {
    margin-top: 20rpx;
    .fz(28rpx);
    color: #666666;
  }
}
</style>

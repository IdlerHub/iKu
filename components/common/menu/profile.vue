<template>
	<button class="menu-btn menu-profile" @click="$nav('archives')" :style="customstyle">
		档案
	</button>
</template>
<script>
export default {
  props: {
    bottom: {
      type: String,
      default: '60rpx'
    },
    customstyle: {
      type: null,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.menu-profile {
	position: fixed;
  right: 30rpx;
  bottom: 260rpx;
	font-weight: bolder;
}
</style>

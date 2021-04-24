<template>
	<button class="menu-btn menu-cart" @click="$nav('cart')" :style="customstyle">
		<i class="iconfont icon-cartfill"></i>
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
.menu-cart {
	position: fixed;
	right: 30rpx;
	bottom: 60rpx;
}
</style>

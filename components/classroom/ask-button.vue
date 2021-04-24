<template>
	<button @click.stop="$emit('ask')" class="menu-btn ask">提问</button>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.ask {
  position: fixed;
  right: 30rpx;
  bottom: 160rpx;
}
</style>

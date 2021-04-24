<template>
	<button open-type="share" @click.stop class="share">
		<i class="iconfont icon-fenxiang"></i>
	</button>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.share {
	position: fixed;
	right: 30rpx;
	bottom: 166rpx;
	.w(76rpx);
  .h(76rpx);
  line-height: 76rpx;
  background: @theme-color;
  opacity: .6;
  border-radius: 50%;
  z-index: 99;
	&::after {
		border: none;
	}
	.iconfont {
		.fz(38rpx);
		.c(#fff);
	}
}
</style>

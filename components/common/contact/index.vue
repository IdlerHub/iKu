<template>
	<button class="contact-btn" open-type="contact" @click.stop>
		<i class="iconfont icon-servicefill"></i>
	</button>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.contact-btn {
  position: fixed;
	right: 30rpx;
	bottom: 60rpx;
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

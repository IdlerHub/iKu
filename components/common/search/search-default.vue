<template>
	<div class="search-container">
		<div
		 class="search-box flex-cc"
		 @click="$emit('clickSearch')"
		>
			<i class="iconfont icon-search"></i>
			<span>{{ placeholder }}</span>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索产品、服务专员'
    }
  }
}
</script>
<style lang="less">
.search-container {
	padding: 20rpx 30rpx;
	.bg;
	.search-box {
		width: 690rpx;
		height: 70rpx;
		.bg(#f8f8f8);
		.fz(26rpx);
		color: #999999;
    line-height: 1;
    .br(35rpx);
		.iconfont {
			margin-right: 20rpx;
      .fz(36rpx);
      .c(#c4c4c4);
		}
	}
}
</style>

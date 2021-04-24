<template>
	<button class="menu-btn menu-share" @click.stop="$nav('live')" v-if="liveshow">
		<!-- <i class="iconfont icon-fenxiang"></i> -->
    <span>直播</span>
	</button>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('Video', ['liveshow'])
  }
}
</script>
<style lang="less" scoped>
.menu-share {
  z-index: 100;
	position: fixed;
	right: 30rpx;
	bottom: 60rpx;
	font-weight: bolder;
}
</style>

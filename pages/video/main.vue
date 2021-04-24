<template>
	<div><video :src="info.video_url"></video></div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('Video');
export default {
	computed: {
		...mapState(['info'])
	},
	mounted() {
		console.log(this.info);
		wx.setNavigationBarTitle({
			title: this.$root.$mp.query.title
		});
	}
};
</script>

<style lang="less" scoped>

video {
	.w(750rpx);
	.h(750rpx);
}
</style>

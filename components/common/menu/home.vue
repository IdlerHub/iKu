<template>
	<button class="menu-btn menu-home" @click="$nav('home')">
		首页
	</button>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.menu-home {
	position: fixed;
	right: 30rpx;
	bottom: 260rpx;
	font-weight: bolder;
}
</style>
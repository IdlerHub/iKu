<template>
	<button class="menu-btn menu-buy" @click="$nav('mall')">
		购买
	</button>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.menu-buy {
	position: fixed;
	right: 30rpx;
	bottom: 60rpx;
	font-weight: bolder;
}
</style>
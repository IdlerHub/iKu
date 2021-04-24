<template>
	<view class="bottom-end" :style="customStyle">
		<!-- <image class="end" :src="end" mode="widthFix" v-show="show"></image> -->
		<image class="nothing" src="/static/images/common/no_data.png" mode="widthFix" v-show="show===false"></image>
		<view class="desc" v-show="show===false">{{text}}</view>
	</view>
</template>

<script>
	export default {
	  props: {
	    show: {
	      default: null
	    },
	    text: {
	      type: String,
	      default: '暂无数据'
	    },
	    customStyle: {
	      type: String,
	      default: '暂无数据'
	    }
	  },
	  data () {
	    return {}
	  },
	  mounted () {},
	  computed: {}
	}
</script>

<style lang="less" scoped>
	.bottom-end {
		margin: 30rpx;
		color: #333333;
		text-align: center;

		.end {
			width: 191rpx;
			height: 20rpx;
		}

		.nothing {
      width: 270rpx;
      height: 245rpx;
			margin-top: 20rpx;
		}

		.desc {
			margin-top: 20rpx;
			font-size: 26rpx;
			color: #999999;
			text-align: center;
		}
	}
</style>

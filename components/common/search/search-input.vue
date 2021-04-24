<template>
	<div class="search-focus flex-bc" :style="searchCustomStyle">
		<div class="search-box flex-c flex-1" :style="customStyle">
			<i class="iconfont icon-search"></i>
			<input
			 type="text"
       confirm-type="search"
			 :value="search_val"
			 :placeholder="placeholder"
			 :focus="isfocus"
			 @input="getSearchVal"
       @confirm="$emit('search', search_val)"
			>
			<div
			 class="reset-box"
			 v-if="search_val.length > 0"
			 @click.stop="resetSearch"
			>
				<i class="iconfont icon-roundclosefill"></i>
			</div>
		</div>
    <div class="search-btn" @click="$emit('search', search_val)" v-if="showBtn">搜索</div>
	</div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索产品、活动、视频、服务专员'
    },
    searchCustomStyle: {
      default: ''
    },
    customStyle: {
      default: ''
    },
    showBtn: {
      default: true
    },
    isfocus: {
      default: true
    }
  },
  data () {
    return {
      search_val: '',
      close_show: false
    }
  },
  methods: {
    getSearchVal (e) {
      this.search_val = e.detail.value
    },
    resetSearch () {
      this.search_val = ''
    }
  },
  onUnload () {
    this.resetSearch()
  }
}
</script>
<style lang="less">
.search-focus {
	padding: 20rpx 30rpx;
	.bg;
	.search-box {
		width: 690rpx;
		height: 70rpx;
		.bg(#f8f8f8);
		.br(35rpx);
		.icon-search {
			margin: 0 20rpx;
			.fz(36rpx);
			.c(#c4c4c4);
		}
		.icon-roundclosefill {
			.fz(30rpx);
			.c(#c4c4c4);
		}
		.reset-box {
			padding: 0 20rpx;
			height: 70rpx;
			line-height: 70rpx;
		}
		input {
			flex: 1;
			height: 70rpx;
			line-height: 70rpx;
			.fz(26rpx);
			color: #333333;
		}
		.input-placeholder {
			color: #999999;
		}
  }
  .search-btn {
    padding-left: 30rpx;
    font-size: 30rpx;
    color: @theme-color;
  }
}
</style>

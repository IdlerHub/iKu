<template>
	<div class="name-card">
		<div class="info">
      <img :lazy-load="true" :src="info.photo_url + imgProcess.wh150" mode="aspectFill" v-if="info.photo_url">
      <img src="/static/images/common/avatar.png" mode="aspectFill" v-else>
			<div class="content">
				<div class="flex-bc">
					<div class="flex-c">
						<p class="title">{{ info.employee_name }}</p>
						<div class="flex-c">
							<i
								v-for="(star, s_index) in [1, 2, 3, 4, 5]"
								:key="s_index"
								class="iconfont icon-favorfill"
								:class="{'bright': star <= info.star_level}"
							></i>
						</div>
					</div>
					<div class="flex-c">
						<i class="iconfont icon-dianzan1"></i>
						<p class="c9">{{ info.number }}</p>
					</div>
				</div>
				<p class="job">{{ info.job_title }}</p>
				<div class="tags flex-c">
					<div
						v-for="(tag, t_index) in info.experises"
						:key="t_index"
						class="tag"
					>{{ tag.experises_desc }}</div>
				</div>
			</div>
		</div>
		<div class="btn-box flex-bc">
      <!-- 点赞前：蓝色，点赞
           点赞后点赞的按钮：蓝色，取消点赞
           点赞后没有点赞的按钮：灰色，点赞 -->
			<template v-if="info.today_is_thumbs_up === 0">
				<button @click="$emit('thumbUp')">点赞</button>
			</template>
      <template v-if="info.today_is_thumbs_up === 1 && info.employee_no === info.today_thumbs_up_employee">
				<button @click="$emit('cancelThumb')">取消点赞</button>
			</template>
      <template v-if="info.today_is_thumbs_up === 1 && info.employee_no !== info.today_thumbs_up_employee">
				<button class="gray" @click="cancelTip">点赞</button>
			</template>

			<template v-if="info.user_exclusive_employee_no === info.employee_no">
				<button class="gray">选为服务专员</button>
			</template>
			<template v-else>
				<button @click="$emit('choose')">选为服务专员</button>
			</template>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      imgProcess: this.$imgProcess
    }
  },
  props: {
    info: {
      type: [Object],
      default () {
        return {}
      }
    }
  },
  methods: {
    cancelTip () {
      wx.showToast({
        title: '请取消之前的点赞',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.c9 {
  color: #999;
}
button {
  background: linear-gradient(-90deg, 
    #0a2d8f 0%, 
    #466bd3 100%), 
  linear-gradient(
    #0a2d8f, 
    #0a2d8f);
  color: #fff;
  box-shadow: 0 10rpx 20rpx 0 
    rgba(10, 45, 143, 0.2);
  border-radius: 80rpx;
  &::after {
    border: none;
  }
}
.name-card {
  padding: 30rpx 20rpx;
	.bg(#fff);
  .br;
  .fz(26rpx);
  .info {
    display: flex;
    justify-content: space-between;
  }
	img {
		.w(150rpx);
		.h(150rpx);
		border-radius: 50%;
	}
	.content {
		flex: 1;
		margin-left: 20rpx;
		min-height: 150rpx;
		display: flex;
		flex-direction: column;
    // justify-content: space-between;
    .lh;
		.iconfont {
			.c(#c4c4c4);
			margin-right: 8rpx;
		}
		.bright {
			.c(#f6cb00);
		}
		.title {
			.fz(30rpx);
			font-weight: bold;
			margin-right: 20rpx;
    }
    .job {
      margin: 20rpx 0 10rpx 0;
      color: #666666;
    }
    .tags {
      flex-wrap: wrap;
    }
		.tag {
			box-sizing: border-box;
      padding: 0 10rpx;
      min-width: 106rpx;
			.lh(34rpx);
			text-align: center;
			.c(@theme-color);
			.fz(22rpx);
      margin-right: 8rpx;
      margin-top: 10rpx;
      border: solid 1rpx @theme-color;
      border-radius: 18rpx;
    }
	}
	.btn-box {
		padding: 60rpx 70rpx 0 70rpx;
		button {
			width: 240rpx;
			.fz(26rpx);
		}
		.gray {
			.bg(#c4c4c4);
			box-shadow: none;
			&::after {
				border: none;
			}
		}
  }
}
</style>

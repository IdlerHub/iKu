<template>
	<div class="panel">
		<div class="heading flex-bc" @click="$nav('family', { index: 0 })">
			<span class="title">我的家庭消防护照</span>
			<div class="more flex-c">
				<span>查看全部</span>
				<i class="iconfont icon-right"></i>
			</div>
		</div>
		<div class="content">
			<!-- 已关注 -->
			<div v-if="detail.user_exclusive_employee_no != '0'" class="box flex-ccc" @click="$nav('consult', { id: detail.user_exclusive_employee_no })">
				<img class="img-box" :src="detail.employee_img || '/static/images/common/default_avatar.png'" />
				<span>服务专员</span>
			</div>
			<!-- 未关注 -->
			<div v-else class="box flex-ccc" @click="$nav('classroom')">
				<div class="num-box flex-cc"><span class="follow">去关注</span></div>
				<span>服务专员</span>
			</div>
			<div class="box flex-ccc" @click="$nav('education')">
				<div class="num-box flex-cc">
					<div class="caiNumber">{{ detail.study_level }}</div>
				</div>
				<span>消防学历</span>
			</div>
			<div class="box flex-ccc" @click="$nav('family', { index: 0 })">
				<div class="num-box flex-cc">
					<div class="caiNumber">{{ detail.studied_class }}</div>
				</div>
				<span>课堂学习</span>
			</div>
			<div class="box flex-ccc" @click="$nav('family', { index: 1 })">
				<div class="num-box flex-cc">
					<div class="caiNumber">{{ detail.equipment_count }}</div>
				</div>
				<span>现有器材</span>
			</div>
			<div class="box flex-ccc" @click="$nav('family', { index: 2 })">
				<div class="num-box flex-cc">
					<div class="caiNumber">{{ detail.equipment_be_expire_count }}</div>
				</div>
				<span>即将过期</span>
			</div>
			<div class="box flex-ccc" @click="$nav('family', { index: 3 })">
				<div class="num-box flex-cc">
					<div class="caiNumber">{{ detail.wait_supply }}</div>
				</div>
				<span>待补充</span>
			</div>
			<div class="box flex-ccc" @click="$nav('MedalRecord')">
				<div class="point-box flex-cc">
					<div class="caiNumber">{{ detail.integration_balance || 0 }}</div>
				</div>
				<span>可用勋章</span>
			</div>
			<div class="box flex-ccc" @click="$nav('invitationRecord')">
				<div class="point-box flex-cc">
					<div class="caiNumber">{{ detail.recommend_num || 0 }}</div>
				</div>
				<span>邀请人数</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		detail: {
			type: Object,
			default: {
				study_level: 0,
				studied_class: 0,
				equipment_count: 0,
				equipment_be_expire_count: 0,
				wait_supply: 0,
				integral: 0
			}
		}
	}
};
</script>
<style lang="less" scoped>

.panel {
	margin-top: 20rpx;
	.bg;
	border-radius: 10rpx;
	.heading {
		padding: 30rpx;
		line-height: 1;
		border-bottom: 1rpx solid #e5e5e5;
		.title {
			font-weight: bold;
			.fz(32rpx);
			.c(#333);
		}
		.more {
			.fz(26rpx);
			.c(#999);
		}
		.iconfont {
			.fz(26rpx);
			.c(#c4c4c4);
		}
	}
	.content {
		padding-bottom: 45rpx;
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		.box {
			box-sizing: border-box;
			flex-basis: 25%;
			padding: 45rpx 30rpx 0 30rpx;
			.fz(28rpx);
			.c(@theme-color);
			.img-box,
			.num-box,
			.point-box {
				margin-bottom: 4rpx;
				width: 90rpx;
				height: 90rpx;
				font-size: 40rpx;
			}
			.img-box {
				border-radius: 50%;
			}
			.num-box {
				background: linear-gradient(-90deg, @theme-color 0%, #466bd3 100%), linear-gradient(#409eff, #409eff);
				color: #fff;
				box-shadow: 0 10rpx 20rpx 0 rgba(10, 45, 143, 0.2);
				border-radius: 50%;
				.follow {
					font-weight: bold;
					font-size: 24rpx;
				}
			}
			.point-box {
				color: @theme-color;
			}
		}
	}
}
</style>

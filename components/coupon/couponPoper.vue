<template>
	<div class="coupon-box top-fixed" v-if="show">
		<div class="coupon-content">
      <!-- 关闭 -->
      <span class="iconfont icon-close close-btn" @click="$emit('update:show', false)"></span>
      <!-- 标题 -->
			<div class="proper-title">优惠券领取</div>
			<div class="proper-desc">赶快下单使用吧!</div>
      <!-- 优惠卷列表 -->
      <div class="coupon-list">
        <div
          class="counpon-item"
          v-for="(item, index) in deal_list"
          :key="index">
            <div class="red-round"></div>
            <div class="left-money">
              <div class="counpon-cut-money">
                <template v-if="item.coupon_type === 0">
                  <span class="rmb-icon">￥</span>
                  <span class="rmb-number">{{item.coupon_money}}</span>
                </template>
                <template v-else>
                  <span class="rmb-number discount">{{item.coupon_discount}}</span>
                  <span class="rmb-icon discount">折</span>
                </template>
              </div>
              <div class="counpon-more-money line-clamp">{{item.coupon_name}}</div>
            </div>
            <div class="right-content">
              <div class="title line-clamp">{{item.condition_text}}</div>
              <div class="time">{{item.expire_time}}</div>
            </div>
          </div>
      </div>
      <!-- 底部按钮 -->
      <div class="bottom-btn">
        <img src="/static/images/common/coupon-bottom.png" class="round" />
        <div class="btn" @click="GoToGet">去领劵</div>
      </div>
		</div>
	</div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      GoToGet () {
        this.$emit('update:show', false)
        this.$nav('couponReceive')
      }
    },
    props: {
      show: Boolean,
      list: Array
    },
    computed: {
      deal_list () {
        return this.list.map(item => {
          let time = item.expire_time.split(' - ')
          time[0] = time[0].replace(/-/g, '.')
          time[1] = time[1].replace(/-/g, '.')
          return {
            ...item,
            coupon_type: Number(item.coupon_type),
            expire_time: time.join(' - ')
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
	.coupon-box {
		.h(100vh);
		z-index: 200;
		background: rgba(0, 0, 0, .5);
		.coupon-content {
			.w(624rpx);
			.h(742rpx);
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.bg(#ff2c4f);
			.br(16rpx);

      .close-btn {
        position: absolute;
        .w(28rpx);
        .h(28rpx);
        top: -42rpx;
        right: 0;
        .c(#fff);
      }

      .bottom-btn {
        .h(110rpx);
        position: absolute;
        .w(100%);
        bottom: 16rpx;
        .bg(#ff2c4f);
        .round {
          width: 100%;
          height: 66rpx;
          position: absolute;
          top: -64rpx;
        }
        .btn {
          width: 550rpx;
          height: 80rpx;
          line-height: 80rpx;
          margin: 14rpx auto;
          background-image: linear-gradient(-90deg,
            #fdbd01 0%,
            #ffe113 100%),
          linear-gradient(
            #ffffff,
            #ffffff);
          background-blend-mode: normal,
            normal;
          box-shadow: 0rpx 6rpx 20rpx 0rpx
            rgba(0, 0, 0, 0.1);
          border-radius: 40rpx;
          text-align: center;
          .c(#cb3f02);
          .fz(32rpx);
        }
      }

			.proper-title {
				.c(#fff);
				text-align: center;
				margin-top: 31rpx;
				font-weight: 750;
				.fz(38rpx);
			}

			.proper-desc {
				.c(#fff);
				text-align: center;
				margin-top: 16rpx;
				.fz(26rpx);
			}

      .coupon-list {
        .w(547rpx);
        max-height: 532rpx;
        margin: 30rpx auto 0;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        .counpon-item {
          .h(164rpx);
          .bg(#fff);
          .br(12rpx);
          margin-bottom: 20rpx;
          position: relative;
          box-sizing: border-box;
          padding-top: 22rpx;
          display: flex;
          &:last-child {
            margin-bottom: 140rpx;
          }
          .red-round {
            .w(34rpx);
            .h(34rpx);
            .br(17rpx);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -17rpx;
            .bg(#ff2c4f);
          }
          .left-money {
            .h(120rpx);
            .w(170rpx);
            border-right: 2rpx dashed #e5e5e5;
            text-align: center;
            .counpon-cut-money {
              .c(#ff2c4f);
              font-weight: 600;
              padding-top: 17rpx;
              margin-bottom: 10rpx;
              .rmb-icon {
                font-family: 'MicrosoftYaHei-Bold';
                .fz(28rpx);
                &.discount {
                  margin-left: 6rpx;
                }
              }
              .rmb-number {
                .fz(58rpx);
                font-family: 'WeChatNumber-151125';
                margin-left: 6rpx;
                &.discount {
                  margin-left: 0rpx;
                }
              }
            }
            .counpon-more-money {
              font-size: 22rpx;
              color: #666;
            }
          }

          .right-content {
            flex: 1;
            padding: 22rpx 0 0 20rpx;
            .title {
              .c(#000);
              .fz(28rpx);
              .w(221rpx);
              margin-bottom: 12rpx;
              font-family: 'MicrosoftYaHei-Bold';
              font-weight: 800;
            }
            .time {
              .c(#999);
              .fz(22rpx);
            }
          }
        }
      }
		}
	}
</style>

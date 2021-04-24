<template>
  <div class="tool-wrap">
    <div class="top flex-bc">
      <img class="title-icon" src="/static/images/my/3.png" mode="widthFix" />
      <img class="right-icon" src="/static/images/my/4.png" mode="widthFix"  @click="$nav('archives-more')" />
    </div>
<!-- 
    <div class="btn-row flex-bc">
      <div class="item flex-bc">
        <span>安装视频</span>
        <img class="icon" src="/static/images/my/5.png" mode="widthFix" />
      </div>
      <div class="item flex-bc">
        <span>使用视频</span>
        <img class="icon" src="/static/images/my/5.png" mode="widthFix" />
      </div>
      <div class="item flex-bc">
        <span>选用视频</span>
        <img class="icon" src="/static/images/my/5.png" mode="widthFix" />
      </div>
    </div>

    <div class="good-wrap flex-bc">
      <div class="left">
        <img class="cover" src="/static/images/tmp/1.png" mode="widthFix" />
      </div>
      <div class="right">
        <div class="title">安全猫（双支装）</div>
        <div class="k-v-row">
          <div class="key">拥有数量</div>
          <div class="key">x1</div>
        </div>

        <div class="k-v-row">
          <div class="key">有效期</div>
          <div class="value">4年</div>
        </div>

        <div class="k-v-row active">
          <div class="key">距过期</div>
          <div class="value active">3年11月</div>
        </div>

        <div class="k-v-row active">
          <div class="key">更换日期</div>
          <div class="value active">2024-04-01</div>
        </div>
      </div>
    </div> -->
  </div>


  <!-- <div class="commiss-info" :class="{ 'none': !info.employee_name }" v-if="info">
    <div class="commiss-content">
      <img src="/static/images/my/3.png" class="title" mode="widthFix" />
      <template v-if="info.employee_name">
        <div class="commiss-name">{{info.employee_name}}</div>
        <div class="commiss-star">{{info.employee_star}}星级专员，{{info.employee_title}}</div>
        <div class="btn-list">
          <div class="btn" @click="$nav('contact')">联系专员</div>
          <div class="btn" @click="$nav('classroom')">更换专员</div>
          <div class="btn" @click="$nav('consult', { id: info.user_exclusive_employee_no })">专员简介</div>
        </div>
      </template>
      <template v-else>
        <div class="none-desc">您还未选择专属消防专员</div>
        <noneBtn title="立即选择专员" @clickBtn="$nav('classroom')"></noneBtn>
      </template>
    </div>
    <div class="head-thumbs" v-if="info.employee_name">
      <div class="head-img">
        <img :src="info.employee_photo" />
      </div>
      <img src="/static/images/archives/shadow.png" class="shadow" />
      <img src="/static/images/archives/good.png" v-if="like" @click="DoLike" class="good-img" />
      <div class="give-me-good">{{like_desc}}</div>
    </div>
  </div>-->
</template>

<script>
import noneBtn from './noneBtn'
import LearnItem from './learn-item'
export default {
  components: {
    noneBtn,
    LearnItem
  },
  props: {
    info: [Object],
    like: null
  },
  methods: {
    DoLike () {
      let args = {
        url: this.api('thumbsUpConsultant'),
        data: {
          employee_no: this.info.user_exclusive_employee_no,
          type: 1
        }
      }
      this.post(args).then(res => {
        if (res.status) {
          uni.showToast({
            title: '点赞成功'
          })
          this.$emit('update:like', !this.like)
        }
      })
    }
  },
  computed: {
    like_desc () {
      return !this.like ? '已点赞' : '请给我点赞!'
    }
  }
}
</script>

<style lang="less" scoped>
.tool-wrap {
  // margin-bottom: 30rpx;
  padding: 10rpx 25rpx 0;
  background: #ffffff;
  border-radius: 20rpx 20rpx 0 0;
  z-index: 400;
  position: relative;
  .top {
    .title-icon {
      width: 500rpx;
      height: 86rpx;
    }
    .right-icon {
      width: 130rpx;
      height: 90rpx;
      position: relative;
      top: -10rpx;
    }
  }
  .btn-row {
    margin-bottom: 20rpx;
    .item {
      padding: 0 10rpx;
      height: 36rpx;
      line-height: 36rpx;
      background-color: #dce5ff;
      span {
        margin-right: 10rpx;
        font-family: SourceHanSansCN-Regular;
        font-size: 26rpx;
        color: #0b308e;
      }
      .icon {
        width: 23rpx;
        height: 23rpx;
      }
    }
  }

  .good-wrap {
    .left {
      margin-right: 20rpx;
      align-self: start;
      .cover {
        width: 232rpx;
        height: 232rpx;
      }
    }
    .right {
      flex: 1;
      .title {
        height: 32rpx;
        line-height: 32rpx;
        margin-bottom: 30rpx;
        font-family: SourceHanSansCN-Bold;
        font-size: 30rpx;
        color: #000000;
        font-weight: bold;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }

      .k-v-row {
        margin-bottom: 4rpx;
        display: flex;
        justify-content: space-between;

        &:last-child {
          margin-bottom: 0;
        }

        font-family: SourceHanSansCN-Normal;
        font-size: 26rpx;
        color: #868686;

        .active {
          color: red;
        }
      }
    }
  }
}
// .commiss-info {
//   margin-bottom: 30rpx;
//   padding: 22rpx 26rpx;
//   background-color: #ffffff;
//   border-radius: 20rpx;
//   z-index: 100;
//   position: relative;
//   display: flex;
//   &.none {
//     height: 251rpx;
//     .none-desc {
//       color: #333333;
//       font-size: 28rpx;
//       text-align: center;
//       margin-top: 14rpx;
//     }
//   }
//   .commiss-content {
//     flex: 1;
//     overflow: hidden;
//     .title {
//       width: 450rpx;
//       margin-top: 10rpx;
//       margin-left: 12rpx;
//     }
//     .commiss-name {
//       font-size: 30rpx;
//       color: #748cad;
//       margin-left: 31rpx;
//     }
//     .commiss-star {
//       font-size: 24rpx;
//       color: #231815;
//       margin-left: 30rpx;
//       .line-clamp-multi(1);
//     }
//     .btn-list {
//       padding-left: 26rpx;
//       .btn {
//         width: 141rpx;
//         height: 41rpx;
//         background-color: #9dc0ee;
//         border-radius: 14rpx;
//         color: #fff;
//         text-align: center;
//         line-height: 41rpx;
//         font-size: 25rpx;
//         margin-top: 13rpx;
//         float: left;
//         margin-right: 8rpx;
//       }
//     }
//   }
//   .head-thumbs {
//     float: right;
//     width: 186rpx;
//     height: 100%;
//     position: relative;
//     .head-img {
//       width: 145rpx;
//       height: 145rpx;
//       border-radius: 50%;
//       box-sizing: border-box;
//       border: 6rpx solid #fff;
//       overflow: hidden;
//       position: absolute;
//       z-index: 200;
//       top: 18rpx;
//       img {
//         width: 100%;
//         height: 100%;
//       }
//     }
//     .shadow {
//       position: absolute;
//       z-index: 190;
//       width: 145rpx;
//       height: 65rpx;
//       top: 130rpx;
//     }
//     .good-img {
//       width: 40rpx;
//       height: 40rpx;
//       position: absolute;
//       top: 125rpx;
//       right: 53rpx;
//       z-index: 210;
//     }
//     .give-me-good {
//       position: absolute;
//       bottom: 28rpx;
//       width: 145rpx;
//       text-align: center;
//       color: #595757;
//       font-size: 24rpx;
//       font-family: SourceHanSansCN-Normal;
//       font-weight: normal;
//       font-stretch: normal;
//     }
//   }
// }
</style>

<template>
  <div class="commiss-info felx-bc" :class="{ 'none': !info.employee_name }">
    <div class="commiss-content">
      <img src="/static/images/my/1.png" class="title" mode="widthFix" />
      <template v-if="info.employee_title">
        <!-- <div class="commiss-name">{{info.employee_name}}</div> -->
        <div class="commiss-star">{{info.employee_star}}星级专员，{{info.employee_title}}</div>
        <div class="btn-list flex">
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
      <div class="head-thumbs-box">
        <div class="head-img-wrap">
          <img class="head-img" :src="info.employee_photo" />
          <img class="like-icon" src="/static/images/my/6.png" v-if="like" @click="DoLike" />
        </div>
        <div class="name">{{info.employee_name}}</div>
        <div class="des">{{like_desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import noneBtn from './noneBtn'
export default {
  components: {
    noneBtn
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
.commiss-info {
  margin-bottom: 10rpx;
  padding: 10rpx 24rpx 20rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  z-index: 100;
  position: relative;
  display: flex;
  &.none {
    height: 251rpx;
    .none-desc {
      color: #333333;
      font-size: 28rpx;
      text-align: center;
      margin-top: 14rpx;
    }
  }
  .commiss-content {
    // width: 480rpx;
    flex: 1;

    .title {
      width: 500rpx;
      height: 86rpx;
      margin-bottom: 10rpx;
    }
    .commiss-name {
      font-size: 30rpx;
      color: #748cad;
      // margin-left: 31rpx;
    }
    .commiss-star {
      margin-bottom: 25rpx;
      // margin-left: 30rpx;
      .line-clamp-multi(1);
      font-size: 26rpx;
      color: #868686;
    }
    .btn-list {
      .btn {
        width: 137rpx;
        height: 48rpx;
        line-height: 48rpx;
        margin-right: 13rpx;
        background-color: #dce5ff;
        border-radius: 48rpx;
        text-align: center;
        font-family: SourceHanSansCN-Regular;
        font-size: 26rpx;
        color: #0b308e;
      }
    }
  }
  .head-thumbs {
    margin-left: 20rpx;
    padding-top: 10rpx;
    position: relative;
    .head-thumbs-box {
      position: relative;
      .head-img-wrap {
        width: 120rpx;
        height: 120rpx;
        margin-bottom: 26rpx;
        border-radius: 120rpx;
        box-sizing: border-box;
        position: relative;
        .head-img {
          width: 120rpx;
          height: 120rpx;
          border-radius: 120rpx;
          display: block;
        }

        .like-icon {
          width: 40rpx;
          height: 40rpx;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
      .name {
        margin-bottom: 10rpx;
        font-family: SourceHanSansCN-Regular;
        font-size: 24rpx;
        line-height: 24rpx;
        color: #0b308e;
        text-align: center;
      }
      .des {
        font-family: SourceHanSansCN-Regular;
        font-size: 20rpx;
        color: #0b308e;
        text-align: center;
      }
    }
  }
}
</style>

<template>
  <div class="card" @click="GoLogin">
    <img class="card-bg" src="/static/images/common/my_bg.png" />
    <div class="flex-c">
      <img class="avatar" mode="aspectFit" :src="info.userpic" />
      <div>
        <span class="name">{{ info.nickname }}</span>
        <div v-if="leveltext">
          <span class="level">{{leveltext}}</span>
        </div>
      </div>
    </div>
    <div class="tag tag-1" @click.stop="$nav('archives')">我的消防档案</div>
    <div class="tag tag-2" @click.stop="$nav('stop')">我的诊断报告</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // level: 1
    }
  },
  methods: {
    GoLogin () {
      if (this.info.gp_login) {
        uni.navigateTo({
          url: '/pages/authorize/userInfo/main'
        })
      }
    }
  },
  props: {
    info: {
      type: Object,
      default: {
        nickname: '登陆/注册',
        userpic: '/static/images/common/avatar.png',
        gp_login: true
      }
    }
  },
  computed: {
    leveltext () {
      let text = ''

      // 用户当前的身份 user会员 archives 党员  propaganda 义务宣传员
      switch (this.info.identity) {
        case 'user':
          text = '会员'
          break
        case 'archives':
          text = '档员'
          break
        case 'propaganda':
          text = '义务宣传员'
          break
      }

      return text
    }
  }
}
</script>
<style lang="less" scoped>
button {
  background: linear-gradient(-90deg, #0a2d8f 0%, #466bd3 100%),
    linear-gradient(#0a2d8f, #0a2d8f);
  color: #fff;
  box-shadow: 0 10rpx 20rpx 0 rgba(10, 45, 143, 0.2);
  border-radius: 80rpx;
  &::after {
    border: none;
  }
}
.card {
  position: relative;
  box-sizing: border-box;
  margin-top: 20rpx;
  padding: 30rpx;
  width: 690rpx;
  height: 220rpx;
  background: transparent;
  box-shadow: 0px 8px 16px 0px rgba(21, 133, 236, 0.18);
  .card-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .avatar {
    margin-right: 20rpx;
    width: 110rpx;
    height: 110rpx;
    border-radius: 50%;
  }
  .name {
    font-weight: bold;
    .fz(38rpx);
    .c;
    max-width: 280rpx;
    .line-clamp-multi(1);
  }
  .level {
    height: 38rpx;
    line-height: 38rpx;
    padding: 0 25rpx;
    border-radius: 40rpx;
    background-color: #ffffff;
    font-family: SourceHanSansCN-Medium;
    font-size: 26rpx;
    color: #0a2d8f;
  }

  button {
    width: 140rpx;
    height: 50rpx;
    line-height: 50rpx;
    .bg;
    .fz(26rpx);
    .c(@theme-color);
    border-radius: 25rpx;
  }
  .tag {
    background: rgba(225, 225, 225, 0.2);
    border-radius: 23rpx 0px 0px 23rpx;
    padding: 10rpx 13rpx;
    color: #fff;
    font-size: 26rpx;
    position: absolute;
    right: 0;
  }
  .tag-1 {
    top: 30rpx;
  }
  .tag-2 {
    top: 96rpx;
  }
}
</style>

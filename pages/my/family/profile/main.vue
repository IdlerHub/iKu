<template>
  <div class="profile">
    <!-- 个人资料信息 -->
    <Profile :info="info"></Profile>
    <!-- 服务专员 -->
    <div v-if="info.employee_name" class="panel mt--47">
      <div class="left">
        <p class="main mb-27">您的服务专员</p>
        <p class="main">{{ info.employee_name }}</p>
        <p>已有<span style="color: #fb2142">{{ info.employee_fans }}</span>个家庭选择了我</p>
        <div class="flex-c mt-40">
          <div class="mr-30">
            <IntroduceButton 
              size="XS" 
              type="primaryB" 
              name="专员简介" 
              @clickBtn="$nav('consult', { id: info.user_exclusive_employee_no })"
            ></IntroduceButton>
          </div>
          <div class="mr-30">
            <ContactButton 
              size="XS" 
              type="primaryB" 
              name="联系专员" 
              @clickBtn="$nav('contact')"
            ></ContactButton>
          </div>
          <ChangeButton size="XS" type="primaryB" name="更换专员" @clickBtn="$nav('classroom')"></ChangeButton>
        </div>
      </div>
      <div class="like-btn" :class="{'grey': !showLike}" @click="like">
        <i class="iconfont icon-appreciatefill"></i>
        <span>点赞</span>
      </div>
    </div>
    <div v-else class="panel mt--47 block">
      <p class="main">您的服务专员</p>
      <div class="blank">
        您还未选择专属消防专员
        <div class="btn-box">
          <ChangeButton name="立即选择专员" size="L" @clickBtn="$nav('classroom')"></ChangeButton>
        </div>
      </div>
    </div>
    <!-- 产品信息 -->
    <div class="panel block">
      <p class="main">您的产品信息</p>
      <Products v-if="products.length" :list="products"></Products>
      <div v-else class="blank">
        您还未购买任何消费产品
        <div class="btn-box">
          <ChangeButton name="立即配置" size="L" @clickBtn="$nav('mall')"></ChangeButton>
        </div>
      </div>
    </div>
    <!-- 案例 -->
    <div class="panel block">
      <p class="main mb-20">案例必看！家庭火灾保命篇</p>
      <Classes :list="recommend_class"></Classes>
    </div>
    <!-- 新增轮播图 -->
    <swiper 
      :indicator-dots="true"
      :autoplay="true"
      indicator-color="rgba(255, 255, 255, 0.3)" 
      indicator-active-color="#fff" 
      class="banner-box"
    >
      <swiper-item v-for="(img, i_index) in imgs" :key="i_index" @click="clickSwiper(img)">
        <img :src="img.img + imgProcess.w375" mode="aspectFill" class="banner">
      </swiper-item>
    </swiper>
    <!-- 文案 -->
    <div class="panel block">
      <p class="main mb-20">保护家人！必学家庭消防知识篇</p>
      <p style="color: #999">精彩内容，敬请期待</p>
    </div>
    <!-- 悬浮按钮 -->
    <Share></Share>
    <Buy>111</Buy>
  </div>
</template>

<script>
import Profile from '@/components/my/family/card'
import Products from '@/components/my/family/products'
import Button from '@/components/common/button/button'
import Classes from '@/components/classroom/scrollClass'
import Share from '@/components/common/menu/share'
import Buy from '@/components/common/menu/buy'
export default {
  components: {
    Profile,
    IntroduceButton: Button,
    ContactButton: Button,
    ChangeButton: Button,
    Products,
    Classes,
    Share,
    Buy
  },
  data () {
    return {
      imgProcess: this.$imgProcess,
      recommend_class: [],
      info: {},
      products: [],
      imgs: [],
      showLike: true
    }
  },
  methods: {
    async getInfo () {
      let args = {
        url: this.api('getProfile'),
        loading: true
      }
      let res = await this.get(args)
      parseInt(res.code) === 200 && this.getBanner()
      if (res.status) {
        this.info = res.data.member
        this.recommend_class = res.data.recommend_list
        this.products = res.data.items
        this.showLike = parseInt(res.data.thumbs_employee_no) !== 1
      }
    },
    // 点击轮播图跳转
    clickSwiper (item) {
      let type = item.target_type
      console.log(item.target_type, item.target)

      switch (type) {
        case 'goods':
          this.$nav('goodsDetail', { product_sn: item.target })
          break
        case 'employee':
          this.$nav('consult', { id: item.target })
          break
        case 'class':
          this.$nav('class', { id: item.target })
          break
        case 'article':
          this.$nav('article', { id: item.target })
          break
      }
    },
    async getBanner () {
      let res = await this.get({ url: this.api('profileBanner') })
      if (res.status) {
        this.imgs = res.data.banner
      }
    },
    async like () {
      if (this.showLike) {
        let args = {
          url: this.api('thumbsUpConsultant'),
          data: {
            employee_no: this.info.user_exclusive_employee_no,
            type: 1
          }
        }
        let res = await this.post(args)
        if (res.status) {
          uni.showToast({
            title: '点赞成功'
          })
          this.showLike = false
        }
      }
    }
  },
  onShow () {
    this.getInfo()
  }
}
</script>
<style lang="less" scoped>
.profile {
  .banner-box {
    padding: 0 20rpx;
    width: 100%;
    box-sizing: border-box;
    height: 182rpx;
    .banner {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
      margin: 0;
      padding: 0;
    }
  }
  .mt--47 {
    margin-top: -47rpx !important;
  }
  .panel {
    padding: 30rpx 20rpx;
    background: #fff;
    margin: 20rpx 24rpx;
    color: #333;
    .br(10rpx);
    display: flex;
    justify-content: space-between;
    font-size: 26rpx;
    .main {
      font-weight: bold;
      font-size: 30rpx;
    }
    .mt-40 {
      margin-top: 40rpx;
    }
    .mr-30 {
      margin-right: 30rpx;
    }
    .like-btn {
      margin-right: 40rpx;
      background-image: linear-gradient(-45deg, 
        #0a2d8f 0%, 
        #6789e9 100%), 
      linear-gradient(
        #1585ec, 
        #1585ec);
      background-blend-mode: normal, 
        normal;
      box-shadow: 0px 10rpx 20rpx 0px 
        rgba(10, 45, 143, 0.26);
      .w(140rpx);
      .h(140rpx);
      .c(#fff);
      .fz(24rpx);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      text-align: center;
      .iconfont {
        .fz(42rpx);
        .c(#fff);
      }
    }
    .grey {
      background: #c4c4c4;
      box-shadow: 0px 10rpx 20rpx 0px 
        rgba(0, 0, 0, 0.16);
    }
  }
  .block {
    display: block;
    .blank {
      text-align: center;
      padding-top: 29rpx;
      font-size: 30rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .btn-box {
        padding-top: 20rpx;
        .w(220rpx);
      }
    }
  }
}
</style>


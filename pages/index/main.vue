<template>
  <div class="index">
    <template v-if="!loading">
      <!-- 搜索框 -->
      <div class="top-fixed">
        <Search placeholder="搜索产品、活动、视频、服务专员" @clickSearch="$nav('search')"></Search>
      </div>
      <div class="search-height"></div>
      <!-- 轮播图 -->
      <template v-if="swiper_list.length > 0">
        <Swiper :swiper_list="swiper_list" @clickSwiper="clickSwiper"></Swiper>
      </template>
      <!-- 直播间 -->
      <template v-if="live_list && live_list.length > 0">
        <Heading :title="live_title" @clickMore="$nav('live')"></Heading>
        <div class="live-list scroll-x">
          <div v-for="(live, live_i) in live_list" :key="live_i">
            <div class="live-box" @click="GoLive(live)">
              <img :lazy-load="true" mode="aspectFill" :src="live.photo_url + imgProcess.w360h220" />
              <div class="title">{{ live.title }}</div>
            </div>
          </div>
        </div>
      </template>
      <!-- 课程 -->
      <template v-if="course_list && course_list.length > 0">
        <Heading :title="course_title" @clickMore="$nav('classroom')"></Heading>
        <div class="goods-list scroll-x">
          <div v-for="(course, course_i) in course_list" :key="course_i">
            <div class="goods-box" @click="$nav('class', { id: course.id })">
              <img :lazy-load="true" mode="aspectFill" :src="course.photo_url + imgProcess.w440h220" />
              <div class="title line-clamp">{{ course.title }}</div>
            </div>
          </div>
        </div>
      </template>
      <!-- 商品 -->
      <template v-if="goods_list && goods_list.length > 0">
        <Heading :title="goods_title" @clickMore="$nav('mall')"></Heading>
        <div class="goods-list scroll-x">
          <div v-for="(goods, goods_i) in goods_list" :key="goods_i">
            <div class="goods-box" @click="$nav('goodsDetail', { product_sn: goods.product_sn })">
              <img :lazy-load="true" mode="aspectFill" :src="goods.thumb + imgProcess.w440h220" />
              <div class="title line-clamp">{{ goods.product_name }}</div>
            </div>
          </div>
        </div>
      </template>
      <!-- 顾问 -->
      <template v-if="consultant_list && consultant_list.length > 0">
        <Heading :title="consultant_title" @clickMore="$nav('classroom')"></Heading>
        <div class="member-list scroll-x">
          <div v-for="(consult, consult_i) in consultant_list" :key="consult_i">
            <div class="member-box" @click="$nav('consult', { id: consult.employee_no })">
              <img :lazy-load="true" mode="aspectFill" :src="consult.photo_url + imgProcess.wh280" />
              <div class="bottom-bar">
                <div class="name">{{ consult.employee_name }}</div>
                <div class="desc line-clamp">{{ consult.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <Heading title="预约"></Heading>
      <div class="blank">精彩内容，敬请期待~</div>
      <MenuGroup :type="3"></MenuGroup>
      <div class="official-box">
        <OfficialAccount></OfficialAccount>
      </div>

      <!-- 优惠卷弹窗 -->
      <CouponPoper @receive="getCouponF" :show.sync="coupon_show" :list="coupon_list"></CouponPoper>
    </template>
  </div>
</template>

<script>
import Swiper from '@/components/common/swiper/index'
import Search from '@/components/common/search/search-default'
import Heading from '@/components/index/heading'
import MenuGroup from '@/components/common/menu/menuGroup'
import OfficialAccount from '@/components/common/official-account/official-account'
import CouponPoper from '@/components/coupon/newCouponPoper'
import { Pageshare } from '@/utils/Mixin'
export default {
  mixins: [Pageshare],
  components: {
    Swiper,
    Search,
    Heading,
    MenuGroup,
    OfficialAccount,
    CouponPoper
  },
  data () {
    return {
      imgProcess: this.$imgProcess,
      loading: true,
      swiper_list: [],
      // 直播
      live_title: '直播间',
      live_list: [],
      // 标题
      goods_title: '',
      consultant_title: '',
      course_title: '',
      // 列表
      goods_list: [],
      consultant_list: [],
      course_list: [],
      // 优惠卷
      coupon_get: false,
      coupon_show: false,
      coupon_list: [],
      scane_statue: false,
      sharePageKey: 'home',
      close_shareContent: true
    }
  },
  onLoad () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  async onShow () {
    await this.getIndex()
    let isHide = wx.getStorageSync('appp_on_hide')
    if (parseInt(isHide) === 1) {
      this.coupon_get = false
      wx.setStorageSync('appp_on_hide', 0)
    }
    await this.getCoupon()
  },
  methods: {
    GoLive (item) {
      this.createLiveBrowseLog(item)
      wx.navigateTo({ url: item.url })
    },
    createLiveBrowseLog (item) {
      let args = {
        url: this.api('createLiveBrowseLog'),
        data: {
          roomid: item.id
        }
      }
      this.post(args)
    },
    getCouponF () {
      let args = {
        url: this.api('getHomeCouponV2'),
        goLogin: false
      }
      this.get(args).then(res => {
        this.coupon_get = true
        this.coupon_list = res.data || []
        if (this.coupon_list.length > 0) {
          this.coupon_show = true
        }
      })
    },
    // 获取优惠卷信息
    getCoupon () {
      if (this.coupon_get && !this.coupon_show) return
      let args = {
        url: this.api('getHomeCouponV2'),
        goLogin: false
      }
      this.get(args).then(res => {
        this.coupon_get = true
        this.coupon_list = res.data || []
        if (this.coupon_list.length > 0) {
          this.coupon_show = true
        } else {
          this.coupon_show = false
        }
      })
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
    async getIndex () {
      let args = {
        url: this.api('getIndex'),
        loading: this.loading
      }
      let res = await this.httpGet(args)
      console.log('首页数据：', res)

      this.loading = false
      if (res.status) {
        let re = res.data

        this.swiper_list = re.banner ? re.banner : []

        this.goods_list = re.product
        this.consultant_list = re.consultants
        this.course_list = re.class

        this.goods_title = re.product_title
        this.consultant_title = re.consultant_title
        this.course_title = re.class_title

        this.live_title = re.live_title
        this.live_list = re.live.map(item => ({
          photo_url: item.share_img,
          id: item.roomid,
          title: item.name,
          url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${item.roomid}`
        }))
      } else {
        uni.showToast({
          title: res.msg ? res.msg : '系统繁忙,请稍候',
          icon: 'none'
        })
      }
      console.log('首页loading，等于false代表加载完成：', this.loading)
      this.getCartList()
      this.shareContent()
      this.isConsult()
      this.$Tool.SetRecordParameter()
      wx.hideLoading()
    },
    // 绑定专员
    async isConsult () {
      if (!this.$root.$mp.query.scene) {
        return
      }
      let scene = decodeURIComponent(this.$root.$mp.query.scene).split('_')
      console.log('scene', scene)

      if (scene[0] !== 'undefined') {
        // 所有二维码都要绑定/关注专员
        let idIndex = scene.findIndex(item => {
          return item === 'employee'
        })
        if (idIndex || idIndex === 0) {
          let id = scene[idIndex + 1]
          let args = {
            url: this.api('chooseConsultant'),
            data: {
              employee_no: id
            }
          }
          let res = await this.post(args)
          if (res.status) {
            console.log('专员绑定')
            this.handleScene(scene)
          }
        } else {
          this.handleScene(scene)
        }
      }
    },
    handleScene (scene) {
      if (this.scane_statue) return
      if (scene[0] === 'employee') {
        wx.navigateTo({
          url: `/pages/classroom/consult/main?id=${scene[1]}&isConsult=true`
        })
        this.scane_statue = true
      } else if (scene[0] === 'query') {
        uni.setStorageSync('code', scene[1])
        uni.setStorageSync('employee', scene[3])
        wx.switchTab({
          url: `/pages/mall/index/main`
        })
        this.scane_statue = true
      }
    },
    // 获取购物车，设置tabbar角标
    async getCartList () {
      let openId = uni.getStorageSync('loginUserinfo')
        ? uni.getStorageSync('loginUserinfo').openId
        : ''
      let args = {
        url: this.api('getMyCartNum'),
        loading: false,
        open_id: openId
      }
      let res = await this.get(args)
      if (
        res.status &&
        res.data &&
        parseInt(res.data.shop_cart_goods_num) > 0
      ) {
        // 购物车角标
        wx.setTabBarBadge({
          index: 3,
          text: res.data.shop_cart_goods_num.toString()
        })
      } else {
        wx.removeTabBarBadge({
          index: 3
        })
      }
    }
  },
  onShareAppMessage () {
    this.$Tool.SetRecordScene({
      page: 'share',
      content_type: 'share_page',
      content_id: this.sharePageTitle
    })
    return {
      title: this.sharePageTitle,
      path: `/pages/index/main?uid=${this.uid}&t=s`
    }
  },
  onPullDownRefresh () {
    uni.hideNavigationBarLoading() // 完成停止加载
    uni.stopPullDownRefresh() // 停止下拉刷新
    this.getIndex()
  },
  onUnload () {
    this.$Tool.SetBrowseID()
  }
}
</script>
<style lang="less" scoped>
.index {
  padding-bottom: 1rpx;
  .live-list {
    margin: 0 20rpx;
    font-size: 0;
    .live-box {
      position: relative;
      margin: 0 10rpx;
      width: 360rpx;
      height: 220rpx;
      background: #fff;
      border-radius: 10rpx;
      img {
        width: 100%;
        height: 100%;
        .br;
      }
      .title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 6rpx 20rpx;
        background: rgba(0, 0, 0, 0.35);
        font-size: 28rpx;
        line-height: 1.5;
        color: #fff;
        .line-clamp-multi();
        .br-bl;
        .br-br;
      }
    }
  }
  .goods-list {
    margin: 0 20rpx;
    font-size: 0;
    .goods-box {
      position: relative;
      margin: 0 10rpx;
      width: 440rpx;
      height: 220rpx;
      background: #fff;
      border-radius: 10rpx;
      img {
        width: 100%;
        height: 100%;
        .br;
      }
      .title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 14rpx 20rpx;
        background: rgba(0, 0, 0, 0.35);
        font-size: 28rpx;
        color: #fff;
        line-height: 1;
        .br-bl;
        .br-br;
      }
    }
  }
  .member-list {
    margin: 0 20rpx;
    font-size: 0;
    .member-box {
      margin: 0 10rpx;
      position: relative;
      width: 280rpx;
      height: 280rpx;
      img {
        width: 100%;
        height: 100%;
        .br;
      }
      .bottom-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 18rpx 20rpx;
        background: rgba(0, 0, 0, 0.35);
        line-height: 1;
        .fz(24rpx);
        .c;
        .br-bl;
        .br-br;
      }
      .name {
        margin-bottom: 10rpx;
        .fz(28rpx);
        font-weight: bold;
      }
    }
  }
  .blank {
    margin: 0 30rpx 60rpx 30rpx;
    height: 90rpx;
    line-height: 90rpx;
    .bg;
    .fz(30rpx);
    color: #999999;
    text-align: center;
    .br;
  }
  .official-box {
    margin: 0 30rpx 30rpx 30rpx;
  }
}
</style>

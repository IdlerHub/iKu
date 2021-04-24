<template>
  <div class="goods-panel">
    <div class="list">
      <div v-for="(item, index) in list" :key="index">
        <template v-if="type == 0">
          <!-- 单品 -->
          <template v-if="item.type == 1">
            <div v-for="(goods, goods_i) in item.items" :key="goods_i">
              <ProductGoods :goods="goods"></ProductGoods>
            </div>
          </template>
          <!-- 套餐 -->
          <template v-if="item.type == 2">
            <PackageGoods :item="item"></PackageGoods>
          </template>
        </template>
        <template v-if="type == 1">
          <ProductGoods :goods="item"></ProductGoods>
        </template>
      </div>
      <template v-if="type == 2">
        <PackageGoods :item="list"></PackageGoods>
      </template>
    </div>
    <!-- 发票 -->
    <div class="line border-1px-b flex-bc" @click="$nav('invoice')">
      <div class="left">发票</div>
      <div class="right flex-c">
        <span class="placeholder" v-if="invoice_type === 0 && !cash_pay_warn">请选择发票</span>
        <span v-if="invoice_type === 0 && cash_pay_warn">需收款后开票，建议选择线上支付</span>
        <span v-if="invoice_type === 1">电子(商品明细-个人)</span>
        <span v-if="invoice_type === 2">电子(商品明细-企业)</span>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <!-- 支付方式 -->
    <div
      class="line flex-bc"
      :class="{
      'border-1px-b': is_coupon
    }"
      v-if="pay_list"
      @click="togglePayPopup"
    >
      <div class="left">支付方式</div>
      <div class="right flex-c">
        <span>{{ pay_list[pay_index].title }}</span>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <!-- 优惠卷 -->
    <div class="line flex-bc border-1px-b" v-if="is_coupon" @click="toggleCouponPopup">
      <div class="left">优惠卷</div>
      <div class="right flex-c">
        <span>{{coupon_active_value}}</span>
        <i class="iconfont icon-right"></i>
      </div>
    </div>

    <!-- 勋章抵扣 -->
    <div class="line flex-bc">
      <div class="left">勋章抵扣</div>
      <div class="right flex-c" style="margin-right:40rpx;">
        <span>抵</span>
        <span class="unit">￥</span>
        <span class="price">{{integrationAmount}}</span>
      </div>
    </div>

    <!-- 输入数量 -->
    <div class="btn-row flex-c">
      <div class="left">
        <span>可用</span>
        <span class="value">{{banlance}}</span>
        <span>个勋章，使用</span>
      </div>
      <div class="middle">
        <Stepper
          :stepper_value.sync="deductionIntegration"
          :min="0"
          :max="bestIntegration"
          :section="10"
          :integer="true"
          @updateNum="getGuige"
        ></Stepper>
      </div>
      <span>个</span>
    </div>
    <div class="desc  border-1px-b">
      勋章抵扣数值需是10的倍数，小于10勋章数无法抵扣
    </div>
    <!-- 到货日期 -->
    <div class="position-row" v-if="expected">
      <div class="line editor-line flex-bc">
        <div class="left date-row flex-c">
          <span>预计到货日期</span>
          <div class="date">{{date||''}}</div>
        </div>
        <div class="right flex-c">
          <div class="editor">修改</div>
          <img :lazy-load="true" class="editor-icon" src="/static/images/icon/1.png" mode="aspectFill" />
        </div>
      </div>
      <picker mode="date" :start="start" :end="end" :value="date" @change="dateChange">
        <view class="date-picker">当前选择: {{date}}-{{start}}</view>
      </picker>
    </div>

    <!-- 支付方式弹窗 -->
    <PayPopup :show.sync="pay_popup_show" :list="pay_list" :index.sync="pay_index"></PayPopup>
    <!-- 优惠卷弹窗 -->
    <CouponPopup :show.sync="coupon_popup_show" :list="coupon_list" :index.sync="coupon_index"></CouponPopup>
  </div>
</template>

<script>
import PayPopup from './payPopup'
import ProductGoods from './productGoods'
import PackageGoods from './packageGoods'
import CouponPopup from './couponPopup'
import Stepper from '@/components/common/stepper/index.vue'

export default {
  components: { PayPopup, ProductGoods, PackageGoods, CouponPopup, Stepper },
  props: {
    type: {
      type: [Number, String],
      default: 0
    }, // 商品类型
    list: Array,
    invoice_type: Number,
    // 可用优惠卷信息
    coupon_list: Array,
    is_coupon: {
      type: null,
      default: true
    },
    // 预约信息
    expected: {
      default: null
    },
    // 勋章
    integration: {
      default: null
    },
    // 使用勋章数量
    deductionIntegration: {
      default: 0
    },
    // 到货日期
    date: {
      default: null
    }
  },
  data () {
    return {
      pay_popup_show: false,
      pay_list: '',
      pay_index: 0,
      cash_pay_on: true, // 货到付款是否开启
      // 优惠卷数据
      coupon_popup_show: false,
      coupon_index: '',
      num: 1,
      store: 1,
      // date: '',
      start: '',
      end: '',
      arrivalDate: '',
      isInitDate: false,
      isIos: false,
      banlance: 0,
      bestIntegration: 0
    }
  },
  mounted () {
    this.getPayMethod()
    this.getSystemInfo()
    // this.initDeductionIntegration()
    // this.$Bus.$on('onAddCart', res => {
    //   console.log('重置勋章')
    //   this.initDeductionIntegration()
    // })
  },
  methods: {
    // 重置勋章可用数量
    // initDeductionIntegration (n = false) {
    //   let i = 0
    //   if (n !== false) {
    //     i = n
    //   } else if (this.integration) {
    //     i = parseInt(this.integration.best_integration)
    //   }
    //   this.$emit('update:deductionIntegration', i)
    //   this.$emit('getConfirmData')
    // },
    // 重置到货日期显示
    initReceiveDate (date) {
      this.$emit('update:date', date)
    },
    getDate (day) {
      let date = new Date()
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * day)
      let y = date.getFullYear()
      let m = (date.getMonth() + 1).toString().padStart(2, '0')
      let d = date
        .getDate()
        .toString()
        .padStart(2, '0')

      return { y, m, d }
    },
    getSystemInfo () {
      this.start = null
      this.end = null
      wx.getSystemInfo({
        success: res => {
          if (res.platform === 'devtools') {
            // PC
            this.isIos = false
          } else if (res.platform === 'ios') {
            // IOS
            this.isIos = true
          } else if (res.platform === 'android') {
            // android
            this.isIos = false
          }

          if (this.expected && this.expected.expected_receive_date) {
            let date = new Date(this.expected.expected_receive_date)

            // date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
            let y = date.getFullYear()
            let m = (date.getMonth() + 1).toString().padStart(2, '0')
            let d = date
              .getDate()
              .toString()
              .padStart(2, '0')
            let q = this.isIos ? '/' : '-'
            this.start = `${y}${q}${m}${q}${d}`
            let endData = this.getDate(365)
            this.end = `${endData.y}${q}${endData.m}${q}${endData.d}`
          }
        }
      })
    },
    dateChange ({
      mp: {
        detail: { value }
      }
    }) {
      this.$emit('update:date', value)
      // let date = this.date
      // if (
      //   this.expected &&
      //   this.expected.not_date &&
      //   this.expected.not_date.length > 0
      // ) {
      //   let bool =
      //     this.expected.not_date.indexOf(value) >= 0 || value === this.start;
      //   if (bool) {
      //     this.$emit("update:date", "");
      //     this.$toast("不可以选择此日期");
      //   } else {
      //     date = value;
      //   }

      //   this.$emit("update:date", date);
      // }
    },
    MsecTime (time) {
      const date = new Date(Number(time))
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date
        .getDate()
        .toString()
        .padStart(2, '0')
      return [year, month, day]
    },
    togglePayPopup () {
      if (this.cash_pay_on) {
        this.pay_popup_show = !this.pay_popup_show
      }
    },
    toggleCouponPopup () {
      if (this.coupon_list.length > 0) {
        this.coupon_popup_show = !this.coupon_popup_show
      }
    },
    async getPayMethod () {
      const { is_group: isGroup } = this.$root.$mp.query
      let args = {
        url: this.api('getPayMethod'),
        data: {
          order_type:
            typeof isGroup !== 'undefined' && Number(isGroup) === 1 ? 4 : 0
        }
      }
      let res = await this.get(args)
      if (res.status) {
        let re = res.data
        this.pay_list = re.arr
        this.cash_pay_on = Number(re.is_open_cash_on_delivery) === 1
      } else {
        this.$toast(res.msg)
      }
    },
    getGuige () {
      this.$emit('update:deductionIntegration', this.deductionIntegration)
      this.$emit('getConfirmData')
    }
  },
  computed: {
    // 最大可用勋章
    // bestIntegration() {
    //   if (this.integration) {
    //     return parseInt(this.integration.best_integration);
    //   }
    //   return 0;
    // },
    // 勋章余额
    integrationBalance () {
      if (this.integration) {
        return parseFloat(this.integration.integration_balance)
      }
      return 0
    },
    integrationAmount () {
      if (this.integration) {
        return parseFloat(this.integration.integration_amount)
      }
      return 0
    },
    // _arrivalDate () {
    //   if (this.date) {
    //     let arr = this.date.split('-')
    //     return `${arr[1]}月${arr[2]}日`
    //   }

    //   return ''
    // },
    // 货到付款发票警告
    cash_pay_warn: function () {
      if (!this.pay_list) {
        return false
      }
      if (this.cash_pay_on) {
        if (
          this.pay_list[this.pay_index].type * 1 === 2 &&
          this.invoice_type === 0
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    coupon_active_value () {
      if (this.coupon_list && this.coupon_list.length === 0) return '无可用优惠卷'
      if (this.coupon_index === '') return '有可用优惠卷'
      return this.coupon_list[this.coupon_index].coupon_name
    },
    _expected () {
      this.getSystemInfo()
      if (
        this.expected &&
        this.expected.expected_receive_date &&
        this.isInitDate === false
      ) {
        this.initReceiveDate(this.expected.expected_receive_date)
        this.isInitDate = true
      }
      return false
    }
  },
  watch: {
    coupon_index () {
      this.$emit('getConfirmData')
    },
    expected (n) {
      this.getSystemInfo()
    },
    bestIntegration (n, o) {
      // 最大可用勋章数量改变时，重新赋值
      this.$emit('update:deductionIntegration', n)
      this.$emit('getConfirmData')
    },
    integration (n, o) {
      if (n) {
        this.banlance = n.integration_balance
        this.bestIntegration = this.integration.best_integration
        if (!o) {
          this.bestIntegration = n.best_integration
        } else if (n.best_integration !== o.best_integration) {
          this.bestIntegration = n.best_integration
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.goods-panel {
  margin-bottom: 20rpx;
  padding: 0 20rpx;

  .bg;
  .br;
  .line {
    height: 100rpx;
    font-size: 28rpx;
    .left {
      color: #999;
    }
    .right {
      color: #333;
      .lh;
      .iconfont {
        margin-left: 20rpx;
      }
      .placeholder {
        color: #999;
      }
    }

    .unit {
      font-family: SourceHanSansCN-Medium;
      font-size: 28rpx;
      color: #fb2142;
    }
    .price {
      font-family: WeChatNumber-151125;
      font-size: 28rpx;
      color: #fb2142;
    }

    .date {
      margin-left: 20rpx;
      font-family: SourceHanSansCN-Regular;
      font-size: 28rpx;
      color: #333333;
    }

    .editor {
      font-family: SourceHanSansCN-Regular;
      font-size: 28rpx;
      color: #0a2d8f;
    }
    .editor-icon {
      width: 30rpx;
      height: 30rpx;
      margin-left: 10rpx;
      display: block;
    }
  }
  .desc {
    color: #fb2142;
    font-size: 24rpx;
    padding-bottom: 20rpx;
  }
  .position-row {
    position: relative;
    .date-picker {
      width: 100%;
      height: 100%;
      z-index: 10;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .btn-row {
    padding-bottom: 20rpx;
    font-family: SourceHanSansCN-Regular;
    font-size: 28rpx;
    color: #333333;

    .value {
      font-family: SourceHanSansCN-Regular;
      font-size: 28rpx;
      color: #fb2142;
    }
    .middle {
      padding: 0 30rpx;
    }
  }
}
</style>

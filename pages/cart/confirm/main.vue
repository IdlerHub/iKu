<template>
  <div class="confirm" v-if="!loading">
    <AddressPanel :item.sync="address" @change="addressChange"></AddressPanel>
    <GoodsPanel
      :key="panel_key"
      :list="goods_list"
      :coupon_list="coupon_list"
      :invoice_type="invoice_type"
      :expected="expected"
      :date.sync="receiveDate"
      :integration="integration"
      :deductionIntegration.sync="deductionIntegration"
      ref="goodsPanel"
      @getConfirmData="refreshPrice"
    ></GoodsPanel>
    <!-- 备注 -->
    <div class="remark flex-c">
      <div class="left">订单备注</div>
      <input v-model="remark" type="text" class="flex-1" placeholder="输入备注" />
    </div>
    <!-- 底部 -->
    <div class="bottom-fixed-h"></div>
    <div class="bottom-fixed flex-bc">
      <div class="left">
        <span>合计：</span>
        <span class="money">￥{{ total_price }}</span>
      </div>
      <Btn name="确认支付" size="L" @clickBtn="onAddOrder"></Btn>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/common/button/button'
import AddressPanel from '@/components/cart/confirm/address'
import GoodsPanel from '@/components/cart/confirm/goods'

export default {
  components: { Btn, AddressPanel, GoodsPanel },
  data () {
    return {
      loading: true,
      cart_ids: '',
      address: '',
      goods_list: '',
      invoice_type: 0, // 0: 未选择，1：个人，2：企业
      invoice_id: 0,
      remark: '',
      total_price: 0,
      order_sn: '',
      can_submit: true,
      coupon_list: [],
      panel_key: 0,
      expected: null,
      integration: null,
      deductionIntegration: 0, // 抵扣的勋章
      receiveDate: null, // 到货日期
      addressId: '',
      needInitReceiveDate: true, // 需要重置到货日期
      needInitDeductionIntegration: true, // 需要重置勋章数量
      needInitAddress: true, // 需要重置收货地址
      needConfirm: true, // 需要请求确认订单接口
      is_load:false
    }
  },
  onLoad (option) {
    this.cart_ids = option.cart_ids
    console.log('确认订单页-onload获取其他页面传来的cart_ids：', this.cart_ids)
    wx.nextTick(() => {
      this.confirmOrder()
    })
  },
  onShow () {
    this.can_submit = true
    this.panel_key++
    this.getStorage()
    if(this.is_load){
      this.confirmOrder()
    }

    this.is_load = true
  },
  onUnload () {
    this.reSet()
  },
  methods: {
    reSet () {
      this.expected = null
      this.integration = null
      this.address = ''
      this.goods_list = ''
      this.coupon_list = []
      this.cart_ids = ''
      this.total_price = 0
      this.deductionIntegration = 0
      this.needInitReceiveDate = true
      this.needInitDeductionIntegration = true
      this.needInitAddress = true
      this.needConfirm = true
    },
    initAddressId () {
      // 重置收货地址
      if (this.needInitAddress) {
        this.addressId = this.address ? this.address.address_id : ''
        this.needInitAddress = false
      }
    },
    initReceiveDate () {
      // 重置到货日期
      if (this.needInitReceiveDate && this.$refs.goodsPanel) {
        this.$refs.goodsPanel.initReceiveDate(this.expected.expected_receive_date)
        this.needInitReceiveDate = false
        console.log('重置到货日期')
      }
    },
    initDeductionIntegration () {
      // 重置勋章数量
      if (this.needInitDeductionIntegration && this.integration) {
        this.deductionIntegration = parseInt(this.integration.best_integration || 0)
        this.needInitDeductionIntegration = false
      }
    },
    // 修改地址后需要重置到货日期
    addressChange (item) {
      this.address = item
      this.addressId = item.address_id
      this.needInitReceiveDate = true
    },
    getStorage () {
      let that = this
      wx.getStorage({
        key: 'invoice',
        success: res => {
          that.invoice_id = res.data.id
          that.invoice_type = res.data.type
        }
      })
      // wx.getStorage({
      //   key: 'address',
      //   success: res => {
      //     this.addressId = res && res.data ? res.data.address_id : ''
      //     console.log('this.addressId', this.addressId)
      //   }
      // })

      // try {
      //   var res = wx.getStorageSync('address')
      //   this.addressId = res ? res.address_id : ''
      // } catch (e) {
      // }
    },
    onAddOrder () {
      if (!this.address) {
        this.$toast('请选择收货地址')
      } else {
        this.addCartOrder()
      }
    },
    // 选择优惠卷后重新获取价格显示
    async refreshPrice () {
      if (!this.needConfirm) return false
      let couponId = ''
      if (this.$refs.goodsPanel) {
        const { coupon_index: cIndex } = this.$refs.goodsPanel
        couponId =
          parseInt(cIndex) >= 0
            ? this.coupon_list[cIndex].coupon_instance_id
            : ''
      }

      let args = {
        url: this.api('confirmCartOrder'),
        data: {
          cart_ids: this.cart_ids,
          coupon_instance_id: couponId,
          integration: this.deductionIntegration, // 勋章
          address_id: this.addressId || this.address.address_id || ''
        },
        loading: true
      }

      console.log('args--', args)
      let res = await this.get(args)
      if (res.status) {
        this.total_price = res.data.total_price
        this.address = res.data.address ? res.data.address : null
        this.goods_list = res.data.goods_list ? res.data.goods_list : null
        this.coupon_list = res.data.coupon_instances
          ? res.data.coupon_instances
          : null
        this.expected = res.data.expected ? res.data.expected : null
        this.integration = res.data.integration ? res.data.integration : null
        // 重置收货地址
        this.initAddressId()
        // 重置到货日期
        this.initReceiveDate()
        // 重置勋章数量
        this.initDeductionIntegration()
      } else {
        this.$toast(res.msg)
      }
    },
    // 确认订单v2 [优惠券]
    async confirmOrder () {
      
      if (!this.cart_ids) {
        return
      }
      if (!this.needConfirm) return false

      let couponId = ''
      if (this.$refs.goodsPanel) {
        console.log('goodsPanel')
        const { coupon_index: cIndex } = this.$refs.goodsPanel
        couponId =
          parseInt(cIndex) >= 0
            ? this.coupon_list[cIndex].coupon_instance_id
            : ''
        console.log('goodsPanel')
      }

      let args = {
        url: this.api('confirmCartOrder'),
        data: {
          cart_ids: this.cart_ids,
          coupon_instance_id: couponId,
          integration: this.deductionIntegration, // 勋章
          address_id: this.addressId || this.address.address_id || ''
        },
        loading: true
      }

      console.log('args--', args)
      let res = await this.get(args)
      if (res.status) {
        this.total_price = res.data.total_price
        this.address = res.data.address ? res.data.address : null
        this.goods_list = res.data.goods_list ? res.data.goods_list : null
        this.coupon_list = res.data.coupon_instances
          ? res.data.coupon_instances
          : null
        this.expected = res.data.expected ? res.data.expected : null
        this.integration = res.data.integration ? res.data.integration : null
        // 重置收货地址
        this.initAddressId()
        // 重置到货日期
        this.initReceiveDate()
        // 重置勋章数量
        this.initDeductionIntegration()
      } else {
        this.$toast(res.msg)
        setTimeout(() => {
          this.$nav('back')
        }, 1000)
      }
      this.loading = false
    },
    async addCartOrder () {
      if (!this.can_submit) {
        this.$toast('请不要重复提交')
        return
      }
      this.can_submit = false
      let list = this.$refs.goodsPanel.pay_list
      let index = this.$refs.goodsPanel.pay_index
      const { coupon_index: cIndex } = this.$refs.goodsPanel
      const couponId =
        cIndex === '' ? '' : this.coupon_list[cIndex].coupon_instance_id
      let args = {
        url: this.api('addCartOrder'),
        data: {
          cart_ids: this.cart_ids,
          bill_id: this.invoice_id,
          address_id: this.addressId || this.address.address_id || '',
          pay_type: list[index].type,
          remark: this.remark,
          coupon_instance_id: couponId,
          integration: this.deductionIntegration, // 勋章
          updatin_expected_receive_date: this.receiveDate // 预计到货时间 2020/05/18
        },
        loading: true,
        title: '提交中'
      }

      let res = await this.post(args)

      if (res.status) {
        let re = res.data
        this.order_sn = re.order_sn
        if (re.is_pay === 1) {
          this.$nav('orderDetail', { order_sn: this.order_sn }, true)
        } else {
          this.payOrder(re.order_sn)
        }

        this.$Bus.$emit('onAddCart')
      } else {
        this.$toast(res.msg)
        this.can_submit = true
      }
      this.can_submit = true
    },
    async payOrder (sn) {
      let args = {
        url: this.api('payOrder'),
        data: {
          order_sn: sn
        }
      }
      let res = await this.get(args)
      if (res.status) {
        let re = res.data
        if (re.pay_type && Number(re.pay_type) === 2) {
          // 货到付款
          this.$nav('orderDetail', { order_sn: sn }, true)
        } else {
          this.wxPay(re)
        }
      } else {
        this.$toast(res.msg)
        setTimeout(() => {
          this.$nav('back')
        }, 1500)
      }
    },
    // 微信支付
    wxPay (config) {
      this.needConfirm = false
      let that = this
      // 打开支付
      wx.requestPayment({
        timeStamp: config.timeStamp + '',
        nonceStr: config.nonceStr,
        package: config.package,
        signType: 'MD5',
        paySign: config.paySign,
        success: function (res) {
          console.log('success', res)
          that.$toast('支付成功', 'success')
        },
        fail: err => {
          console.log('fail', err)
          if (err.errMsg === 'requestPayment:fail cancel') {
            that.$toast('支付取消')
          } else {
            that.$toast('支付失败')
          }
        },
        complete: () => {
          setTimeout(() => {
            that.reSet()
            that.$nav('orderDetail', { order_sn: that.order_sn }, true)
          }, 1500)
        }
      })
    }
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
    this.confirmOrder()
  }
}
</script>
<style lang="less" scoped>
.confirm {
  padding: 20rpx 24rpx;
  .remark {
    padding: 0 20rpx;
    height: 100rpx;
    font-size: 28rpx;
    color: #333;
    .bg;
    .br;
    .left {
      margin-right: 40rpx;
      color: #999999;
    }
  }
  .bottom-fixed,
  .bottom-fixed-h {
    height: 110rpx;
  }
  .bottom-fixed {
    padding: 0 30rpx;
    .bg;
    .left {
      font-size: 32rpx;
      color: #333333;
      .money {
        color: @price-color;
      }
    }
  }
}
</style>


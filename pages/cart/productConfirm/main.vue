<template>
  <div class="confirm" v-if="!loading">
    <AddressPanel :item="address" @change="addressChange"></AddressPanel>
    <GoodsPanel
      :key="panel_key"
      type="1"
      :list="goods_list"
      :is_coupon="is_coupon"
      :coupon_list="coupon_list"
      :invoice_type="invoice_type"
      :expected="expected"
      :date.sync="receiveDate"
      :integration="integration"
      :deductionIntegration.sync="deductionIntegration"
      ref="goodsPanel"
      v-if="goods_list"
      @getConfirmData="getConfirmData"
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
      goods_id: 0,
      goods_num: 1,
      spec_id: 0,
      // address: null,
      goods_list: null,
      coupon_list: [],
      // 是否拼团
      is_group: '',
      // 团长订单编号,如果是团长则是''
      group_head_order_sn: '',
      invoice_type: 0, // 0: 未选择，1：个人，2：企业
      invoice_id: 0,
      remark: '',
      total_price: 0,
      order_sn: '',
      can_submit: true,
      panel_key: 0,
      is_coupon: true,
      expected: null,
      integration: null,
      deductionIntegration: 0, // 抵扣的勋章
      receiveDate: null, // 到货日期
      addressId: '',
      needInitReceiveDate: true, // 需要重置到货日期
      needInitDeductionIntegration: true, // 需要重置勋章数量
      needInitAddress: true, // 需要重置收货地址
      needConfirm: true, // 需要请求确认订单接口
      address: {}
    }
  },
  onLoad (e) {},
  mounted () {
    this.can_submit = true
    this.panel_key++
    this.getQuery()
    this.getConfirmData()
  },
  onShow () {
    this.getStorage()
    this.getConfirmData()
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
      if (this.needInitReceiveDate === true && this.$refs.goodsPanel) {
        this.$refs.goodsPanel.initReceiveDate(
          this.expected.expected_receive_date
        )
        this.needInitReceiveDate = false
        console.log('重置到货日期')
      }
    },
    initDeductionIntegration () {
      // 重置勋章数量
      if (this.needInitDeductionIntegration === true && this.integration) {
        this.deductionIntegration = parseInt(this.integration.best_integration)
        this.needInitDeductionIntegration = false
      }
    },
    // 修改地址后需要重置到货日期
    addressChange (item) {
      this.address = item
      this.addressId = item.address_id
      this.needInitReceiveDate = true
    },
    getQuery () {
      let q = this.$root.$mp.query
      console.log(q)
      this.goods_id = q.goods_id
      this.goods_num = q.goods_num
      this.spec_id = q.spec_id
      this.is_group = Number(q.is_group)
      this.group_head_order_sn = q.group_head_order_sn
      this.is_coupon = Number(q.is_coupon) === 1
      this.loading = false
    },
    // 选择优惠卷后重新获取价格显示
    async getConfirmData () {
      console.log('this.needConfirm', this.needConfirm)
      if (!this.needConfirm) return false
      console.log('this.needConfirm-', this.needConfirm)

      if (!this.goods_id) return false

      if (this.is_group === 1) {
        this.getGroupConfirmData()
        return
      }

      let couponId = ''
      if (this.$refs.goodsPanel) {
        const { coupon_index: cIndex } = this.$refs.goodsPanel
        couponId =
          parseInt(cIndex) >= 0
            ? this.coupon_list[cIndex].coupon_instance_id
            : ''
      }

      let args = {
        url: this.api('confirmProductOrder'),
        data: {
          goods_id: this.goods_id,
          spec_id: this.spec_id,
          goods_num: this.goods_num,
          coupon_instance_id: couponId,
          is_group: this.is_group,
          group_head_order_sn: this.group_head_order_sn,
          integration: this.deductionIntegration, // 勋章
          address_id: this.addressId || this.address.address_id || ''
        },
        loading: false
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

        // 重置收货地址id
        this.initAddressId()
        // 重置到货日期
        this.initReceiveDate()
        // 重置勋章数量
        this.initDeductionIntegration()
      } else {
        this.$toast(res.msg)
      }
    },
    // 单品-团购 确认订单
    async getGroupConfirmData () {
      console.log('this.needConfirm', this.needConfirm)
      if (!this.needConfirm) return false
      console.log('this.needConfirm-', this.needConfirm)

      let couponId = ''
      if (this.$refs.goodsPanel) {
        const { coupon_index: cIndex } = this.$refs.goodsPanel
        couponId =
          parseInt(cIndex) >= 0
            ? this.coupon_list[cIndex].coupon_instance_id
            : ''
      }

      let args = {
        url: this.api('groupConfirmOrder'),
        data: {
          goods_id: this.goods_id,
          coupon_instance_id: couponId,
          group_head_order_sn: this.group_head_order_sn,
          integration: this.deductionIntegration, // 勋章
          address_id: this.addressId || this.address.address_id || ''
        },
        loading: false
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

        // 重置收货地址id
        this.initAddressId()
        // 重置到货日期
        this.initReceiveDate()
        // 重置勋章数量
        this.initDeductionIntegration()
      } else {
        this.$toast(res.msg)
      }
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
    },
    onAddOrder () {
      console.log('onAddOrder')
      if (!this.address) {
        this.$toast('请选择收货地址')
      } else {
        this.addCartOrder()
      }
    },
    async addCartOrderGroup () {
      if (!this.can_submit) {
        this.$toast('请不要重复提交')
        return
      }
      this.can_submit = false
      let list = this.$refs.goodsPanel.pay_list
      let index = this.$refs.goodsPanel.pay_index

      let couponId = ''
      if (this.$refs.goodsPanel) {
        const { coupon_index: cIndex } = this.$refs.goodsPanel
        couponId =
          parseInt(cIndex) >= 0
            ? this.coupon_list[cIndex].coupon_instance_id
            : ''
      }
      let args = {
        url: this.api('groupAddOrder'),
        data: {
          address_id: this.addressId || this.address.address_id || '',
          goods_id: this.goods_id,
          bill_id: this.invoice_id,
          pay_type: list[index].type,
          remark: this.remark,
          coupon_instance_id: couponId,
          group_head_order_sn: this.group_head_order_sn,
          integration: this.deductionIntegration, // 勋章
          updatin_expected_receive_date: this.receiveDate // 预计到货时间 2020/05/18
        },
        loading: true,
        title: '提交中'
      }

      console.log('args--', args)

      let res = await this.post(args)

      if (res.status) {
        let re = res.data
        this.order_sn = re.order_sn
        this.group_head_order_sn = re.group_head_order_sn
        if (Number(re.is_pay) === 1) {
          if (this.is_group === 0) {
            this.$nav('orderDetail', { order_sn: this.order_sn }, true)
          } else {
            this.$nav('team', {
              order_sn: this.order_sn,
              group_head_order_sn: this.group_head_order_sn,
              product_type: 0
            })
          }
          this.can_submit = true
        } else {
          this.payOrder(re.order_sn)
        }
        this.$Bus.$emit('onAddCart')
      } else {
        this.$toast(res.msg)
        this.can_submit = true
      }
    },
    async addCartOrder () {
      if (this.is_group === 1) {
        this.addCartOrderGroup()
        return
      }
      if (!this.can_submit) {
        this.$toast('请不要重复提交')
        return
      }
      this.can_submit = false
      let list = this.$refs.goodsPanel.pay_list
      let index = this.$refs.goodsPanel.pay_index

      let couponId = ''
      if (this.$refs.goodsPanel) {
        const { coupon_index: cIndex } = this.$refs.goodsPanel
        couponId =
          parseInt(cIndex) >= 0
            ? this.coupon_list[cIndex].coupon_instance_id
            : ''
      }

      let args = {
        url: this.api('addProductOrder'),
        data: {
          goods_id: this.goods_id,
          goods_num: this.goods_num,
          spec_id: this.spec_id,
          bill_id: this.invoice_id,
          address_id: this.addressId || this.address.address_id || '',
          pay_type: list[index].type,
          remark: this.remark,
          coupon_instance_id: couponId,
          is_group: this.is_group,
          group_head_order_sn: this.group_head_order_sn,
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
        if (Number(re.is_pay) === 1) {
          if (this.is_group === 0) {
            this.$nav('orderDetail', { order_sn: this.order_sn }, true)
          } else {
            this.$nav('team', {
              order_sn: this.order_sn,
              group_head_order_sn: this.group_head_order_sn,
              product_type: 0
            })
          }
          this.can_submit = true
        } else {
          this.payOrder(re.order_sn)
        }
        this.$Bus.$emit('onAddCart')
      } else {
        this.$toast(res.msg)
        this.can_submit = true
      }
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
          // this.simulationPay()
          this.wxPay(re)
        }
      } else {
        this.$toast(res.msg)
        this.can_submit = true
      }
    },
    // 微信支付
    wxPay (config) {
      let that = this
      console.log('微信支付')
      this.needConfirm = false
      // 打开支付
      wx.requestPayment({
        timeStamp: config.timeStamp + '',
        nonceStr: config.nonceStr,
        package: config.package,
        signType: 'MD5',
        paySign: config.paySign,
        success: res => {
          that.$toast('支付成功', 'success')
          setTimeout(() => {
            console.log('success-跳转订单详情')
            this.reSet()
            if (that.is_group === 0) {
              that.$nav('orderDetail', { order_sn: that.order_sn }, true)
            } else {
              that.$nav('team', {
                order_sn: that.order_sn,
                group_head_order_sn: that.group_head_order_sn,
                product_type: 0
              })
            }
            that.can_submit = true
          }, 1500)
        },
        fail: err => {
          if (err.errMsg === 'requestPayment:fail cancel') {
            that.$toast('支付取消')
          } else {
            that.$toast('支付失败')
          }
          setTimeout(() => {
            console.log('fail-跳转订单详情')
            that.reSet()
            that.$nav('orderDetail', { order_sn: that.order_sn }, true)
            that.can_submit = true
          }, 1500)
        }
      })
    },
    // 模拟支付
    simulationPay () {
      this.$toast('模拟支付')
      let args = {
        url: this.api('simulationPay'),
        data: {
          order_sn: this.order_sn
        }
      }
      this.get(args).then(res => {
        this.$nav('orderDetail', { order_sn: this.order_sn }, true)
      })
    }
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
    this.getConfirmData()
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

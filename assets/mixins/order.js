export default {
  methods: {
    onEvent (type, sn) {
      let that = this
      let list = {
        'pay': {
          title: '支付订单',
          content: '确定支付该订单吗？',
          // method: 'fakePay'
          method: 'payOrder'
        },
        'cancel': {
          title: '确定取消该订单吗？',
          content: '请慎重考虑',
          method: 'cancelOrder'
        },
        're': {
          title: '确定再来一单吗？',
          content: '再考虑考虑',
          method: 'oneMoreOrder'
        },
        'receive': {
          title: '确认收货',
          content: '确定收到该订单快递了吗？',
          method: 'receiveOrder'
        },
        'del': {
          title: '确定删除该订单吗？',
          content: '请慎重考虑',
          method: 'delOrder'
        }
      }
      let t = list[type]
      uni.showModal({
        title: t.title,
        content: t.content,
        confirmColor: '#0a2d8f',
        success: res => {
          if (res.confirm) {
            // that.payOrder()
            // that.fakePay(sn)
            that[t.method](sn)
          }
        }
      })
    },
    async oneMoreOrder (sn) {
      let args = {
        url: this.api('oneMoreOrder'),
        data: {
          order_sn: sn
        },
        loading: true
      }
      let res = await this.post(args)

      if (res.status) {
        this.$nav('cart')
      } else if (parseInt(res.code) === 409) {
        this.$toast('商品已下架')
      } else {
        this.$toast(res.msg)
      }
    },
    async cancelOrder (sn) {
      let args = {
        url: this.api('cancelOrder'),
        data: {
          order_sn: sn
        }
      }
      let res = await this.post(args)

      if (res.status) {
        this.$toast('取消成功', 'success')
        this.refresh()
      } else {
        this.$toast(res.msg)
      }
    },
    async receiveOrder (sn) {
      let args = {
        url: this.api('receiveOrder'),
        data: {
          order_sn: sn
        }
      }
      let res = await this.post(args)

      if (res.status) {
        this.$toast('确认收货成功', 'success')
        this.refresh()
      } else {
        this.$toast(res.msg)
      }
    },
    async delOrder (sn) {
      let args = {
        url: this.api('delOrder'),
        data: {
          order_sn: sn
        }
      }
      let res = await this.post(args)

      if (res.status) {
        this.$toast('删除成功', 'success')
        this.$nav('back')
      } else {
        this.$toast(res.msg)
      }
    },
    async fakePay (sn) {
      let args = {
        url: this.api('fakePay'),
        data: {
          order_sn: sn
        }
      }
      let res = await this.get(args)
      if (res.status) {
        let re = res.data
        let type = Number(re.is_pay)
        if (type === 1) {
          this.$toast('支付成功', 'success')
          this.refresh()
        } else if (type === 0) {
          this.$toast('支付失败')
        }
      } else {
        this.$toast(res.msg)
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
        this.wxPay(re)
      } else if (parseInt(res.code) === 409) {
        const that = this
        uni.showModal({
          title: '',
          content: res.msg,
          showCancel: false,
          confirmText: '取消订单',
          confirmColor: '#0a2d8f',
          async success (r) {
            if (r.confirm) {
              let data = {
                url: that.api('cancelOrder'),
                data: {
                  order_sn: sn
                }
              }
              let re = await that.post(data)
              if (re.status) {
                that.$toast('取消成功', 'success')
                that.refresh()
              } else {
                that.$toast(re.msg)
              }
            }
          }
        })
      } else {
        this.$toast(res.msg)
      }
    },
    // 微信支付
    wxPay (config) {
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
          that.refresh()
        },
        fail: function (err) {
          console.log('fail', err)
          if (err.errMsg === 'requestPayment:fail cancel') {
            that.$toast('支付取消')
          } else {
            that.$toast('支付失败')
          }
        }
      })
    }
  }
}

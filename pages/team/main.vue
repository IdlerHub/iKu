<template>
	<div v-if="page_show">
		<stepFlow />
    <productInfo :info="product_info" />
    <teamPeople :last_people_number="last_people_number" :product_info="product_info" :order_sn="order_sn" :is_join="is_join" :group_status="group_status" :join_list="join_list" :remain_time="remain_time" @joinGroup="joinGroup" />
    <teamHistory :join_list="join_list" />
	</div>
</template>

<script>
  import stepFlow from '@/components/team/stepFlow'
  import productInfo from '@/components/team/product-info'
  import teamPeople from '@/components/team/team-people'
  import teamHistory from '@/components/team/team-history'
  export default {
    components: {
      stepFlow,
      productInfo,
      teamPeople,
      teamHistory
    },
    data () {
      return {
        page_show: false,
        order_sn: '',
        group_head_order_sn: '',
        // 产品信息
        product_info: {},
        // 拼团状态
        group_status: 0,
        // 拼团人员
        join_list: [],
        // 剩余时间
        remain_time: 0,
        // 剩余人数
        last_people_number: 0,
        // 是否为加入拼图
        is_join: 0,
        time_interval: null
      }
    },
    methods: {
      async joinGroup () {
        let productType = this.$root.$mp.query.product_type
        // 0-单品，1-套餐
        if (!Number(productType)) {
          // 单品情况下先请求再跳转
          this.productJump()
        } else {
          // 如果是套餐则直接跳
          this.packageJump()
        }
      },
      async productJump () {
        let args = {
          url: this.api('groupConfirmOrder'),
          data: {
            goods_id: this.product_info.goods_id,
            coupon_instance_id: '',
            group_head_order_sn: this.group_head_order_sn
          },
          loading: true
        }
        let res = await this.get(args)
        if (res.status) {
          const re = res.data
          const q = {
            goods_id: this.product_info.goods_id,
            goods_num: 1,
            spec_id: '',
            address: JSON.stringify(re.address),
            goods_list: JSON.stringify(re.goods_list || []),
            total_price: re.total_price,
            is_group: 1,
            coupon_list: JSON.stringify(re.coupon.coupon_instance || []),
            group_head_order_sn: this.group_head_order_sn,
            is_coupon: re.group_detail.is_coupon
          }
          this.$nav('productConfirm', q)
        } else {
          this.$toast(res.msg)
        }
      },
      packageJump () {
        wx.setStorage({
          key: 'package_ids',
          data: []
        })
        this.$nav('packageConfirm', {
          goods_id: this.product_info.goods_id,
          is_group: 1,
          group_head_order_sn: this.group_head_order_sn
        })
      },
      getGroupData () {
        let sn = this.$root.$mp.query.group_head_order_sn
        console.log('发送团单号', sn)
        this.get({
          url: this.api('getGroupDetail'),
          data: {
            group_head_order_sn: sn
          }
        }).then(res => {
          console.log(res)
          uni.hideLoading()

          const productInfo = res.data.group_product_detail
          this.product_info = {
            goods_id: productInfo.product_id,
            product_name: productInfo.product_name,
            product_thumb: productInfo.thumb,
            group_price: productInfo.group_price,
            goods_num: productInfo.goods_num,
            group_needs: productInfo.group_needs
          }

          this.last_people_number = Number(res.data.group_detail.group_needs) - Number(res.data.group_detail.joined)

          this.order_sn = res.data.my_join_order_sn

          this.group_head_order_sn = res.data.group_head_order_sn

          this.group_status = Number(res.data.group_status)

          this.join_list = res.data.group_detail.join_list.map(item => ({
            ...item,
            is_leader: Number(item.is_leader)
          }))
          this.page_show = true

          if (this.group_status === 1) {
            console.log('开启倒计时')
            const groupExpire = Number(res.data.group_detail.group_expire)
            const nowTime = (Date.parse(new Date()) / 1000)
            const remainTime = groupExpire - nowTime || 0
            if (remainTime > 0) {
              this.remain_time = parseInt(remainTime)
              this.time_interval = setInterval(() => {
                this.remain_time--
                if (this.remain_time === 0) {
                  clearInterval(this.time_interval)
                }
              }, 1000)
            }
          }
        })
      }
    },
    onShow () {
      clearInterval(this.time_interval)
      this.page_show = false
      uni.showLoading()
      setTimeout(() => {
        this.getGroupData()
      }, 2000)
      this.is_join = this.$root.$mp.query.is_join ? 1 : 0
      console.log(this.$root.$mp.query)
    },
    onShareAppMessage () {
      this.$Tool.SetRecordScene({
        page: 'share',
        content_type: 'share_page',
        content_id: '分享页面'
      })
      const { group_head_order_sn: headSn, product_type: productType } = this.$root.$mp.query
      return {
        path: `/pages/team/main?group_head_order_sn=${headSn}&product_type=${productType}&is_join=1`
      }
    },
    onHide () {
      clearInterval(this.time_interval)
    },
    onUnload () {
      clearInterval(this.time_interval)
    }
  }
</script>

<style lang="less" scoped>

</style>

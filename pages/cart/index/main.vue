<template>
  <div class="cart" v-if="!loading">
    <template v-if="list && list.length > 0">
      <!-- 管理 -->
      <div class="header flex" @click="toggleMode">
        <template v-if="del_mode">
          <i class="iconfont icon-xuanzedidian_"></i>
          <span>完成</span>
        </template>
        <template v-else>
          <i class="iconfont icon-bianji"></i>
          <span>管理</span>
        </template>
      </div>
      <!-- 列表 -->
      <div class="list">
        <div v-for="(item, index) in list" :key="index">
          <template v-if="item.type == 1">
            <!-- 单品 -->
            <ProductItem
              :item="item"
              :checked="item.checked"
              :index="index"
              @selectItem="selectItem"
              @calCart="calCart"
            ></ProductItem>
          </template>
          <template v-else>
            <!-- 套餐 -->
            <PackageItem
              :item="item"
              :checked="item.checked"
              :index="index"
              @selectItem="selectItem"
              @calCart="calCart"
            ></PackageItem>
          </template>
        </div>
      </div>
      <!-- 底部 -->
      <div class="bottom-fixed-h"></div>
      <div class="bottom-fixed flex-bc">
        <div class="left flex-c" @click="selectAll">
          <i class="iconfont icon-roundcheckfill" v-if="all_checked"></i>
          <i class="iconfont icon-round" v-else></i>
          <span>全选</span>
        </div>
        <div class="right flex-c">
          <div class="total" v-if="!del_mode">
            <span>合计：</span>
            <span class="price">￥{{ total_price }}</span>
          </div>
          <Btn :name="btn_name" size="L" @clickBtn="btnEvent"></Btn>
        </div>
      </div>
    </template>
    <template v-else>
      <NoData :size="no_data.size" :pic="no_data.pic" :tip="no_data.tip"></NoData>
    </template>
  </div>
</template>

<script>
import Btn from '@/components/common/button/button'
import ProductItem from '@/components/cart/index/productItem'
import PackageItem from '@/components/cart/index/packageItem'
import NoData from '@/components/common/no-data/no-search'

export default {
  components: {
    Btn,
    ProductItem,
    PackageItem,
    NoData
  },
  data () {
    return {
      loading: true,
      list: [],
      total_price: 0,
      btn_name: '结算',
      del_mode: false,
      no_data: {
        pic: '/static/images/common/no_cart.png',
        size: {
          w: '264rpx',
          h: '188rpx'
        },
        tip: 'sorry，暂无商品'
      }, // 无数据组件配置
      // isLoad:false
    }
  },
  computed: {
    // 是否全选
    all_checked: function () {
      let len = this.list.length
      if (len > 0) {
        let arr = this.list.filter(item => {
          return item.checked
        })
        let cannotChecked = this.list.filter(item => {
          return parseInt(item.is_show) !== 1 && !this.del_mode
        })
        if (
          arr.length + cannotChecked.length === len &&
          cannotChecked.length !== len
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    // 选中商品的购物车id集合
    ids: function () {
      let arr = []
      this.list.forEach(item => {
        if (item.checked) {
          arr.push(item.id)
        }
      })

      let ids = arr.join(',')
      return ids
    }
  },
  onShow () {
    this.getCartList()
  },
  onLoad () {
    this.init()
  },
  onPullDownRefresh () {
    this.init().then(() => {
      wx.stopPullDownRefresh()
    })
  },
  methods: {
    async init () {
      this.loading = true
      this.btn_name = '结算'
      this.del_mode = false
      await this.getCartList()
    },
    // 选中
    selectItem (index, item) {
      if (!this.del_mode) {
        if (parseInt(item.is_show) === 1) {
          item.checked = !item.checked
          this.list.splice(index, 1, item)
          this.calCart()
        } else {
          uni.showToast({
            icon: 'none',
            title: '该商品已下架'
          })
        }
      } else {
        item.checked = !item.checked
        this.list.splice(index, 1, item)
      }
    },
    // 设置全选
    selectAll () {
      let flag = !this.all_checked
      this.list.forEach(item => {
        item.checked =
          flag &&
          ((parseInt(item.is_show) === 1 && !this.del_mode) || this.del_mode)
      })
      let canNotSelect = this.list.filter(item => {
        return parseInt(item.is_show) !== 1
      })
      this.list = [].concat(this.list)
      if (!this.del_mode) {
        if (canNotSelect.length === this.list.length) {
          uni.showToast({
            icon: 'none',
            title: '列表中商品已下架'
          })
        }
        this.calCart()
      }
    },
    // 切换管理，删除模式
    toggleMode () {
      this.del_mode = !this.del_mode
      this.btn_name = this.del_mode ? '删除' : '结算'
      if (!this.del_mode) {
        this.calCart()
      }
    },
    // 按钮事件
    btnEvent () {
      let name = this.del_mode ? 'onDelCart' : 'toCartConfirm'
      this[name]()
    },
    // 删除商品前判断
    onDelCart () {
      if (this.ids) {
        let that = this
        wx.showModal({
          title: '删除商品',
          content: '确定删除所选商品吗？',
          confirmColor: '#0a2d8f',
          success: res => {
            if (res.confirm) {
              that.delCart()
            }
          }
        })
      } else {
        this.$toast('请选择需要删除的商品')
      }
    },
    // 结算
    toCartConfirm () {
      if (this.ids) {
        this.$nav('confirm', { cart_ids: this.ids })
      } else {
        this.$toast('请选择商品')
      }
    },
    async getCartList () {
      let openId = uni.getStorageSync('loginUserinfo')
        ? uni.getStorageSync('loginUserinfo').openId
        : ''
      let args = {
        url: this.api('getCartList'),
        loading: this.loading,
        open_id: openId,
        // checkCode:!this.isLoad
      }
      let res = await this.get(args)
      // this.isLoad = true
      this.getCartList2()
      if (res.status) {
        let re = res.data

        if (re) {
          this.list = re

          this.list.forEach(item => {
            item.checked = false
            item.items.length &&
              item.items.forEach(element => {
                const limit =
                  Number(element.restricted_num - element.order_count) > 1
                    ? Number(element.restricted_num - element.order_count)
                    : 1
                const store = Number(element.store)
                element.max = limit < store ? limit : store
                element.limit = limit < store
                element.is_show = item.is_show
              })
          })
        } else {
          this.list = []
        }
      } else {
        this.$toast(res.msg)
      }
      this.loading = false
    },
    async calCart () {
      let args = {
        url: this.api('calCart'),
        data: {
          cart_ids: this.ids
        }
      }
      let res = await this.get(args)
      if (res.status) {
        let re = res.data
        this.total_price = re.total_price
      } else {
        this.$toast(res.msg)
      }
    },
    async delCart () {
      let args = {
        url: this.api('delCartGoods'),
        data: {
          cart_ids: this.ids
        }
      }
      let res = await this.post(args)

      if (res.status) {
        this.$toast('删除成功', 'success')
        this.getCartList()
      } else {
        this.$toast(res.msg)
      }

      this.getCartList2()
    },
    // 获取购物车，设置tabbar角标
    async getCartList2 () {
      this.total_price = 0
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
        let num = res.data.shop_cart_goods_num.toString()
        console.log('num', num)
        // 购物车角标
        wx.setTabBarBadge({
          index: 3,
          text: num
        })
      } else {
        wx.removeTabBarBadge({
          index: 3
        })
      }
    }
  },
  watch: {
    list (n) {
      this.getCartList2()
    }
  }
}
</script>
<style lang="less" scoped>
.cart {
  .header {
    justify-content: flex-end;
    padding: 30rpx 24rpx;
    font-size: 26rpx;
    color: #333333;
    .iconfont {
      margin-right: 20rpx;
      .f(34);
    }
  }
  .list {
    // margin: 0 24rpx;
    padding: 0 24rpx;
  }
  .bottom-fixed,
  .bottom-fixed-h {
    height: 100rpx;
  }
  .bottom-fixed {
    padding: 0 30rpx;
    .bg;
    .left {
      font-size: 32rpx;
      color: #333333;
      .iconfont {
        margin-right: 20rpx;
        .f(44);
      }
    }
    .right {
      font-size: 30rpx;
      color: #333333;
      .total {
        margin-right: 30rpx;
      }
      .price {
        font-size: 32rpx;
      }
    }
  }
}
</style>


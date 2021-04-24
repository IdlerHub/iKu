<template>
  <div class="family">
    <div class="top-fixed">
      <Tab
        :tab_list="tab_list"
        :tab_index.sync="tab_index"
        @clickTab="clickTab"
      ></Tab>
    </div>
    <div class="below">
      <div
        class="tag"
        v-show="tags[tab_index]"
      >{{ tags[tab_index] }}</div>
      <!-- 课堂列表 -->
      <Classes
        v-if="tab_index == 0"
        :loadSuccess="loadSuccess"
        :history="list"
        :recommend="recommend"
      ></Classes>
      <!-- 现有器材 -->
      <div
        v-if="tab_index == 1"
        style="padding-top: 20rpx"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
          class="item"
        >
          <img
            :src="item.thumb + imgProcess.wh200"
            mode="aspectFill"
            @click="$nav('goodsDetail', { product_sn: item.product_sn })"
          >
          <div class="content">
            <p class="content-title">{{ item.product_name }}</p>
            <div>
              <p>拥有数量 x{{ item.order_count }}</p>
              <p>购入日期 {{ item.order_date }}</p>
              <p>更换日期 {{ item.expire_date }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 即将过期 -->
      <div
        v-if="tab_index == 2"
        style="padding-top: 20rpx;padding-bottom: 100rpx;"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
          class="item"
        >
          <div
            class="icon-box flex-c"
            v-if="item.goods_price.status"
            @click="selectItem(item, index)"
          >
            <i
              class="iconfont icon-roundcheckfill"
              v-if="item.checked"
            ></i>
            <i
              class="iconfont icon-round"
              v-else
            ></i>
          </div>
          <div class="flex-1 flex-c">
            <div class="goodsimgbox">
              <img
                :src="item.img + imgProcess.wh200"
                mode="aspectFill"
                @click="$nav('goodsDetail', { product_sn: item.product_sn })"
              />
              <div class="goodsimgboxtop" v-if="!item.goods_price.status" @click.stop>已下架</div>
            </div>
            <div class="content">
              <div>
                <p class="content-title content-title2">{{ item.product_name || '--' }}</p>
                <!-- <p>有效期 {{ item.effective_year }}年</p> -->
              </div>
              <div class="bottom">
                <div class="flex">
                  <div class="bottom-label">拥有数量</div>
                  <div class="bottom-text flex-1 flex-e">x{{ item.order_count }}</div>
                </div>
                <div class="flex">
                  <div class="bottom-label">距过期</div>
                  <div class="bottom-text flex-1 flex-e">{{item.warnning_day}}</div>
                </div>
                <div class="flex">
                  <div class="bottom-label">更换日期</div>
                  <div class="bottom-text flex-1 flex-e">{{ item.expire_date }}</div>
                </div>
                <div class="flex">
                  <div class="bottom-label">购入日期</div>
                  <div class="bottom-text flex-1 flex-e">{{ item.add_time_text }}</div>
                </div>
              </div>
              <div class="flex-bc" v-if="item.goods_price.status">
                <span>￥{{ item.goods_price.data.actual_price }}</span>
                <Stepper
                  :stepper_value.sync="item.order_count_copy"
                  @updateNum="changeCartNum(item,index)"
                ></Stepper>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-fixed flex-bc" v-if="list && list.length > 0">
          <div class="left flex-c" @click="selectItemAll">
            <i class="iconfont icon-roundcheckfill" v-if="allchecked"></i>
            <i class="iconfont icon-round" v-else></i>
            <span>全选</span>
          </div>
          <div class="right flex-c">
            <div class="total" v-if="!del_mode">
              <span>合计：</span>
              <span class="price">￥{{ total_price }}</span>
            </div>
            <BuyButton name="立即购买" size="L" @clickBtn="btnEvent"></BuyButton>
          </div>
        </div>
      </div>
      <!-- 待补充 -->
      <div v-if="tab_index == 3">
        <div
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="replenish-box">
            <div class="replenish-item">
              <img
                :src="item.img + imgProcess.wh200"
                class="replenish-img"
              />
              <div class="replenish-top">
                <div class="replenish-top-title flex-c">
                  <div class="flex-1 title">{{item.product_name}}</div>
                  <div class="num">×{{item.product_num || 0}}</div>
                </div>
                <div
                  class="replenish-top-text flex-c"
                  v-for="(it, k) in item.product_span"
                  :key="k"
                >
                  <div class="flex-1 title">{{it.name}}</div>
                  <div class="num">×{{it.num || 0}}</div>
                </div>
              </div>
              <div class="replenish-bottom">
                <div class="replenish-bottom-title">能帮您什么？</div>
                <div class="replenish-bottom-text">{{item.content}}</div>
                <div class="flex-ec">
                  <div class="replenish-bottom-btn">
                    <BuyButton
                      name="加入购物车"
                      size="XS"
                      @clickBtn="AddCart(item)"
                    ></BuyButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MenuGroup :customobj="customobj"></MenuGroup>
    <!-- 单品规格弹窗 -->
    <GuigePopup
      :show.sync="guige_popup_show"
      :guige_open_type="guige_open_type"
      :goods_id="goods_id"
      @updateCart="RefreshList"
      ref="GuigePopup"
    ></GuigePopup>
  </div>
</template>

<script>
import qs from 'qs'
import Tab from '@/components/common/tab/tab'
import Classes from '@/components/my/family/classes'
import BuyButton from '@/components/common/button/button'
import MenuGroup from '@/components/common/menu/share'
import GuigePopup from '@/components/mall/goodsDetail/guigePopup'
import Stepper from '@/components/common/stepper/square-car'
import { Pageshare } from '@/utils/Mixin'
export default {
  mixins: [Pageshare],
  components: {
    Tab,
    Classes,
    BuyButton,
    MenuGroup,
    GuigePopup,
    Stepper
  },
  data () {
    return {
      imgProcess: this.$imgProcess,
      tab_list: [{
        name: '课堂学习',
        type: 1
      }, {
        name: '现有器材',
        type: 2
      }, {
        name: '即将过期',
        type: 3
      }, {
        name: '待补充',
        type: 4
      }],
      tab_index: 0,
      page: 1,
      limit: 10,
      total_pages: 1,
      tags: [
        '学习消防知识，还能获取护照积分',
        '配齐家庭消防器材，全方位呵护家庭安全',
        '配齐家庭消防器材，全方位呵护家庭安全',
        ''
      ],
      loadSuccess: false,
      recommend: [],
      list: [],
      load_more_status: true,
      sharePageKey: 'passport',
      customobj: {
        profile: 'bottom: 320rpx;',
        share: 'bottom: 220rpx;',
        cart: 'bottom: 120rpx;'
      },
      guige_type: '1',
      goods_id: 0,
      spec_id: 0,
      guige_open_type: 0,
      guige_popup_show: false,
      total_price: 0
    }
  },
  mounted () {
    this.tab_index = parseInt(this.$root.$mp.query.index)
    this.getList()
  },
  computed: {
    allchecked () {
      return this.list && this.list.length && this.list.findIndex(item => !item.checked) === -1
    }
  },
  methods: {
    changeCartNum (item, index) {
      this.calculationOverdueListPrice()
    },
    AddCart (item) {
      this.goods_id = item.goods_id
      this.spec_id = item.spec_id
      wx.nextTick(() => {
        this.$refs['GuigePopup'].guige_index = 0
        this.$refs['GuigePopup'].goods_num = item.order_count || 1
        this.$refs['GuigePopup'].spec_id = 0
        this.$refs['GuigePopup']['getGuige']()
      })
      this.guige_popup_show = true
    },
    selectItem (item, index) {
      item.checked = !item.checked
      this.list.splice(index, 1, item)
      this.calculationOverdueListPrice()
    },
    selectItemAll () {
      this.list = this.list.map(item => ({ ...item, checked: !this.allchecked }))
      this.calculationOverdueListPrice()
    },
    async getList () {
      let args = {
        url: this.api('getFamilyList'),
        data: {
          page: this.page,
          limit: this.limit,
          type: this.tab_index + 1
        },
        loading: true
      }
      let res = await this.get(args)
      if (res.status) {
        if (this.page === res.data.total_pages) {
          this.load_more_status = false
        }
        if (this.tab_index === 2 && res.data.items) {
          res.data.items = res.data.items.map(item => ({
            ...item,
            order_count_copy: item.order_count,
            add_time_text: this.$Tool.FormatTime(item.add_time * 1000, 'YYYY-MM-DD')
          }))
        }
        this.list = this.page === 1 ? res.data.items : this.list.concat(res.data.items)
        this.total_pages = parseInt(res.data.total_pages)
        if (this.tab_index === 0) {
          this.recommend = this.page === 1 ? res.data.recommend_list : this.recommend.concat(res.data.recommend_list)
        } else if (this.tab_index === 3) {
          this.tags[3] = res.data.announcement
        }
      }
    },
    clickTab (index) {
      this.page = 1
      this.list = []
      this.load_more_status = true
      this.getList()
    },
    Showfun () {
      let obj = {}
      switch (this.tab_index) {
        case 0:
          obj = { content_type: 'classroom' }
          break
        case 1:
          obj = { content_type: 'equipment' }
          break
        case 2:
          obj = { content_type: 'overdue' }
          break
        case 3:
          obj = { content_type: 'wait' }
          break
      }
      this.$Tool.SetRecordParameter(obj)
    },
    buy () {},
    async btnEvent () {
      let list = this.list.filter(item => item.checked).map(item => ({
        goods_id: item.goods_id,
        goods_num: item.order_count_copy,
        spec_id: item.spec_id
      }))

      let args = {
        url: this.api('batchAddGoods'),
        data: {
          cart_list: JSON.stringify(list)
        },
        loading: true
      }

      let res = await this.post(args)

      if (res.status) {
        if(res.data.cart_ids&&res.data.cart_ids.length>0){
          console.log('获取post请求返回的加入购物车的cart_ids：',res.data.cart_ids.join(','))
          this.$nav('confirm', { cart_ids: res.data.cart_ids.join(',') })
        }else {
           this.$toast('获取购物车失败')
        }
      } else {
        this.$toast(res.msg)
      }
    },
    RefreshList () {
      this.page = 1
      this.getList()
      this.load_more_status = true
    },
    async calculationOverdueListPrice () {
      let list = []
      this.list.forEach(item => {
        if (item.checked) {
          list.push({
            goods_id: item.goods_id,
            goods_num: item.order_count_copy,
            spec_id: item.spec_id
          })
        }
      })
      let args = {
        url: this.api('calculationOverdueListPrice'),
        data: qs.stringify({ list }),
        header: {
          'content-type': 'application/x-www-form-urlencggoded;charset=UTF-8'
        },
        loading: false
      }
      let res = await this.post(args)
      if (res.status) {
        this.total_price = res.data.total_price
      }
    }
  },
  watch: {
    tab_index () {
      this.Showfun()
    }
  },
  onPullDownRefresh () {
    this.RefreshList()
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    if (this.load_more_status && this.tab_index !== 0) {
      this.page++
      this.getList()
    }
  },
  onShareAppMessage () {
    this.$Tool.SetRecordScene({
      page: 'share',
      content_type: 'share_page',
      content_id: this.sharePageTitle
    })
    return {
      title: this.tab_index ? '  ' : this.sharePageTitle,
      path: `/pages/my/family/main?index=${this.tab_index}&uid=${this.uid}&t=s`
    }
  },
  onUnload () {
    this.$Tool.SetBrowseID()
  }
}
</script>
<style lang="less" scoped>
.family {
  .replenish-box {
    margin-bottom: 20rpx;
    padding-top: 45rpx;
    margin-top: 20rpx;
    position: relative;
  }
  .replenish-item {
    border-radius: 10rpx;
    padding: 24rpx 20rpx;
    box-sizing: border-box;
    background-color: #fff;
    .replenish-img {
      width: 280rpx;
      height: 280rpx;
      position: absolute;
      top: 0;
      left: 20rpx;
      border-radius: 10rpx;
      z-index: 10;
    }
    .replenish-top {
      min-height: 230rpx;
      padding-left: 300rpx;
      border-bottom: 2rpx solid #e5e5e5;
    }
    .replenish-bottom {
      padding-top: 20rpx;
      .replenish-bottom-title {
        font-size: 28rpx;
        color: #dc1c1c;
        margin-bottom: 10rpx;
      }
      .replenish-bottom-text {
        font-size: 24rpx;
        color: #666;
        white-space: pre-wrap;
        margin-bottom: 10rpx;
      }
      .replenish-bottom-btn {
        width: 180rpx;
      }
    }
    .replenish-top-text {
      color: #333;
      text-align: right;
      margin-bottom: 10rpx;
      .title {
        font-size: 26rpx;
      }
      .num {
        font-size: 26rpx;
        min-width: 86rpx;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    .replenish-top-title {
      color: #dc1c1c;
      text-align: right;
      margin-bottom: 18rpx;
      font-weight: bold;
      .title {
        font-size: 30rpx;
      }
      .num {
        font-size: 26rpx;
        min-width: 86rpx;
      }
    }
  }
  .icon-box {
    margin-right: 20rpx;
    align-self: stretch;
    .iconfont {
      .f(44);
    }
  }
  .goodsimgbox {
    position: relative;
    border-radius: 10rpx;
    overflow: hidden;
    margin-right: 16rpx;
    .goodsimgboxtop {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 30rpx;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
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
  .below {
    padding: 124rpx 24rpx 0 24rpx;
    box-sizing: border-box;
    .tag {
      background-color: #e8eeff;
      border-radius: 10rpx;
      padding: 24rpx 20rpx;
      text-align: center;
      color: @theme-color;
      font-size: 30rpx;
      white-space: pre-wrap;
    }
    .item {
      padding: 20rpx;
      background: #fff;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      .br(10rpx);
      .itembtn {
        width: 200rpx;
      }
      img {
        .w(220rpx);
        .h(220rpx);
        .br(10rpx);
        // margin-right: 16rpx;
      }
      .content {
        flex: 1;
        align-self: stretch;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 26rpx;
        color: #999;
        .content-title {
          font-weight: bold;
          color: #333;
          font-size: 30rpx;
          margin-bottom: 10rpx;
          .line-clamp-multi(2);
        }
        .content-title2 {
          .line-clamp-multi(1);
        }
        .bottom {
          margin-bottom: 10rpx;
          // display: flex;
          // justify-content: space-between;
          // align-items: center;
        }
      }
    }
  }
  .waiting {
    color: #999;
    padding-top: 400rpx;
    font-size: 32rpx;
    text-align: center;
    width: 100%;
  }
}
</style>


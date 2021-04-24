<template>
  <div class="devices">
    <div class="top-fixed">
      <Tab :tab_list="tab_list" :tab_index.sync="tab_index" @clickTab="clickTab"></Tab>
    </div>
    <div class="tab-height"></div>
    <div class="tip flex-cc">配齐家庭消防器材，全方位呵护家庭安全</div>
    <template v-if="!loading">
      <template v-if="tab_index == 0">
        <div v-for="(item, index) in current_equip.list" :key="index">
          <CurrentItem :detail="item"></CurrentItem>
        </div>
        <template v-if="current_equip.list.length === 0">
          <NoData tip="暂时还没有器材哟"></NoData>
        </template>
      </template>
      <template v-if="tab_index == 1">
        <div v-for="(item, index) in expired_equip.list" :key="index">
          <InvalidItem :detail="item"></InvalidItem>
        </div>
        <template v-if="expired_equip.list.length === 0">
          <NoData tip="暂时还没有即将过期的器材哟"></NoData>
        </template>
      </template> 
    </template>  
  </div>
</template>

<script>
import Tab from '@/components/common/tab/tab'
import CurrentItem from '@/components/my/devices/current-item'
import InvalidItem from '@/components/my/devices/invalid-item'
import NoData from '@/components/common/no-data/no-search'

export default {
  components: {
    Tab,
    CurrentItem,
    InvalidItem,
    NoData
  },
  data () {
    return {
      loading: true,
      tab_list: [
        {
          name: '现有器材',
          type: 1
        },
        {
          name: '即将过期',
          type: 2
        }
      ],
      tab_index: 0,
      current_equip: {
        page: 1,
        limit: 10,
        total_pages: 1,
        list: []
      },
      expired_equip: {
        page: 1,
        limit: 10,
        total_pages: 1,
        list: []
      }
    }
  },
  onLoad () {
    Object.assign(this, this.$options.data())
  },
  onShow () {
    this.tab_index = Number(this.$root.$mp.query.type)
    this.getEquip()
  },
  methods: {
    clickTab () {
      if (this.tab_index === 0 && this.current_equip.list.length === 0) {
        this.getEquip()
      } else if (this.tab_index === 1 && this.expired_equip.list.length === 0) {
        this.getEquip()
      }
    },
    async getEquip () {
      let req = this.tab_index === 0 ? this.current_equip : this.expired_equip

      let args = {
        url: this.api('getEquip'),
        data: {
          is_expire: this.tab_index,
          page: req.page,
          limit: req.limit
        },
        loading: true
      }
      let res = await this.get(args)
      if (res.status) {
        let re = res.data

        if (this.tab_index === 0 && re.existence_list) {
          this.current_equip.list = this.current_equip.list.concat(re.existence_list)
          this.current_equip.total_pages = re.total_pages
        } else if (this.tab_index === 1 && re.be_about_expire_list) {
          this.expired_equip.list = this.expired_equip.list.concat(re.be_about_expire_list)
          this.expired_equip.total_pages = re.total_pages
        }
      } else {
        uni.showToast({
          title: res.msg ? res.msg : '系统繁忙,请稍候',
          icon: 'none'
        })
      }
      this.loading = false
    },
    loadMore () {
      if (this.tab_index === 0 && this.current_equip.total_pages > this.current_equip.page) {
        this.current_equip.page++
        this.getEquip()
      } else if (this.tab_index === 1 && this.expired_equip.total_pages > this.expired_equip.page) {
        this.expired_equip.page++
        this.getEquip()
      }
    }
  },
  onReachBottom () {
    this.loadMore()
  },
  onPullDownRefresh () {
    uni.hideNavigationBarLoading()// 完成停止加载
    uni.stopPullDownRefresh() // 停止下拉刷新

    if (this.tab_index === 0) {
      this.current_equip.page = 1
      this.current_equip.list = []
    } else if (this.tab_index === 1) {
      this.expired_equip.page = 1
      this.expired_equip.list = []
    }
    this.getEquip()
  }
}
</script>
<style lang="less" scoped>
.devices {
  .tip {
    margin: 20rpx 30rpx;
    width: 690rpx;
    height: 90rpx;
    .bg(#e8eeff);
    .fz(30rpx);
    .c(@theme-color);
    line-height: 1;
    border-radius: 10rpx;
  }
}
</style>


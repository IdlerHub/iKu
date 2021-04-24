<template>
  <div class="live-container">
    <div class="top">
      <div class="fix-top flex-c">
        <picker
          mode="date"
          :value="date"
          @change="dateChange"
        >
          <div class="left flex-c">
            <div class="date">{{date_text}}</div>
            <img
              class="icon"
              src="/static/images/icon/2.png"
              mode="aspectFill"
            />
          </div>
        </picker>
        <div class="right">
          <SearchBar
            placeholder="搜索直播名称/主播名称"
            :searchCustomStyle="searchCustomStyle"
            :customStyle="customStyle"
            :showBtn="false"
            :isfocus="false"
            @search="onSearch"
          ></SearchBar>
        </div>
      </div>
    </div>
    <Banner :banner="banner"></Banner>
    <div class="list">
      <block
        v-for="(item,index) in list"
        :key="index"
      >
        <Item :item="item" />
      </block>
      <template v-if="list.length == 0">
        <NoList tip="暂无数据" :customStyle="nullcustomStyle"></NoList>
      </template>
    </div>
  </div>
</template>
<script>
import Banner from '@/components/common/banner/banner'
import SearchBar from '@/components/common/search/search-input'
import NoList from '@/components/common/no-data/no-search'
import Item from './components/item'
import { ListPage } from '@/utils/Mixin'
export default {
  mixins: [ListPage],
  data () {
    return {
      date: '',
      banner: {
        img: ''
      },
      customStyle: 'width:100%;',
      searchCustomStyle: 'padding:0',
      end: this.$Tool.FormatTime(new Date(), 'YYYY-MM-DD'),
      start: '2015-09-01',
      list: [],
      search: '',
      nullcustomStyle: 'transform:translate(0);position: relative;left: 0;top: 0;'
    }
  },
  mounted () { },
  onShow () { },
  methods: {
    onSearch (e) {
      this.search = e
      this.RefreshList()
    },
    dateChange ({ mp: { detail: { value } } }) {
      this.date = value
      this.RefreshList()
    },
    async GetList () {
      let args = {
        url: this.api('getliveList'),
        data: {
          page: this.page,
          limit: 20,
          content: this.search,
          start_time: this.date
        }
      }
      let res = await this.get(args)
      this.banner.img = res.data.live_setting.live_cover_url
      this.HandleRes(res.data)
    },
    RefreshList () {
      this.page = 1
      this.IsGetList = true
      this.DimensionList = []
      this.noMore = null
      this.ListFun()
    }
  },
  computed: {
    date_text () {
      let date = this.date
      return date ? this.$Tool.FormatTime(date, 'MM月DD日') : '选择日期'
    }
  },
  watch: {},
  components: {
    Banner,
    SearchBar,
    Item,
    NoList
  },
  onShareAppMessage () {
    return {
      title: '',
      path: ''
    }
  }
}
</script>
<style lang="less" scoped>
.live-container {
  .top {
    width: 750rpx;
    height: 110rpx;
    .fix-top {
      width: 100%;
      height: 110rpx;
      padding: 0 23rpx;
      box-sizing: border-box;
      background-color: #ffffff;
      z-index: 100;
      position: fixed;
      top: 0;
      left: 0;
      .left {
        width: 244rpx;
        height: 110rpx;
        line-height: 110rpx;
        padding-left: 21rpx;
        .date {
          margin-right: 12rpx;
          font-family: SourceHanSansCN-Regular;
          font-size: 30rpx;
          color: #333333;
        }
        .icon {
          width: 25rpx;
          height: 15rpx;
        }
      }
      .right {
        width: 460rpx;
        line-height: 110rpx;
        .input-box {
          width: 100%;
          height: 70rpx;
          background-color: #f8f8f8;
          border-radius: 35rpx;
        }
      }
    }
  }
  .list {
    padding: 24rpx;
  }
}
</style>

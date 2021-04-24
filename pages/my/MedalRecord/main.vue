<template>
  <div class="InvitationRecord-container">
    <div class="top-fixed">
      <Tab :tab_list="tab_list" :tab_index.sync="tab_index" @clickTab="clickTab"></Tab>
    </div>

    <div class="list">
      <block v-for="(item,index) in list" :key="index">
        <item :item="item" :type="tab_index + 1" />
      </block>
    </div>
    <PageEnd :show="noMore" />
  </div>
</template>

<script>
import Tab from '@/components/common/tab/tab'
import PageEnd from '@/components/end'
import item from './components/item'
import { ListPage } from '@/utils/Mixin'
export default {
  mixins: [ListPage],
  components: {
    Tab,
    PageEnd,
    item
  },
  data () {
    return {
      tab_list: [
        {
          name: '全部',
          type: 0
        },
        {
          name: '获得',
          type: 1
        },
        {
          name: '使用',
          type: 2
        }
      ],
      tab_index: 0
    }
  },
  onLoad () {
    this.$Tool.SetRecordParameter({content_type: 'medal_list'})
  },
  onShow () {},
  methods: {
    clickTab (index) {
    },
    async GetList () {
      let args = {
        url: this.api('integrationBalanceList'),
        data: {
          page: this.page,
          limit: 20,
          type: this.tab_index
        },
        loading: false
      }
      let res = await this.get(args)
      if (res.status) {
        this.HandleRes(res.data)
      }
    }

  },
  watch: {
    tab_index () {
      this.RefreshList()
    }
  }
}
</script>
<style lang="less" scoped>
.InvitationRecord-container {
  padding: 134rpx 24rpx;
  box-sizing: border-box;
  .list {
    .item {
      // height: 130px; Medal record
      padding: 20rpx 24rpx;
      margin-bottom: 20rpx;
      background-color: #ffffff;
      border-radius: 10px;

      .top {
        margin-bottom: 18rpx;
        .date {
          font-family: SourceHanSansCN-Regular;
          font-size: 26rpx;
          color: #999999;
        }
      }

      .row {
        .key {
          font-family: SourceHanSansCN-Bold;
          font-size: 30rpx;
          color: #333333;
          font-weight: bold;
        }
        .value {
          .unit {
            font-family: SourceHanSansCN-Regular;
            font-size: 32rpx;
            color: #fb2142;
          }

          .price {
            font-family: WeChatNumber-151125;
            font-size: 32rpx;
            color: #fb2142;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>


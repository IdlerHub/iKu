<template>
  <div class="InvitationRecord-container">
    <div class="list">
      <div class="item flex-bc" v-for="(item,index) in list" :key="index">
        <div class="left flex-bc">
          <img class="avatar" :src="item.userpic" />
          <span class="name">{{item.nickname}}</span>
        </div>
        <div class="right">
          <span class="date">{{item.regdate_name}}</span>
        </div>
      </div>
    </div>
    <PageEnd :show="noMore" />
  </div>
</template>

<script>
import PageEnd from '@/components/end'
import { ListPage } from '@/utils/Mixin'
export default {
  mixins: [ListPage],
  components: {PageEnd},
  data () {
    return {}
  },
  onLoad () {
    this.$Tool.SetRecordParameter({content_type: 'recommend_list'})
  },
  onShow () {},
  methods: {
    async GetList () {
      let args = {
        url: this.api('recommendLog'),
        data: {
          page: this.page,
          limit: 20
        },
        loading: false
      }
      let res = await this.get(args)
      if (res.status) {
        this.HandleRes(res.data)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.InvitationRecord-container {
  padding: 20rpx 24rpx;
  box-sizing: border-box;
  .list {
    .item {
      margin-bottom: 20rpx;
      padding: 20rpx 24rpx;
      background-color: #ffffff;
      border-radius: 10px;
      .left {
        .avatar {
          width: 90rpx;
          height: 90rpx;
          margin-right: 20rpx;
          border-radius: 90rpx;
          background-color: #eeeeee;
          display: block;
        }
        .name {
          font-family: SourceHanSansCN-Bold;
          font-size: 30rpx;
          color: #333333;
          font-weight: bold;
        }
      }
      .right {
        .date {
          font-family: SourceHanSansCN-Regular;
          font-size: 26rpx;
          color: #999999;
        }
      }
    }
  }
}
</style>


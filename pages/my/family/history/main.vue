<template>
  <div class="history">
    <div v-for="(item, index) in list" class="item" :key="index" @click="toDetail(item.id)">
      <img :lazy-load="true" :src="item.thumb + imgProcess.w390h260" mode="aspectFill" v-if="item.thumb">
      <img src="/static/images/classroom/class-pic.png" mode="aspectFill" v-else>
      <div class="content">
          <p class="title">{{ item.title }}</p>
          <div class="desc">
              <p>上传 {{ item.add_time }}</p>
              <p>主讲：{{ item.employee_name }}</p>
          </div>
      </div>
    </div>
    <template v-if="list.length == 0 && loadSuccess">
      <NoList></NoList>
    </template>
    <div v-if="page < total_pages" class="more">——上划加载更多——</div>
  </div>
</template>

<script>
import NoList from '@/components/common/no-data/no-list'
export default {
  components: {
    NoList
  },
  data () {
    return {
      list: [],
      imgProcess: this.$imgProcess,
      loadSuccess: false,
      page: 1,
      limit: 20,
      total_pages: 1
    }
  },
  methods: {
    async getList () {
      this.loadSuccess = false
      let args = {
        url: this.api('getHistoryList'),
        data: {
          page: this.page,
          limit: this.limit
        }
      }
      let res = await this.get(args)
      if (res.status) {
        this.list = this.page === 1 ? res.data.items : this.list.concat(res.data.items)
        this.total_pages = parseInt(res.data.total_pages)
      }
      this.loadSuccess = true
    }
  },
  mounted () {
    this.getList()
  },
  onReachBottom () {
    if (this.page < this.total_pages) {
      this.page++
      this.getList()
    }
  }
}
</script>
<style lang="less" scoped>
.history {
  width: 100%;
  padding: 20rpx 24rpx;
  box-sizing: border-box;
  .more {
    text-align: center;
    font-size: 26rpx;
    color: #999;
  }
  .item {
    padding: 30rpx;
    display: flex;
    align-items: center;
    background: #fff;
    margin-bottom: 20rpx;
    .br(10rpx);
    img {
      .w(390rpx);
      .h(260rpx);
      margin-right: 20rpx;
    }
    .content {
      flex: 1;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 30rpx;
        font-weight: bold;
        .line-clamp-multi(2);
        color: #333;
      }
      .desc {
        font-size: 26rpx;
        color: #999;
      }
    }
  }
}
</style>


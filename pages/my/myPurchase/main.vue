<template>
  <div class="archives-page">
    <TopInfo :info="commiss_info" />
    <div class="archives">
      <Tool />
      <Commissioner :info="commiss_info" :like.sync="like" />
      <NeedLook :list="need_look_list" />
      <Learn :list="learn_list" @loadmore="Loadmore" :key="learn_key" />
      <tabContent
        title="/static/images/my/2.png"
        :list="tab_list"
        :content="video_list"
        :active_index.sync="video_index"
        @tabClick="GetVideoData"
        @contentClick="goVideo"
      />
    </div>

    <!-- 悬浮按钮 -->
    <Share></Share>
    <Buy></Buy>
  </div>
</template>

<script>
import TopInfo from '@/components/my/family/archives/topinfo'
import Tool from '@/components/my/family/archives/tool'
import Commissioner from '@/components/my/family/archives/commissioner'
import NeedLook from '@/components/my/family/archives/needLook'
import Learn from '@/components/my/family/archives/learn'
import Notice from '@/components/my/family/archives/notice'
import Share from '@/components/common/menu/share'
import Buy from '@/components/common/menu/buy'
import tabContent from '@/components/education/tab-content'
export default {
  components: {
    TopInfo,
    Tool,
    Commissioner,
    NeedLook,
    Learn,
    Notice,
    Share,
    Buy,
    tabContent
  },
  data () {
    return {
      commiss_info: {},
      like: '',
      need_look_list: [],
      learn_list: [],
      tab_list: [],
      video_index: 0,
      video_list: [],
      page: 1,
      no_more: false,
      learn_key: 0
    }
  },
  methods: {
    Loadmore () {
      if (this.no_more) return
      this.page++
      // uni.showLoading({
      //   mask: true
      // })
      let args = {
        url: this.api('getProfileOrder'),
        data: {
          page: this.page,
          limit: 20
        }
      }
      this.get(args).then(res => {
        // uni.hideLoading()
        if (res.status) {
          this.learn_list = [...this.learn_list, ...res.data.items]
          if (res.data.items.length === 0) {
            this.no_more = true
          } else {
            this.Loadmore()
          }
        }
      })
    },
    GetArchivesInfo () {
      let args = {
        url: this.api('getProfile'),
        data: {
          page: 1,
          limit: 6
        },
        loading: true
      }
      this.get(args).then(res => {
        if (res.status) {
          this.commiss_info = res.data.member
          this.need_look_list = res.data.recommend_list
          this.like = parseInt(res.data.thumbs_employee_no) !== 1
          this.GetOrderData()
          this.GetTabData()
        }
      })
    },
    GetOrderData () {
      let args = {
        url: this.api('getProfileOrder'),
        data: {
          page: 1,
          limit: 20
        },
        loading: true
      }
      this.get(args).then(res => {
        if (res.status) {
          this.learn_list = res.data.items
          if (this.learn_list.length > 0) {
            this.Loadmore()
          }
        }
      })
    },
    goVideo (info) {
      this.$nav('class', { id: info.id })
    },
    GetTabData () {
      this.post({
        url: this.api('getMedalType'),
        loading: true
      }).then(res => {
        this.tab_list = res.data.cateList.map(item => {
          return {
            id: 1,
            tab_title: item.tag
          }
        })
        this.tab_list.length && this.GetVideoData()
      })
    },
    GetVideoData () {
      this.post({
        url: this.api('getMedalList'),
        data: {
          tag: this.tab_list[this.video_index].tab_title
        },
        loading: true
      }).then(res => {
        this.video_list = res.data.medal_list.map(item => {
          return {
            id: item.id,
            img: item.thumb,
            title: item.title,
            desc: item.detail
          }
        })
      })
    }
  },
  onShow () {
    this.page = 1
    this.no_more = false
    this.learn_key++
    this.GetArchivesInfo()
  }
}
</script>

<style lang="less" scoped>
.archives-page {
  padding-bottom: 46rpx;
  .archives {
    padding: 0 24rpx;
  }
}
</style>

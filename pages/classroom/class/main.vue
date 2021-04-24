<template>
  <div v-if="!loading" class="class" :class="{'fixed': showComment}">
    <!-- 视频 -->
    <VideoPanel
      :video="detail.video"
      :title="detail.title"
      :num="detail.watch_times"
      @videoEnd="videoEnd"
    ></VideoPanel>
    <Tab :tab_list="tab_list" :tab_index.sync="tab_index" @clickTab="clickTab"></Tab>
    <!-- 详情 -->
    <template v-if="tab_index === 0">
      <div class="content">
        <wxParse :content="detail.detail || ' '"></wxParse>
      </div>
      <!-- 了解视频产品 -->
      <div class="panel">
        <div class="panel-title">了解视频产品</div>
        <Products :list="detail.product_lists || []"></Products>
      </div>
      <!-- 推荐课堂 -->
      <div class="panel">
        <div class="panel-title" style="margin: 0">推荐课堂</div>
        <Classes :list="detail.recommend_lists || []"></Classes>
      </div>
    </template>
    <div v-else>
      <Question :list="detail.question_lists || []"></Question>
    </div>
    <template v-if="!showComment">
      <Profile></Profile>
      <AskButton @ask="showComment = true"></AskButton>
      <Cart></Cart>
    </template>
    <Comment :showModal="showComment" @closeModal="showComment = false" @post="postQuestion"></Comment>

    <!-- 答题 -->
    <AnswerPopup :detail="detail" :show.sync="show_answer" v-if="show_answer" />
  </div>
</template>

<script>
import SamePageMixin from '@/assets/mixins/samePage'
import VideoPanel from '@/components/common/video/fixVideo'
import Tab from '@/components/common/tab/tab'
import Products from '@/components/classroom/scrollProducts'
import Classes from '@/components/classroom/classes'
import Question from '@/components/classroom/question'
import AskButton from '@/components/classroom/ask-button'
import Comment from '@/components/classroom/comment'
import Cart from '@/components/common/menu/cart'
import Profile from '@/components/common/menu/profile'
import AnswerPopup from '@/components/education/answer-popup'
// import wxParse from 'mpvue-wxparse'
import wxParse from '@/components/common/wxParse/wxParse'
import { Pageshare } from '@/utils/Mixin'
export default {
  mixins: [ SamePageMixin, Pageshare ],
  components: {
    VideoPanel,
    Tab,
    Products,
    Classes,
    Question,
    AskButton,
    Comment,
    Cart,
    wxParse,
    Profile,
    AnswerPopup
  },
  data () {
    return {
      tab_list: [{
        name: '详情',
        type: 1
      }, {
        name: '提问',
        type: 2
      }],
      tab_index: 0,
      showComment: false,
      id: '',
      detail: {},
      loading: true,
      // 答题弹窗显示
      show_answer: false
    }
  },
  methods: {
    videoEnd () {
      this.show_answer = true
    },
    clickTab () {
    },
    postQuestion (content) {
      if (content) {
        this.postQ(content)
      } else {
        uni.showToast({
          icon: 'none',
          title: '请输入内容'
        })
      }
    },
    async postQ (content) {
      let args = {
        url: this.api('postQuestion'),
        data: {
          class_id: this.id,
          question: content
        },
        loading: true
      }
      let res = await this.post(args)
      if (res.status) {
        this.showComment = false
        uni.showToast({
          icon: 'none',
          title: '发表成功！将24小时内回复您，如紧急可致电4008110680'
        })
        this.getDetail()
      }
    },
    async getDetail () {
      let args = {
        url: this.api('getClassDetail'),
        data: {
          id: this.id
        },
        loading: this.loading
      }
      let res = await this.get(args)
      if (res.status) {
        this.detail = res.data
      }
      this.loading = false
    }
  },
  onShow () {
    this.id = this.$root.$mp.query.id
    this.getDetail()
    this.show_answer = false
  },
  onShareAppMessage () {
    this.$Tool.SetRecordScene({
      page: 'share',
      content_type: 'share_page',
      content_id: this.detail && this.detail.share_name ? this.detail.share_name : this.detail.title
    })
    return {
      title: this.detail && this.detail.share_name ? this.detail.share_name : this.detail.title,
      path: `/pages/classroom/class/main?id=${this.id}&uid=${this.uid}&t=s`
    }
  }
}
</script>
<style lang="less" scoped>
.class {
  .content {
    padding: 30rpx;
    background: #fff;
    font-size: 26rpx;
  }
  .panel {
    margin-top: 20rpx;
    padding: 30rpx;
    background: #fff;
    color: #333;
    .panel-title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 30rpx;
    }
  }
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>

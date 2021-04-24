<template>
  <div>
    <tabContent
      title="/static/images/education/title.png"
      :list="tab_list"
      :content="xunzhang_list"
      :active_index.sync="xunzhang_index"
      @tabClick="GetXunzhangData"
      @contentClick="xunzhangCLick" />
    <!-- <tabContent
      title="/static/images/archives/title-4.png"
      :list="tab_list"
      :content="video_list"
      :active_index.sync="video_index"
      @tabClick="GetVideoData"
      @contentClick="goVideo" /> -->
  </div>
</template>

<script>
  import tabContent from '@/components/education/tab-content'
  export default {
    data () {
      return {
        xunzhang_index: 0,
        tab_list: [],
        xunzhang_list: [],
        // 视频
        video_index: 0,
        video_list: []
      }
    },
    methods: {
      xunzhangCLick (info) {
        if (info.is_acquisition === 0) {
          this.$nav('class', { id: info.id })
        }
      },
      goVideo (info) {
        this.$nav('class', { id: info.id })
      },
      GetTabData () {
        this.post({
          url: this.api('getMedalType'),
          data: {
            class_cate_id: ''
          },
          loading: true
        }).then(res => {
          this.tab_list = res.data.cateList.map(item => {
            return {
              id: 1,
              tab_title: item.tag
            }
          })
          this.tab_list.length && this.GetXunzhangData()
          this.tab_list.length && this.GetVideoData()
        })
      },
      GetXunzhangData () {
        this.post({
          url: this.api('getMedalList'),
          data: {
            tag: this.tab_list[this.xunzhang_index].tab_title
          },
          loading: true
        }).then(res => {
          this.xunzhang_list = res.data.medal_list.map(item => {
            return {
              id: item.id,
              img: item.medal_img,
              title: item.medal_name,
              desc: Number(item.is_acquisition) === 1 ? `获得日期: ${item.acquisition_time_name}` : '点击勋章观看视频并答对题即可获得',
              is_acquisition: Number(item.is_acquisition)
            }
          })
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
    components: {
      tabContent
    },
    onShow () {
      this.xunzhang_index = 0
      this.video_index = 0
      this.video_list = []
      this.xunzhang_list = []
      this.GetTabData()
      // this.$Tool.SetRecordParameter({
      //   page: 'user',
      //   content_type: 'education'
      // })
    },
    onUnload () {
      this.$Tool.SetBrowseID()
    }
  }
</script>

<style lang="less" scoped></style>

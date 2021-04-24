<template>
  <div class="notice-box">
    <!-- 标题图片 -->
    <img src="/static/images/archives/title-4.png" class="title-img" mode="widthFix" />
    <div class="tab-box">
      <span
        class="tab-item"
        :class="{
          'active': active_index == index
        }"
        v-for="(item, index) in list"
        :key="index"
        @click="tabClick(index)">{{item.tab_title}}</span>
    </div>
    <div class="content">
      <div class="content-item" v-for="item in activeList" :key="item">
        <div class="text-info">
          <div class="title">{{item.title}}</div>
          <div class="desc">{{item.desc1}}</div>
          <div class="desc">{{item.desc2}}</div>
        </div>
        <div class="img-box">
          <img :src="item.img + imgProcess.wh140" class="video-img" :lazy-load="true" />
          <div class="video-icon">
            <img src="/static/images/archives/play.png" class="pay-icon" />
            {{item.time}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [{
          tab_title: '预防',
          info_list: [{
            img: '/static/images/archives/project.png',
            title: '烟感装对地方，火灾救全家',
            desc1: '烟感装在哪个位置合适？',
            desc2: '速点开视频马上观看。',
            time: '1:88'
          }, {
            img: '/static/images/archives/project-2.png',
            title: '10秒教您用灭火宝逃出火场',
            desc1: '如何用灭火宝快速逃离火灾现场？',
            desc2: '点开视频来学习一下，给自己增加逃生机会。',
            time: '1:88'
          }]
        }, {
          tab_title: '预警',
          info_list: [{
            img: '/static/images/archives/project.png',
            title: '烟感装对地方，火灾救全家',
            desc1: '烟感装在哪个位置合适？',
            desc2: '速点开视频马上观看。',
            time: '1:88'
          }]
        }, {
          tab_title: '小火灭火',
          info_list: [{
            img: '/static/images/archives/project.png',
            title: '烟感装对地方，火灾救全家',
            desc1: '烟感装在哪个位置合适？',
            desc2: '速点开视频马上观看。',
            time: '1:88'
          }]
        }, {
          tab_title: '大火逃生',
          info_list: [{
            img: '/static/images/archives/project-2.png',
            title: '烟感装对地方，火灾救全家',
            desc1: '烟感装在哪个位置合适？',
            desc2: '速点开视频马上观看。',
            time: '1:88'
          }]
        }],
        active_index: 0,
        imgProcess: this.$imgProcess
      }
    },
    methods: {
      tabClick (number) {
        this.active_index = number
      }
    },
    computed: {
      activeList () {
        if (this.list.length === 0) return []
        return this.list[this.active_index].info_list
      }
    }
  }
</script>

<style lang="less" scoped>
  .notice-box {
    width: 701rpx;
    background-color: #ffffff;
    margin: 10rpx auto;
    border-radius: 8rpx;
    position: relative;
    padding-bottom: 34rpx;
    padding-top: 10rpx;
    .title-img {
      width: 450rpx;
      margin-left: 12rpx;
      display: block;
    }
    .content {
      margin: 0 31rpx;
      .content-item {
        height: 168rpx;
        border-bottom: 1px solid #ccc;
        display: flex;
        .text-info {
          flex: 1;
          .title {
            font-size: 30rpx;
            color: #1a1a1a;
            margin-top: 14rpx;
            margin-bottom: 20rpx;
          }
          .desc {
            font-size: 24rpx;
            color: #1a1a1a;
          }
        }
        .img-box {
          width: 140rpx;
          height: 140rpx;
          margin-top: 14rpx;
          float: right;
          border-radius: 6rpx;
          position: relative;
          overflow: hidden;
          .video-img {
            width: 100%;
            height: 100%;
          }
          .video-icon {
            height: 24rpx;
            width: 63rpx;
            line-height: 24rpx;
            position: absolute;
            bottom: 10rpx;
            right: 6rpx;
            background: #4e4e4e;
            text-align: right;
            font-size: 18rpx;
            box-sizing: border-box;
            padding-right: 4rpx;
            color: #fff;
            .pay-icon {
              width: 9rpx;
              height: 13rpx;
              left: 8rpx;
              top: 50%;
              position: absolute;
              transform: translateY(-50%);
            }
          }
        }
      }
    }
    .tab-box {
      margin: 0 31rpx;
      text-align: center;
      border-bottom: 1px solid #ccc;
      padding-bottom: 24rpx;
      .tab-item {
        font-size: 24rpx;
        color: #1a1a1a;
        margin-right: 75rpx;
        position: relative;
        &:last-child {
          margin-right: 0;
        }
        &.active {
          &::after {
            height: 8rpx;
            position: absolute;
            content: '';
            bottom: -8rpx;
            border-radius: 4rpx;
            background: #9dc0ee;
            width: 100%;
            left: 0;
          }
        }
      }
    }
  }
</style>

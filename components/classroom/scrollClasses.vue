<template>
  <scroll-view scroll-y class="scroll-classes" :style="customStyle" @scrolltolower="$emit('MoreClasses')">
    <template v-if="loadSuccess">
      <div
        v-for="(item, index) in list"
        class="item"
        :key="index"
        @click="$nav('classDetail', { id: item.id })"
      >
        <img :lazy-load="true" :src="item.thumb2 + imgProcess.w280h186" mode="aspectFit" v-if="item.thumb">
        <img src="/static/images/classroom/class-pic.png" mode="aspectFit" v-else>
        <div class="right">
          <p class="title">{{ item.title }}</p>
          <div class="desc">
            <p>上传 {{ item.add_time }}</p>
            <p>主讲：{{ item.speaker }}</p>
          </div>
        </div>
      </div>
      <template v-if="list.length == 0">
        <NoList></NoList>
      </template>
    </template>
  </scroll-view>
</template>
<script>
import NoList from '@/components/common/no-data/no-list'
import Course from '@/components/common/card/course'

export default {
  components: {
    NoList,
    Course
  },
  props: {
    list: {
      type: [Array],
      default () {
        return []
      }
    },
    loadSuccess: {
      type: [Boolean],
      default: false
    },
    customStyle: {
      default: ''
    }
  },
  data () {
    return {
      page: 1,
      imgProcess: this.$imgProcess
    }
  }
}
</script>
<style lang="less" scoped>
.scroll-classes {
  flex: 1;
  box-sizing: border-box;
  padding: 20rpx;
  .item {
    display: flex;
    margin-bottom: 20rpx;
    padding: 30rpx 20rpx;
    .bg(#fff);
    border-radius: 10rpx;
    box-sizing: border-box;
    img {
      flex-shrink: 0;
      .w(280rpx);
      .h(186rpx);
      .br(10rpx);
      margin-right: 20rpx;
    }
    .right {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 30rpx;
        font-weight: bold;
        .line-clamp-multi(2);
      }
      .desc {
        font-size: 26rpx;
        color: #999;
      }
    }
  }
}
</style>

<template>
  <div>
    <div class="list-title">
      <p class="left">已学课堂</p>
      <p class="right" @click="$nav('classHistory')">
        更多历史
        <i class="iconfont icon-right"></i>
      </p>
    </div>
    <div
      v-for="(item, index) in history"
      :key="index"
      class="class-item"
      :class="{'bd-b': index !== history.length - 1}"
      @click="$nav('classDetail', { id: item.id })"
    >
      <img :src="item.thumb+imgProcess.w390h260" mode="aspectFill" :lazy-load="true">
      <div class="info">
        <div class="class-title">{{ item.title }}</div>
        <div class="class-detail">
          <p>{{ item.add_time }}</p>
          <p>主讲：{{ item.speaker }}</p>
        </div>
      </div>
    </div>
    <div v-if="history.length === 0 && loadSuccess">
      <NoData></NoData>
    </div>
    <div class="list-title">
      <p class="left">推荐课堂</p>
      <p class="right" @click="$nav('classroom')">
        更多推荐
        <i class="iconfont icon-right"></i>
      </p>
    </div>
    <Recommend :list="recommend" :loadSuccess="loadSuccess"></Recommend>
  </div>
</template>
<script>
import List from '@/components/classroom/classes'
import NoData from '@/components/common/no-data/no-list'
import { imgProcess } from '@/utils/imgProcess'
export default {
  props: {
    history: {
      type: Array,
      default () {
        return []
      }
    },
    recommend: {
      type: Array,
      default () {
        return []
      }
    },
    loadSuccess: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imgProcess
    }
  },
  components: {
    Recommend: List,
    NoData
  }
}
</script>
<style lang="less" scoped>
.list-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26rpx;
  color: #333;
  margin: 30rpx 0;
  .left {
    font-weight: bold;
    font-size: 30rpx;
  }
  .right {
    color: #999;
    display: flex;
    align-items: center;
  }
}
.class-item {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 0;
  background: #fff;
  border-radius: 10rpx;
  img {
    width: 390rpx;
    height: 260rpx;
    border-radius: 10rpx;
    margin-right: 20rpx;
  }
  .info {
    flex: 1;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .class-title {
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
    }
    .class-detail {
      font-size: 26rpx;
      color: #999999;
    }
  }
}
.bd-b {
  border-bottom: 1px solid #e5e5e5;
}
</style>

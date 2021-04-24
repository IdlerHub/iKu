<template>
  <div class="classes">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="class-item"
      :class="{'bd-b': index !== list.length - 1}"
      @click="$nav('classDetail', { id: item.id })"
    >
      <img :lazy-load="true" :src="item.thumb + imgProcess.w390h260" mode="aspectFill">
      <div class="info">
        <div class="class-title">{{ item.title }}</div>
        <div class="class-detail">
          <p>上传 {{ item.add_time }}</p>
          <p>主讲：{{ item.speaker }}</p>
        </div>
      </div>
    </div>
    <div v-if="list.length === 0" class="no-data">
      <NoData></NoData>
    </div>
  </div>
</template>
<script>
import NoData from '@/components/common/no-data/no-list'

export default {
  components: {
    NoData
  },
  data () {
    return {
      imgProcess: this.$imgProcess
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.classes {
  position: relative;
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
  .no-data {
    background: #fff;
    padding: 50rpx;
  }
}
</style>

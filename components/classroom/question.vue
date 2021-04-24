<template>
    <div class="question-list">
        <div
            v-for="(item, index) in list"
            :key="index"
            class="question"
            :class="{'bd-b': index !== list.length - 1}"
        >
            <img :lazy-load="true" :src="item.thumb + imgProcess.wh60" class="avatar">
            <div class="main">
                <p class="name">{{ item.nickname }}</p>
                <p class="content">{{ item.question }}</p>
                <div v-if="item.answer" class="reply">{{ item.answer }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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
.question-list {
  padding: 0 30rpx;
  background: #fff;
  .question {
    padding: 30rpx 0;
    display: flex;
    .avatar {
      width: 66rpx;
      height: 66rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    .main {
      flex: 1;
      font-size: 26rpx;
      color: #333;
      .name {
        font-size: 30rpx;
      }
      .content {
        margin: 20rpx 0;
      }
      .reply {
        background-color: #f4f4f4;
        padding: 20rpx;
        color: #666;
      }
    }
  }
  .bd-b {
    border-bottom: 1px solid #e5e5e5;
  }
}
</style>

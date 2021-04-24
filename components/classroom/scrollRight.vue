<template>
  <scroll-view scroll-y class="scroll-right" :style="customStyle" @scrolltolower="$emit('MoreGoods')">
    <div
      v-for="(item, index) in list"
      class="item flex"
      :key="index"
      @click="$nav('consult', { id: item.employee_no })"
    >
      <img :lazy-load="true" :src="item.photo_url + imgProcess.wh110" mode="aspectFill" v-if="item.photo_url">
      <img src="/static/images/common/avatar.png" mode="aspectFill" v-else>
      <div class="content">
        <div>
          <div class="flex-bc">
            <p class="title">{{ item.employee_name }}</p>
            <div class="flex">
              <i
                v-for="(star, s_index) in [1, 2, 3, 4, 5]"
                :key="s_index"
                class="iconfont icon-favorfill"
                :class="{'bright': star <= item.star_level}"
              ></i>
            </div>
          </div>
          <div class="desc">简介：{{ item.title }}</div>
        </div>
        <div class="thumbs flex-c">
          <i class="iconfont icon-dianzan1"></i>
          <span>{{ item.number }}</span>
        </div>
      </div>
    </div>
    <template v-if="loadSuccess && list.length == 0">
      <NoList></NoList>
    </template>
  </scroll-view>
</template>
<script>
import NoList from '@/components/common/no-data/no-list'

export default {
  components: {
    NoList
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
    scrollTop: {
      type: Number,
      default: 0
    },
    customStyle: {
      default: ''
    }
  },
  data () {
    return {
      timeStamp: 0,
      imgProcess: this.$imgProcess
    }
  }
}
</script>
<style lang="less" scoped>
.scroll-right {
  flex: 1;
  padding: 20rpx;
  .item {
    display: flex;
    margin-bottom: 20rpx;
    padding: 30rpx 20rpx;
    .bg(#fff);
    border-radius: 10rpx;
    // .w(540rpx);
    // min-height: 184rpx;
    .h(184rpx);
    img {
      flex-shrink: 0;
      .w(110rpx);
      .h(110rpx);
      .br(50%);
    }
    .content {
      margin-left: 20rpx;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .iconfont {
        .fz(26rpx);
        .c(#c4c4c4);
        margin-left: 8rpx;
      }
      .bright {
        .c(#f6cb00);
      }
      .flex {
        display: flex;
      }
      .title {
        margin-bottom: 10rpx;
        .fz(30rpx);
        font-weight: bold;
        .c(#333);
        p {
          .line-clamp-multi;
        }
      }
      .desc {
        .fz(26rpx);
        .c(#999);
        margin-top: 20rpx;
        margin-bottom: 10rpx;
        .line-clamp-multi;
      }
      .thumbs {
        align-self: flex-end;
        justify-content: flex-end;
        .c(#c4c4c4);
        .fz(26rpx);
        .iconfont {
          margin-right: 10rpx;
          .fz(36rpx);
        }
      }
    }
  }
}
</style>

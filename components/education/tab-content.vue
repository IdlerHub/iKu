<template>
  <div class="notice-box">
    <!-- 标题图片 -->
    <img :src="title" class="title-img" />
    <!-- 导航 -->
    <div class="tab-box flex-bc">
      <div
        class="tab-item flex-ccc"
        :class="{'tab-item-active': active_index == index,'index-0':index===0}"
        v-for="(item, index) in list"
        :key="index"
        @click="tabClick(index)"
      >
        <span class="text">{{item.tab_title}}</span>
      </div>
    </div>
    <div class="content">
      <div class="item" v-for="item in content" :key="item" @click="contentClick(item)">
        <div class="cover-box">
          <img :lazy-load="true" class="cover" :src="item.img + imgProcess.w375" mode="aspectFill" />
        </div>
        <div class="title border-1px-b">{{item.title}}</div>
      </div>

      <!-- <div class="content-item" v-for="item in content" :key="item" @click="contentClick(item)">
        <div class="text-info">
          <div class="title">{{item.title}}</div>
          <div class="desc">{{item.desc}}</div>
        </div>
        <div class="img-box">
          <img :src="item.img" mode="aspectFit" />
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    title: String,
    content: Array,
    active_index: null
  },
  data () {
    return {
      imgProcess: this.$imgProcess
    }
  },
  methods: {
    tabClick (number) {
      this.$emit('update:active_index', number)
      this.$emit('tabClick')
    },
    contentClick (info) {
      this.$emit('contentClick', info)
    }
  }
}
</script>

<style lang="less" scoped>
.notice-box {
  padding: 21rpx 24rpx 10rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  position: relative;
  .title-img {
    width: 500rpx;
    height: 85rpx;
    margin-bottom: 24rpx;
    display: block;
  }
  .content {
    .item {
      width: 100%;
      margin-bottom: 30rpx;
      &:last-child {
        margin-bottom: 0;
        .title {
          &::before {
            display: none;
          }
        }
      }
      .cover-box {
        width: 100%;
        height: 208rpx;
        .cover {
          width: 100%;
          height: 208rpx;
          border-radius: 23rpx;
        }
      }
      .title {
        padding: 14rpx 0 16rpx;
        font-family: SourceHanSansCN-Regular;
        font-size: 26rpx;
        color: #000000;
      }
    }
    // .content-item {
    //   height: 168rpx;
    //   border-bottom: 1px solid #ccc;
    //   display: flex;
    //   &:last-child {
    //     border: none;
    //   }
    //   .text-info {
    //     flex: 1;
    //     .title {
    //       font-size: 30rpx;
    //       color: #1a1a1a;
    //       margin-top: 14rpx;
    //       margin-bottom: 20rpx;
    //     }
    //     .desc {
    //       font-size: 24rpx;
    //       color: #1a1a1a;
    //       padding-right: 10rpx;
    //       .line-clamp-multi();
    //     }
    //   }
    //   .img-box {
    //     width: 140rpx;
    //     height: 140rpx;
    //     margin-top: 14rpx;
    //     float: right;
    //     border-radius: 6rpx;
    //     position: relative;
    //     overflow: hidden;
    //     img {
    //       width: 100%;
    //       height: 100%;
    //     }
    //   }
    // }
  }
  .tab-box {
    height: 56rpx;
    margin-bottom: 24rpx;
    padding: 0 15rpx;
    background-color: #dce5ff;
    border-radius: 24rpx;
    z-index: 5;
    position: relative;

    .tab-item {
      // max-width: 65rpx;
      max-width: 78rpx;
      min-height: 42rpx;
      padding: 0 12rpx;
      border-radius: 50rpx;
      font-family: SourceHanSansCN-Regular;
      font-size: 26rpx;
      color: #0b308e;
      text-align: center;
      z-index: 30;
      position: relative;

      &:last-child {
        margin-right: 0;
      }
      .text {
        line-height: 1;
        display: inline-block;
        z-index: 1000;
        position: relative;
      }
      &.index-0 {
        color: #fe0000;
      }
      &.tab-item-active {
        color: #ffffff !important;
        &.index-0 {
          color: #ffffff;
        }
        &::before {
          width: 100%;
          height: 100%;
          border-radius: 40rpx;
          background-color: #1f2a66;
          z-index: 10;
          position: absolute;
          content: "";
          bottom: 0;
          left: 0;
        }
      }
    }
  }
}
</style>

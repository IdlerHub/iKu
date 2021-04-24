<template>
  <div class="notice-box">
    <!-- 标题图片 -->
    <img :src="title" class="title-img" />
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
      <div class="content-item" v-for="item in content" :key="item" @click="contentClick(item)">
        <div class="text-info">
          <div class="title">{{item.title}}</div>
          <div class="desc">{{item.desc}}</div>
        </div>
        <div class="img-box">
          <img :lazy-load="true" :src="item.img + imgProcess.wh200" mode="aspectFit" />
        </div>
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
      list: Array,
      title: String,
      content: Array,
      active_index: null
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
    width: 701rpx;
    background-color: #ffffff;
    margin: 20rpx auto 0;
    border-radius: 8rpx;
    position: relative;
    padding-bottom: 34rpx;
    padding-top: 10rpx;
    .title-img {
      width: 450rpx;
      height: 75rpx;
      margin-left: 12rpx;
      display: block;
    }
    .content {
      margin: 0 31rpx;
      .content-item {
        height: 168rpx;
        border-bottom: 1px solid #ccc;
        display: flex;
        &:last-child {
          border: none;
        }
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
            padding-right: 10rpx;
            .line-clamp-multi();
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
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .tab-box {
      margin: 0 31rpx;
      border-bottom: 1px solid #ccc;
      padding-bottom: 24rpx;
      white-space: nowrap;
      overflow-x: scroll;
      padding-left: 30rpx;
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

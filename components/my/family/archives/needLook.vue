<template>
  <div class="need-look">
    <!-- 标题图片 -->
    <img src="/static/images/archives/title-2.png" class="title-img" mode="widthFix" />
    <div class="need-img-box">
      <!-- 轮播组件 -->
      <swiper
        class="swiper-content" style="height: 226rpx;"
        @change="SwiperChange">
        <swiper-item
          v-for="(item, index) in list"
          :key="index">
          <div class="img-box" @click="$nav('classDetail', { id: item.id })">
            <img :src="item.thumb2 + imgProcess.w375" class="img-content" mode="aspectFit" :lazy-load="true" />
            <!-- <div class="play-btn">
              <div class="time-btn">
                <img src="/static/images/archives/play.png" class="pay-icon" />
                {{item.time}}
              </div>
              <div class="play-count">{{item.watch_times}}次播放</div>
            </div> -->
          </div>
        </swiper-item>
      </swiper>
      <!-- 轮播指示点 -->
      <div class="indicator-list">
        <div
          class="indicator-item"
          :class="{
            'active': swiper_index == index
          }"
          v-for="(item, index) in list"
          :key="item"></div>
      </div>
    </div>
    <!-- 轮播底部描述 -->
    <div class="img-desc">{{imgDesc}}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        swiper_index: 0,
        imgProcess: this.$imgProcess
      }
    },
    methods: {
      SwiperChange ({ target: { current } }) {
        this.swiper_index = current
      }
    },
    props: {
      list: [Array]
    },
    computed: {
      imgDesc () {
        if (this.list.length === 0) return ''
        return this.list[this.swiper_index].detail
      }
    }
  }
</script>

<style lang="less" scoped>
  .need-look {
    z-index: 100;
    position: relative;
    width: 701rpx;
    height: 358rpx;
    background-color: #ffffff;
    margin: 10rpx auto 30rpx;
    border-radius: 8rpx;
    .title-img {
      width: 450rpx;
      margin-top: 10rpx;
      margin-left: 12rpx;
    }
    .img-desc {
      width: 647rpx;
      margin: 0 auto;
      color: #0a0807;
      font-size: 24rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .need-img-box {
      width: 647rpx;
      height: 226rpx;
      margin: 0 auto;
      position: relative;
      .indicator-list {
        position: absolute;
        right: 21rpx;
        bottom: 22rpx;
        .indicator-item {
          width: 15rpx;
          height: 15rpx;
          background: #fff;
          border-radius: 50%;
          float: left;
          margin-left: 8rpx;
          &.active {
            background: #9dc0ee;
          }
        }
      }
      .img-box {
        width: 647rpx;
        height: 226rpx;
        border-radius: 17rpx;
        overflow: hidden;
        position: relative;
        .img-content {
          width: 647rpx;
          height: 226rpx;
          border-radius: 10rpx;
        }
        .play-btn {
          height: 30rpx;
          position: absolute;
          left: 26rpx;
          bottom: 13rpx;
          .time-btn {
            width: 89rpx;
            height: 30rpx;
            background-color: #4e4e4e;
            border-radius: 3rpx;
            position: relative;
            text-align: right;
            color: #ffffff;
            font-size: 20rpx;
            box-sizing: border-box;
            padding-right: 6rpx;
            float: left;
            opacity: 0.9;
            .pay-icon {
              width: 14rpx;
              height: 19rpx;
              position: absolute;
              left: 6rpx;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          .play-count {
            float: left;
            color: #fff;
            font-size: 20rpx;
            margin-left: 4rpx;
          }
        }
      }
    }
  }
</style>

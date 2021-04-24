<template>
  <div class="learn-box">
    <!-- 标题图片 -->
    <!-- <img src="/static/images/archives/title-3.png" class="title-img" mode="widthFix" /> -->
    <!-- <div class="more flex-c" @click="$nav('archives-more')">
      <span>查看更多</span>
      <img src="/static/images/archives/more-icon.png" />
    </div>-->
    <!-- <template v-if="list.length">
      <template v-if="show_more">
        <scroll-view scroll-y class="scroll-box" @scrolltolower="LoadMore">
          <LearnItem v-for="(item, index) in show_list" :key="index" :item="item"/>
        </scroll-view>
      </template>
      <template v-else>
        <LearnItem v-for="(item, index) in show_list" :key="index" :item="item"/>
      </template>
			<div class="pick-up" v-if="show_more" @click="ShowMore">
				收起
				<div class="triangle"></div>
			</div>
    </template>-->

    <!-- 左右点的 -->
    <template v-if="list.length">
      <!-- <div @touchstart="TouchStart" @touchmove="TouchMove" @touchend="TouchEnd"> -->
      <div class="learn-box-item">
        <LearnItem :item="active_item" :item_key="item_key" />
      </div>
      <!-- <img :src="left_icon" class="left-icon" mode="widthFix" @click="LastItem" /> -->
      <!-- <img :src="right_icon" class="right-icon" mode="widthFix" @click="NextItem" /> -->
    </template>

    <!-- 左右滑的 -->
    <!-- <template v-if="list.length">
      <swiper @change="ItemSwiper" :current="active_index">
        <swiper-item v-for="(item, index) in list" :key="index">
          <LearnItem :item="item" />
        </swiper-item>
      </swiper>
      <img :src="left_icon" class="left-icon" mode="widthFix" @click="LastItem" />
      <img :src="right_icon" class="right-icon" mode="widthFix" @click="NextItem" />
    </template>-->

    <template v-else>
      <div class="none-box">
        <div class="none-desc">您还未购买任何消费产品</div>
        <noneBtn title="立即配置" @clickBtn="$nav('mall')"></noneBtn>
      </div>
    </template>
  </div>
</template>

<script>
import noneBtn from './noneBtn'
import LearnItem from './learn-item'
export default {
  data () {
    return {
      show_more: false,
      active_index: 0,
      moverStarX: 0,
      moverEndX: 0,
      item_key: 0
    }
  },
  watch: {
    active_index () {
      if (this.active_index + 1 === this.list.length) {
        // this.$emit('loadmore')
      }
    }
  },
  methods: {
    TouchStart ({ clientX }) {
      this.moverStarX = clientX
      this.moverEndX = 0
    },
    TouchMove ({ clientX }) {
      this.moverEndX = clientX
    },
    TouchEnd () {
      if (this.moverEndX - this.moverStarX > 0) {
        console.log('上一个')
        this.LastItem()
      } else {
        console.log('下一个')
        this.NextItem()
      }
    },
    ItemSwiper ({
      mp: {
        detail: { current }
      }
    }) {
      this.active_index = current
    },
    LastItem () {
      if (this.active_index === 0) {
        return
      }
      this.active_index--
      this.item_key++
    },
    NextItem () {
      if (this.active_index + 1 === this.list.length) {
        return
      }
      this.active_index++
      this.item_key++
    },
    LoadMore () {
      this.$emit('loadmore')
    },
    GoVideo (info, type) {
      if (info[`${type}_video_url`]) {
        this.$nav('video', {
          cover: info[`${type}_cover_url`],
          video: info[`${type}_video_url`]
        })
      } else {
        uni.showToast({
          title: '敬请期待',
          icon: 'none'
        })
      }
    },
    nav (id) {
      parseInt(id) && this.$nav('classDetail', { id: id })
    },
    WaitShow () {
      uni.showToast({
        title: '敬请期待',
        icon: 'none'
      })
    },
    ShowMore () {
      this.show_more = !this.show_more
    }
  },
  computed: {
    show_list () {
      if (this.show_more) {
        return this.list
      } else if (this.list.length > 0) {
        return [this.list[0]]
      } else {
        return []
      }
    },
    left_icon () {
      if (this.active_index === 0) {
        return '/static/images/archives/left-gray.png'
      } else {
        return '/static/images/archives/left.png'
      }
    },
    right_icon () {
      if (this.active_index === this.list.length - 1) {
        return '/static/images/archives/right-gray.png'
      } else {
        return '/static/images/archives/right.png'
      }
    },
    active_item () {
      if (this.list.length > 0) return this.list[this.active_index]
      return {}
    }
  },
  props: {
    list: [Array]
  },
  components: {
    noneBtn,
    LearnItem
  }
}
</script>

<style lang="less" scoped>
.learn-box {
  margin-bottom: 10rpx;
  z-index: 400;
  position: relative;
  .left-icon {
    position: absolute;
    width: 25rpx;
    left: -8rpx;
    top: 245rpx;
  }
  .right-icon {
    position: absolute;
    width: 25rpx;
    right: -8rpx;
    top: 245rpx;
  }
  .title-img {
    width: 450rpx;
    margin-top: 10rpx;
    margin-left: 12rpx;
  }
  .pick-up {
    font-size: 24rpx;
    text-align: center;
    margin-bottom: 10rpx;
    padding-top: 10rpx;
    .triangle {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 3rpx;
      transform: translateY(-2rpx);
      border-width: 12rpx;
      border-style: solid;
      border-color: transparent transparent #77b01e transparent;
    }
  }
  .scroll-box {
    max-height: 840rpx;
  }

  .more {
    position: absolute;
    top: 32rpx;
    right: 33rpx;
    font-size: 27rpx;
    color: #919191;
    img {
      width: 29rpx;
      height: 29rpx;
      margin-left: 6rpx;
    }
  }
}

.learn-box-item {
  padding: 10rpx 24rpx 10rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  &:first-child {
    border-radius: 0 0 20rpx 20rpx;
  }
}

.none-box {
  padding: 27rpx 24rpx 1rpx;
  background-color: #ffffff;
  border-radius: 0 0 20rpx 20rpx;

  .none-desc {
    color: #333333;
    font-size: 28rpx;
    text-align: center;
    // margin-top: 14rpx;
  }
}
</style>

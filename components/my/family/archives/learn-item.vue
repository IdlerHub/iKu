<template>
  <div class="learn-item">
    <!-- 三个按钮 -->
    <!-- <div class="btn-list">
      <img src="/static/images/archives/btn-1.png" @click="GoVideo(item, 'install', '安装视频')" />
      <img src="/static/images/archives/btn-2.png" @click="GoVideo(item, 'use', '使用视频')" />
      <img src="/static/images/archives/btn-3.png" @click="GoVideo(item, 'selection', '选用视频')" />
    </div>-->

    <div class="btn-row flex-bc">
      <div class="item flex-bc" @click.stop="GoVideo(item, 'install', '安装视频', 'install_goods')">
        <span>安装视频</span>
        <img
          class="icon"
          src="/static/images/my/5.png"
          mode="widthFix"
        />
      </div>
      <div class="item flex-bc" @click.stop="GoVideo(item, 'use', '使用视频', 'use_goods')">
        <span>使用视频</span>
        <img
          class="icon"
          src="/static/images/my/5.png"
          mode="widthFix"
        />
      </div>
      <div class="item flex-bc" @click.stop="GoVideo(item, 'selection', '选用视频', 'select_goods')">
        <span>选用视频</span>
        <img
          class="icon"
          src="/static/images/my/5.png"
          mode="widthFix"
        />
      </div>
    </div>

    <!-- 商品信息 -->
     
     <!-- @click.stop="$nav('goodsDetail', { product_sn: item.product_sn })" -->
    <div class="project-info" @click.stop="$nav('goodsDetail', { product_sn: item.product_sn })">
      <div class="img-box">
        <img :src="item.thumb" />
      </div>
      <div class="info">
        <div class="product-name-wrap flex-c">
          <div class="product-name">{{item.product_name}}</div>
        </div>
        <div class="product-date">
          <div class="title">拥有数量</div>
          <div class="content">x{{item.order_count}}</div>
        </div>
        <div class="product-date">
          <div class="title">有效期</div>
          <div class="content">{{item.effective_year}}年</div>
        </div>
        <div class="product-date">
          <div class="title">距过期</div>
          <div class="content" style="color: #fe0000;">{{item.f_day}}</div>
        </div>
        <div class="product-date">
          <div class="title">更换日期</div>
          <div class="content"  style="color: #fe0000;">{{item.expire_date}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('Video')
export default {
  data () {
    return {
      anim: true
    }
  },
  methods: {
    GoVideo (info, type, title, content) {
      const id = parseInt(info[`${type}_id`])
      if (id) {
        this.$Tool.SetRecordParameter({ content_type: content, content_id: id })
        this.$nav('classDetail', {
          id
        })
      } else {
        uni.showToast({
          title: '敬请期待',
          icon: 'none'
        })
      }
      if (info[`${type}_video_url`]) {
        let data = {
          cover_url: info[`${type}_cover_url`],
          video_url: info[`${type}_video_url`]
        }
        this.setInfo(data)
        this.$nav('video', { title })
      } else {
        uni.showToast({
          title: '敬请期待',
          icon: 'none'
        })
      }
    },
    ...mapMutations(['setInfo'])
  },
  props: {
    item: null,
    item_key: null
  },
  watch: {
    item_key () {
      this.anim = true
      setTimeout(() => {
        this.anim = false
      }, 500)
    }
  },
  mounted () {
    setTimeout(() => {
      this.anim = false
    }, 500)
  },
  onUnload () {
    this.$Tool.SetBrowseID()
  }
}
</script>

<style lang="less" scoped>
@keyframes shake {
  0% {
    transform: translateX(50rpx);
  }
  100% {
    transform: translateX(0);
  }
}
.learn-item {
  // padding-bottom: 20rpx;
  &.anim {
    animation-name: shake;
    animation-duration: 0.5s;
    animation-direction: normal;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-play-state: running;
  }
  &:last-child {
    padding-bottom: 0;
  }
}
.project-info {
  // margin: 20rpx 21rpx 25rpx;
  display: flex;
  .img-box {
    width: 212rpx;
    height: 212rpx;
    border-radius: 6rpx;
    img {
      width: 212rpx;
      height: 212rpx;
      border-radius: 6rpx;
    }
  }
  .info {
    flex: 1;
    padding-left: 20rpx;
    .product-name-wrap {
      height: 64rpx;
        margin-bottom: 12rpx;
      .product-name {
        max-height: 64rpx;
        line-height: 32rpx;
        font-size: 30rpx;
        font-weight: 800;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
    }

    .product-date {
      font-size: 24rpx;
      height: 36rpx;
      line-height: 36rpx;
      overflow: hidden;
      color: #999999;
      .title {
        float: left;
      }
      .content {
        float: right;
      }
    }
  }
}
.more {
  font-size: 24rpx;
  height: 30rpx;
  line-height: 30rpx;
  color: #1a1a1a;
  position: absolute;
  top: 35rpx;
  right: 22rpx;
  padding-right: 22rpx;
  span {
    position: absolute;
    top: 50%;
    transform: translateY(-55%);
    padding-top: -4rpx;
    right: 0;
    font-size: 30.1rpx;
    color: #89bf35;
  }
}
.btn-list {
  padding: 0 23rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  img {
    width: 204rpx;
    height: 47rpx;
  }
}

// 四期
.btn-row {
  margin-bottom: 8rpx;
  .item {
    padding: 0 10rpx;
    height: 36rpx;
    line-height: 36rpx;
    background-color: #dce5ff;
    span {
      margin-right: 10rpx;
      font-family: SourceHanSansCN-Regular;
      font-size: 26rpx;
      color: #0b308e;
    }
    .icon {
      width: 23rpx;
      height: 23rpx;
    }
  }
}
</style>

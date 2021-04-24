<template>
    <div class="fix-video">
        <video :src="video" controls @ended="$emit('videoEnd')"></video>
        <div class="video-panel">
            <div class="panel-left">
                <p class="primary">{{ title }}</p>
                <p class="secondary"><i class="iconfont icon-attentionfill"></i>{{ num }}人看过</p>
            </div>
            <div class="panel-right">
                <i class="iconfont icon-fenxiang"></i>
                分享
                <button open-type="share" class="hidden-button"></button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    video: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    num: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.fix-video {
    width: 100vw;
    margin-bottom: 20rpx;
    video {
        width: 100%;
        height: 500rpx;
    }
    .video-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx;
        background: #fff;
        font-size: 26rpx;
        color: #333;
        .panel-left {
            flex: 1;
            .primary {
                font-size: 34rpx;
                font-weight: bold;
                .line-clamp-multi(1);
            }
            .secondary {
                color: #999;
                display: flex;
                align-items: center;
                margin-top: 20rpx;
                .iconfont {
                    font-size: 42rpx;
                    margin-right: 20rpx;
                }
            }
        }
        .panel-right {
            width: 60rpx;
            text-align: center;
            position: relative;
            height: fit-content;
            .iconfont {
                font-size: 38rpx;
                color: @theme-color;
                margin-bottom: 16rpx;
            }
            .hidden-button {
                position: absolute;
                opacity: 0;
                z-index: 2;
                width: 60rpx;
                height: 100%;
                top: 0;
                left: 0;
            }
        }
    }
}
</style>

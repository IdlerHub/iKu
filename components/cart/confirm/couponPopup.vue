<template>
  <div class="pay-popup">
    <Popup :show.sync="show">
      <div class="bd">
        <div class="heading">选择优惠卷</div>
        <div class="coupon-list">
          <!-- <radio-group> -->
            <div
              class="coupon-item"
              v-for="(item, c_index) in list"
              :key="c_index">
              {{item.coupon_name}}
              <radio class="radio-icon" :checked="radio_index === c_index" color="#0a2d8f" @click="radioChange(c_index)" />
            </div>
          <!-- </radio-group> -->
        </div>
        <div class="btn" @click="finishChoose">完成</div>
      </div>
    </Popup>
  </div>
</template>

<script>
import Popup from '@/components/common/popup/popup'

export default {
  data () {
    return {
      radio_index: ''
    }
  },
  components: {
    Popup
  },
  props: {
    list: {
      type: Array
    },
    index: {
      type: [Number, String],
      default: 0
    },
    show: Boolean
  },
  methods: {
    radioChange (index) {
      if (this.radio_index === index) {
        this.radio_index = ''
      } else {
        this.radio_index = index
      }
    },
    finishChoose () {
      this.$emit('update:index', this.radio_index)
      this.$emit('update:show', false)
    }
  },
  watch: {
    show () {
      if (this.show) {
        this.radio_index = this.index
      }
    }
  }
}
</script>
<style lang="less" scoped>
.pay-popup {
  .bd {
    padding: 40rpx 30rpx;
    .heading {
      margin-bottom: 40rpx;
      font-weight: bold;
      font-size: 32rpx;
      color: #333333;
    }
    .coupon-list {
      max-height: 300rpx;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .coupon-item {
      .h(44rpx);
      .lh(44rpx);
      .fz(28rpx);
      margin-bottom: 48rpx;
      .radio-icon {
        float: right;
      }
    }
    .btn {
      width: 690rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      color: #fff;
      .fz(34rpx);
      margin-top: 30rpx;
      background-image: linear-gradient(-90deg,
        #0a2d8f 0%,
        #466bd3 100%),
      linear-gradient(
        #0a2d8f,
        #0a2d8f);
      background-blend-mode: normal,
        normal;
      box-shadow: 0rpx 10rpx 20rpx 0rpx
        rgba(10, 45, 143, 0.2);
      border-radius: 40rpx;
    }
  }
}
</style>

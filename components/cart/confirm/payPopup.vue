<template>
  <div class="pay-popup">
    <Popup :show.sync="show">
      <div class="bd">
        <div class="heading">支付方式</div>
        <div class="flex-c">
          <div
            class="btn"
            :class="[method_i == index ? 'active' : 'default']"
            v-for="(method, method_i) in list"
            :key="method_i"
            @click="$emit('update:index', method_i)"
          >
            {{ method.title }}
          </div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import Popup from "@/components/common/popup/popup";

export default {
  components: {
    Popup,
  },
  props: {
    list: {
      type: Array,
    },
    index: {
      type: [Number, String],
      default: 0,
    },
  },
};
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
    .btn {
      margin-right: 20rpx;
      margin-bottom: 40rpx;
      width: 180rpx;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 32rpx;
      text-align: center;
      .br(30rpx);
    }
    .default {
      color: #333333;
      .btn-border(30rpx, @border-color-primary);
    }
    .active {
      .bg(@theme-color);
      .c;
    }
  }
}
</style>

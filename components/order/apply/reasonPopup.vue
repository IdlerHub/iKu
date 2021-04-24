<template>
  <div class="reason-popup">
    <Popup :show.sync="show">
      <div class="hd">退换原因</div>
      <div class="bd">
        <div
          class="line flex-bc"
          :class="{ 'border-1px-t': index != 0 }"
          v-for="(item, index) in list"
          :key="index"
          @click="chooseReason(item)"
        >
          <div class="left">{{ item }}</div>
          <i class="iconfont icon-roundcheckfill" v-if="reason == item"></i>
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
  },
  data() {
    return {
      reason: "",
    };
  },
  methods: {
    chooseReason(val) {
      this.reason = val;
      this.$emit("update:show", false);
      this.$emit("updateReason", val);
    },
  },
};
</script>
<style lang="less" scoped>
.reason-popup {
  .hd {
    margin: 0 24rpx;
    padding: 40rpx 0 10rpx 0;
    font-size: 32rpx;
    color: #333333;
  }
  .bd {
    margin: 0 24rpx;
    font-size: 28rpx;
    color: #333333;
    .line {
      .h(86rpx);
    }
  }
}
</style>

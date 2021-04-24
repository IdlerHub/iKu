<template>
  <div class="item" v-if="item">
    <div class="date">{{item.create_time_name}}</div>
      <div class="date" v-if="isPay">订单号：{{item.from}}</div>
    <!-- <div class="top">
    </div> -->
    <div class="row flex-bc">
      <div class="key">{{item.target_name}}</div>
      <div class="value">
        <!-- <span class="unit">{{unit}}</span>
        <span class="price">{{targetType===0?item.income:item.pay}}</span>-->
        <span class="price">{{item.amount}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      default: null
    },
    type: {
      default: 1
    }
  },
  data () {
    return {
      unit: ''
    }
  },
  methods: {},
  computed: {
    targetType () {
      if (this.item) {
        this.unit = this.item.target_type === 'shopping' ? '-' : '+'
        return this.item.target_type === 'shopping' ? 1 : 0
      }

      return ''
    },
    isPay () {
      if (this.item) {
        return parseFloat(this.item.pay) > 0
      }
      return false
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  margin-bottom: 20rpx;
  padding: 28rpx 22rpx;
  background: #ffffff;

  .date {
    margin-bottom: 12rpx;
    font-family: SourceHanSansCN-Regular;
    font-size: 26rpx;
    color: #999999;
  }

  .row {
    .key {
      font-family: SourceHanSansCN-Bold;
      font-size: 30rpx;
      color: #333333;
      font-weight: bold;
    }
    .value {
      font-size: 32rpx;
      color: #fb2142;
      font-family: SourceHanSansCN-Regular;

      .price {
        font-family: WeChatNumber-151125;
        font-weight: bold;
      }
    }
  }
}
</style>

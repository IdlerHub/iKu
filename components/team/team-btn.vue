<template>
  <button
    class="team-btn flex-cc"
    :open-type="openType"
    @click="$emit('clickBtn')"
    :class="{
      'lg': size === 'lg',
      'sm': size === 'sm',
      'color-red': type === 'red',
      'color-yellow': type === 'yellow'
    }">{{title}}</button>
</template>

<script>
  export default {
    props: {
      title: [String, Number],
      size: {
        type: String,
        default: 'lg'
      },
      type: {
        type: String,
        default: 'red'
      },
      openType: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  .team-btn {
    .h(80rpx);
    .br(40rpx);
    .c(#fff);
    text-align: center;
    margin-right: 30rpx;
    &:last-child {
      margin-right: 0;
    }
    &:active {
      opacity: .8;
    }

    &.lg {
      .w(650rpx);
    }
    &.sm {
      .w(310rpx);
    }

    &.color-red {
      background-image: linear-gradient(-90deg,
        #fb2142 0%,
        #fb627a 100%),
      linear-gradient(
        #c4c4c4,
        #c4c4c4);
      background-blend-mode: normal,
        normal;
      box-shadow: 0rpx 6rpx 14rpx 0rpx
        rgba(255, 44, 76, 0.24);
    }
    &.color-yellow {
      background-image: linear-gradient(-90deg,
        #fa9504 0%,
        #f9bb64 100%),
      linear-gradient(
        #ffd927,
        #ffd927);
      background-blend-mode: normal,
        normal;
      box-shadow: 0rpx 6rpx 14rpx 0rpx
        rgba(250, 149, 4, 0.24);
    }
  }
</style>

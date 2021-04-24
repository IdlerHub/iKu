<template>
  <div  v-if="showModal" class="position like" :class="{'ease-in': showModal, 'ease-out': !showModal}">
    <div class="mask" @click.stop="$emit('closeModal')"></div>
    <div class="modal">
      <div class="title">留言</div>
      <textarea v-model="content" placeholder="请输入留言" rows="5" maxlength="-1"></textarea>
      <div class="btn-box">
          <button @click="$emit('post', content)">发表</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showModal: {
      type: [Boolean],
      default: false
    }
  },
  data () {
    return {
      content: ''
    }
  }
}
</script>
<style lang="less" scoped>
.like {
  .mask {
    position: fixed;
    .h(100vh);
    .w(100vw);
    .bg(rgba(0, 0, 0, 0.5));
    z-index: 99;
  }
  .modal {
    .bg(#fff);
    .br-tl(16rpx);
    .br-tr(16rpx);
    padding: 36rpx 30rpx;
    z-index: 100;
    position: absolute;
    bottom: 0;
    left: 0;
    .w(100vw);
    box-sizing: border-box;
    .fz(26rpx);
    .title {
        font-weight: bold;
        .fz(32rpx);
    }
    textarea {
        resize: none;
        margin: 20rpx 0;
        border: solid 1px #c4c4c4;
        padding: 30rpx;
        width: 100%;
        box-sizing:border-box;
    }
    .btn-box {
        padding: 30rpx;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
    }
    button {
        background-image: linear-gradient(-90deg, 
		#0a2d8f 0%, 
		#466bd3 100%), 
        linear-gradient(
            #0a2d8f, 
            #0a2d8f);
        background-blend-mode: normal, 
            normal;
        box-shadow: 0px 10rpx 20rpx 0px 
            rgba(10, 45, 143, 0.2);
        border-radius: 40rpx;
        color: #fff;
        width: 400rpx;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 34rpx;
    }
  }
}
.position {
  position: fixed;
  .w(100vw);
  .h(100vh);
  top: 0;
  left: 0;
}
</style>
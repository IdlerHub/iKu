<template>
  <div class="default-popup" :style="{ display: display ? '' : 'none' }">
    <div class="popup-mask" :class="{'mask-in': show, 'mask-out': !show}" @click="$emit('update:show', false)"></div>
    <div class="popup-content" :class="{'popup-enter': show, 'popup-leave': !show}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      display: false
    }
  },
  watch: {
    show (nv, ov) {
      setTimeout(() => {
        this.display = nv
      }, 300)
    }
  }
}
</script>
<style lang="less">
.default-popup {
  position: fixed;
  top: 0;
  left: 0;  
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  .popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1001;
  }
  .popup-content {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    border-radius: 16rpx 16rpx 0 0;
    z-index: 1010; 
  }
  .mask-in {
    animation: maskIn 100ms ease-in;
  }
  @keyframes maskIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .mask-out {
    animation: maskOut 300ms linear;
  }
  @keyframes maskOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }  
  .popup-enter {
    animation: popupEnter 300ms ease-in;
  }
  @keyframes popupEnter {
    0% {
      transform: translate3d(0, 100%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  .popup-leave {
    animation: popupLeave 300ms ease-out;
  }
  @keyframes popupLeave {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(0, 100%, 0);
    }
  }  
}
</style>

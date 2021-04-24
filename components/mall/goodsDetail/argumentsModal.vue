<template>
  <div class="modal-container" :style="{display: display ? '' : 'none'}">
    <div
      class="modal-mask"
      :class="{'mask-in': showModal, 'mask-out': !showModal}"
      @click.stop="$emit('closeModal')"
    ></div>
    <div class="modal-content" :class="{'modal-in': showModal, 'modal-out': !showModal}">
      <div class="argument-modal-content">
        <div class="title">产品参数</div>
        <div class="content">
          <div class="flex-c" v-for="(item, index) in list" :key="index">
            <div class="property">{{ item.label }}</div>
            <div class="desc">{{ item.value }}</div>
          </div>
          <div class="flex-cc" v-if="!list || list.length === 0">参数为空</div>
        </div>
        <div class="btn-box">
          <Btn name="关闭参数" @clickBtn="$emit('closeModal')"></Btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Btn from '@/components/common/button/button'

export default {
  components: { Btn },
  props: {
    showModal: {
      type: [Boolean],
      default: false
    },
    list: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      display: false
    }
  },
  watch: {
    showModal (nv, ov) {
      setTimeout(() => {
        this.display = nv
      }, 300)
    }
  }
}
</script>
<style lang="less" scoped>
.modal-container {
	position: fixed;
	top: 0;
  left: 0;
  .w(100vw);
	.h(100vh);
  z-index: 1000;
	.modal-mask {
		position: fixed;
    top: 0;
    left: 0;
    .w(100vw);
    .h(100vh);
		.bg(rgba(0, 0, 0, 0.5));
		z-index: 99;
  }
  .modal-content {
    position: absolute;
		bottom: 0;
    left: 0;
    .w(100vw);
    z-index: 100;
  }
	.argument-modal-content {
    box-sizing: border-box;
    padding: 0 30rpx;
    .bg(#fff);
    .br-tl(16rpx);
    .br-tr(16rpx);
		.title {
      padding: 40rpx 0;
      font-weight: bold;
			.fz(32rpx);
			.c(#333);
		}
		.content {
      padding-bottom: 30rpx;
			.fz(26rpx);
			.flex-c {
				padding: 20rpx 0;
				.property {
					.w(150rpx);
					.c(#999);
				}
			}
		}
		.btn-box {
			padding: 22rpx 145rpx;
		}
	}
}
.modal-in {
  animation: modalIn 300ms ease-out;
}
.modal-out {
  animation: modalOut 300ms linear;
}
.mask-in {
  animation: maskIn 300ms linear;
}
.mask-out {
  animation: maskOut 300ms linear;
}
@keyframes modalIn {
  0% { 
    opacity: 0;
    transform: translateY(100%); 
  }
  100% { 
    opacity: 1;
    transform: translateY(0); 
  }
}
@keyframes modalOut {
  0% { 
    opacity: 1;
    transform: translateY(0); 
  }
  100% { 
    opacity: 0;
    transform: translateY(100%); 
  }
}
@keyframes maskIn {
  0% { 
    opacity: 0;
  }
  100% { 
    opacity: 1;
  }  
}
@keyframes maskOut {
  0% { 
    opacity: 1;
  }
  100% { 
    opacity: 0;
  }  
}
</style>

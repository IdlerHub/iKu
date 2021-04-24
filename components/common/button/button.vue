<template>
  <button :class="[typeClass, sizeClass, borderClass]" @click.stop="clickBtn">{{ name }}</button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '按钮名称'
    },
    size: {
      type: String,
      default: 'Z'
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      size_list: {
        Z: 'btn-z', // w > 220, h = 80, br = 40
        XL: 'btn-xl', // 240, 70, 35
        L: 'btn-l', // 200, 80, 40
        M: 'btn-m', // 160, 60, 30
        S: 'btn-s', // w > 140, h = 60, br = 30
        XS: 'btn-xs' // 140, 50, 25
      },
      type_list: {
        default: 'plain-btn_default', // 默认（基本），
        primary: 'plain-btn_primary', // 首选，主题色填充，白色字
        disabled: 'plain-btn_disabled', // 禁用，灰色填充，白色字
        defaultB: 'border-btn_default', // 默认线条按钮 透明背景
        primaryB: 'border-btn_primary', // 首选线条按钮 白色背景，主题色线条
        infoB: 'border-btn_info' // 一般线条按钮，白色背景，灰色线条，灰色字
      }
    }
  },
  computed: {
    sizeClass () {
      return this.size_list[this.size]
    },
    typeClass () {
      return this.type_list[this.type]
    },
    borderClass () {
      let arr = this.type.split('')
      let last = this.type.length - 1
      let str = arr.splice(last, 1)[0]

      if (str === 'B') {
        let name = `btn-${this.size}-${arr.join('')}-border`
        name = name.toLowerCase()
        return name
      } else {
        return ''
      }
    }
  },
  methods: {
    clickBtn (e) {
      this.$emit('clickBtn')
    }
  }
}
</script>
<style lang="less" scoped>
button {
  line-height: 1;
}
.btn-z {
  padding: 24rpx 0;
  min-width: 220rpx;
	font-size: 32rpx;
	border-radius: @btn-z-radius;
}
.btn-xl {
  padding: 23rpx 0;
  min-width: 220rpx;
	font-size: 26rpx;
	border-radius: @btn-xl-radius;
}
.btn-l {
  padding: 24rpx 0;
  min-width: 200rpx;
	font-size: 32rpx;
	border-radius: @btn-l-radius;
}
.btn-m {
  padding: 16rpx 0;
  min-width: 160rpx;
	font-size: 28rpx;
	border-radius: @btn-m-radius;
}
.btn-s {
  padding: 16rpx 0;
  min-width: 140rpx;
	font-size: 26rpx;
	border-radius: @btn-s-radius;
}
.btn-xs {
  padding: 16rpx 0;
  min-width: 140rpx;
	font-size: 26rpx;
	border-radius: @btn-s-radius;
}

.plain-btn_primary {
	background: linear-gradient(-90deg,
		@theme-color 0%,
		#466bd3 100%),
	linear-gradient(
		#ff2c4c,
    #ff2c4c);
  .c;
	box-shadow: 0 8rpx 18rpx 0
		rgba(10, 45, 143, 0.2);
}
.border-btn_primary {
  .bg;
  .c(@theme-color);
}
.border-btn_info {
  .bg;
  color: #666666;
}
.plain-btn_disabled {
  .c(#999);
}

.btn {
  &-z {
    &-default-border {
      .btn-border(@btn-z-radius, @border-color-primary);
    }
    &-primary-border {
      .btn-border(@btn-z-radius, @theme-color);
    }
    &-info-border {
      .btn-border(@btn-z-radius, #c4c4c4);
    }
  }
  &-xl {
    &-default-border {
      .btn-border(@btn-z-radius, @border-color-primary);
    }
    &-primary-border {
      .btn-border(@btn-z-radius, @theme-color);
    }
    &-info-border {
      .btn-border(@btn-z-radius, #c4c4c4);
    }
  }
  &-l {
    &-default-border {
      .btn-border(@btn-z-radius, @border-color-primary);
    }
    &-primary-border {
      .btn-border(@btn-z-radius, @theme-color);
    }
    &-info-border {
      .btn-border(@btn-z-radius, #c4c4c4);
    }
  }
  &-m {
    &-default-border {
      .btn-border(@btn-z-radius, @border-color-primary);
    }
    &-primary-border {
      .btn-border(@btn-z-radius, @theme-color);
    }
    &-info-border {
      .btn-border(@btn-z-radius, #c4c4c4);
    }
  }
  &-s {
    &-default-border {
      .btn-border(@btn-z-radius, @border-color-primary);
    }
    &-primary-border {
      .btn-border(@btn-z-radius, @theme-color);
    }
    &-info-border {
      .btn-border(@btn-z-radius, #c4c4c4);
    }
  }
  &-xs {
    &-default-border {
      .btn-border(@btn-z-radius, @border-color-primary);
    }
    &-primary-border {
      .btn-border(@btn-z-radius, @theme-color);
    }
    &-info-border {
      .btn-border(@btn-z-radius, #c4c4c4);
    }
  }
}
</style>

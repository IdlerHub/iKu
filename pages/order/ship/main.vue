<template>
	<div class="ship" v-if="!loading">
    <template v-if="ship && ship.length > 0">
      <div class="status-panel">
        <img mode="aspectFill" src="/static/images/common/my_bg.png">
        <p>运输中</p>
      </div>
      <div class="address-panel">
        <div class="mb">快递公司：{{ ship_name }}</div>
        <div>快递单号：{{ ship_sn }}</div>
      </div>
      <div class="ship-progress">
        <div class="line flex-c" :class="{ 'default': index !== 0, 'active': index === 0 }" v-for="(item, index) in ship" :key="index">
          <div class="left">
            <div class="date">{{ item.fdate }}</div>
            <div class="time">{{ item.ftime }}</div>
          </div>
          <div class="dot-box">
            <div class="dot"></div>
            <div class="divider"></div>
          </div>
          <div class="right">{{ item.context }}</div>
        </div>
      </div>
    </template>
    <template v-else>
      <NoData tip="暂无物流信息"></NoData>
    </template>
	</div>
</template>

<script>
import Btn from '@/components/common/button/button'
import NoData from '@/components/common/no-data/no-search'

export default {
  components: {
    Btn,
    NoData
  },
  data () {
    return {
      loading: true,
      order_sn: '',
      ship_name: '',
      ship_sn: '',
      ship: []
    }
  },
  onLoad () {
    Object.assign(this, this.$options.data())
  },
  onShow () {
    this.order_sn = this.$root.$mp.query.order_sn
    this.getShipInfo()
  },
  methods: {
    async getShipInfo () {
      let args = {
        url: this.api('getShipInfo'),
        data: {
          order_sn: this.order_sn
        },
        loading: this.loading
      }
      let res = await this.post(args)

      if (res.status) {
        let re = res.data
        this.ship_name = re.company
        this.ship_sn = re.no
        this.ship = re.list
      } else {
        this.$toast(res.msg)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.ship {
	.status-panel {
		position: relative;
		height: 225rpx;
		font-size: 46rpx;
		.c;
		.lh(140rpx);
		text-align: center;
		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}
	}
	.address-panel {
		margin: -86rpx 24rpx 20rpx 24rpx;
		padding: 40rpx 20rpx;
		.bg;
    .f(28);
    .c(#333);
		.br;
    z-index: 10;
    .mb {
      margin-bottom: 30rpx;
    }
	}
	.ship-progress {
    margin: 0 24rpx 20rpx 24rpx;
		padding: 70rpx 60rpx 70rpx 0;
    .bg;
    border-radius: 10rpx;
		.line {
			font-size: 26rpx;
			color: @font-color-assist;
			.left {
				box-sizing: border-box;
        width: 170rpx;
        height: 66rpx;
				font-size: 20rpx;
				text-align: right;
      }
      .dot-box {
        position: relative;
        display: flex;
        justify-content: center;
        width: 72rpx;
        height: 20rpx;
      }
			.dot {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
				width: 20rpx;
				height: 20rpx;
				background: #c4c4c4;
        border-radius: 50%;
        z-index: 9;
      }
      .right {
        flex: 1;
      }
    }
    .default {
      margin-top: 80rpx;
      .divider {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 800%;
        background: #c4c4c4;
      }
    }
    .active {
      color: @font-color-primary; 
      .date {
        font-size: 28rpx;
      }
      .dot {
        background: @theme-color;
      } 
    }    
	}
}
</style>

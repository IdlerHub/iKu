<template>
  <div class="add-address">
    <div class="list">
      <div class="line border-1px-b flex-bc">
        <div class="label">收货人</div>
        <input v-model="consignee" type="text" class="flex-1" placeholder="填写收货人姓名">
      </div>
      <div class="line border-1px-b flex-bc">
        <div class="label">手机号码</div>
        <input v-model="phone" type="number" class="flex-1" maxlength="11" placeholder="填写收货人手机号">
      </div>
      <div class="line border-1px-b flex-bc">
        <div class="label">所在地区</div>
        <picker class="flex-1" mode="region" :value="region" @change="regionChange">
          <div class="picker" v-if="region.length > 0">
            {{region[0]}}{{region[1]}}{{region[2]}}
          </div>
          <div class="placeholder" v-else>选择省市区、乡镇</div>
        </picker>
      </div>      
      <div class="line border-1px-b flex-bc">
        <div class="label">详细地址</div>
        <input v-model="address" type="text" class="flex-1" placeholder="输入具体地址">
      </div>    
      <div class="line flex-bc">
        <div>设为默认地址</div>  
        <switch color="#0a2d8f" :checked="is_default" @change="switchChange"></switch>
      </div>        
    </div>
    <div class="bottom-fixed">
      <Btn name="保存地址" @clickBtn="onSaveAddress"></Btn>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/common/button/button'

export default {
  components: {
    Btn
  },
  data () {
    return {
      consignee: '',
      phone: '',
      region: ['广东省', '广州市', '荔湾区'],
      address: '',
      is_default: false,
      edit: false
    }
  },
  methods: {
    regionChange (e) {
      this.region = e.detail.value
    },
    switchChange (e) {
      this.is_default = e.detail.value
    },
    onSaveAddress () {
      if (!this.consignee) {
        this.$toast('请填写收货人姓名')
      } else if (!this.phone) {
        this.$toast('请填写收货人手机号')
      } else if (this.region.length === 0) {
        this.$toast('请选择省市区、乡镇')
      } else if (!this.address) {
        this.$toast('请填写收货具体地址')
      } else {
        this.addAddress()
      }
    },
    async addAddress () {
      let args = {
        url: this.api('changeAddress'),
        data: {
          address_id: 0,
          consignee: this.consignee,
          mobile: this.phone,
          location: this.region[0] + this.region[1] + this.region[2],
          address: this.address,
          is_default: Number(this.is_default),
          province_name: this.region[0],
          city_name: this.region[1],
          district_name: this.region[2]
        },
        loading: true,
        title: '提交中...'
      }
      let res = await this.post(args)

      if (res.status) {
        this.$toast('保存成功', 'success')

        setTimeout(() => {
          this.$nav('back')
        }, 1500)
      } else {
        this.$toast(res.msg)
      }
    }
  },
  onLoad () {
    Object.assign(this, this.$options.data())
  }
}
</script>
<style lang="less" scoped>
.add-address {
  padding: 20rpx 24rpx;
  .del {
    display: flex;
    justify-content: flex-end;
    color: #999;
    font-size: 28rpx;
    padding: 30rpx 0;
    .iconfont {
      font-size: 40rpx;
      margin-right: 15rpx;
    }
  }
  .list {
    padding: 0 30rpx;
    .bg;
    .br;
  }
  .line {
    height: 114rpx;
    font-size: 30rpx;
    color: #333333;
    .label {
      flex-shrink: 0;
      width: 170rpx;
    }
  }
  .bottom-fixed {
    padding: 20rpx 24rpx;
    .bg;
  }
}
</style>
<style>
.input-placeholder, .placeholder {
  color: #999;
}
</style>



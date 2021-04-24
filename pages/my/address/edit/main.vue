<template>
  <div class="edit-address">
    <div class="del" @click="onDel">
      <i class="iconfont icon-delete"></i>
      删除
    </div>
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
      address_id: 0,
      consignee: '',
      phone: '',
      region: [],
      address: '',
      is_default: false
    }
  },
  mounted () {
    this.address_id = this.$root.$mp.query.address_id
    this.getAddressById()
  },
  methods: {
    regionChange (e) {
      this.region = e.detail.value
    },
    switchChange (e) {
      this.is_default = e.detail.value
    },
    async getAddressById () {
      let args = {
        url: this.api('getAddressById'),
        data: {
          address_id: this.address_id
        },
        loading: true
      }
      let res = await this.post(args)

      if (res.status) {
        let re = res.data
        this.consignee = re.consignee
        this.phone = re.mobile
        this.region = [re.province_name, re.city_name, re.district_name]
        this.address = re.address
        this.is_default = Number(re.is_default) === 1
      } else {
        this.$toast(res.msg)
      }
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
        this.editAddress()
      }
    },
    async editAddress () {
      let args = {
        url: this.api('changeAddress'),
        data: {
          address_id: this.address_id,
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
        this.$toast('修改成功', 'success')

        setTimeout(() => {
          this.$nav('back')
        }, 1500)
      } else {
        this.$toast(res.msg)
      }
    },
    onDel () {
      let that = this
      wx.showModal({
        title: '删除地址',
        content: '确定删除当前收货地址吗？',
        confirmColor: '#0a2d8f',
        success () {
          that.delAddress()
        }
      })
    },
    async delAddress () {
      let args = {
        url: this.api('delAddress'),
        data: {
          address_id: this.address_id
        }
      }
      let res = await this.post(args)
      if (res.status) {
        this.$toast('删除成功', 'success')

        setTimeout(() => {
          this.$nav('back')
        }, 1500)
      } else {
        this.$toast(res.msg)
      }
    },
    reset () {
      this.consignee = ''
      this.phone = ''
      this.region = []
      this.address = ''
      this.is_default = false
    }
  },
  onUnload () {
    this.reset()
  }
}
</script>
<style lang="less" scoped>
.edit-address {
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



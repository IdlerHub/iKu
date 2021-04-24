<template>
	<div class="phone-authorize flex-cc">
		<div class="mask"></div>
		<div class="modal">
			<div class="logo flex-cc">
				<img src="/static/images/common/phone.png">
			</div>
			<div class="content">
        <p>确认定期接收家庭火灾防护知识手机号</p>
      </div>
			<div class="btn-box">
        <button class="btn-1" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">匹配手机</button>
        <button class="cancel" @click="handleBack">取消</button>
      </div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      // login_code: '', // uni.login code
      auth_encry: '', // 授权的加密数据
      auth_iv: '' // 授权的加密算法的初始向量
    }
  },
  onShow () {
    // this.getLoginCode()
  },
  methods: {
    handleBack(){
      // uni.setStorageSync('authPhone', 'cancel')
      uni.switchTab({
        url: '/pages/index/main'
      })
      wx.navigateBack({
            delta: 1,
      })
    },
    // uni.login() 获取code，注意有效期
    getLoginCode () {
      // let that = this
      uni.login({
        success: res => {
          console.log('mpvuelogin', res)

          // if (res.code) {
          //   that.login_code = res.code
          // }
        }
      })
    },
    // 授权手机号手机号
    getPhoneNumber (e) {
      let that = this
      let session = e.detail
      console.log('getPhoneNumber', e.detail)
      // 检查登录态是否过期。
      // 通过 uni.login 接口获得的用户登录态拥有一定的时效性。
      uni.checkSession({
        success: res => {
          // 各种手机的报错信息不统一，目前暂定为含有 fail, deny 就是拒绝
          // 开发者工具的报错是 getPhoneNumber:fail user deny
          if (session.errMsg.indexOf('fail') > -1 || session.errMsg.indexOf('deny') > -1) {
            // 拒绝授权
            uni.showToast({
              title: '需授权手机号后才能登录',
              icon: 'none'
            })
          } else {
            // 授权成功
            that.auth_encry = session.encryptedData
            that.auth_iv = session.iv
            // 向后台发送
            that.authPhone()
          }
        },
        fail: () => {
          // session_key 已经失效，需要重新执行登录流程
          uni.showToast({
            title: '登录已过期,请重新授权',
            icon: 'none',
            duration: 1500
          })
          that.getLoginCode()
        }
      })
    },
    // 选为消防专员
    chooseConsultant (employee) {
      let args = {
        url: this.api('chooseConsultant'),
        data: {
          employee_no: employee
        }
      }
      this.post(args)
    },
    // 授权
    async authPhone () {
      let args = {
        url: this.api('authPhone'),
        header: {
          // 'X-WX-Code': this.login_code,
          'X-WX-Encrypted-Data': this.auth_encry,
          'X-WX-IV': this.auth_iv
        }
      }
      let res = await this.post(args)

      if (res.status) {
        uni.showToast({
          title: '绑定成功',
          icon: 'success'
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 1500)
        let employee = wx.getStorageSync('employee_no')
        if (employee) {
          this.chooseConsultant(employee)
        }
      } else {
        uni.showToast({
          title: res.msg ? res.msg + '' : '系统繁忙，请稍候',
          icon: 'none'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.phone-authorize {
	height: 100vh;
	.mask {
		background: #000;
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		opacity: 0.4;
	}
	.modal {
		position: relative;
		border-radius: 20rpx;
		width: 520rpx;
		background: #fff;
		.logo {
			width: 100%;
			height: 250rpx;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.content {
      padding-top: 17rpx;
      padding: 0 70rpx;
			font-size: 32rpx;
			color: #333;
			text-align: center;
		}
  }
  .btn-box {
    padding: 30rpx 100rpx 50rpx 100rpx;
    button {
      width: 320rpx;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 30rpx;
      background: linear-gradient(-90deg, 
        #0a2d8f 0%, 
        #466bd3 100%), 
      linear-gradient(
        #0a2d8f, 
        #0a2d8f);
      color: #fff;
      box-shadow: 0 10rpx 20rpx 0 
        rgba(10, 45, 143, 0.2);
      border-radius: 80rpx;
      &::after {
        border: none;
      }
      &.btn-1 {
        margin-bottom:20rpx
      }
      &.cancel {
        background: #999999;
      }
    }  
  }
}
</style>

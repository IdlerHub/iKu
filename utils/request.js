import config from './config'
import api from './apis'
import { Bus, EmitType } from '@/utils/Bus'
const DEFAULT_PPID = config.appid
// 登陆询问是否已打开
let showLoginConfirn = false
const request = {
  async sleep (times) {
    console.log('sleep-----------')
    uni.showLoading()
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, times)
    })
  },
  async login (goLogin) {
    console.log('login-----------')

    return new Promise((resolve, reject) => {
      let recommendId = ''
      let recommendSource = ''

      wx.getStorage({
        key: 'recommend_id',
        success: res => {
          recommendId = res.data
        }
      })

      // 页面分享：share， 二维码分享：posters
      wx.getStorage({
        key: 'recommend_source',
        success: res => {
          if (res.data === 's') {
            recommendSource = 'share'
          }

          if (res.data === 'p') {
            recommendSource = 'posters '
          }
        }
      })

      wx.login({
        success (res) {
          console.log('code', res)
          let code = res.code
          uni.getUserInfo({
            success (resUserInfo) {
              // console.log('userInfo', resUserInfo)
              let encryptedData = resUserInfo.encryptedData
              let iv = resUserInfo.iv
              let args = {
                url: api.getApi('login'),
                data: { recommend_id: recommendId, recommend_source: recommendSource },
                loading: true,
                title: '登录中...',
                header: {
                  'X-WX-Code': code,
                  'X-WX-Encrypted-Data': encryptedData,
                  'X-WX-IV': iv
                }
              }
              request.httpGet(args).then(res => {
                console.log('login', res)
                if (res.status) {
                  uni.setStorage({
                    key: 'loginSession',
                    data: res.data.session
                  })
                  uni.setStorage({
                    key: 'loginUserinfo',
                    data: res.data.userInfo
                  })
                  wx.setStorageSync('appp_on_hide', 1)
                  Bus.$emit(EmitType['LoginSuccess'])
                  resolve(true)
                } else {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none'
                  })
                }
              })
            },
            fail () {
              uni.hideLoading()
              // if (goLogin) {
              //   uni.navigateTo({
              //     url: '/pages/authorize/userInfo/main'
              //   })
              // }
              if (!goLogin) return
              if (showLoginConfirn) return
              showLoginConfirn = true
              uni.showModal({
                title: '提示',
                content: '您尚未登陆，请进行登陆授权',
                confirmText: '去登陆',
                success: (type) => {
                  if (type.confirm) {
                    uni.navigateTo({
                      url: '/pages/authorize/userInfo/main'
                    })
                  } if (type.cancel) {
                    uni.navigateBack()
                  }
                },
                complete: () => {
                  showLoginConfirn = false
                }
              })
            }
          })
        },
        fail (err) {
          console.log('login-err', err)
          uni.showToast({
            title: '获取登录code失败',
            icon: 'none'
          })
        }
      })
    })
  },
  async loginHttpPost ({
    url = '',
    data = {},
    loading = false,
    title = '加载中...',
    header = {},
    goLogin = true
  } = {}) {
    let loginSessionRes = await new Promise(resolve => {
      uni.getStorage({
        key: 'loginSession',
        success (res) {
          resolve(res.data)
        },
        fail () {
          resolve(false)
        }
      })
    })
    if (loginSessionRes) {
      let { id, skey } = loginSessionRes
      header = {
        ...header,
        ...{
          'X-WX-Id': id,
          'X-WX-Skey': skey
        }
      }
    } else {
      header = {
        ...header,
        ...{
          'X-WX-Id': '1',
          'X-WX-Skey': '1'
        }
      }
    }
    let args = {
      url: url,
      data: data,
      loading: loading,
      title: title,
      header: header
    }
    let res = await this.httpPost(args)
    if (res.status) {
      return res
    } else {
      console.log('request_post_err', res)
      // 授权
      if (parseInt(res.code) === 500) {
        await request.login(goLogin)
        return request.loginHttpPost(args)
      } else if ([400, 409].includes(parseInt(res.code))) {
        return res
      } else {
        request.checkCode(res.code)
      }
    }
  },
  async loginHttpGet ({
    url = '',
    data = {},
    loading = false,
    title = '加载中...',
    header = {},
    goLogin = true,
    checkCode= true
  } = {}) {
    let loginSessionRes = await new Promise(resolve => {
      uni.getStorage({
        key: 'loginSession',
        success (res) {
          resolve(res.data)
        },
        fail () {
          resolve(false)
        }
      })
    })
    // console.log('loginSessionRes', loginSessionRes)
    if (loginSessionRes) {
      let { id, skey } = loginSessionRes
      header = {
        ...header,
        ...{
          'X-WX-Id': id,
          'X-WX-Skey': skey
        }
      }
    } else {
      header = {
        ...header,
        ...{
          'X-WX-Id': '1',
          'X-WX-Skey': '1'
        }
      }
    }
    let args = {
      url: url,
      data: data,
      loading: loading,
      title: title,
      header: header
    }
    let res = await this.httpGet(args)

    if (res.status) {
      return res
    } else {
      console.log('request_get_err', res)
      if (parseInt(res.code) === 500) {
        await request.sleep(1000)
        await request.login(goLogin)
        return request.loginHttpGet(args)
      } else if ([400, 409].includes(parseInt(res.code))) {
        return res
      } else {

        request.checkCode(res.code, res, data)

          // if(checkCode) {
          //   request.checkCode(res.code, res, data)
          // }
      }
    }
  },
  async httpGet ({
    url = '',
    data = {},
    loading = false,
    title = '加载中...',
    header = {}
  } = {}) {
    let appId = DEFAULT_PPID
    header = Object.assign(header, {
      'Content-Type': 'application/x-www-form-urlencoded',
      APPID: appId
    })

    if (loading === true) {
      uni.showLoading({
        title
      })
    }
    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        // data: {...data,uid:108,debug:1},
        data: data,
        header: header,
        method: 'GET',
        dataType: 'json',
        success (res) {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            uni.showToast({
              icon: 'none',
              title: '系统繁忙，请稍候。'
            })
            reject(res)
          }
        },
        fail (err) {
          uni.showToast({
            icon: 'none',
            title: '系统繁忙，请稍候。'
          })
          reject(err)
        },
        complete () {
          uni.hideLoading()
        }
      })
    })
  },
  async httpPost ({
    url = '',
    data = {},
    loading = false,
    title = '加载中...',
    header = {}
  } = {}) {
    let appId = DEFAULT_PPID
    header = Object.assign(header, {
      'Content-Type': 'application/x-www-form-urlencoded',
      APPID: appId
    })

    if (loading === true) {
      uni.showLoading({
        title
      })
    }
    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        // data: {...data,uid:108,debug:1},
        data: data,
        header: header,
        method: 'POST',
        dataType: 'json',
        success (res) {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            uni.showToast({
              icon: 'none',
              title: '系统繁忙，请稍候。'
            })
            reject(res)
          }
        },
        fail (err) {
          uni.showToast({
            icon: 'none',
            title: '系统繁忙，请稍候。'
          })
          reject(err)
        },
        complete () {
          uni.hideLoading()
        }
      })
    })
  },
  async checkCode (code) {
    console.log('checkCode', code)
    code = parseInt(code)
    // 500 未授权（登录） 501 未授权手机号
    switch (code) {
      case 501:

        uni.navigateTo({
          url: '/pages/authorize/phone/main'
        })

        // var authPhone = wx.getStorageSync('authPhone')

        // if(authPhone!=='cancel') {
        //   uni.navigateTo({
        //     url: '/pages/authorize/phone/main'
        //   })
        // }else{
        //   wx.showModal({
        //     title: '提示',
        //     content: '匹配手机，定期接收家庭火灾防护知识手机号',
        //     success (res) {
        //       if (res.confirm) {
        //         uni.navigateTo({
        //           url: '/pages/authorize/phone/main'
        //         })
        //       } else if (res.cancel) {
        //         wx.setStorageSync('authPhone', 'cancel')
                
        //       }
        //     }
        //   })
        // }

        break
    }
  }
}
export default request

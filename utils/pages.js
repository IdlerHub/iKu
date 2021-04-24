import * as Tool from '@/utils/Tool'
const pages = {
  page: {
    // type: 跳转类型，url: 跳转路径，data: 跳转需要参数
    mall: {
      type: 'tab',
      url: '/pages/mall/index/main',
      record: {
        page: 'goods_list'
      }
    },
    classroom: {
      url: '/pages/classroom/index/main'
    },
    article: {
      url: '/pages/article/main',
      data: {
        id: 0
      }
    },
    video: {
      url: '/pages/video/main'
    },
    search: {
      url: '/pages/search/main',
      data: {
        type: 0
      }
    },
    goodsDetail: {
      url: '/pages/mall/detail/main',
      data: {
        product_sn: ''
      }
    },
    consult: {
      url: '/pages/classroom/consult/main',
      data: {
        id: 0
      },
      record: {
        content_type: 'employee'
      }
    },
    class: {
      url: '/pages/classroom/class/main',
      data: {
        id: 0
      }
    },
    cart: {
      type: 'tab',
      url: '/pages/cart/index/main'
    },
    team: {
      url: '/pages/team/main'
    },
    education: {
      url: '/pages/education/main',
      record: {
        content_type: 'education'
      }
    },
    couponReceive: {
      url: '/pages/coupon/receive/main'
    },
    couponMy: {
      url: '/pages/coupon/my/main'
    },
    confirm: {
      url: '/pages/cart/confirm/main',
      data: {
        cart_ids: ''
      }
    },
    productConfirm: {
      url: '/pages/cart/productConfirm/main',
      data: {
        goods_id: '',
        spec_id: '',
        goods_num: '',
        address: '',
        goods_list: '',
        total_price: ''
      }
    },
    packageConfirm: {
      url: '/pages/cart/packageConfirm/main',
      data: {
        goods_id: ''
      }
    },
    selectAddress: {
      url: '/pages/cart/address/main'
    },
    addAddress: {
      url: '/pages/my/address/add/main'
    },
    editAddress: {
      url: '/pages/my/address/edit/main',
      data: {
        address_id: 0
      }
    },
    invoice: {
      url: '/pages/cart/invoice/main'
    },
    orders: {
      url: '/pages/order/list/main',
      data: {
        tab_index: 0
      }
    },
    orderDetail: {
      url: '/pages/order/detail/main',
      data: {
        order_sn: ''
      }
    },
    orderApply: {
      url: '/pages/order/apply/main',
      data: {
        order_sn: '',
        record_id: 0
      }
    },
    orderShip: {
      url: '/pages/order/ship/main',
      data: {
        order_sn: ''
      }
    },
    family: {
      url: '/pages/my/family/main',
      data: {
        index: 0
      }
      // content_type: ['classroom', 'equipment', 'overdue', 'wait']
    },
    myPurchase: {
      url: '/pages/my/myPurchase/main',
      data: {
        index: 0
      }
    },
    // 返回
    back: {
      type: 'back',
      data: {
        delta: 1
      }
    },
    // 提示“正在开发中”
    stop: {
      type: 'stop'
    },
    // 课程详情
    classDetail: {
      type: 'navigate',
      url: '/pages/classroom/class/main',
      data: {
        id: 0
      }
    },
    // 已学课堂历史列表
    classHistory: {
      type: 'navigate',
      url: '/pages/my/family/history/main'
    },
    // 家庭消防档案
    profile: {
      type: 'navigate',
      url: '/pages/my/family/profile/main'
    },
    // 家庭消防档案2
    archives: {
      type: 'tab',
      url: '/pages/my/family/archives/main',
      record: {
        page: 'archives'
      }
    },
    'archives-more': {
      type: 'navigate',
      url: '/pages/my/family/archives-more/main'
    },
    address: {
      type: 'navigate',
      url: '/pages/my/address/index/main'
    },
    returnGoods: {
      type: 'navigate',
      url: '/pages/my/return/main'
    },
    // 联系专员
    contact: {
      type: 'navigate',
      url: '/pages/my/family/contact/main'
    },
    // 个人中心
    userCenter: {
      type: 'tab',
      url: '/pages/my/index/main',
      record: {
        page: 'user'
      }
    },
    // 返回首页
    home: {
      type: 'tab',
      url: '/pages/index/main'
    },
    invitationRecord: {
      type: 'navigate',
      url: '/pages/my/InvitationRecord/main'
    },
    MedalRecord: {
      type: 'navigate',
      url: '/pages/my/MedalRecord/main'
    },
    // 直播列表
    live: {
      url: '/pages/live/main'
    }
  },
  // 获取链接
  getUrl (name, data) {
    let obj = pages.page[name]
    data = {
      ...obj.data,
      ...data
    }

    // 是否有参数, 判断不是空对象
    if (Object.keys(data).length > 0) {
      let q = '?'
      for (var key in data) {
        q += `${key}=${data[key]}&`
      }
      q = q.substring(0, q.length - 1)

      return obj.url + q
    } else {
      return obj.url
    }
  },
  // 创建统计记录
  createBrowseLog (name) {
    let obj = pages.page[name]
    if (obj.record) {
      Tool.SetRecordParameter(obj.record)
    }
  },
  // name: 路径名，data：路径参数，isRedirect：redirectTo 跳转
  nav (name, data = {}, isRedirect = false) {
    let obj = pages.page[name]
    let url = pages.getUrl(name, data)
    pages.createBrowseLog(name)
    if (isRedirect) {
      uni.redirectTo({
        url: url
      })
      return
    }
    switch (obj.type) {
      case 'tab':
        uni.switchTab({
          url: url
        })
        break
      case 'navigate':
        uni.navigateTo({
          url: url
        })
        break
      case 'back':
        Tool.SetBrowseID()
        uni.navigateBack({
          delta: obj.delta
        })
        break
      case 'stop':
        pages.toast('精彩即将呈现')
        break
      default:
        uni.navigateTo({
          url: url
        })
        break
    }
  },
  getNavPages () {
    /* eslint-disable no-undef */
    let navPages = getCurrentPages()
    console.log(navPages)
  },
  toast (msg, type = 'none', time = 1500, mask = false) {
    if (!msg) {
      msg = '系统繁忙,请稍候'
    }
    uni.showToast({
      title: msg,
      icon: type,
      duration: time,
      mask: mask
    })
  }
}
export default pages

const apis = {
  env: 'pro',
  host: {
    mock: 'https://rest.apizza.net/mock/9ca23beaf9442f8245a873005724dc8e', // mock
    dev: 'http://karuike.hb.ztbweb.cn', // 测试 4.3:http://karuike2.hb.ztbweb.cn
    dev2: 'https://text.carrack.com.cn', // 测试 
    pro: 'https://app.carrack.com.cn' // 线上
  },
  api: {
    /* --------------------授权------------------------ */
    // 授权
    login: '/User/Public/Auth',
    // 授权手机号
    authPhone: '/User/Public/authPhone',

    /* --------------------首页------------------------ */
    // 首页场地
    getIndex: '/User/Index/index',
    // 获取文章内容
    getArticle: '/User/Index/getArticleDetail',
    // 搜索产品
    searchProducts: '/User/Index/searchProducts',
    // 搜索顾问
    searchConsultants: '/User/Index/searchConsultants',
    // 搜索课堂
    searchClasses: '/User/Index/searchClass',

    /* --------------------优惠卷------------------------ */
    // 获取首页优惠卷
    getHomeCoupon: '/User/Coupon/home',
    getHomeCouponV2: '/User/Coupon/homeV2',
    // 领劵中心
    getCouponCenter: '/User/Coupon/center',
    // 领取优惠卷
    receiveCoupon: '/User/Coupon/getCoupon',
    // 我的优惠卷
    myCoupon: '/User/Coupon/myCoupon',

    /* --------------------拼团------------------------ */
    // 获取商品拼团价
    getGoodGroupDetail: '/User/ProductGroup/getGoodsDetails',
    // 团购确认订单
    groupConfirmOrder: '/User/ProductGroup/calculateOrder',
    // 团购添加订单
    groupAddOrder: '/User/ProductGroup/createOrder',
    // 获取团购详情
    getGroupDetail: '/User/ProductGroup/getGroupOrderDetail',

    /* --------------------勋章------------------------ */
    // 获取题目
    getAnswer: '/User/Medal/getAnswerMedalDetails',
    // 提交答卷
    postAnswer: '/User/Medal/getSubmitAnswerMedal',
    // 获取勋章分类
    getMedalType: '/User/Medal/myMedalCate',
    // 获取勋章列表
    getMedalList: '/User/Medal/getMyMedal2',

    /* --------------------商城------------------------ */
    // 获取分类
    getShopCat: '/User/Shop/cate',
    // 获取商品列表
    getShopList: '/User/Shop/lists',
    // 商品详情
    getGoodsDetail: '/User/Shop/goodsDetail',
    // 单品规格
    getProductGuige: '/User/Shop/getProductSpec',
    // 套餐规格
    getPackageGuige: '/User/Shop/getPackageSpec',

    /* --------------------购物车------------------------ */
    // 单品加入购物车
    addProductGoods: '/User/ShopCart/addGoods',
    // 套餐加入购物车
    addPackageGoods: '/User/ShopCart/addPackage',
    // 购物车列表
    getCartList: '/User/ShopCart/lists',
    // 修改购物车数量
    changeCartNum: '/User/ShopCart/editGoodsNum',
    // 删除购物车商品
    delCartGoods: '/User/ShopCart/delGoods',
    // 计算购物车
    calCart: '/User/ShopCart/calPrice',
    // 确认订单
    // confirmCartOrder: '/User/ShopCart/confirmOrder',
    confirmCartOrder: '/User/ShopCart/confirmOrderV2',
    // 添加订单
    // addCartOrder: '/User/ShopCart/addOrder',
    addCartOrder: '/User/ShopCart/addOrderV2',

    // 单品确认订单
    // confirmProductOrder: '/User/Order/confirmGoodsOrder',
    confirmProductOrder: '/User/Order/confirmGoodsOrderV2',
    // 套餐确认订单
    // confirmPackageOrder: '/User/Order/confirmPackageOrder',
    confirmPackageOrder: '/User/Order/confirmPackageOrderV2',
    // 添加发票记录
    addInvoice: '/User/Order/addBill',
    // 套餐确认订单
    getInvoiceRecord: '/User/Order/getBillRecord',
    // 获取支付方式
    getPayMethod: '/User/Order/getPayType',
    // 添加订单（单品）
    // addProductOrder: '/User/Order/addGoodsOrder',
    addProductOrder: '/User/Order/addGoodsOrderV2',
    // 套餐添加订单
    // addPackageOrder: '/User/Order/addPackageOrder',
    addPackageOrder: '/User/Order/addPackageOrderV2',
    // 支付订单
    payOrder: '/User/Order/payOrder',
    // 虚拟支付
    fakePay: '/User/Order/fakePay',
    // 获取购物车数量
    getMyCartNum: '/User/Shop/getMyCartNum',
    // 批量加入购物车
    batchAddGoods: '/User/ShopCart/batchAddGoods',

    /* --------------------顾问------------------------ */
    // 获取列表
    getCates: '/User/ConsultantsIndex/cate',
    // 获取列表和轮播图
    getConsultants: '/User/ConsultantsIndex/lists',
    // 顾问详情
    getConsultantDetail: '/User/Consultants/detail',
    getConsultantDetailV2: '/User/ConsultantsIndex/detail',
    // 点赞专员
    thumbsUpConsultant: '/User/Consultants/thumbsUpConsultant',
    // 选为服务专员，绑定
    chooseConsultant: '/User/Consultants/chooseMyConsultants',
    // 课程详情
    getClassDetail: '/User/Class/detail',
    // 提问
    postQuestion: '/User/Class/addQuestion',

    /* --------------------个人中心------------------------ */
    // 个人中心
    getCenter: '/User/UserEquipment/info',
    // 我的器材
    getEquip: '/User/UserEquipment/index',
    // 家庭护照
    getFamilyList: '/User/UserEquipment/lists',
    // 历史列表
    getHistoryList: '/User/UserEquipment/historyList',
    // 家庭护照档案
    getProfile: '/User/UserEquipment/home',
    // 获取家庭档案订单
    getProfileOrder: '/User/UserEquipment/getOrderList',
    // 家庭顾问轮播图
    profileBanner: '/User/UserEquipment/banner',
    // 问题列表顾问信息
    getConsultInfo: '/User/UserEquipment/questionList',
    // 提问
    addQuestion: '/User/UserEquipment/addQuestion',
    // 我的勋章
    integrationBalanceList: '/User/Integration/integrationBalanceList',
    // 邀请人数
    recommendLog: '/User/UserEquipment/recommendLog',
    // 获取推荐码
    recommendCode: '/User/UserEquipment/recommendCode',

    /* --------------------我的订单------------------------ */
    // 订单列表
    getOrderList: '/User/Order/orderList',
    // 订单详情
    getOrderDetail: '/User/Order/orderDetail',
    // 取消订单
    cancelOrder: '/User/Order/cancelOrder',
    // 再来一单
    oneMoreOrder: '/User/Order/reOrder',
    // 查看物流
    getShipInfo: '/User/Order/getShippingInfo',
    // 确认收货
    receiveOrder: '/User/Order/receiveOrder',
    // 删除订单
    delOrder: '/User/Order/delOrder',
    // 提交退换货申请
    applyRetun: '/User/Order/addApplyReturn',
    // 确认退换货申请
    confirmReturn: '/User/Order/confirmApplyReturn',
    // 退换货订单列表
    getReturnOrderList: '/User/Order/returnOrderList',
    // 重新申请退换货
    reApplyReturn: '/User/Order/reApplyReturn',
    // 取消退换货
    cancelReturn: '/User/Order/cancelReturnOrder',

    /* --------------------地址------------------------ */
    // 收货地址列表
    getAddressList: '/User/UserAddress/lists',
    // 设为默认地址
    setDefaultAddress: '/User/UserAddress/changeDefault',
    // 修改或新增用户地址
    changeAddress: '/User/UserAddress/addEditAddress',
    // 删除用户地址
    delAddress: '/User/UserAddress/delAddress',
    // 根据地址id获取地址信息
    // getAddressById: '/User/Order/getAddressById',
    getAddressById: '/User/UserAddress/getAddressById',
    // 模拟支付
    simulationPay: '/User/ConsultantsIndex/simulationPay',
    // 四期二阶段
    // 页面分享标题
    shareContent: '/User/Index/shareContent',

    /* --------------------直播------------------------ */
    // 直播列表
    getliveList: '/User/Live/liveList',
    // 创建用户浏览记录
    createLiveBrowseLog: '/User/Live/createLiveBrowseLog',
    // 是否直播
    getLiveCount: '/User/Live/getLiveCount',

    /* --------------------时长统计------------------------ */
    // 更新统计时长
    updatinBrowseLog: '/User/Browse/updatinBrowseLog',
    // 创建统计记录
    createBrowseLog: '/User/Browse/createBrowseLog',

    /* --------------------首页参数------------------------  */
    openSetting: 'User/Browse/openSetting',

    // 计算待过期列表价格
    calculationOverdueListPrice: '/User/UserEquipment/calculationOverdueListPrice'
  },
  getApi (apiName) {
    return apis.host[apis.env] + apis.api[apiName]
  }
}
export default apis

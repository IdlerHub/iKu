import Vue from 'vue'

export const Bus = new Vue()

export const EmitType = {
  // 登陆成功
  LoginSuccess: 'LoginSuccess',
  // 选择了地址
  ChooseAddress: 'ChooseAddress'
}

export default {
  install: Vue => {
    Vue.prototype.$EmitType = EmitType
    Vue.prototype.$Bus = Bus
  }
}

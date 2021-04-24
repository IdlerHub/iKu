const dataArr = []

export default {
  onLoad () {
    Object.assign(this, this.$options.data())
  },
  onHide () {
    // 页面隐藏/切入后台时触发。 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等
    // 跳转的时候先把这个页面的data数据存起来
    dataArr.push({ ...this.$data })
  },
  onUnload () {
    // this.loading = true
    // 页面卸载时触发。如redirectTo或navigateBack到其他页面时。
    // 从详情返回来的时候再把前一个详情页面数据赋值到data里
    const len = dataArr.length
    Object.assign(this.$data, dataArr[len - 1])
    // 再把数据释放
    dataArr.pop()
  }
}

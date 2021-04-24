export default {
  methods: {
    onEvent (type, id) {
      let that = this
      let list = {
        'cancel': {
          title: '确定取消该申请吗？',
          content: '再考虑考虑',
          method: 'cancelReturn'
        },
        're': {
          title: '确定重新开启该申请吗',
          content: '再考虑考虑',
          method: 'reApplyReturn'
        }
      }
      let t = list[type]
      uni.showModal({
        title: t.title,
        content: t.content,
        confirmColor: '#0a2d8f',
        success: res => {
          if (res.confirm) {
            that[t.method](id)
          }
        }
      })
    },
    async cancelReturn (id) {
      let args = {
        url: this.api('cancelReturn'),
        data: {
          id: id
        }
      }
      let res = await this.post(args)

      if (res.status) {
        this.$toast('取消成功', 'success')
        this.refresh()
      } else {
        this.$toast(res.msg)
      }
    },
    async reApplyReturn (id) {
      let args = {
        url: this.api('reApplyReturn'),
        data: {
          id: id
        }
      }
      let res = await this.post(args)

      if (res.status) {
        this.$toast('申请成功', 'success')
        this.refresh()
      } else {
        this.$toast(res.msg)
      }
    }
  }
}

export default {
  data () {
    return {
      countdown: '',
      countdownTimer: ''
    }
  },
  methods: {
    countDown (end) {
      let newTime = new Date().getTime()
      let endTime = new Date(end * 1000).getTime()

      // 未结束
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000
        let day = parseInt(time / (3600 * 24))
        let hour = parseInt(time % (3600 * 24) / 3600)
        let min = parseInt(time % (3600 * 24) % 3600 / 60)
        let sec = parseInt(time % (3600 * 24) % 3600 % 60)

        this.countdown = {
          is_end: false,
          day: this.timeFormat(day),
          hour: this.timeFormat(hour),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {
        // 已结束
        this.countdown = {
          is_end: true,
          day: '00',
          hour: '00',
          min: '00',
          sec: '00'
        }
      }
      clearTimeout(this.countdownTimer)

      this.countdownTimer = setTimeout(() => {
        this.countDown(end)
      }, 1000)
      // console.log(this.countdownTimer)
    },
    timeFormat (time) {
      return time < 10 ? '0' + time : time
    }
  },
  onUnload () {
    clearTimeout(this.countdownTimer)
  },
  onHide () {
    clearTimeout(this.countdownTimer)
    this.countdownTimer = null
  }
}

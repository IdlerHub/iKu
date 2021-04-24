<template>
  <official-account @load="officialLoad" @error="officialError" v-if="official_show"></official-account>
</template>

<script>
export default {
  data () {
    return {
      official_show: true // 关注公众号组件
    }
  },
  methods: {
    // 组件加载成功时触发
    officialLoad (e) {
      console.log('official-load', e.detail)
    },
    // 组件加载失败时触发
    officialError (e) {
      this.official_show = false
      console.log('official-err', e.detail)
    }
  }
}
</script>

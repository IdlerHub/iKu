<template>
  <div class="family">
    <Tab :tab_list="tab_list"></Tab>
  </div>
</template>

<script>
import Tab from '@/components/common/tab/tab'
export default {
  components: {
    Tab
  },
  data () {
    return {
      tab_list: [{
        name: ''
      }]
    }
  }
}
</script>
<style lang="less" scoped>
.family {

}
</style>


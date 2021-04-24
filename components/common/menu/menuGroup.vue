<template>
  <div class="menu-group">
    <template v-if="type == '123'">
      <MenuProfile :customstyle="customobj.profile"></MenuProfile>
      <MenuShare :customstyle="customobj.share"></MenuShare>
      <MenuCart :customstyle="customobj.cart"></MenuCart>
    </template>

    <!-- 四期 -->
    <template v-if="type == '2'">
      <MenuShare></MenuShare>
    </template>

    <template v-if="type == '3'">
      <MenuShare></MenuShare>
    </template>

    <template v-if="type == '4'">
      <MenuShare></MenuShare>
      <MenuLive></MenuLive>
    </template>
  </div>
</template>

<script>
import MenuCart from './cart'
import MenuProfile from './profile'
import MenuShare from './share'
import MenuLive from './live'
let showMenu = false
if (uni.getStorageSync('loginSession')) {
  showMenu = true
}

export default {
  data () {
    return {
      show_menu: showMenu
    }
  },
  components: {
    MenuCart,
    MenuProfile,
    MenuShare,
    MenuLive
  },
  props: {
    type: {
      type: String,
      default: '123'
    },
    customobj: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    this.$Bus.$on(this.$EmitType['LoginSuccess'], () => {
      this.show_menu = true
    })
  }
}
</script>
<style lang="less" scoped>
</style>

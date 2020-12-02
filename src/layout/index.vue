<template>
  <div class="app-wrapper">
    <!--<div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>-->
      <div class="main-container" :style="getBackground">
        <topbar />
        <app-main />
        <index-footer/>
    </div>
  </div>
</template>
<script>
import { AppMain, Topbar } from './components'
import background from '@/store/modules/background';
// import ResizeMixin from './mixin/ResizeHandler'
import indexFooter from '@/components/Footer/index'
export default {
  name: 'Layout',
  components: {
    Topbar,
    AppMain,
    indexFooter
  },
  data() {
    return {
    }
  },
  computed: {
    getBackground() {
      return this.$store.getters.background;
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

</style>

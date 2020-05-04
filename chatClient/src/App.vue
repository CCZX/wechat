<template>
  <div id="app">
    <!-- <keep-alive :include="include">
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
    </router-view> -->
    <keep-alive :exclude="exclude">
      <router-view></router-view>
    </keep-alive>
    <pop-ups />
  </div>
</template>

<script>
import popUps from './PopUps'
export default {
  name: 'App',
  data() {
    return {
      include: ['Layout'],
      exclude: ['Login', 'NotFound']
    }
  },
  watch: {
    $route(to, from) {
      const exclude = this.exclude
      if (to.name === 'Login') {
        !exclude.includes('Layout') && exclude.push('Layout')
      } else {
        const index = exclude.indexOf('Layout')
        index !== -1 && exclude.splice(index, 1)
      }
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      // console.log('change')
      // if (to.meta.keepAlive) {
      //   // !this.include.includes('Layout') && this.include.push('Layout');
      //   !this.include.includes(to.name) && this.include.push(to.name);
      // }
      // //如果 要 form(离开) 的页面是 keepAlive缓存的，
      // //再根据 deepth 来判断是前进还是后退
      // //如果是后退
      // if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
      //   const index = this.include.indexOf(from.name);
      //   const layoutIndex = this.include.indexOf('Layout')
      //   // layoutIndex !== -1 && this.include.splice(layoutIndex, 1)
      //   index !== -1 && this.include.splice(index, 1);
      // }
    }
  },
  components: {
    popUps
  }
}
</script>

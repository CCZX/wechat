<template>
  <div id="app">
    <keep-alive :include="include">
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>

    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      include: []
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from)
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      setTimeout(() => {
        if (to.meta.keepAlive) {
          !this.include.includes('Layout') && this.include.push('Layout');
          !this.include.includes(to.name) && this.include.push(to.name);
        }
        //如果 要 form(离开) 的页面是 keepAlive缓存的，
        //再根据 deepth 来判断是前进还是后退
        //如果是后退
        if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
          console.log('okokokokokokokokokok')
          const index = this.include.indexOf(from.name);
          const layoutIndex = this.include.indexOf('Layout')
          layoutIndex !== -1 && this.include.splice(layoutIndex, 1)
          index !== -1 && this.include.splice(index, 1);
        }
      }, 1000);
    }
  },
}
</script>

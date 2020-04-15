<template>
  <div class="conversation-top-search-cmp">
    <search placeholder="请输入搜索内容" @search="search">
      
    </search>
  </div>
</template>

<script>
import search from '@/components/search'
export default {
  data() {
    return {
      group: [], /**搜索出来的群聊（已加入的） */
      friendly: [], /**搜索出来的好友 */
    }
  },
  methods: {
    async search(keyword) {
      console.log(keyword)
      const {data} = await this.$http.preFetchUser({
        pageSize: 0,
        page: 0,
        type: 'code',
        q: '1'
      })
      console.log(data)
    }
  },
  components: {
    search
  }
}
</script>

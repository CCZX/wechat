<template>
  <div class="system-page">
    
    <validate-news :validateNewsList="validateNewsList" />
  </div>
</template>

<script>
import validateNews from '@/components/validateNews'
export default {
  name: "System",
  data() {
    return {
      validateNewsList: []
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    async fetchMyValidateNews() {
      const { _id: id } = this.userInfo
      const { data } = await this.$http.getMyValidateNews({id})
      const { data: validateNewsList, status } = data
      console.log(data)
      if (status === 2000) {
        this.validateNewsList = validateNewsList
      }
    }
  },
  components: {
    validateNews
  },
  sockets: {
    receiveValidateMessage(data) {
      console.log('在system页面接收新的验证消息：', data)
      this.validateNewsList = [...this.validateNewsList, data]
    }
  },
  created() {
    // this.$http.getMyValidateNews()
    this.fetchMyValidateNews()
  },
}
</script>

<style lang="scss">
.system-page {
  width: 815px;
  min-height: 100%;
  margin: 10px auto 0;
}
</style>

<template>
  <div class="fenzhu-modal-cmp all0">
    <div class="switch-fenzu hor-ver-center" v-loading="confirmLoading">
      <span class="p-l-t el-icon-info ">
        <span class="secondary-font">点击切换分组</span>
      </span>
      <span class="p-r-t el-icon-close" @click="close"></span>
      <div class="fenzu-list">
        <el-radio-group v-model="selectFenzu" @change="modifyFenzu">
          <el-radio
            v-for="(item, index) in fenzuKeys"
            :key="index" class="item"
            :label="item"
          >
            {{item}}（{{userInfo.friendFenzu[item].length}}）
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentConversation'],
  data() {
    return {
      selectFenzu: "",
      confirmLoading: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    fenzuKeys() {
      return Object.keys(this.userInfo.friendFenzu)
    },
    currentFenzu() {
      const fenzuIdsMap = this.userInfo.friendFenzu
      let res = ''
      this.fenzuKeys.forEach(item => {
        if (fenzuIdsMap[item].includes(this.currentConversation._id)) {
          res = item
        }
      })
      return res
    }
  },
  methods: {
    async modifyFenzu() {
      if (!this.selectFenzu) return
      this.confirmLoading = true
      const params = {
        userId: this.userInfo._id,
        friendId: this.currentConversation._id,
        newFenzu: this.selectFenzu
      }
      const fenzuRes = await this.$http.modifyuserfenzu(params)
      if (fenzuRes.data.status === 2000) {
        const userInfo = await this.$http.getUserInfo(this.userInfo._id)
        this.$store.dispatch('user/LOGIN', userInfo.data.data)
        this.confirmLoading = false
      }
    },
    close() {
      console.log(1)
      this.$emit('hidden-fenzu')
    },
    change() {
      console.log(12)
    }
  },
  mounted() {
    this.selectFenzu = this.currentFenzu
  },
}
</script>

<style lang="scss">
.fenzhu-modal-cmp {
  position: fixed;
  z-index: 1006;
  background-color: rgba(0, 0, 0, .2);
  .switch-fenzu {
    width: 300px;
    padding: 40px 20px 20px;
    background-color: #fff;
    .fenzu-list {
      .item {
        display: block;
        margin-top: 20px;
        &:first-child {
          margin-top: 0;
        }
      }
    }
    .footer {
      margin-top: 20px;
    }
  }
}
</style>


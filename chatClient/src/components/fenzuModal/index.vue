<template>
  <div class="fenzhu-modal-cmp all0">
    <div class="switch-fenzu hor-ver-center" v-loading="confirmLoading">
      <div class="header">
        <span class="p-l-t el-icon-circle-plus-outline" @click="showAddFenzu">
          <span class="secondary-font">点击添加分组</span>
        </span>
        <span class="p-r-t el-icon-close" @click="close"></span>
      </div>
      <div class="fenzu-list">
        <el-radio-group v-model="selectFenzu" @change="modifyFenzu">
          <el-radio
            v-for="(item, index) in fenzuKeys"
            :key="index" class="item"
            :label="item"
            v-model="selectFenzu"
          >
            {{item}}（{{userInfo.friendFenzu[item].length}}）
            <!-- <span class="oper" @click.stop="test">123</span> -->
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <el-dialog
      title="添加分组"
      :visible="isShowAddFenzu"
      width="30%"
      @close="closeAddFenzu"
    >
      <el-input />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFenzu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['currentConversation'],
  data() {
    return {
      selectFenzu: "",
      confirmLoading: false,
      isShowAddFenzu: false
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
        if ((fenzuIdsMap[item] || []).includes(this.currentConversation._id)) {
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
      this.$emit('hidden-fenzu')
    },
    showAddFenzu() {
      this.isShowAddFenzu = true
    },
    closeAddFenzu() {
      this.isShowAddFenzu = false
    },
    addFenzu() {
      
    },
    test() {
      console.log(123)
    }
  },
  mounted() {
    this.selectFenzu = this.currentFenzu
  },
}
</script>

<style lang="scss">
.v-modal {
  display: none;
}
.fenzhu-modal-cmp {
  position: fixed;
  z-index: 2003;
  background-color: rgba(0, 0, 0, .2);
  .switch-fenzu {
    width: 300px;
    padding: 40px 20px 20px;
    background-color: #fff;
    border-radius: 10px;
    .fenzu-list {
      .item {
        display: block;
        margin-top: 20px;
        position: relative;
        &:first-child {
          margin-top: 0;
        }
        .oper {
          position: absolute;
          left: 100%;
        }
      }
    }
    .footer {
      margin-top: 20px;
    }
  }
}
</style>


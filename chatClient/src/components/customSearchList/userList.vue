<template>
  <div class="custom-search-list-com">
    <div class="wrapper" v-for="item in noMeSerchList" :key="item._id">
      <div class="details">
        <el-avatar
          class="avatar"
          shape="square"
          :src="IMG_URL + item.photo"
        >
        </el-avatar>
        <div class="info">
          <p class="item primary-font nickname">
            <router-link :to="`/user/${item._id}`" tag="span">
              {{item.nickname}}
            </router-link>
          </p>
          <p class="item secondary-font">{{item.signature}}</p>
        </div>
      </div>
      <div class="operation">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          :disabled="(friends || []).includes(item._id)"
          @click="showAdditionDialog(item)"
        >添加
        </el-button>
        <el-dialog
          title="附加消息"
          :visible.sync="showAdditionMessage"
          width="60%"
        >
          <div v-loading="loading">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="additionMessage">
            </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showAdditionMessage = false">取 消</el-button>
            <el-button type="primary" @click="sendApply()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fromatTime } from "@/utils"
export default {
  props: ["searchlist"],
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      friends: JSON.parse(window.localStorage.getItem('friends')),
      showAdditionMessage: false,
      additionMessage: '',
      seleceItem: {},
      loading: false
    }
  },
  methods: {
    showAdditionDialog(item) {
      this.showAdditionMessage = !this.showAdditionMessage
      this.seleceItem = item
    },
    sendApply() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.showAdditionMessage = false
        this.additionMessage = ''
        this.$alert('验证消息发送成功！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }, 500)
      const validateSysUsr = this.sysUsers.filter(item => item.code === '111111')[0]
      const val = {
        roomid: validateSysUsr._id + '-' + this.seleceItem._id,
        senderId: this.userInfo._id,
        senderName: this.userInfo.name,
        senderNickname: this.userInfo.nickname,
        senderAvatar: this.userInfo.photo,
        reveiverId: this.seleceItem._id,
        time: fromatTime(new Date()),
        additionMessage: this.additionMessage,
        status: 0,
        validateType: 0
      }
      this.$socket.emit('sendValidateMessage', val)
    }
  },
  computed: {
    ...mapState('app', {
      sysUsers: 'sysUsers'
    }),
    ...mapState('user', {
      userInfo: 'userInfo'
    }),
    noMeSerchList() {
      return this.searchlist.filter(item => item._id !== this.userInfo._id)
    }
  },
}
</script>

<style lang="scss">
.custom-search-list-com {
  
  .wrapper {
    border-top: 1px solid #C0C4CC;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    &:last-child {
      border-bottom: 1px solid #C0C4CC;
    }
    .details {
      display: flex;
      align-items: center;
      .avatar {
        width: 100px;
        height: 100px;
      }
      .info {
        margin-left: 27px;
        .item {
          font-family: "Helvetica, Arial, sans-serif";
          margin: 0;
          &:last-child {
            margin-top: 5px;
          }
        }
        .nickname {
          cursor: pointer;
          color: hsla(230, 84%, 63%, 1);
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>

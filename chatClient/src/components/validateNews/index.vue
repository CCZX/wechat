<template>
  <div class="validatenews-com">
    <div class="wrapper">
      <div class="filter">
        <el-tag type="info">选择过滤条件：</el-tag>
        <el-select v-model="filterType" placeholder="请选择">
          <el-option
            label="群"
            :value="1" />
          <el-option
            label="好友"
            :value="0" />
        </el-select>
        <el-select v-model="filterStatus" placeholder="请选择">
          <el-option
            label="全部"
            :value="-1" />
          <el-option
            label="未处理"
            :value="0" />
          <el-option
            label="已同意"
            :value="1" />
          <el-option
            label="已拒绝"
            :value="2" />
        </el-select>
      </div>
      <div class="counter">
        <span>
          一共{{validateNewsList.length}}条记录
        </span>
      </div>
      <!-- <div class="validatenews-item"> -->
      <div v-show="(item.validateType === filterType && (item.status === filterStatus || filterStatus === -1))"
        class="validatenews-item" v-for="item in validateNewsList" :key="item.time">
        <div class="apply-info">
          <span class="title">
            <el-tooltip class="item" effect="dark" content="点击查看用户主页" placement="top">
              <span class="nickname">
                <router-link :to="`/user/${item.senderId}`" class="">
                  {{item.senderNickname.slice(0,10)}}
                </router-link>
              </span>
            </el-tooltip>
            {{validateNewsTips.applyFriend}}
            <span class="time">
              {{item.time}}
            </span>
          </span>
        </div>
        <div class="go-operation">
          <el-popover
            placement="left"
            width="400"
            trigger="click">
            <div class="validate-popover-body">
              <div class="sender-info">
                <el-avatar :size="60" :src="IMG_URL + item.senderAvatar" @error="()=>true">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                </el-avatar>
                <div class="info">
                  <span class="nickname">{{item.senderNickname}}</span>
                  <!-- <span class="sign">你好世界，加油中国</span> -->
                </div>
              </div>
              <div class="addition">
                <el-tag size="mini" type="info">附加消息：</el-tag>
                <div class="content">
                  <span>{{item.additionMessage}}</span>
                </div>
              </div>
              <div class="operation" v-if="item.status === 0">
                <el-button type="success" plain size="small" @click="agreeValidate(item)">同意</el-button>
                <el-button type="danger" plain size="small">拒绝</el-button>
              </div>
              <div class="operation" v-else-if="item.status === 1">
                <el-tag type="success">已同意</el-tag>
              </div>
              <div class="operation" v-else-if="item.status === 2">
                <el-tag type="danger">已拒绝</el-tag>
              </div>
            </div>
            <el-button slot="reference">查看</el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateNewsTips } from '@/const'
export default {
  props: ['validateNewsList'],
  data() {
    return {
      validateNewsTips,
      IMG_URL: process.env.IMG_URL,
      filterType: 0,
      filterStatus: 0
    }
  },
  methods: {
    agreeValidate(item) {
      this.$socket.emit('sendAgreeFriendValidate', item)
    }
  }
}
</script>

<style lang="scss">
.validate-popover-body {
  .sender-info {
    display: flex;
    align-items: center;
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      .nickname {
        font-size: 20px;
        color: #3578E5;
      }
    }
  }
  .addition {
    margin: 17px 0;
    .content {
      margin-top: 5px;
      font-size: 14px;
    }
  }
  .operation {
    text-align: right;
  }
}
.validatenews-com {
  background-color: #fff;
  width: 600px;
  .wrapper {
    padding: 0 10px;
    box-sizing: border-box;
    .filter {
      display: flex;
      align-items: center;
      padding: 10px 0;
      * {
        padding: 0 5px;
      }
    }
    .counter {
      padding: 10px 0;
    }
    .validatenews-item {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #C0C4CC;
      .apply-info {
        .title {
          line-height: 20px;
          .nickname {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>

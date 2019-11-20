<template>
  <div class="chat-user-list__header">
    <el-header>
      <p>我的好友/群聊</p>
      <div class="opration">
        <el-popover
          placement="bottom"
          width="10"
          trigger="click">
          <router-link to="/main/add" tag="a">加好友</router-link>
          <i class="el-icon-s-operation"  slot="reference" style="font-size: 30px"></i>
          <!-- <el-button slot="reference">click 激活</el-button> -->
        </el-popover>
        <!-- <ul class="opration-list">
          <li>加好友</li>
          <li>加好友</li>
        </ul> -->
      </div>      
    </el-header>
  </div>
</template>

<style lang="scss">
.chat-user-list__header {
  @import './../../../../static/css/var.scss';
  .el-header {
    display: flex;
    height: 50px !important;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(39, 202, 199);
    color: #333;
    text-align: center;
    // line-height: 50px;
    .opration {
      position: relative;
      .el-icon-s-operation {
        line-height: 50px;
      }
      // .opration-list {
      //   margin: 0;
      //   padding: 0;
      //   position: absolute;
      //   top: 0;
      //   list-style-type: none;
      //   li {
      //     word-wrap: none;
      //     margin: 0;
      //     padding: 0;
      //   }
      // }
    }
  }
}
</style>


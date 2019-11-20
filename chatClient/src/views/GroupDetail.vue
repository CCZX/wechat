<template>
  <div class="group-detail-page">
    <div class="wrapper">
      <com-header></com-header>
      <div class="group-info">
        <img :src="'http://localhost:3333/'+groupInfo.img" alt="" srcset="">
      </div>
      <div class="group-member">
        <enter>
          <template slot="title">
            <span>{{groupInfo.title}}</span>
          </template>
          <template slot="desc">
            <el-tag type="success" effect="dark">{{groupInfo.grades}}</el-tag>
          </template>
        </enter>
        <enter>
          <template slot="title">
            <span>群聊成员</span>
          </template>
          <template slot="desc">
            <span>共{{groupUserList.length}}人</span>
          </template>
        </enter>
        <div class="members bottom-line">
          <router-link class="member-item"
            v-for="item in groupUserListNormal"
            :key="item.userId._id" :to="'/main/user/'+item.userId._id" tag="div">
              <img class="avatar" :src="'http://localhost:3333/'+item.userId.photo" alt="" srcset="">
              <span class="ellipsis secondary-font">{{item.userId.nickname}}</span>
          </router-link>
          <div v-if="groupUserList.length > 5" class="member-item">
            <div class="avatar"></div>
            <span class="ellipsis secondary-font">查看更多</span>
          </div>
        </div>
      </div>
      <div class="group-detail">
        <enter>
          <template slot="title">
            <span>群号</span>
          </template>
          <template slot="desc">
            <el-tooltip class="item" effect="dark" :content="groupInfo.code" placement="top">
              <span>{{groupInfo.code}}</span>
            </el-tooltip>
          </template>
        </enter>
      </div>
    </div>
  </div>
</template>

<script>
import comHeader from '@/components/comheader'
import enter from '@/components/enter'
export default {
  data() {
    return {
      groupInfo: {code: "",createDate: "",desc: "",grades: "",holderName: "",img: "",title: "",userNum: 0,__v: 0,_id: ""},
      groupUserList: []
    }
  },
  computed: {
    groupUserListNormal() {
      return this.groupUserList.slice(0, 5)
    }
  },
  components: {
    comHeader,
    enter
  },
  created() {
    const { id } = this.$route.params
    this.$http.getGroupInfo({id}).then(res => {
      const { status, data } = res.data
      console.log(data)
      if (status === 2000) {
        this.groupInfo = data.group[0]
        this.groupUserList = data.users
      }
    })
  },
}
</script>

<style lang="scss">
.group-detail-page {
  position: relative;
  height: 100%;
  .wrapper {
    .group-info {
      width: 100%;
      height: 250px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .group-member {
      padding: 10px;
      .members {
        padding: 10px 0;
        display: flex;
        flex-wrap: wrap;
        .member-item {
          // border: 1px solid red;
          display: flex;
          width: 80px;
          height: 80px;
          margin-right: 10px;
          // flex-wrap: wrap;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          .avatar {
            margin: 0;
          }
        }
      }
    }
    .group-detail {
      padding:0 10px;
    }
  }
}
</style>

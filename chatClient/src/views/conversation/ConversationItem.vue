<template>
  <div
    :class="currentConversation._id === conversationInfo._id ? 'conversationitem__com active' : 'conversationitem__com'"
  >
    <template v-if="conversationInfo.isGroup">
      <div class="conversation-info">
        <div class="wrapper">
          <el-badge
            :value="unreadNews[conversationInfo.roomid]"
            :hidden="unreadNews[conversationInfo.roomid] === 0"
            class="item el-badge"
          >
            <el-avatar
              size="large"
              :src="'http://localhost:3333' + conversationInfo.groupId.img"
              @error="() => true"
            >
              <img
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              >
            </el-avatar>
          </el-badge>
          
          <div class="conversation-detail">
            <!-- <i class="icon-qun iconfont"></i> -->
            <span class="primary-font detail-item">{{conversationInfo.groupId.title}}</span>
            <span class="ellipsis secondary-font detail-item">{{conversationInfo.groupId.desc}}</span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="conversation-info">
        <div class="wrapper">
          <el-badge
            :value="unreadNews[conversationInfo.roomid]"
            :hidden="unreadNews[conversationInfo.roomid] === 0"
            class="item el-badge"
          >
            <router-link :to="`/user/${conversationInfo._id}`">
              <el-avatar
                size="large"
                :src="'http://localhost:3333' + conversationInfo.photo"
                @error="() => true"
              >
                <img
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                >
              </el-avatar>
            </router-link>
          </el-badge>
          
          <div class="conversation-detail">
            <span class="primary-font detail-item">{{conversationInfo.nickname}}</span>
            <span class="ellipsis secondary-font detail-item">{{conversationInfo.signature}}</span>
          </div>
        </div>
      </div>
      <i class="el-icon-more"></i>
    </template>
  </div>
</template>

<script>
const conversationObj = {
  createDate: "",
  nickname: "",
  photo: "",
  signature: "",
  id: "",
  roomid: ""
};
import { mapState } from 'vuex'
import './../../../static/iconfont/iconfont.css'
export default {
  name: "ConversationItemComponent",
  props: {
    conversationInfo: {
      type: Object,
      default() {
        return conversationObj
      }
    },
    currentConversation: {
      type: Object,
      default() {
        return conversationObj
      }
    }
  },
  data() {
    return {
      unreadnewsNum: 0
    }
  },
  computed: {
    unreadNews() {
      return this.$store.state.news.unreadNews
    }
  }
};
</script>

<style lang="scss">
.conversationitem__com {
  @import "./../../../static/css/var.scss";
  position: relative;
  height: 60px;
  display: flex;
  margin: 5px 0;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    .wrapper {
      background-color: rgba(0, 0, 0, 0.1);
      transition: all 0.5s ease-in;
    }
    .el-icon-more {
      display: block;
    }
  }
  &.active {
    .wrapper {
      background-color: rgba(0, 0, 0, 0.1);
      transition: all 0.5s ease-in;
    }
  }
  .conversation-info {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    .wrapper {
      display: flex;
      height: 60px;
      padding: 0 5px;
      align-items: center;
      border-radius: 10px;
      .el-badge {
        top: 4px;
        overflow: visible;
      }
      .conversation-detail {
        flex-grow: 1;
        margin-left: 10px;
        .detail-item {
          margin-top: 2px;
          display: block;
        }
      }
    }
  }
  .el-icon-more {
    display: none;
    position: absolute;
    right: 15px;
    padding: 2px 3px 2px 2px;
    font-size: 10px;
    border: 1px solid hsla(230, 10%, 30%, 1);
    border-radius: 50%;
    transition: all 0.5s ease-in;
  }
}
</style>


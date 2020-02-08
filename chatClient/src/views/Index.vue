<template>
  <div class="index-page">
    <div class="conversation-list">
      <conversation-list
        :currentConversation="currentConversation"
        @setCurrentConversation="setCurrentConversation"
      />
    </div>
    <div class="conversation-chat-area" v-loading="loading">
      <chat-area
        v-if="currentConversation && currentConversation._id"
        :currentConversation="currentConversation"
        :setLoading="setLoading"
      />
      <div class="no-conversation" v-else>
        没有数据
      </div>
    </div>
    <div class="detail">
      <div class="todo">
        <el-alert
          :title="todos > 2 ? '今日代办事项（最多）' : '今日代办事项'"
          type="success"
          :closable="false">
        </el-alert>
        <el-card class="box-card"  v-for="(item, index) in todos" :key="index">
          <div class="content">
            <span class="item">待办事项：{{ item.title }}</span>
            <span class="item">开始时间：{{ item.start }}</span>
            <span class="item">结束时间：{{ item.end ? item.end : item.start }}</span>
            <span class="item">事件类型：<el-tag :type="item.cssClass" effect="dark" size="mini">{{ matterLevelMap[item.cssClass] }}</el-tag></span>
          </div>
        </el-card>
        <el-button type="primary" icon="el-icon-arrow-right">
          <router-link to="/schedule">
            前往日程查看更多
          </router-link>
        </el-button>
        <!-- <el-alert
          title=""
          type="info"
          center
          :closable="false"
          close-text="知道了"
          show-icon>
        </el-alert> -->
      </div>
      <!-- <a-map /> -->
    </div>
  </div>
</template>

<script>
import ConversationList from '@/views/conversation/ConversationList'
import ChatArea from '@/views/chat/ChatArea'
import { SET_UNREAD_NEWS_TYPE_MAP } from '@/store/constants'
import { fromatTime } from '@/utils'
// import AMap from '@/components/customMap'
export default {
  name: 'Index',
  data() {
    return {
      currentConversation: {},
      loading: false,
      todos: [],
      matterLevelMap: { 
        'danger': '紧急事项' ,
        'warning': '重要事项' ,
        'normal': '一般事项' ,
        'info': '不重要事项'
      }
    }
  },
  watch: {
    currentConversation: {
      handler(newVal) {
        if(newVal.roomid) {
          this.$store.dispatch('news/SET_UNREAD_NEWS', {
            roomid: this.currentConversation.roomid,
            count: 0,
            type: SET_UNREAD_NEWS_TYPE_MAP.clear
          })
          this.$store.dispatch('app/SET_CURRENT_CONVERSATION', newVal)
        }
      }, deep: true, immediate: true
    }
  },
  methods: {
    setCurrentConversation(data) {
      this.currentConversation = data
    },
    setLoading(flag) {
      this.loading = flag
    }
  },
  components: {
    ConversationList,
    ChatArea,
    // AMap
  },
  mounted() {
    const allTodos = JSON.parse(window.localStorage.getItem('todo')) || []
    const todayTodos = allTodos.map(item => {
      if (!item.end || new Date(item.end) === new Date(item.start)) {
        if (fromatTime(new Date(item.start), false) === fromatTime(new Date(), false)) {
          item.start = fromatTime(new Date(item.start), false)
          item.end ? item.end = fromatTime(new Date(item.end), false) : ''
          console.log(item)
          return item
        }
      } else if (new Date(item.end) > new Date(item.start)) {
        if (fromatTime(new Date(item.start), false) < fromatTime(new Date(), false) && fromatTime(new Date(item.end), false) > fromatTime(new Date(), false)) {
          item.start = fromatTime(new Date(item.start), false)
          item.end = fromatTime(new Date(item.end), false)
          console.log(item)
          return item
        }
      }
    }).filter(item => item)
    this.todos = todayTodos
    console.log('todayTodos todayTodos', todayTodos)
  },
}
</script>

<style lang="scss">
.index-page {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  .conversation-list {
    width: 25%;
    border-right: 1px solid #cccccc;
  }
  .conversation-chat-area {
    position: relative;
    width: 55%;
    border-right: 1px solid #cccccc;
    .no-conversation {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%)
    }
  }
  .detail {
    width: 20%;
    .todo {
      height: 60%;
      text-align: center;
      .box-card {
        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .item {
            padding-top: 10px;
            &:first-child {
              padding-top: 0;
            }
          }
        }
      }
    }
  }
}
</style>

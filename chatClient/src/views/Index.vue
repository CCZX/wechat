<template>
  <div class="index-page">
    <div class="conversation-list">
      <conversation-list
        :currentConversation="currentConversation"
        :set-current-conversation="setCurrentConversation"
        @setCurrentConversation="setCurrentConversation"
      />
    </div>
    <div class="conversation-chat-area" v-loading="loading">
      <chat-area
        v-if="currentConversation && currentConversation._id"
        :currentConversation="currentConversation"
        :setLoading="setLoading"
        :set-current-conversation="setCurrentConversation"
      />
      <div class="no-conversation hor-ver-center" v-else>
        <chat-svg width="400" height="300" />
        <p>聊天~打开心灵的窗户</p>
      </div>
    </div>
    <div class="detail">
      <div class="todo">
        <part-title text="今日代办" />
        <el-card class="box-card"  v-for="(item, index) in todos" :key="index">
          <div class="content">
            <span class="item ellipsis">待办事项：{{ item.title }}</span>
            <span class="item ellipsis">开始时间：{{ item.start }}</span>
            <span class="item ellipsis">结束时间：{{ item.end ? item.end : item.start }}</span>
            <span class="item ellipsis">事件类型：<el-tag :type="item.cssClass" effect="dark" size="mini">{{ matterLevelMap[item.cssClass] }}</el-tag></span>
          </div>
        </el-card>
        <el-alert v-if="!todos.length" title="今日暂无代办" type="info" center show-icon style="margin: 10px 0" :closable="false" />
        <el-button type="primary" size="mini" style="width: 100%">
          <router-link to="/schedule" class="link">
            前往日程查看更多
          </router-link>
        </el-button>
      </div>
      <div class="weather">
        <!-- <el-alert
          title="最近天气走势"
          type="success"
          :closable="false">
        </el-alert> -->
        <!-- <weather /> -->
      </div>
      <!-- <a-map /> -->
    </div>
  </div>
</template>

<script>
import ConversationList from '@/views/conversation/ConversationList'
import ChatArea from '@/views/chat/ChatArea'
import { SET_UNREAD_NEWS_TYPE_MAP } from '@/store/constants'
import { fromatTime, saveRecentConversationToLocal } from '@/utils'
import weather from '@/components/customWeather'
import partTitle from '@/components/partTitle'
import chatSvg from '@/SVGComponents/chat'
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
      handler(newVal, oldVal) {
        if (!newVal || !newVal.roomid) return
        try {
          if(newVal.roomid !== oldVal.roomid) {
            this.$store.dispatch('news/SET_UNREAD_NEWS', {
              roomid: this.currentConversation && this.currentConversation.roomid,
              count: 0,
              type: SET_UNREAD_NEWS_TYPE_MAP.clear
            })
            this.$store.dispatch('app/SET_CURRENT_CONVERSATION', newVal)
            this.$store.dispatch('app/SET_RECENT_CONVERSATION', {type: 'add', data: newVal})
            saveRecentConversationToLocal(newVal._id)
          }
        } catch (error) {
          console.log('errrrr', error)
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
    weather,
    partTitle,
    chatSvg
    // AMap
  },
  mounted() {
    const allTodos = JSON.parse(window.localStorage.getItem('todo')) || []
    const todayTodos = allTodos.map(item => {
      if (!item.end || new Date(item.end) === new Date(item.start)) {
        if (fromatTime(new Date(item.start), false) === fromatTime(new Date(), false)) {
          item.start = fromatTime(new Date(item.start), false)
          item.end ? item.end = fromatTime(new Date(item.end), false) : ''
          return item
        }
      } else if (new Date(item.end) > new Date(item.start)) {
        if (fromatTime(new Date(item.start), false) <= fromatTime(new Date(), false) && fromatTime(new Date(item.end), false) >= fromatTime(new Date(), false)) {
          item.start = fromatTime(new Date(item.start), false)
          item.end = fromatTime(new Date(item.end), false)
          return item
        }
      }
    }).filter(item => item)
    this.todos = todayTodos
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
      text-align: center;
    }
  }
  .detail {
    width: 20%;
    .todo {
      max-height: 60%;
      text-align: center;
      border-bottom: 1px solid #cccccc;
      padding: 10px;
      .box-card {
        margin: 10px 0;
        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .item {
            text-align: left;
            padding-top: 10px;
            &:first-child {
              padding-top: 0;
            }
          }
        }
      }
      .link {
        text-decoration: none;
        color: #ffffff;
      }
    }
    .weather {
      padding: 10px;
    }
  }
}
</style>

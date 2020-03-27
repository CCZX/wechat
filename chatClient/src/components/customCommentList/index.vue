<template>
  <div class="custom-comment-list-com">
    <div class="comment-list-wrapper">
      <div class="comment-item" v-for="item in paginationCommentList" :key="item._id">
        <div class="avatar">
          <el-avatar :size="40" :src="IMG_URL + item.authorId.photo" @error="()=>true">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
        </div>
        <div class="content">
          <p class="user-content ellipsis">
            <span>
              <el-popover
                placement="top"
                width="240"
                trigger="hover"
              >
                <div class="user-card-body">
                  <div class="header">
                    <div class="user-card-avatar">
                      <el-avatar :size="50" :src="IMG_URL + item.authorId.photo" @error="()=>true">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                      </el-avatar>
                    </div>
                    <div class="user-card-info">
                      <p class="info-item-nickname ellipsis">{{item.authorId.nickname}}</p>
                      <p class="info-item-signature ellipsis secondary-font">{{item.authorId.signature}}</p>
                    </div>
                  </div>
                  <!-- <div class="content">
                    <el-button type="success" size="mini">加好友</el-button>
                  </div> -->
                </div>
                <router-link slot="reference" :to="`/user/${item.authorId._id}`" class="user-content-link">
                  {{item.authorId.nickname}}  
                </router-link>
              </el-popover>
            </span>：
            <span>{{item.content}}</span>
          </p>
          <span class="time-content secondary-font">{{item.createDate | formatDate}}</span>
          <span class="reply secondary-font operation-text" @click="showReplyArea(item._id, item.level, item.authorId)">回复</span>
          <div class="reply-box">
            <div class="reply-item" v-for="replyItem in item.reply.slice(0, showMaxReply)" :key="replyItem._id">
              <div class="reply-item-avatar">
                <el-avatar :size="40" :src="IMG_URL + replyItem.authorId.photo" @error="()=>true">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                </el-avatar>
              </div>
              <div class="reply-item-content">
                <p class="content-header">
                  <span class="name">{{replyItem.authorId.nickname}}
                    <span class="reply-to-author" v-if="replyItem.level === 2">
                      回复@{{replyItem.replyToAuthorInfo && replyItem.replyToAuthorInfo.nickname}}
                    </span>：
                  </span>
                  {{replyItem.content}}
                </p>
                <span class="time secondary-font">{{replyItem.createDate | formatDate}}</span>
                <span class="reply secondary-font operation-text" @click="showReplyArea(item._id, replyItem.level, replyItem.authorId)">回复</span>
              </div>
            </div>
            <transition-group v-if="viewMoreReplyMap[item._id]">
              <div class="reply-item" v-for="replyItem in item.reply.slice(showMaxReply)" :key="replyItem._id">
                <div class="reply-item-avatar">
                  <el-avatar :size="40" :src="IMG_URL + replyItem.authorId.photo" @error="()=>true">
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                  </el-avatar>
                </div>
                <div class="reply-item-content">
                  <p class="content-header">
                    <span class="name">{{replyItem.authorId.nickname}}
                      <span class="reply-to-author" v-if="replyItem.level === 2">
                        回复@{{replyItem.replyToAuthorInfo && replyItem.replyToAuthorInfo.nickname}}
                      </span>：
                    </span>
                    
                    {{replyItem.content}}
                  </p>
                  <span class="time secondary-font">{{replyItem.createDate | formatDate}}</span>
                  <span class="reply secondary-font operation-text" @click="showReplyArea(item._id, replyItem.level, replyItem.authorId)">回复</span>
                </div>
              </div>
            </transition-group>
            <span
              class="view-more-reply-item secondary-font"
            >
              <span class="reply-count" v-if="item.reply.length">
                共{{item.reply.length}}条回复{{item.reply.length > showMaxReply ? '，' : ''}}
              </span>
              <span class="operation-text"
                v-if="!viewMoreReplyMap[item._id] && item.reply.length > showMaxReply"
                @click="viewMoreReplyMap[item._id] = !viewMoreReplyMap[item._id]"
              >查看</span>
              <span
                class="operation-text" v-if="viewMoreReplyMap[item._id] && item.reply.length > showMaxReply"
                @click="viewMoreReplyMap[item._id] = !viewMoreReplyMap[item._id]"
              >收起</span>
            </span>
          </div>
          <div class="reply-area" v-if="replyAreaShowMap[item._id]">
            <el-input
              :ref="'reply-inp'+item._id"
              v-model="replyContentMap[item._id]"
              style="margin-right: 5px"
              :placeholder="replyContentPlaceholderMap[item._id]"
            />
            <el-button type="success" size="mini" @click="doReplyComment(item._id)">回复</el-button>
          </div>
        </div>
      </div>
      <div class="comment-operation-list secondary-font">
        <span
          class="operation-text expand"
          v-if="commentlist.length> 3 && !viewMoreComment"
          @click="viewMoreComment = true"
        >点击查看更多</span>
        <span
          class="operation-text fold"
          v-if="viewMoreComment"
          @click="viewMoreComment = false"
        >点击收起评论</span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateToZH } from '@/utils'
export default {
  props: ["commentlist", "pyqid"],
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      replyContent: '', // 回复内容
      replyAreaShowMap: {}, // 展示当前回复的那一条评论
      replyContentMap: {}, // 回复的内容，键为被回复的评论ID，值为回复内容
      viewMoreReplyMap: {}, // 那一条评论的子评论是处于查看更多状态的
      replyContentPlaceholderMap: {},
      showMaxReply: 3,
      currentReplyCommentLevel: 0,
      currentReplyToAuthorId: {},
      viewMoreComment: false
    }
  },
  methods: {
    doReplyComment(id) {
      const pyqId = this.pyqid
      const content = this.replyContentMap[id]
      const authorId = this.userInfo._id
      const parentId = id
      const level = this.currentReplyCommentLevel === 2 ? this.currentReplyCommentLevel : this.currentReplyCommentLevel + 1
      const replyToAuthorInfo = this.currentReplyToAuthorId
      this.$http.doComment({
        pyqId, content, authorId, parentId, level, replyToAuthorInfo
      }).then(res => {
        const { data } = res
        if (res.status === 200 && data.status === 2000) {
          const replyItem = {...data.data[0], authorId: {
            photo: this.userInfo.photo,
            signature: this.userInfo.signature,
            nickname: this.userInfo.nickname,
            _id: this.userInfo._id
          }}
          this.$emit('addchild',this.pyqid, id, replyItem)
          this.$message({
            message: '回复成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: '回复失败！',
            type: 'error'
          })
        }
        this.replyContentMap[id] = ""
      })
    },
    /**
     * 父评论的Id，当前要回复评论的level，被回复评论的用户信息
     */
    showReplyArea(id, level, authorId) {
      const replyAreaShowMap = this.replyAreaShowMap
      const newReplyAreaShowMap = {...replyAreaShowMap}
      for (const key in newReplyAreaShowMap) {
        if (newReplyAreaShowMap.hasOwnProperty(key)) {
          newReplyAreaShowMap[key] = false
        }
      }
      newReplyAreaShowMap[id] = true
      this.replyAreaShowMap = newReplyAreaShowMap
      const ref = 'reply-inp' + id
      this.$nextTick(() => {
        this.$refs[ref] && this.$refs[ref][0].focus()
      })
      this.currentReplyCommentLevel = level
      this.currentReplyToAuthorId = authorId
      this.replyContentPlaceholderMap[id] = `回复 @${this.currentReplyToAuthorId.nickname}（请文明发言）`
    },
    viewMoreReply(id) {
      this.viewMoreReplyMap[id] = true
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    paginationCommentList() {
      if (this.viewMoreComment) {
        return this.commentlist.slice()
      } else {
        return this.commentlist.slice(0, 3)
      }
    }
  },
  filters: {
    formatDate(val) {
      return formatDateToZH(val)
    }
  },
  created() {
    this.commentlist.forEach(item => {
      this.$set(this.replyAreaShowMap, item._id, false)
      this.$set(this.replyContentMap, item._id, '')
      this.$set(this.viewMoreReplyMap, item._id, false)
      this.$set(this.replyContentPlaceholderMap, item._id, '请文明发言')
    })
  },
}
</script>

<style lang="scss">
.custom-comment-list-com {
  .comment-list-wrapper {
    .comment-item {
      position: relative;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      .avatar {
        // float: left;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
      }
      .content {
        display: inline-block;
        padding-left: 50px;
        width: 100%;
        .user-content {
          margin: 0;
          .user-content-link {
            text-decoration: none;
          }
        }
        .time-content {
          margin: 5px 0 0 0;
        }
        .reply {
          cursor: pointer;
        }
        .reply-box {
          .reply-item {
            position: relative;
            margin: 5px 0;
            min-height: 40px;
            .reply-item-avatar {
              position: absolute;
              left: 0;
              top: 0;
            }
            .reply-item-content {
              margin-left: 50px;
              .content-header {
                margin: 0 0 5px 0;
                .name {
                  font-family: "'Microsoft YaHei', Arial, Helvetica, sans-serif"
                }
              }
            }
          }
        }
        .reply-area {
          display: flex;
          margin: 5px 0;
        }
      }
    }
    .comment-operation-list {
      text-align: center;
    }
  }
}
</style>

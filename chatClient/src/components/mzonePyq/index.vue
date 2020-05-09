<template>
  <div class="pyq-com">
    <div class="pyq-com-wrapper">
      <div class="item" v-for="(item, pyqIndex) in pyqList" :key="item._id">
        <div class="header">
          <router-link :to="`/user/${item.userId._id}`">
            <el-avatar :size="60" :src="IMG_URL + item.userId.photo" @error="()=>true">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
          </router-link>
          <div class="info">
            <div class="nickname">
              <el-popover
                placement="top"
                width="240"
                trigger="hover"
              >
                <user-card :user-details="item.userId" />
                <router-link slot="reference" :to="`/user/${item.userId._id}`" class="nickname-link">
                  {{item.userId.nickname}}
                </router-link>
              </el-popover>
            </div>
            <div class="time secondary-font">
              <span>{{item.createDate | formatDateToZH}}</span>
            </div>
          </div>
          <div class="pyq-item-operation" v-if="item.userId._id === userInfo._id">
            <i class="el-icon-more" @click.stop="handleClickOperation(item._id)"></i>
            <div class="operation-list" v-if="showOperationListObj[item._id]">
              <span class="operation-list-item operation-text" @click="deleteItemPyq(item._id)">
                <i class="el-icon-delete-solid item-icon" />删除
              </span>
              <span class="operation-list-item operation-text" @click="editPyq(item._id)">
                <i class="el-icon-edit-outline item-icon" />编辑
              </span>
            </div>
          </div>
        </div>
        <div class="body">
          <div class="content">
            <span>{{item.content}}</span>
          </div>
          <div class="pictures">
            <span class="picture-item" v-for="imgItem in item.pictures" :key="imgItem.guid" @click="setCurrentImgUrl(imgSrc)">
              <img class="img" :src="imgItem.url" alt="" srcset="">
            </span>
          </div>
        </div>
        <div class="info">
          <div class="read">
            <span class="secondary-font">阅读：{{item.readCount ? item.readCount : 0}}次</span>
          </div>
          <div class="operation">
            <el-tooltip class="item" effect="dark" :content="commentTips" placement="top">
              <i
                class="item iconfont icon-pinglun1 comment" title="评论"
                @click="handleClickComment(item._id)"
              />
            </el-tooltip>
            <i
              class="item iconfont icon-dianzan like" title="点赞"
              @click="doLike(item._id, pyqIndex)"
              :style="(hasILike[item._id] || []).includes(userInfo._id) ? 'color: #c35673' : ''"
            />
            <i class="item iconfont icon-zhuanfa farward" title="转发"></i>
          </div>
        </div>
        <div class="comment-like">
          <div class="like iconfont icon-dianzan" v-if="item.likes.length > 0">
            <span v-for="(likeitem, index) in item.likes" :key="likeitem._id">
              <el-popover
                placement="top"
                width="240"
                trigger="hover"
              >
                <user-card :user-details="likeitem.authorId" />
                <router-link slot="reference" :to="`/user/${likeitem.authorId._id}`" class="like-user-link">
                  {{likeitem.authorId.nickname}}{{index+1 === item.likes.length ? '' : '、'}}
                </router-link>
              </el-popover>
            </span>
          </div>
          <div class="comments">
            <comment-list @addchild="addChildComment" :pyqid="item._id" :commentlist="item.comments" />
          </div>
        </div>
        <div class="comment-area">
          <el-input placeholder="说点什么吧~" v-model="commentsObj[item._id]" :ref="'commentInp'+item._id" />
          <i
            class="iconfont icon-emoji"
            style="margin: 0 10px; font-size: 20px; cursor: pointer;"
            @click.stop="handlerShowEmoji($event, item._id)"
            title="添加表情"
          />
          <el-button type="success" size="mini" @click="doComment(item._id, pyqIndex)">评论</el-button>
        </div>
      </div>
      <div class="loading">
        <el-button v-if="isLoading" type="primary" style="width: 100%" :loading="isLoading">加载中</el-button>
      </div>
      <div style="margin-bottom: 10px">
        <el-alert v-if="!hasMore && !isLoading && pyqList.length" title="没有更多了..." type="info" center show-icon :closable="false" />
      </div>
      <transition name="roll">
        <div ref="emojiCom" class="emoji-com" v-if="showEmojiCom" :style="`left:${emojiLeft}; top: ${emojiTop}`" @mouseenter="handleEmojiMouseenter">
          <custom-emoji @addemoji="addEmoji" tabposition="top" />
        </div>
      </transition>
    </div>
    <div class="no-data hor-ver-center" v-if="!pyqList.length && !isLoading">
      <empty-svg width="200" height="200" />
    </div>
    <transition>
      <picture-preview :show-oper="false" :current-img="currentImgUrl" @setshow="setshowPicturePreview" v-if="showPicturePreview" />            
    </transition>
    <div class="pyq-edit-box" v-if="showEditPyq">
      <pyq-edit :pyqid="currentEditPyqId" @close="closeEditPyq" @modify="modifyPyqItem" />
    </div>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
import picturePreview from '@/components/picturePreview'
import customEmoji from '@/components/customEmoji'
import commentList from '@/components/customCommentList'
import pyqEdit from '@/components/mzonePyqEdit'
import { debounce, formatDateToZH } from '@/utils'
import { commentTips } from '@/const'
import EmptySvg from '@/SVGComponents/empty'
import userCard from '@/components/userCard'
export default {
  props: {
    newpyqitem: {
      type: Object,
      default() {
        return {}
      }
    },
    pyqListData: {
      type: Array,
      default() {
        return []
      }
    },
    hasMore: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pyqList: [],
      IMG_URL: process.env.IMG_URL,
      page: 0,
      pageSize: 7,
      // hasMore: true,
      isLoading: false,
      currentImgUrl: '',
      showPicturePreview: false,
      commentsObj: {}, // 每条朋友圈的评论，key是朋友圈id,value是该朋友圈的评论
      showEmojiCom: false,
      currentPyq: '', // 当前选择的朋友圈
      emojiTop: '', // emoji组件的位置
      emojiLeft: '',
      showOperationListObj: {}, // 是否显示对本条朋友圈的操作列表
      commentTips,
      showEditPyq: false,
      currentEditPyqId: '',
      handlerElement: null // 事件监听的DOM元素
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    hasILike() { // 判断我也没有点赞
      const pyqLikeUserIdsMap = {}
      this.pyqList.forEach(item => {
        const ids = (item.likes || []).map(item => item.authorId._id)
        pyqLikeUserIdsMap[item._id] = ids
      })
      return pyqLikeUserIdsMap
    }
  },
  methods: {
    async deleteItemPyq(id) {
      this.$confirm('删除后不可恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await this.$http.deletePyqItem({pyqId: id, userId: this.userInfo._id})
        if (data.status === 2000) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          const id = data.data._id
          const newPyqList = this.pyqList.filter(item => item._id !== id)
          this.pyqList = newPyqList
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })    
      })
    },
    handleClickOperation(id) {
      this.showOperationListObj[id] = !this.showOperationListObj[id]
    },
    getFriendlyPyq() {
      this.$emit('getPyq')
    },
    setCurrentImgUrl(url) {
      this.currentImgUrl = url
      this.showPicturePreview = true
    },
    setshowPicturePreview(flag) {
      this.showPicturePreview = flag
    },
    doLike: debounce(function (pyqId, index) {
      const params = {
        authorId: this.userInfo._id,
        pyqId
      }
      this.$http.doLike(params).then(res => {
        const { data } = res
        if (res.status < 400 && data.status === 2000) {
          this.$message({
            message: '点赞成功！',
            type: 'success'
          })
          const tmp = JSON.parse(JSON.stringify(this.pyqList))
          tmp[index].likes.push({
            ...data.data[0],
            authorId: {
              _id: this.userInfo._id,
              nickname: this.userInfo.nickname,
              photo: this.userInfo.photo,
              signature: this.signature
            }
          })
          this.pyqList = tmp
        } else if (res.status < 400 && data.status === 2004) {
          this.$message({
            message: '你已经点过赞了',
            type: 'warning'
          })
        }
      })
    }, 500),
    doComment(id, index) {
      if (!this.commentsObj[id]) {
        return
      }
      const params = {
        pyqId: id,
        content: this.commentsObj[id],
        authorId: this.userInfo._id
      }
      this.$http.doComment(params).then(res => {
        const { data } = res
        if (res.status < 400) {
          if (data.status === 2000) {
            this.$message({
              message: '评论成功！',
              type: 'success'
            })
            const tmp = JSON.parse(JSON.stringify(this.pyqList))
            tmp[index].comments.push({
              ...data.data[0],
              authorId: {
                nickname: this.userInfo.nickname,
                photo: this.userInfo.photo
              },
              reply: []
            })
            this.pyqList = tmp
          }
        }
        this.commentsObj[id] = ''
      })
    },
    addEmoji(val) {
      this.commentsObj[this.currentPyq] += val
    },
    handlerShowEmoji(e, id) {
      this.currentPyq = id
      this.emojiTop = e.pageY - 100 + 'px'
      this.emojiLeft = e.pageX - 200 + 'px'
      this.showEmojiCom = true
    },
    handleDocmentScroll: debounce(function () {
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.documentElement.scrollHeight
      if (scrollTop + clientHeight + 10 >= scrollHeight) {
        if (this.hasMore) {
          this.getFriendlyPyq() 
        }
      }
    }, 500),
    handleDocmentClick() {
      this.showEmojiCom = false
      for (const key in this.showOperationListObj) {
        if (this.showOperationListObj.hasOwnProperty(key)) {
          this.showOperationListObj[key] = false
        }
      }
    },
    handleClickComment(id) {
      const key = 'commentInp'+id
      this.$refs[key][0].focus()
    },
    handleEmojiMouseenter() {
      this.$refs['emojiCom'] && this.$refs['emojiCom'].addEventListener('mouseleave', () => {
        this.showEmojiCom = false
      })
    },
    addChildComment(pyqId, id, data) { // pyqId:朋友圈Id，id：父评论id，data：新子评论
      const newPyq = JSON.parse(JSON.stringify(this.pyqList))
      const pyqIndex = this.pyqList.findIndex(pyqItem => pyqItem._id === pyqId )
      const commentIndex = this.pyqList[pyqIndex].comments.findIndex(item => item._id === id )
      newPyq[pyqIndex].comments[commentIndex].reply.push(data)
      this.pyqList = newPyq
    },
    editPyq(id) {
      this.currentEditPyqId = id
      this.showEditPyq = !this.showEditPyq
    },
    closeEditPyq() {
      this.showEditPyq = false
    },
    modifyPyqItem(id, data) {
      const newPyqList = JSON.parse(JSON.stringify(this.pyqList))
      newPyqList.forEach(item => {
        if (item._id === id) {
          item.content = data.content
          item.pictures = data.pictures
        }
      })
      this.pyqList = newPyqList
    }
  },
  components: {
    picturePreview,
    customEmoji,
    commentList,
    pyqEdit,
    EmptySvg,
    userCard
  },
  filters: {
    formatDateToZH(val) {
      return formatDateToZH(val)
    }
  },
  watch: {
    pyqListData: {
      handler(newPyqListData) {
        if (!Array.isArray(newPyqListData)) return
        this.pyqList = newPyqListData
        newPyqListData.forEach(item => {
          this.$set(this.commentsObj, item._id, '')
          this.$set(this.showOperationListObj, item._id, false)
        })
      }, deep: true, immediate: true
    },
    pyqList: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('modifyPyq', newVal)
        }
      }, deep: true
    }
  },
  mounted() {
    this.getFriendlyPyq()
    document.addEventListener('click', this.handleDocmentClick)
    const mzonePage = document.querySelector('.mzone-page')
    if(!mzonePage) return
    this.handlerElement = mzonePage
    mzonePage.addEventListener('scroll', this.handleDocmentScroll)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleDocmentClick)
    this.handlerElement && this.handlerElement.removeEventListener('scroll', this.handleDocmentScroll)    
  },
}
</script>

<style lang="scss" scoped>
@import './../../../static/css/animation.scss';
.pyq-com {
  position: relative;
  min-height: 240px;
  .pyq-com-wrapper {
    .item {
      background-color: #fff;
      padding: 10px;
      margin-bottom: 10px;
      .header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #C0C4CC;
        padding: 0 0 10px;
        position: relative;
        .info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 10px;
          .nickname {
            .nickname-link {
              text-decoration: none;
              color: #222222;
              &:hover {
                text-decoration: underline;
                color: #409EFF;
              }
            }
          }
          .time {
            margin-top: 10px;
          }
        }
        .pyq-item-operation {
          position: absolute;
          right: 5px;
          cursor: pointer;
          .operation-list {
            position: absolute;
            right: -15px;
            width: 60px;
            text-align: center;
            background-color: #fff;
            padding: 5px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            .operation-list-item {
              &:last-child {
                margin-bottom: 0;
              }
              &:hover {
                text-decoration: underline;
              }
              display: inline-block;
              margin-bottom: 5px;
              font-size: 12px;
              cursor: pointer;
              .item-icon {
                margin-right: 5px;
              }
            }
          }
        }
      }
      .body {
        padding: 10px 0;
        .content {
          margin-bottom: 8px;
          font-size: 18px;
        }
        .pictures {
          .picture-item {
            cursor: zoom-in;
            .img {
              width: 270px;
            }
          }
        }
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .operation {
          .item {
            &:hover {
              color: #c35673;
            }
            width: 40px;
            height: 40px;
            margin-left: 20px;
            font-size: 20px;
            cursor: pointer;
          }
        }
      }
      .comment-like {
        position: relative;
        margin-top: 10px;
        padding: 10px;
        border-top: 1px solid #e5e9ef;
        .like {
          &::before {
            padding: 1px;
            color: #c35673;
          }
          .like-user-link {
            text-decoration: none;
          }
        }
        .comments {
          margin-top: 10px;
          border-top: 1px solid #fff;
        }
      }
      .comment-area {
        display: flex;
        height: 45px;
        align-items: center;
      }
    }
    .emoji-com {
      position: fixed;
    }
  }
  .pyq-edit-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10001;
    padding: 100px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .no-data {
    width: 100%;
    text-align: center;
    background-color: #fff;
  }
}
</style>

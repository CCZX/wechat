<template>
  <div class="chat-area__message-list__com" ref="msglist">
    <div class="top-operations" ref="tips" :key="Date.now()">
      <!-- <span>没有更多消息了</span> -->
      <span v-if="hasmore">
        <span class="loadmore" @click="loadMore">点击加载更多...</span>
        <i class="el-icon-loading" v-if="isloading"></i>
      </span>
      <span class="no-more secondary-font" v-else>没有更多了...</span>
    </div>
    <div class="top-operation" v-if="showTopOperation">
    </div>
    <transition-group appear name="hro-scroll">
    <!-- <transition-group appear :name="useanimation ? 'hro-scroll' : ''"> -->
      <message-item
        v-for="item in messagelist"
        :key="item._id"
        :messageitem="item"
        :img-type-msg-list="imgTypeMsgList"
      />
    </transition-group>
    <div class="flag"></div>
  </div>
</template>

<script>
import messageItem from "./MessageItem"
import { debounce } from '@/utils'
export default {
  props: ["messagelist", "scrollbottom", "hasmore", "isloading", "useanimation"],
  data() {
    return {
      currentImgUrl: '',
      showTopOperation: false
    }
  },
  computed: {
    imgTypeMsgList() {
      return (this.messagelist || []).filter(item => item.messageType === 'img')
    }
  },
  methods: {
    loadMore() {
      this.$emit('load-message', true)
    },
    handlerScroll: debounce(function () {
      const scrollTop = this.$refs['msglist'].scrollTop
      if (scrollTop < 5) {
        this.$emit('load-message', true)
      }
    }, 500)
  },
  components: {
    messageItem
  },
  watch: {
    messagelist: {
      handler() {
        if (this.scrollbottom) {
          this.$nextTick(() =>{
            setTimeout(() => {
              this.$refs['msglist'].scrollTop = this.$refs['msglist'].scrollHeight + 200
              setTimeout(() => {
                this.$refs['tips'].style.opacity = "1"
              }, 100);
            }, 0);
          })
        }
      }, deep: true, immediate: true
    }
  },
};
</script>

<style lang="scss">
@import './../../../../static/css/animation.scss';
.chat-area__message-list__com {
  .top-operations {
    text-align: center;
    .loadmore {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: #409EFF;
      }
    }
  }
  box-sizing: border-box;
  height: 100%;
  overflow-y: scroll;
  padding: 10px;

  // .slipOut-enter {
  //   opacity: 0;
  //   transform: translateY(300px);
  // }

  // .slipOut-leave-to {
  //   opacity: 0;
  // }

  // .slipOut-enter-active,
  // .slipOut-leave-active {
  //   transition: all 0.6s ease;
  // }
  // .slipOut-enter-active:nth-child(5n + 2) {
  //   transition-delay: 0.3s;
  // }
  // .slipOut-enter-active:nth-child(5n + 3) {
  //   transition-delay: 0.5s;
  // }
  // .slipOut-enter-active:nth-child(5n + 4) {
  //   transition-delay: 0.7s;
  // }
  // .slipOut-enter-active:nth-child(5n + 5) {
  //   transition-delay: 0.9s;
  // }
}
</style>


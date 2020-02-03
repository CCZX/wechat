<template>
  <div class="send-mzone-com">
    <div class="header">
      <div class="send-content">
        <textarea
          class="send-textarea"
          v-model="content"
          maxlength="200"
          placeholder="说点什么吧"
          @focus="showFotter = true"
        ></textarea> 
      </div>
      <span class="camera">
        <i class="camera-icon iconfont icon-xiangji"></i>  
      </span>     
    </div>
    <transition name="roll">
      <div class="footer" v-if="showFotter">
        <div class="poster-attach">
          <i class="item iconfont icon-emoji" @click.stop="showEmoji = !showEmoji"></i>
        </div>
        <div class="poster-sync"></div>
        <div class="send">
          <el-button type="success" size="small">发表</el-button>
        </div>
      </div>
    </transition>
    <transition name="roll">
      <div class="emoji-com" v-show="showEmoji">
        <custom-emoji @addemoji="addEmoji" />
      </div>
    </transition>
  </div>
</template>

<script>
import customEmoji from '@/components/customEmoji'
export default {
  data() {
    return {
      content: '',
      showFotter: false,
      showEmoji: false
    }
  },
  methods: {
    addEmoji(item) {
      this.content += item
    },
    handlerShowEmoji() {
      this.showEmoji = false
    }
  },
  components: {
    customEmoji
  },
  created() {
    document.addEventListener('click', this.handlerShowEmoji)
  },
}
</script>

<style lang="scss">
@import './../../../static/css/animation.scss';
.send-mzone-com {
  position: relative;
  background-color: #fff;
  margin-bottom: 10px;
  .header {
    display: flex;
    border-bottom: 1px solid #C0C4CC;
    align-items: center;
    height: 60px;
    .send-content {
      flex-grow: 1;
      .send-textarea {
        display: inline-block;
        height: 60px;
        box-sizing: border-box;
        height: calc(100% - 30px);
        width: 100%;
        outline: none;
        border: none;
        border: 0;
        border-radius: 5px;
        padding: 0px 10px;
        resize: none;
      }
    }
    .camera {
      display: inline-block;
      width: 50px;
      height: 100%;
      background-color: #c35673;
      text-align: center;
      line-height: 60px;
      .camera-icon {
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .footer {
    padding: 7px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .poster-attach {
      .item {
        font-size: 20px;
      }
    }
  }
  .emoji-com {
    width: 100px;
    position: absolute;
    top: 100%;
  }
}
</style>


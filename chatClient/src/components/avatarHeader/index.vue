<template>
  <div class="avatar-header-cmp">
    <router-link :to="`/chat/user/${userInfo._id}`">
      <div class="avatar"
        v-css="{'background-image': 'url(' + IMG_URL + userInfo.photo + ')'}"
      >
      </div>
    </router-link>
    <div class="info">
      <div class="nickname">
        <router-link slot="reference" :to="`/chat/user/${userInfo._id}`" class="nickname-link">
          {{userInfo.nickname}}
        </router-link>
        <i :class="'level '+ 'lv' + level"></i>
      </div>
      <div class="time secondary-font">
        <span v-show="time">{{time | formatDateToZH}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce, formatDateToZH, computedLevel } from '@/utils'
export default {
  props: {
    userInfo: {
      type: Object
    },
    time: {
      type: String
    }
  },
  data() {
    return {
      IMG_URL: process.env.IMG_URL
    }
  },
  computed: {
    level() {
      return computedLevel(this.userInfo.onlineTime)
    }
  },
  filters: {
    formatDateToZH(val) {
      return formatDateToZH(val)
    }
  },
  watch: {
    // userInfo: {
    //   handler(val) {
    //     console.log('变化', val)
    //   }
    // }
  },
}
</script>

<style lang="scss">
.avatar-header-cmp {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #C0C4CC;
  width: 100%;
  padding: 10px 0;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-size: cover;
  }
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
}
</style>

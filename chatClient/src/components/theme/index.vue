<template>
  <div class="theme-choose-cmp all0">
    <div class="theme-choose-cmp-container hor-ver-center">
      <header class="header">
        <i class="p-r-t el-icon-close" @click="setShowTheme(false)" />
      </header>
      <div class="theme-list">
        <div class="theme-item">
          <p class="title">透明度（{{opacity}}）</p>
          <el-slider :step="0.1" v-model="opacity" :min="0.1" :max="1" @change="opacityChange"></el-slider>
        </div>
        <div class="theme-item">
          <p class="title">毛玻璃效果模糊度（{{blur}}）</p>
          <el-slider v-model="blur" :max="100" @change="blurChange"></el-slider>
        </div>
        <div class="theme-item">
          <p class="title">背景图片（尽量选择小于0.5M长方形的图片）</p>
          <el-radio-group v-model="bgImg" size="small" @change="bgImgChange">
            <el-radio label="abstract" border>抽象</el-radio>
            <el-radio label="city" border>城市</el-radio>
            <el-radio label="ocean" border>海岸</el-radio>
            <el-radio label="custom" border>
              <span>自定义</span>
            </el-radio>
          </el-radio-group>
          <div v-if="bgImg === 'custom'">
            <input type="file" name="customImg" id="customImg" @change="customBgImg">
          </div>
        </div>
        <div class="theme-item notify-sound">
          <p class="title">
            提示音设置
            <el-switch
              v-model="isNotifySound"
              style="margin: 0 10px"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="开启"
              inactive-text="关闭"
              @change="notifySoundToggle"
            >
            </el-switch>
          </p>
          <el-radio-group v-model="notifySound" size="small" @change="notifySoundChange">
            <el-radio label="default" border :disabled="!isNotifySound">默认</el-radio>
            <el-radio label="pcqq" border :disabled="!isNotifySound">PC QQ</el-radio>
            <el-radio label="mobileqq" border :disabled="!isNotifySound">手机QQ</el-radio>
            <el-radio label="huaji" border :disabled="!isNotifySound">滑稽</el-radio>
            <el-radio label="apple" border :disabled="!isNotifySound">苹果</el-radio>
            <el-radio label="momo" border :disabled="!isNotifySound">陌陌</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { localImgToBase64 } from '@/utils'
export default {
  data() {
    return {
      opacity: 0,
      blur: 0,
      bgImg: '',
      isNotifySound: false, // 是否开启提示音
      notifySound: ''
    }
  },
  methods: {
    setShowTheme(flag) {
      this.$emit('setShowTheme', flag)
    },
    opacityChange(e) {
      this.$store.dispatch('theme/SET_OPACITY', e)
    },
    blurChange(e) {
      this.$store.dispatch('theme/SET_BLUR', e)
    },
    bgImgChange(e) {
      if (e === 'custom' || e === 'customImg') return
      this.$store.dispatch('theme/SET_BG_IMG', e)
    },
    customBgImg(e) {
      localImgToBase64(e.target).then(res => {
        console.log(res)
        this.$store.dispatch('theme/SET_BG_IMG', res)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    notifySoundChange(e) {
      this.$store.dispatch('theme/SET_NOTIFY_SOUND', e)
    },
    /**开启提示音切换 */
    notifySoundToggle(e) {
      if (e) {
        this.notifySound = 'default'
        this.$store.dispatch('theme/SET_NOTIFY_SOUND', 'default')
      } else {
        this.notifySound = ''
        this.$store.dispatch('theme/SET_NOTIFY_SOUND', 'none')
      }

    }
  },
  mounted() {
    const { opacity, blur, bgImg, notifySound } = this.$store.state.theme
    this.opacity = parseFloat(opacity)
    this.blur = parseInt(blur)
    this.bgImg = (bgImg || '').includes('base64') ? "custom" : bgImg
    this.notifySound = notifySound
  },
}
</script>

<style lang="scss">
.theme-choose-cmp {
  position: fixed;
  z-index: 1020;
  background-color: rgba(0, 0, 0, .3);
  .theme-choose-cmp-container {
    width: 450px;
    height: 427px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    overflow-x: hidden;
    .theme-list {
      margin-top: 5px;
      .theme-item {
        margin-top: 15px;
        .title {
          margin: 0 0 5px 0;
        }
        .el-radio-group {
          margin-top: 15px;
          .el-radio {
            margin-right: 5px;
          }
        }
        &:first-child {
          margin-top: 0;
        }
      }
      .notify-sound {
        .el-radio-group {
          .el-radio {
            margin-bottom: 10px;
          }
          .el-radio:nth-child(4n + 1) {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>

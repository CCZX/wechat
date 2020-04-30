<template>
  <div class="theme-choose-cmp all0">
    <div class="theme-choose-cmp-container hor-ver-center" :style=" device === 'Mobile' ? {width: '90%'} : {}">
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
          <p class="title">背景图片</p>
          <el-radio-group v-model="bgImg" size="small" @change="bgImgChange">
            <el-radio label="abstract" border>抽象</el-radio>
            <el-radio label="city" border>城市</el-radio>
            <el-radio label="ocean" border>海岸</el-radio>
            <el-radio label="custom" border>自定义</el-radio>
          </el-radio-group>
          <div class="bgimg-preview">
            <div v-if="bgImg === 'custom'" class="curp">
              <label for="customImg">
                <span class="tips el-icon-info">点击切换自定义图片，选择合适尺寸的图片。</span>
                <img :src="customBgImgBase64" alt="" srcset="" width="200" height="110" />
                <input style="display: none" type="file" name="customImg" id="customImg" @change="customBgImg">
              </label>
            </div>
            <img v-show="bgImg !== 'custom'" :src="systemPictureMap[bgImg]" alt="" srcset="" width="200" height="110" />
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
        <div class="theme-item color-pick">
          <p class="title">字体颜色（{{color}}）</p>
          <color-pick :color="color" @change="colorChange" />
        </div>
        <div class="theme-item bg-color-pick">
          <p class="title">背景颜色（{{bgColor}}）</p>
          <color-pick :color="bgColor" @change="bgColorChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { localImgToBase64 } from '@/utils'
import colorPick from '@/components/colorPick'
import { connect } from 'tls';
const notifySoundMap = {
  default: require('./../../../static/audio/default.mp3'),
  apple: require('./../../../static/audio/apple.mp3'),
  pcqq: require('./../../../static/audio/pcqq.mp3'),
  momo: require('./../../../static/audio/momo.mp3'),
  huaji: require('./../../../static/audio/huaji.mp3'),
  mobileqq: require('./../../../static/audio/mobileqq.mp3'),
  none: ''
}
const systemPictureMap = {
  abstract: require('./../../../static/image/theme/abstract.jpg'),
  city: require('./../../../static/image/theme/city.jpg'),
  ocean: require('./../../../static/image/theme/ocean.jpg')
}
const localBase64 = (window.localStorage.getItem('theme-bgimg') || '').includes('base64') ? window.localStorage.getItem('theme-bgimg') : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXMAAADPAQMAAAA9C6NrAAAAAXNSR0IArs4c6QAAAANQTFRFyb2Z4bxrAAAAACBJREFUaN7twTEBAAAAwqD1T20MH6AAAAAAAAAAAADgbybQAAFm0AbzAAAAAElFTkSuQmCC'
let isPlaying = false
export default {
  data() {
    return {
      opacity: 0,
      blur: 0,
      bgImg: '',
      isNotifySound: false, // 是否开启提示音
      notifySound: '',
      systemPictureMap: {...systemPictureMap},
      customBgImgBase64: localBase64,
      color: '', // 字体颜色
      bgColor: ''
    }
  },
  computed: {
    device() {
      return this.$store.state.device.deviceType
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
        this.customBgImgBase64 = res
        this.$store.dispatch('theme/SET_BG_IMG', res)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    notifySoundChange(e) {
      this.$store.dispatch('theme/SET_NOTIFY_SOUND', e)
      this.playNotifySound()
    },
    /**开启提示音切换 */
    notifySoundToggle(e) {
      if (e) {
        this.notifySound = 'default'
        this.$store.dispatch('theme/SET_NOTIFY_SOUND', 'default')
        this.playNotifySound()
      } else {
        this.notifySound = ''
        this.$store.dispatch('theme/SET_NOTIFY_SOUND', 'none')
        this.playNotifySound()
      }

    },
    playNotifySound() {
      if (isPlaying) return
      isPlaying = true
      const audio = document.createElement('audio')
      const source = document.createElement('source')
      audio.volume = 0.6;
      source.setAttribute('type', 'audio/mp3');
      source.setAttribute('src', notifySoundMap[this.notifySound]);
      audio.appendChild(source);
      document.body.appendChild(audio);
      audio.play().then(res => {
        isPlaying = false
      })
    },
    colorChange(color) {
      this.color = color
      this.$store.dispatch('theme/SET_COLOR', color)
    },
    bgColorChange(color) {
      this.bgColor = color
      this.$store.dispatch('theme/SET_BG_COLOR', color)
    }
  },
  components: {
    colorPick
  },
  created() {
    const { opacity, blur, bgImg, notifySound, color, bgColor } = this.$store.state.theme
    this.opacity = parseFloat(opacity)
    this.blur = parseInt(blur)
    this.bgImg = (bgImg || '').includes('base64') ? "custom" : bgImg
    this.notifySound = notifySound
    this.isNotifySound = notifySound !== 'none'
    console.log('color', color, 'bgColor', bgColor)
    this.color = color
    this.bgColor = bgColor
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
    .theme-list {
      width: 100%;
      height: 427px;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      overflow-x: hidden;
      .theme-item {
        margin-top: 15px;
        .title {
          margin: 0 0 5px 0;
        }
        .el-radio-group {
          margin-top: 15px;
          .el-radio {
            margin: 0 5px 10px 0;
          }
        }
        &:first-child {
          margin-top: 0;
        }
      }
      .notify-sound {
        .el-radio-group {
          .el-radio:nth-child(4n + 1) {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>

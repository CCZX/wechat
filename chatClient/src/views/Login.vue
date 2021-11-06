<template>
  <div class="login-page" :style="'background-image: url('+ bgUrl +')'">
    <div class="ceshi" style="'marginTop': '30px'">
      <el-alert :closable="false" show-icon title="测试账号密码" description="账号1：cc1218，密码1：123456 | 账号2：lt0623，密码2：123456" type="success" />
    </div>
    <transition name="fade">
      <avatar-choose
        v-if="showChooseAvatar"
        @close="setShowChooseAvatar(false)"
        @choose="chooseAvatar"
      />
    </transition>
    <div class="wrapper hor-ver-center" :style="device === 'Mobile' ? {width: '90%'}:{}">
      <el-form class="login-form" v-if="isLoginState">
        <div class="avatar">
          <el-avatar :size="100" :src="IMG_URL + loginInfo.avatar" @error="()=>true">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </el-avatar>
        </div>
        <el-form-item>
          <el-input autocomplete="new-password" v-model="loginInfo.account" prefix-icon="el-icon-user" @keydown.enter="login" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input autocomplete="new-password" type="password" v-model="loginInfo.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="cv-code">
          <el-input autocomplete="on" class="cv-code-inp" v-model="loginInfo.cvCode" @keydown.enter.native="login" prefix-icon="el-icon-lock" placeholder="验证码(不区分大小写)"></el-input>
          <canvas v-show="!cvCodeing" width="120" height="40" ref="loginCanvas" @click="getCVCode"></canvas>
          <span style="width: 200px" v-show="cvCodeing">获取中...</span>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="login">登录</el-button>
          <span>没有账号？<span class="operation-text" style="display: inline" @click="changeState(false)">注册</span></span>
        </el-form-item>
      </el-form>
      <el-form class="register-form" v-if="!isLoginState">
        <div class="avatar" @click="setShowChooseAvatar(true)">
          <img :src="avatar" alt="" srcset="" width="100" height="100" style="border-radius: 50%">
          <!-- <el-avatar :size="100" :src="avatar">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </el-avatar> -->
          <span class="secondary-font" style="display: inline-block; margin-bottom: 5px">
            点击头像切换头像
          </span>
        </div>
        <el-form-item>
          <el-input type="text" autocomplete="new-password" v-model="registerInfo.account" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
          <!-- <span class="account-errinfo">{{ registerErrInfo.account }}</span> -->
        </el-form-item>
        <el-form-item>
          <el-input type="text" autocomplete="new-password" onfocus="this.type = 'password'" v-model="registerInfo.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
          <!-- <span class="password-errinfo">{{ registerErrInfo.password }}</span> -->
        </el-form-item>
        <el-form-item>
          <el-input type="text" autocomplete="new-password" onfocus="this.type = 'password'" v-model="registerInfo.rePassword" prefix-icon="el-icon-lock" placeholder="请确认密码"></el-input>
          <!-- <span class="password-errinfo">{{ errInfo.password }}</span> -->
        </el-form-item>
        <el-form-item class="cv-code">
          <el-input class="cv-code-inp" v-model="registerInfo.cvCode" prefix-icon="el-icon-lock" placeholder="验证码(不区分大小写)"></el-input>
          <canvas width="120" height="40" ref="registerCanvas" @click="getCVCode"></canvas>
        </el-form-item>
        <el-form-item class="oper">
          <el-button class="login-btn" type="primary" @click="register">注册</el-button>
          <span>已有账号？<span class="operation-text" style="display: inline" @click="changeState(true)">登录</span></span>
        </el-form-item>
      </el-form>
    </div>
    <copy-right />
  </div>
</template>


<script>
import ocean1 from './../../static/image/ocean1.jpg'
import {createCanvas} from '@/utils/cvcode'
import canvasImg from './../../static/image/canvas2.jpg'
import { accountReg, passwordReg } from '@/utils/index'
import avatarChoose from '@/components/avatarChoose'
import copyRight from '@/components/copyright'
const faceRandom = Math.ceil(Math.random()*10)
export default {
  name: 'Login',
  data() {
    return {
      loginInfo: {
        account: '',
        password:'',
        cvCode: '',
        cvCodeTimestamp: '',
        avatar: JSON.parse(window.localStorage.getItem('userInfo') || '{}').photo || ''
      },
      registerInfo: {
        account: '',
        password: '',
        rePassword: '',
        cvCode: '',
        avatar: `face/face${faceRandom}.jpg`
      },
      cvCode: '', // 验证码
      cvCodeing: true, // 正在获取验证码？
      isLoginState: true,
      bgUrl: ocean1,
      showChooseAvatar: false,
      IMG_URL: process.env.IMG_URL
    }
  },
  computed: {
    device() {
      return this.$store.state.device.deviceType
    },
    avatar() {
      return this.IMG_URL + this.registerInfo.avatar
    }
  },
  methods: {
    login() {
      if (!accountReg.test(this.loginInfo.account)) {
        return this.$message.error('请输入3-6位由数字字母下划线组成的账号')
      }
      if (!passwordReg.test(this.loginInfo.password)) {
        return this.$message.error('请输入6-64位由数字字母组成的密码')
      }
      const returnCitySN = window.returnCitySN ? window.returnCitySN : {}
      const params = {
        ...this.loginInfo,
        setting: {
          os: window.OSInfo,
          browser: window.Browser,
          ip: returnCitySN["cip"],
          country: returnCitySN["cname"]
        }
      }
      this.$http.login(params).then(res => {
        let { status, data, msg } = res.data
        if (status === 1002) { // 验证码错误重新获取验证码
          this.loginInfo.cvCode = ''
          this.getCVCode()
        }
        if (status === 1007) {
          this.getCVCode()
          return
        }
        if (res.status === 200 && status === 1000) {
          this.$message.success('登录成功！')
          this.$store.dispatch('user/LOGIN', data)
          const redirect = this.$router.currentRoute.query.redirect
          const next = redirect ? redirect : '/chat/home'
          this.$router.replace(next)
        } else {
          this.$message.error(msg)
          if (status === 1006 || status === 1007) {
            this.$confirm(`你的${msg}，如需恢复请联系管理员：ccdebuging@gmail.com`, `通知：${msg}`, {
              // confirmButtonText: '确定',
              // cancelButtonText: '取消',
              type: 'error'
            })
          }
        }
      })
    },
    register() {
      if (!accountReg.test(this.registerInfo.account)) {
        return this.$message.error('请输入3-6位由数字字母下划线组成的账号')
      }
      if (!passwordReg.test(this.registerInfo.password)) {
        return this.$message.error('请输入6-64位由数字字母组成的密码')
      }
      if (this.registerInfo.password !== this.registerInfo.rePassword) {
        return this.$message.error('两次输入的密码不一致')
      }
      this.$http.register(this.registerInfo).then(res => {
        let { msg, status, data } = res.data
        if (status !== 1005) {
          this.$message.error(msg)
          status === 1002 ? this.getCVCode() : ''
        } else if (status === 1005) {
          this.$alert(`这是你的chat账号:${data}，你可以以此账号登录系统`, '注册成功')
          this.changeState(true)
        }
      })
    },
    getCVCode() { // 获取验证码
      this.cvCodeing = true
      this.$http.getCVCode().then(res => {
        let { data, status, timestamp } = res.data
        this.cvCode = data
        this.loginInfo.cvCodeTimestamp = timestamp
        this.$nextTick(() => {
          const currCanvas = this.isLoginState ? this.$refs.loginCanvas : this.$refs.registerCanvas
          createCanvas(this.cvCode, currCanvas, canvasImg, () => {
            this.cvCodeing = false
          })
        })
      })
    },
    changeState(flag) {
      this.isLoginState = flag
      this.getCVCode()
    },
    setShowChooseAvatar(flag) {
      this.showChooseAvatar = flag
    },
    chooseAvatar(item) {
      this.registerInfo.avatar = item
    }
  },
  components: {
    avatarChoose,
    copyRight
  },
  async mounted() {
    this.getCVCode()
    this.$socket.emit('leave')
  }
};
</script>

<style lang="scss">
.login-page {
  @import "./../../static/css/animation.scss";
  @import "./../../static/css/var.scss";
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all .8s ease;
  .ceshi {
    display: none;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    width: 60%;
  }
  .wrapper {
    background-color: #fff;
    width: 400px;
    opacity: .9;
    padding: 35px 20px 0;
    border-radius: 5px;
    .login-form, .register-form {
      position: relative;
      .avatar {
        position: absolute;
        z-index: 1001;
        top: -110px;
        text-align: center;
        margin-bottom: 10px;
        .el-avatar {
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        }
      }
    }
    .cv-code {
      .el-form-item__content {
        display: flex;
        justify-content: space-between;
        .cv-code-inp {
          margin-right: 20px;
        }
      }
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>

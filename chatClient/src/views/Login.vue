<template>
  <div class="login-page" :style="'background-image: url('+ bgUrl +')'">
    <div class="ceshi" style="'marginTop': '30px'">
      <el-alert :closable="false" show-icon title="测试账号密码" description="账号1：cc1218，密码1：123456 | 账号2：lt0623，密码2：123456" type="success" />
    </div>
    <div class="wrapper">
      <el-card>
        <div class="title">
          <p class="title-name">Wellcome to Co-Messager</p>
          <span class="login" :class="isLoginState ? 'active' : ''" @click="changeState(true)">登录</span>
          <span class="register" :class="!isLoginState ? 'active' : ''" @click="changeState(false)">注册</span>
        </div>
        <main class="body">
          <!-- <transition name="hor-scroll"> -->
            <el-form class="login-form" v-if="isLoginState">
              <el-form-item>
                <el-input v-model="loginInfo.account" prefix-icon="el-icon-user" @keydown.enter="login" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input type="password" v-model="loginInfo.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item class="cv-code">
                <el-input class="cv-code-inp" v-model="loginInfo.cvCode" @keydown.enter.native="login" prefix-icon="el-icon-lock" placeholder="验证码(不区分大小写)"></el-input>
                <canvas v-show="!cvCodeing" width="120" height="40" ref="loginCanvas" @click="getCVCode"></canvas>
                <span style="width: 150px" v-show="cvCodeing">获取中...</span>
              </el-form-item>
              <el-button class="login-btn" type="primary" @click="login">登录</el-button>
            </el-form>
          <!-- </transition> -->
          <!-- <transition name="hor-scroll"> -->
            <el-form class="register-form" v-if="!isLoginState">
              <el-form-item>
                <el-input v-model="registerInfo.account" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
                <!-- <span class="account-errinfo">{{ registerErrInfo.account }}</span> -->
              </el-form-item>
              <el-form-item>
                <el-input type="password" v-model="registerInfo.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
                <!-- <span class="password-errinfo">{{ registerErrInfo.password }}</span> -->
              </el-form-item>
              <el-form-item>
                <el-input type="password" v-model="registerInfo.rePassword" prefix-icon="el-icon-lock" placeholder="请确认密码"></el-input>
                <!-- <span class="password-errinfo">{{ errInfo.password }}</span> -->
              </el-form-item>
              <el-form-item class="cv-code">
                <el-input class="cv-code-inp" v-model="registerInfo.cvCode" prefix-icon="el-icon-lock" placeholder="验证码(不区分大小写)"></el-input>
                <canvas width="120" height="40" ref="registerCanvas" @click="getCVCode"></canvas>
              </el-form-item>
              <el-button class="login-btn" type="primary" @click="register">注册</el-button>
            </el-form>
          <!-- </transition> -->
        </main>
      </el-card>
    </div>
  </div>
</template>


<script>
import bgUrl1 from './../../static/image/zw1.jpg'
import bgUrl2 from './../../static/image/zw2.jpg'
import {createCanvas} from '@/utils/cvcode'
import canvasImg from './../../static/image/canvas2.jpg'
import { accountReg, passwordReg } from '@/utils/index'
let timer = null
let isFirst = true
export default {
  name: 'Login',
  data() {
    return {
      loginInfo: {
        account: '',
        password:'',
        cvCode: '',
        cvCodeTimestamp: ''
      },
      registerInfo: {
        account: '',
        password: '',
        rePassword: '',
        cvCode: ''
      },
      cvCode: '', // 验证码
      cvCodeing: true, // 正在获取验证码？
      isLoginState: true,
      bgUrl: bgUrl2
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
          this.getCVCode()
        }
        if (status === 1007) {
          this.getCVCode()
          return
        }
        if (res.status === 200 && status === 1000) {
          this.$message.success('登录成功！')
          this.$store.dispatch('user/LOGIN', data)
          this.$router.replace('/')
          // window.location.replace('/')
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
          this.isLoginState = true
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
  },
  async mounted() {
    this.getCVCode()
  }
};
</script>

<style lang="scss">
.login-page {
  @import "./../../static/css/animation.scss";
  @import "./../../static/css/var.scss";
  position: relative;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all .8s ease;
  .ceshi {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    width: 60%;
  }
  .wrapper {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: .9;
    .title {
      text-align: center;
      padding: 0 0 20px;
      .title-name {
        margin: 7px;
      }
      .login, .register {
        box-sizing: border-box;
        padding: 4px;
        cursor: pointer;
        color: $secondaryfont;
      }
      .active {
        color: $primaryfont;
        font-size: 18px;
      }
    }
    .body {
      height: 100%;
      // position: relative;
      display: flex;
      .login-form, .register-form {
        width: 100%;
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
}
</style>

<template>
  <div
    class="co-artboard"
    v-loading="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
  >
    <div class="co-artboard-main">
      <i class="p-r-t el-icon-close" @click="hangup"></i>
      <div class="drawingarea">
        <div class="select-list">
          <div v-for="v in handleList" :key="v.type" class="select-item">
            <el-color-picker
              v-model="color"
              show-alpha
              v-if="v.type === 'color'"
              @change="colorChange"
              :disabled="!isToPeer"
            ></el-color-picker>
            <button
              :disabled="v.type === 'cancel' ? 
              !isToPeer || allowCancel : v.type === 'go' ? !isToPeer || allowGo
              :!isToPeer"
              @click="handleClick(v)"
              v-if="!['color', 'lineWidth', 'polygon'].includes(v.type)"
              :class="{active: currHandle === v.type}"
            >{{v.name}}</button>
            <el-popover placement="top" width="400" trigger="click" v-if="v.type === 'polygon'">
              <el-input-number
                v-model="sides"
                controls-position="right"
                @change="sidesChange"
                :min="3"
                :max="10"
              ></el-input-number>
              <button
                slot="reference"
                :disabled="!isToPeer"
                @click="handleClick(v)"
                :class="{active: currHandle === v.type}"
              >{{v.name}}</button>
            </el-popover>
            <el-popover placement="top" width="400" trigger="click" v-if="v.type === 'lineWidth'">
              <el-slider v-model="lineWidth" :max="20" @change="lineWidthChange"></el-slider>
              <button slot="reference" :disabled="!isToPeer">
                {{v.name}}
                <i>{{lineWidth + 'px'}}</i>
              </button>
            </el-popover>
          </div>
          <div>
          <a href="" download="test" id="download">下载</a>
          </div>
        </div>
        <div class="draw">
          <canvas width="900" height="500" ref="canvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Palette from "@/utils/artboard"
import { coArtBoardHandleOption } from "@/const"
const offerOption = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
}

export default {
  name: "ArtBoardPage",
  props: ["currentconversation", "state", "webRtcType"],
  data() {
    return {
      conversation: {},
      loading: false,
      loadingText: "呼叫中，请耐心等待...",
      isToPeer: false, // 是否建立了 P2P 连接
      peer: null,
      handleList: coArtBoardHandleOption,
      // 以下和画布相关
      color: "rgb(0, 0, 0)",
      currHandle: "line",
      lineWidth: 5,
      palette: null, // 画板
      allowCancel: true, // 画板undo
      allowGo: true, // 画板redo
      sides: 3, // 多边形边的条数
      channel: null,
      messageList: []
    }
  },
  methods: {
    send(arr) {
      // 发送白板消息
      console.log("send", arr)
      this.channel.send(JSON.stringify(arr))
    },
    initPalette() {
      this.palette = new Palette(this.$refs["canvas"], {
        drawColor: this.color,
        drawType: this.currHandle,
        lineWidth: this.lineWidth,
        allowCallback: this.allowCallback,
        moveCallback: this.moveCallback
      })
    },
    moveCallback(...arr) {
      // 同步到对方
      this.send(arr)
    },
    allowCallback(cancel, go) {
      this.allowCancel = !cancel
      this.allowGo = !go
    },
    sidesChange() {
      // 改变多边形边数
      this.palette.changeWay({ sides: this.sides })
    },
    colorChange() {
      // 改变颜色
      this.palette.changeWay({ color: this.color })
    },
    lineWidthChange() {
      // 改变线宽
      this.palette.changeWay({ lineWidth: this.lineWidth })
    },
    handleClick(v) {
      // 操作按钮
      if (["cancel", "go", "clear"].includes(v.type)) {
        this.moveCallback(v.type)
        this.palette[v.type]()
        return
      }
      this.palette.changeWay({ type: v.type })
      if (["color", "lineWidth"].includes(v.type)) return
      this.currHandle = v.type
    },
    hangup() {
      // 挂断通话
      this.$message({message: "白板协作结束~", type: "warning"})
      this.$socket.emit("1v1hangup", {...this.conversation, webRtcType: this.webRtcType})
      this.clearState()
      this.$store.dispatch('app/SET_ISTOCOARTBOARD', false)
      this.$eventBus.$emit('hangup') // 关闭连接后将webRTCState初始化为apply
    },
    clearState() {
      // 清除状态
      this.peer.close()
      this.channel.close()
      this.palette.destroy()
      this.peer = null
      this.palette = null
      this.channel = null
      this.isToPeer = false
    },
    apply() {
      this.loading = true
      this.loadingText = "呼叫中，请耐心等待..."
      const data = {...this.conversation, webRtcType: this.webRtcType}
      this.$socket.emit("apply", data)
    },
    reply(type) {
      console.log('emit socket reply')
      this.$socket.emit("reply", {...this.conversation, webRtcType: this.webRtcType})
    },
    async createP2P(data) {
      console.log('创建P2P',this.state)
      this.loading = true
      this.loadingText = "正在建立通话连接"
      await this.initPeer(data) // 获取到媒体流后，调用函数初始化 RTCPeerConnection
    },
    createDataChannel() {
      // 创建 DataChannel
      console.log('创建DataChannel')
      try {
        this.channel = this.peer.createDataChannel("messagechannel")
        this.handleChannel(this.channel)
      } catch (e) {
        console.log("createDataChannel:", e)
      }
    },
    onDataChannel() {
      // 接收 DataChannel
      console.log('创建接收DataChannel', this.state)
      this.peer.ondatachannel = event => {
        console.log('ondatachannel事件触发', event)
        this.channel = event.channel
        this.handleChannel(this.channel)
      }
    },
    handleChannel(channel) {
      // 处理 channel
      channel.binaryType = "arraybuffer"
      channel.onopen = event => {
        // 连接成功
        console.log("channel onopen", event)
        this.isToPeer = true // 连接成功
        this.loading = false
        this.initPalette()
      }
      channel.onclose = function(event) {
        // 连接关闭
        console.log("channel onclose", event)
      }
      channel.onmessage = e => {
        // 收到消息
        console.log('收到消息', e.data)
        if (Array.isArray(JSON.parse(e.data))) {
          let [type, ...arr] = JSON.parse(e.data)
          // console.log('onmessage', type, arr)
          this.palette[type](...arr)
        } else {
          this.messageList.push(JSON.parse(e.data))
        }
        // console.log('channel onmessage', e.data)
      }
    },
    initPeer(data) {
      // 创建输出端 PeerConnection
      console.log('初始化本地peer')
      let PeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection
      this.peer = new PeerConnection()
      // 监听ICE候选信息 如果收集到，就发送给对方
      this.peer.onicecandidate = event => {
        console.log('ICEcandidate事件触发，1V1ICE开始')
        if (event.candidate) {
          this.$socket.emit("1v1ICE", {
            ...data,
            sdp: event.candidate
          })
        }
      }
    },
    async createOffer(data) {
      // 建立DataChannel，创建并发送 offer
      try {
        // 创建offer
        console.log('创建offer开始')
        let offer = await this.peer.createOffer(this.offerOption)
        console.log('创建offer结束')
        // 呼叫端设置本地 offer 描述
        console.log('setLocalDesc开始')
        await this.peer.setLocalDescription(offer)
        console.log('setLocalDesc结束')
        // 给对方发送 offer
        this.$socket.emit("1v1offer", {
          ...data,
          sdp: offer
        })
      } catch (e) {
        console.log("createOffer: ", e)
      }
    },
    async onOffer(data) {
      // 接收offer并发送 answer
      try {
        // 接收端设置远程 offer 描述
        console.log('接收端设置远程offer开始')
        await this.peer.setRemoteDescription(data.sdp) // 会触发this.peer.onicecandidate事件交换ICE
        console.log('接收端设置远程offer结束')
        // 接收端创建 answer
        console.log('接收端创建answer开始')
        let answer = await this.peer.createAnswer()
        console.log('接收端创建answer结束')
        // 接收端设置本地 answer 描述
        console.log('接收端设置answer描述开始')
        await this.peer.setLocalDescription(answer)
        console.log('接收端设置answer描述开始')
        // 给对方发送 answer
        this.$socket.emit("1v1answer", {
          ...data,
          sdp: answer
        })
      } catch (e) {
        console.log("onOffer: ", e)
      }
    },
    async onAnswer(data) {
      // 接收answer
      try {
        console.log('呼叫段设置远程answer开始')
        await this.peer.setRemoteDescription(data.sdp) // 呼叫端设置远程 answer 描述
        console.log('呼叫段设置远程answer结束')
      } catch (e) {
        console.log("onAnswer: ", e)
      }
    },
    async onIce(data) {
      // 接收 ICE 候选
      try {
        console.log('设置远程ICE开始')
        await this.peer.addIceCandidate(data.sdp) // 设置远程 ICE
        console.log('设置远程ICE结束')
      } catch (e) {
        console.log("onAnswer: ", e)
      }
    },
    handlerResize() {
      const drawArea = document.querySelector('.draw')
      const H = getComputedStyle(drawArea).height.replace('px', '')
      const W = getComputedStyle(drawArea).width.replace('px', '')
      this.$refs['canvas'].width = W
      this.$refs['canvas'].height = H
    }
  },
  sockets: {
    async reply(data) {
      // 在发起请求后收到了对方的回复
      this.loading = false
      // console.log(data)
      // 对方同意之后创建自己的 peer
      await this.createP2P(data)
      // 建立DataChannel
      await this.createDataChannel()
      // 并给对方发送 offer
      this.createOffer(data)
    },
    "1v1answer"(data) {
      // 接收到 answer
      this.onAnswer(data)
    },
    "1v1ICE"(data) {
      // 接收到 ICE
      this.onIce(data)
    },
    "1v1offer"(data) {
      // 接收到 offer
      this.onOffer(data)
    },
    "1v1hangup"(data) {
      // 通话挂断
      this.clearState()
      this.$message({message: "白板协作结束~",type: "warning"})
      this.$store.dispatch('app/SET_ISTOCOARTBOARD', false)
      this.$eventBus.$emit('hangup') // 关闭连接后将webRTCState初始化为apply
    }
  },
  async mounted() {
    this.conversation = this.currentconversation // 挂载到Vue.data上，避免切换conversation引起bug
    this.handlerResize()
    window.addEventListener('resize', this.handlerResize)
    if (this.state === 'apply') { // 如果是主动请求就发起apply
      this.apply()
    } else if (this.state === 'reply') { // 如果是接收到请求就发起reply
      console.log('接收端回复初始化开始')
      await this.createP2P({...this.conversation, webRtcType: this.webRtcType}) // 同意之后创建自己的 peer 等待对方的 offer
      await this.onDataChannel() // 接收 DataChannel
      console.log('接收端初始化结束，开始回复')
      this.reply()
    }
  }
}
</script>

<style lang="scss">
.co-artboard {
  width: 100%;
  height: 100%;
  .co-artboard-main {
    width: 100%;
    height: 100%;
    .drawingarea {
      height: 100%;
      .select-list {
        display: flex;
        align-items: center;
        height: 45px;
        .select-item {
          margin-left: 10px;
          &:first-child {
            margin-left: 0;
          }
        }
      }
      .draw {
        height: calc(100% - 45px);
        canvas {
          border: 1px solid black;
        }
      }
    }
  }
}

</style>

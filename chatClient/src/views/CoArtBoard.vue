<template>
  <div
    class="co-artboard"
    v-loading="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    
    <div class="co-artboard-main">
      <div class="action">
        <el-button @click="apply" type="danger">连接</el-button>
      </div>
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
      <!-- <div class="chat-area"></div> -->
    </div>
  </div>
</template>

<script>
// import socket from "../../utils/socket";
import Palette from "@/utils/artboard";
export default {
  name: "ArtBoardPage",
  data() {
    return {
      account: window.sessionStorage.account || "",
      isCall: false, // 正在通话的对象
      loading: false,
      loadingText: "呼叫中",
      isToPeer: false, // 是否建立了 P2P 连接
      peer: null,
      offerOption: {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      },
      handleList: [
        { name: "圆", type: "arc" },
        { name: "线条", type: "line" },
        { name: "矩形", type: "rect" },
        { name: "多边形", type: "polygon" },
        { name: "橡皮擦", type: "eraser" },
        { name: "撤回", type: "cancel" },
        { name: "前进", type: "go" },
        { name: "清屏", type: "clear" },
        { name: "线宽", type: "lineWidth" },
        { name: "颜色", type: "color" }
      ],
      color: "rgba(19, 206, 102, 1)",
      currHandle: "line",
      lineWidth: 5,
      palette: null, // 画板
      allowCancel: true,
      allowGo: true,
      sides: 3,
      channel: null,
      messageList: [],
      sendText: ""
    };
  },
  methods: {
    formatTime(date) {
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return [hour, minute, second].map(this.formatNumber).join(":");
    },
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },
    send(arr) {
      // 发送消息
      if (arr[0] === "text") {
        let params = {
          account: this.account,
          time: this.formatTime(new Date()),
          mes: this.sendText,
          type: "text"
        };
        this.channel.send(JSON.stringify(params));
        this.messageList.push(params);
        this.sendText = "";
      } else {
        console.log("send", arr);
        this.channel.send(JSON.stringify(arr));
      }
    },
    initPalette() {
      this.palette = new Palette(this.$refs["canvas"], {
        drawColor: this.color,
        drawType: this.currHandle,
        lineWidth: this.lineWidth,
        allowCallback: this.allowCallback,
        moveCallback: this.moveCallback
      });
    },
    moveCallback(...arr) {
      // 同步到对方
      // console.log('moveCallback', arr);
      this.send(arr);
    },
    allowCallback(cancel, go) {
      this.allowCancel = !cancel;
      this.allowGo = !go;
    },
    sidesChange() {
      // 改变多边形边数
      this.palette.changeWay({ sides: this.sides });
    },
    colorChange() {
      // 改变颜色
      this.palette.changeWay({ color: this.color });
    },
    lineWidthChange() {
      // 改变线宽
      this.palette.changeWay({ lineWidth: this.lineWidth });
    },
    handleClick(v) {
      // 操作按钮
      if (["cancel", "go", "clear"].includes(v.type)) {
        this.moveCallback(v.type);
        this.palette[v.type]();
        return;
      }
      this.palette.changeWay({ type: v.type });
      if (["color", "lineWidth"].includes(v.type)) return;
      this.currHandle = v.type;
    },
    hangup() {
      // 挂断通话
      this.$socket.emit("1v1hangup", { account: this.isCall, self: this.account });
      this.clearState();
    },
    clearState() {
      // 清除状态
      this.peer.close();
      this.channel.close();
      this.palette.destroy();
      this.peer = null;
      this.palette = null;
      this.channel = null;
      this.isToPeer = false;
      this.isCall = false;
    },
    apply(account) {
      // account 对方account  self 是自己的account
      this.loading = true;
      this.loadingText = "呼叫中";
      const data = this.$route.query
      this.$socket.emit("apply", data);
    },
    reply(data, type) {
      this.$socket.emit("reply", {
        ...data
      });
    },
    async createP2P(data) {
      this.loading = true;
      this.loadingText = "正在建立通话连接";
      await this.initPeer(data); // 获取到媒体流后，调用函数初始化 RTCPeerConnection
    },
    createDataChannel() {
      // 创建 DataChannel
      try {
        this.channel = this.peer.createDataChannel("messagechannel");
        this.handleChannel(this.channel);
      } catch (e) {
        console.log("createDataChannel:", e);
      }
    },
    onDataChannel() {
      // 接收 DataChannel
      this.peer.ondatachannel = event => {
        // console.log('ondatachannel', event);
        this.channel = event.channel;
        this.handleChannel(this.channel);
      };
    },
    handleChannel(channel) {
      // 处理 channel
      channel.binaryType = "arraybuffer";
      channel.onopen = event => {
        // 连接成功
        console.log("channel onopen", event);
        this.isToPeer = true; // 连接成功
        this.loading = false;
        this.initPalette();
      };
      channel.onclose = function(event) {
        // 连接关闭
        console.log("channel onclose", event);
      };
      channel.onmessage = e => {
        // 收到消息
        if (Array.isArray(JSON.parse(e.data))) {
          let [type, ...arr] = JSON.parse(e.data);
          // console.log('onmessage', type, arr);
          this.palette[type](...arr);
        } else {
          this.messageList.push(JSON.parse(e.data));
        }
        // console.log('channel onmessage', e.data);
      };
    },
    initPeer(data) {
      // 创建输出端 PeerConnection
      let PeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      this.peer = new PeerConnection();
      // 监听ICE候选信息 如果收集到，就发送给对方
      this.peer.onicecandidate = event => {
        if (event.candidate) {
          this.$socket.emit("1v1ICE", {
            ...data,
            sdp: event.candidate
          });
        }
      };
    },
    async createOffer(data) {
      // 建立DataChannel，创建并发送 offer
      try {
        // 创建offer
        let offer = await this.peer.createOffer(this.offerOption);
        // 呼叫端设置本地 offer 描述
        await this.peer.setLocalDescription(offer);
        // 给对方发送 offer
        this.$socket.emit("1v1offer", {
          ...data,
          sdp: offer
        });
      } catch (e) {
        console.log("createOffer: ", e);
      }
    },
    async onOffer(data) {
      // 接收offer并发送 answer
      try {
        // 接收端设置远程 offer 描述
        await this.peer.setRemoteDescription(data.sdp);
        // 接收端创建 answer
        let answer = await this.peer.createAnswer();
        // 接收端设置本地 answer 描述
        await this.peer.setLocalDescription(answer);
        // 给对方发送 answer
        this.$socket.emit("1v1answer", {
          ...data,
          sdp: answer
        });
      } catch (e) {
        console.log("onOffer: ", e);
      }
    },
    async onAnswer(data) {
      // 接收answer
      try {
        await this.peer.setRemoteDescription(data.sdp); // 呼叫端设置远程 answer 描述
      } catch (e) {
        console.log("onAnswer: ", e);
      }
    },
    async onIce(data) {
      // 接收 ICE 候选
      try {
        await this.peer.addIceCandidate(data.sdp); // 设置远程 ICE
      } catch (e) {
        console.log("onAnswer: ", e);
      }
    }
  },
  sockets: {
    async reply(data) {
      // 在发起请求后收到了对方的回复
      this.loading = false;
      // console.log(data);
      this.isCall = data.self;
      // 对方同意之后创建自己的 peer
      await this.createP2P(data);
      // 建立DataChannel
      await this.createDataChannel();
      // 并给对方发送 offer
      this.createOffer(data);
    },
    apply(data) {
      // 收到了对方的请求
      this.$confirm("你有新的协作请求, 是否同意?", "提示", {
        confirmButtonText: "同意",
        cancelButtonText: "拒绝",
        type: "warning"
      })
        .then(async () => {
          await this.createP2P(data); // 同意之后创建自己的 peer 等待对方的 offer
          await this.onDataChannel(); // 接收 DataChannel
          this.reply(data);
        })
        .catch(() => {
          this.reply(data);
        });
    },
    "1v1answer"(data) {
      // 接收到 answer
      this.onAnswer(data);
    },
    "1v1ICE"(data) {
      // 接收到 ICE
      this.onIce(data);
    },
    "1v1offer"(data) {
      // 接收到 offer
      this.onOffer(data);
    },
    "1v1hangup"(data) {
      // 通话挂断
      this.clearState();
      this.$message({
        message: "对方已断开连接！",
        type: "warning"
      });
    }
  },
  mounted() {
    // this.$confirm('是否与此用户建立连接?', '提示', {
    //   confirmButtonText: '确定',
    //   cancelButtonText: '取消',
    //   type: 'warning'
    // }).then(() => {
    //   this.apply()
    // }).catch(() => {
    //   this.$router.go(-1)         
    // });
    // const drawArea = document.querySelector('.draw')
    // const H = getComputedStyle(drawArea).height.replace('px', '')
    // const W = getComputedStyle(drawArea).width.replace('px', '')
    // this.$refs['canvas'].width = W - 50
    // this.$refs['canvas'].height = H - 50
  }
};
</script>

<style lang="scss">
.co-artboard {
  width: 100%;
  height: calc(100vh - 60px);
  
  .co-artboard-main {
    padding: 10px;
    // display: flex;
    // justify-content: center;
    width: 100%;
    height: 100%;
    .action {
      height: 50px;
    }
    .drawingarea {
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

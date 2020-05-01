<template>
  <div
    v-loading="isLoading"
    :class="device === 'Mobile' ? 'mzone-pyq-edit mobile hor-ver-center' : 'mzone-pyq-edit hor-ver-center'"
  >
    <i class="close-box el-icon-close" @click="close"></i>
    <div class="header">
      <router-link :to="`/user/${pyqInfo.userId._id}`">
        <el-avatar :size="60" :src="IMG_URL + pyqInfo.userId.photo" @error="()=>true">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
      </router-link>
      <div class="user-info">
        <div class="nickname">
          <router-link slot="reference" :to="`/user/${pyqInfo.userId._id}`" class="nickname-link">
            {{pyqInfo.userId.nickname}}
          </router-link>
        </div>
        <div class="time secondary-font">
          <span>{{pyqInfo.createDate | formatDateToZH}}</span>
        </div>
      </div>
    </div>
    <div class="body">
      <part-title text="内容" />
      <div class="content">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="pyqInfo.content">
        </el-input>
      </div>
      <part-title text="图片" />
      <div class="pictures" v-if="pyqInfo.pictures.length">
        <picture-view :size="pictureLimit" :pitures="pyqInfo.pictures" @deleteItem="deletePictureItem" @deleteAll="deletePictures" />        
      </div>
      <div>
        <el-alert v-if="!pyqInfo.pictures.length" title="未添加图片" type="info" center :closable="false" />
      </div>      
    </div>
    <div class="footer">
      <part-title text="操作" />
      <div class="operation">
        <el-button type="success" size="medium" @click="modifyPyq">保存</el-button>
        <el-button type="danger" size="medium" @click="close">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import pictureView from '@/components/customPictureView'
import partTitle from '@/components/partTitle'
import { defaultPyqItem } from '@/const'
import { formatDateToZH } from '@/utils'
export default {
  props: ["pyqid"],
  data() {
    return {
      pyqInfo: defaultPyqItem,
      IMG_URL: process.env.IMG_URL,
      pictureLimit: 2,
      isLoading: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    device() {
      return this.$store.state.device.deviceType
    }
  },
  methods: {
    getPyqInfo() {
      this.isLoading = true
      const params = {
        pyqId: this.pyqid,
        userId: this.userInfo._id
      }
      this.$http.getPyqItemInfo(params).then(res => {
        this.isLoading = false
        const { data } = res
        if (data.status === 2000) {
          this.pyqInfo = data.data[0]
        }
      })
    },
    modifyPyq() {
      const { content, pictures } = this.pyqInfo
      if (!content.trim() && pictures.length === 0) {
        this.$message({
          message: '不能更新为空哦！',
          type: 'warning'
        })
        return
      }
      this.isLoading = true
      const params = {
        userId: this.userInfo._id,
        pyqId: this.pyqid,
        content,
        pictures
      }
      this.$http.modifyPyqItem(params).then(res => {
        this.isLoading = false
        const { data } = res
        if (data.status === 2000) {
          this.$message({
            message: '更新成功！',
            type: 'success'
          })
          this.$emit('modify', this.pyqid, {content, pictures})
          this.$emit('close')
        } else {
          this.$message({
            message: '更新失败！',
            type: 'error'
          })
        }
      })
    },
    deletePictureItem(index) {
      this.pyqInfo.pictures.splice(index, 1)
    },
    deletePictures() {
      this.pyqInfo.pictures = []
    },
    close() {
      this.$emit('close')
    }
  },
  filters: {
    formatDateToZH(val) {
      return formatDateToZH(val)
    }
  },
  components: {
    pictureView,
    partTitle
  },
  created() {
    this.getPyqInfo()
  },
}
</script>

<style lang="scss">
.mzone-pyq-edit {
  background-color: #fff;
  width: 650px;
  padding: 10px;
  &.mobile {
    width: 90%;
  }
  .close-box {
    float: right;
    font-size: 20px;
    cursor: pointer;
  }
  .header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #C0C4CC;
    padding: 0 0 10px;
    position: relative;
    .user-info {
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
  .body {
    padding-bottom: 10px;
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
  .footer {
    .operation {
      float: right;
    }
  }
}
</style>


<template>
  <div class="custom-upload-img-com">
    <div class="upload-img-com-wrapper">
      <el-alert title="只能上传小于 1M 的图片" type="warning" effect="dark" :closable="false" />
      <div class="option">
        <!-- <input type="file" @change="uploadServer" name="" id=""> -->
        <label for="up-to-server">
          <i class="option-item ok el-icon-picture">上传服务器
            <input
              id="up-to-server"
              class="img-inp upload"
              type="file"
              title="选择图片"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="uploadServer"
            >
          </i>
        </label>
        <label for="up-to-qiniu">
          <i class="option-item ok el-icon-picture">上传七牛云
            <input
              id="up-to-qiniu"
              class="img-inp upload"
              type="file"
              title="选择图片"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="uploadQiniu"
            >
          </i>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 上传图片组件，支持上传方式：1.七牛云，2.本地服务器
 * props: 1.token：七牛云token，
 * emit: 1.getLocalUrl：获取图片的本地URL
 */
import { imgRandomName, isProduction, genGuid } from '@/utils'
import { qiniu_URL, uploadImgStatusMap } from '@/const'
import { connect } from 'tls';
export default {
  props: ["token", "getStatus", "getLocalUrl"],
  methods: {
    createObjetURL(file, guid) {
      const url = window.URL.createObjectURL(file)
      // this.$emit('getLocalUrl', url)
      this.getLocalUrl(url, guid)
    },
    /**上传至七牛云 */
    uploadQiniu(e) {
      const guid = genGuid()
      const [file] = e.target.files
      this.createObjetURL(file, guid)
      // return
      const fileType = file.type && file.type.split("/")[1]
      const fileSize = file.size / 1024 / 1024
      if (fileSize > 1) {
        this.$message.error('只能上传小于1M的图片！换一个小图片试试吧~~')
        return
      }
      const putExtra = {
        fname: "",
        params: "",
        mineType: ["image/png", "image/jpeg", "image/gif"]
      }
      const config = {
        useCdnDomain: true
      }
      const error = (err) => {
        this.getStatus({status: uploadImgStatusMap.error, data: err, guid})
      }
      const next = (res) => {
        // console.log(res)
        this.getStatus({status: uploadImgStatusMap.next, data: res, guid})
      }
      const complete = (res) => {
        this.getStatus({status: uploadImgStatusMap.complete, data: res, guid})
      }
      const subObject = {
        next,
        error,
        complete
      }
      const imgName = imgRandomName() + '.' + fileType
      const observable = window.qiniu.upload(file, imgName, this.token, putExtra, config)
      const subScription = observable.subscribe(subObject)
    },
    /**上传至本地服务器 */
    uploadServer(e) {
      if (isProduction()) {
        return this.$message.error('为减少服务器压力线上请上传至七牛云哟~');
      }
      const file = e.target.files[0]
      const fileType = file.type && file.type.split("/")[1]
      const fileSize = file.size / 1024 / 1024
      const formdata = new FormData()
      formdata.append('file', file)
      this.$http.uploadFile(formdata).then(res => {
        console.log('上传文件结果', res)
        const { data } = res
        if (res.status === 2000) {
          this.getStatus({status: uploadImgStatusMap.complete, data: res})
        }
      })
    }
  },
}
</script>

<style lang="scss">
.custom-upload-img-com {
  width: 270px;
  background-color: #fff;
  .upload-img-com-wrapper {
    padding: 10px;
    .option {
      margin-top: 10px;
      text-align: right;
      .option-item {
        display: inline-block;
        padding: 5px;
        background-color: #c35673;
        color: #fff;
        height: 40px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        border-radius: 5px;
        &::before {
          margin-right: 5px;
        }
      }
      .img-inp {
        display: none;
      }
    }
  }
}
</style>

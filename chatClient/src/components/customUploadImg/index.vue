<template>
  <div class="custom-upload-img-com">
    <div class="upload-img-com-wrapper">
      <el-alert title="只能上传小于 1M 的图片" type="warning" effect="dark" :closable="false" />
      <div class="option">
        <input type="file" @change="uploadServer" name="" id="">
        <label for="upimg">
          <i class="option-item ok el-icon-picture">选择
            <input
              id="upimg"
              class="img-inp upload"
              type="file"
              title="选择图片"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="uploadQiniu"
            >
          </i>
        </label>
        <i class="option-item close el-icon-close">取消</i>
      </div>
    </div>
  </div>
</template>

<script>
import { imgRandomName } from '@/utils'
import { qiniu_URL, uploadImgStatusMap } from '@/const'
export default {
  props: ["token", "getstatus"],
  methods: {
    /**上传至七牛云 */
    uploadQiniu(e) {
      const [file] = e.target.files
      const fileType = file.type && file.type.split("/")[1]
      const fileSize = file.size / 1024 / 1024
      if (fileSize > 1) {
        this.$message.error('只能上传小于1M的图片！换一个小图片试试吧~~');
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
        this.getstatus({status: uploadImgStatusMap.error, data: err})
      }
      const next = (res) => {
        this.getstatus({status: uploadImgStatusMap.next, data: res})
      }
      const complete = (res) => {
        this.getstatus({status: uploadImgStatusMap.complete, data: res})
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
      const file = e.target.files[0]
      const fileType = file.type && file.type.split("/")[1]
      const fileSize = file.size / 1024 / 1024
      const formdata = new FormData()
      formdata.append('file', file)
      this.$http.uploadFile(formdata).then(res => {
        console.log('上传文件结果', res)
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
        background-color: #c35673;
        color: #fff;
        width: 70px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        &::before {
          margin-right: 5px;
        }
        &.close {
          background-color: #F56C6C;
        }
      }
      .img-inp {
        display: none;
      }
    }
  }
}
</style>

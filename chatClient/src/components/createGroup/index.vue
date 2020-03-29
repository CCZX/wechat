<template>
  <div class="create-group-cmp">
    <div class="create-content">
      <avatar-choose
        v-if="showChooseAvatar"
        @close="setShowChooseAvatar(false)"
        @choose="chooseAvatar"
      />
      <el-form label-position="top" :model="groupForm" :rules="rules" ref="groupForm">
        <el-form-item label="群头像（点击头像可切换）" required class="avatar-form">
          <el-avatar
            :size="50"
            :src="IMG_URL + groupForm.avatar"
            @click.native="setShowChooseAvatar(true)"
          />
        </el-form-item>
        <el-form-item label="群名称" prop="title" required>
          <el-input v-model="groupForm.title" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="群描述" prop="desc">
          <el-input v-model="groupForm.desc" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submitForm('groupForm')">提交</el-button>
          <el-button size="mini" @click="resetForm('groupForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import avatarChoose from '@/components/avatarChoose'
export default {
  data() {
    return {
      groupForm: {
        title: '',
        desc: '',
        avatar: 'face/face1.jpg'
      },
      rules: {
        title: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        desc: [
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ]
      },
      showChooseAvatar: false,
      IMG_URL: process.env.IMG_URL
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    async create() {
      const params = {
        title: this.groupForm.title,
        desc: this.groupForm.desc,
        img: this.groupForm.avatar,
        holderName: this.userInfo.name,
        holderUserId: this.userInfo._id
      }
      const { data } = await this.$http.createGroup(params)
      console.log(data)
      this.$eventBus.$emit('toggleCreateGroup', {show: false})
      if (data.status === 2000) {
        const { groupData } = data.data
        this.$eventBus.$emit('createGroupSuccess')
        this.$alert(`创建成功！群号是${groupData[0].code}。`, '提示')
      } else {
        this.$message({type: 'error', message: '创建群失败！'})
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.create()
        } else {
          console.log('error submit!!');
          return false
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    setShowChooseAvatar(flag) {
      this.showChooseAvatar = flag
    },
    chooseAvatar(item) {
      this.groupForm.avatar = item
    }
  },
  components: {
    avatarChoose
  }
}
</script>

<style lang="scss">
.create-group-cmp {
  .create-content {
    .avatar-form {
      margin: 0;
    }
  }
}
</style>

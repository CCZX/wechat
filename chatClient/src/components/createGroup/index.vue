<template>
  <div class="create-group-cmp">
    <div class="create-content">
      <el-form label-position="right" :model="groupForm" :rules="rules" ref="groupForm">
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
export default {
  data() {
    return {
      groupForm: {
        title: '',
        desc: ''
      },
      rules: {
        title: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        desc: [
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ]
      }
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
        img: '',
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
    }
  },
}
</script>

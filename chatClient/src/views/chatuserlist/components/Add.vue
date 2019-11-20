<template>
  <div class="chat-user-list__add">
    <com-header></com-header>
    <div class="add-type">
      <!-- <span>选择搜索类型</span> -->
      <el-select class="select" v-model="selectType" placeholder="请选择">
        <el-option
          v-for="item in selectTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input class="search" v-model="searchKey" placeholder="请输入搜索内容"
        prefix-icon="el-icon-search"
        @input="preFetchUser(vm)"></el-input>
    </div>
    <div class="user-list" v-loading="loading">
      <chat-item v-for="item in userList" :key="item._id" :userinfo="item"></chat-item>
    </div>
  </div>
</template>

<script>
import comHeader from '@/components/comheader'
import chatItem from './ChatItem.vue'
import { debounce } from '@/utils'
export default {
  data() {
    return {
      selectTypeList: [{id: 1, name: '昵称', value: 'nickname'},{id: '2', name: 'Chat号', value: 'code'},{id: '3',name: '账号', value: 'name'}],
      selectType: 'code',
      searchKey: '',
      vm: this,
      userList: [],
      loading: false
    }
  },
  methods: {
    preFetchUser: debounce((vm) => {
      vm.loading = true
      let params = {
        type: vm.selectType,
        q: vm.searchKey
      }
      vm.$http.preFetchUser(params).then(res => {
        let { status, data } = res.data
        if (res.status === 200 && status === 2000) {
          vm.userList = data
        }
        vm.loading = false
      })
    }, 1000)
  },
  components: {
    comHeader,
    chatItem
  }
}
</script>

<style lang="scss">
.chat-user-list__add {
  position: relative;
  padding: 10px;
  height: 100%;
  .add-type {
    margin-top: 40px;
  }
  .user-list {
    min-height: 40%;
  }
}
</style>


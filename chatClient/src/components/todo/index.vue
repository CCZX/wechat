<template>
  <div class="todo-cmp" @click="goSchedule" title="前往日程">
    <i class="el-icon-circle-check" style="fontSize: 20px"></i>
    <span class="text">今日待办 <span class="">:</span> {{todos.length}}</span>
  </div>
</template>

<script>
import { fromatTime } from '@/utils'
export default {
  data() {
    return {
      todos: []
    }
  },
  methods: {
    goSchedule() {
      this.$router.push({path: '/chat/schedule'})
    },
    findTodayTodo() {
      const allTodos = JSON.parse(window.localStorage.getItem('todo')) || []
      const todayTodos = allTodos.map(item => {
        if (!item.end || new Date(item.end) === new Date(item.start)) {
          if (fromatTime(new Date(item.start), false) === fromatTime(new Date(), false)) {
            item.start = fromatTime(new Date(item.start), false)
            item.end ? item.end = fromatTime(new Date(item.end), false) : ''
            return item
          }
        } else if (new Date(item.end) > new Date(item.start)) {
          if (fromatTime(new Date(item.start), false) <= fromatTime(new Date(), false) && fromatTime(new Date(item.end), false) >= fromatTime(new Date(), false)) {
            item.start = fromatTime(new Date(item.start), false)
            item.end = fromatTime(new Date(item.end), false)
            return item
          }
        }
      }).filter(item => item)
      this.todos = todayTodos
    }
  },
  mounted() {
    this.findTodayTodo()
  },
}
</script>

<style lang="scss">
@import './../../../static/css/var.scss';
.todo-cmp {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: $secondarybg;
  // background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  color: $primaryfont;
  cursor: pointer;
  .text {
    margin-left: 5px;
  }
}
</style>

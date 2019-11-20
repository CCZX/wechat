// main.js
import Vue from "vue"; // 引入 Vue 是因为要用到 Vue.extend() 这个方法
import Main from "./main.vue"; // 引入刚才的 toast 组件

let ToastConstructor = Vue.extend(Main); // 这个在前面的前置知识内容里面有讲到
let instance;

const Toast = function(options = {}) {
  instance = new ToastConstructor({
    data: options
  }).$mount(); // 渲染组件
  document.body.appendChild(instance.$el); // 挂载到 body 下
};
["success", "error"].forEach( type => {
  Toast[type] = options => {
    options.type = type
    return Toast(options) 
  }
})

export default Toast;

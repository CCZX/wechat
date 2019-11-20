export const menus = [
  {
    title: '首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '用户管理',
    icon: 'user',
    key: '/home/user',
    subs: [
      {key: '/home/user/statistics', title: '查看用户', icon: 'area-chart',},
      {key: '/home/user/edit', title: '修改用户', icon: 'edit',},
    ]
  },
  {
    title: '导航组件',
    icon: 'bars',
    key: '/home/navigation',
    subs: [
      {key: '/home/navigation/dropdown', title: '下拉菜单', icon: ''},
      {key: '/home/navigation/menu', title: '导航菜单', icon: ''},
      {key: '/home/navigation/steps', title: '步骤条', icon: ''},
    ]
  },
  {
    title: '输入组件',
    icon: 'edit',
    key: '/home/entry',
    subs: [
      {
        key: '/home/entry/form',
        title: '表单',
        icon: '',
        subs: [
          {key: '/home/entry/form/basic-form', title: '基础表单', icon: ''},
          {key: '/home/entry/form/step-form', title: '分步表单', icon: ''}
        ]
      },
      {key: '/home/entry/upload', title: '上传', icon: ''},
    ]
  },
  {
    title: '显示组件',
    icon: 'desktop',
    key: '/home/display',
    subs: [
      {key: '/home/display/carousel', title: '轮播图', icon: ''},
      {key: '/home/display/collapse', title: '折叠面板', icon: ''},
      {key: '/home/display/list', title: '列表', icon: ''},
      {key: '/home/display/table', title: '表格', icon: ''},
      {key: '/home/display/tabs', title: '标签页', icon: '',},
    ]
  },
  {
    title: '反馈组件',
    icon: 'message',
    key: '/home/feedback',
    subs: [
      {key: '/home/feedback/modal', title: '对话框', icon: '',},
      {key: '/home/feedback/notification', title: '通知提醒框', icon: ''},
      {key: '/home/feedback/spin', title: '加载中', icon: '',}
    ]
  },
  {
    title: '其它',
    icon: 'bulb',
    key: '/home/other',
    subs:[
      {key: '/home/other/animation', title: '动画', icon: '',},
      {key: '/home/other/gallery', title: '画廊', icon: '',},
      {key:'/home/other/draft',title:'富文本',icon:''},
      {key:'/home/other/chart',title:'图表',icon:''},
      {key:'/home/other/loading',title:'加载动画',icon:''},
      {key:'/home/other/404',title:'404',icon:''},
      {key:'/home/other/springText',title:'弹性文字',icon:''},
    ]
  },
  {
    title: '关于',
    icon: 'info-circle-o',
    key: '/home/about'
  }
]

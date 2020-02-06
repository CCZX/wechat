export const menus = [
  {
    title: '首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '普通用户',
    icon: 'user',
    key: '/home/user',
    subs: [
      {key: '/home/user/statistics', title: '用户统计', icon: 'area-chart',},
      {key: '/home/user/edit', title: '用户管理', icon: 'edit',},
    ]
  },
  {
    title: '群组管理',
    icon: 'team',
    key: '/home/group',
    subs: [
      {key: '/home/group/statistics', title: '查看群组', icon: ''},
      {key: '/home/group/edit', title: '修改群组', icon: ''},
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

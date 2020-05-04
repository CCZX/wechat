const SYS_USER = require('./../models/systemUser')
const accountBase = require('./../models/accountpool')
const superUser = require('./../models/superUser')
const blogCategory = require('./../models/blogCategory')
const blogTag = require('./../models/blogTags')

/**系统管理员默认不能注册，初始化超级系统管理员（role===0） */
const initSuperUser = () => {
  new superUser({
    name: 'admin',
    password: '123456',
    role: 0
  }).save((err, doc) => {
    if (!err) {
      console.log('>>>初始化超级系统管理员成功')
    }
  })
}

/**初始化系统用户，用于验证消息的发送 */
const validateUser = {
  code: '111111',
  nickname: '验证消息',
  status: 1
}
const initSystemUser = async () => {
  const data = await SYS_USER.insertMany(validateUser)
  console.log('>>>插入系统用户成功',data)
}

const initAccountPool = () => {
  for (let i = 10000000; i < 10000999; i++) {
    const account = new accountBase({
      code: String(i),
      status: '0',
      type: '1',
      random: Math.random()
    })
    account.save((err, doc) => {
      if (err) {
        console.log(`>>>用户插入错误，code：${i}`)
      } else {
        console.log(`>>>用户插入成功，code：${i}`)
      }
    })
  }
  for (let i = 100000; i < 100999; i++) {
    const account = new accountBase({
      code: String(i),
      status: '0',
      type: '2',
      random: Math.random()
    })
    account.save((err, doc) => {
      if (err) {
        console.log(`>>>群聊插入错误，code：${i}`)
      } else {
        console.log(`>>>群聊插入成功，code：${i}`)
      }
    })
  }
}

const BLOG_CATEGORY = [
  {
    name: '前端',
    value: 'frontEnd',
    desc: '前端即网站前台部分，运行在PC端，移动端等浏览器上展现给用户浏览的网页。随着互联网技术的发展，HTML5，CSS3，前端框架的应用，跨平台响应式网页设计能够适应各种屏幕分辨率，完美的动效设计，给用户带来极高的用户体验。'
  },
  {
    name: '后端',
    value: 'rearEnd',
    desc: '后端，指网站后台，有时也称为网站管理后台，是指用于管理网站前台的一系列操作，如：产品、企业信息的增加、更新、删除等。'
  },
  {
    name: 'IOS',
    value: 'IOS',
    desc: 'iOS是由苹果公司开发的移动操作系统。苹果公司最早于2007年1月9日的Macworld大会上公布这个系统，最初是设计给iPhone使用的，后来陆续套用到iPod touch、iPad上。'
  },
  {
    name: 'Android',
    value: 'Android',
    desc: '安卓是一种基于Linux内核（不包含GNU组件）的自由及开放源代码的操作系统。主要使用于移动设备，如智能手机和平板电脑，由Google公司和开放手机联盟领导及开发。'
  },
  {
    name: '程序员',
    value: 'coder',
    desc: 'coder'
  }
]
const initBlogCategory = () => {
  for (let i = 0; i < BLOG_CATEGORY.length; i++) {
    const item = BLOG_CATEGORY[i]
    new blogCategory({
      name: item.name,
      desc: item.desc,
      value: item.value
    }).save((err, doc) => {
      if (err) {
        console.log(`>>>插入category【${item.name}】失败！`)
      } else {
        console.log(`>>>插入category【${item.name}】成功！`)
      }
    })
  }
}

const BLOG_TAG = {
  frontEnd: [
    {
      name: 'JavaScirp',
      desc: '脚本语言'
    }, {
      name: 'CSS',
      desc: '层叠样式表'
    }, {
      name: 'HTML',
      desc: '超文本标记语言'
    }, {
      name: 'CSS3',
      desc: '层叠样式表'
    }, {
      name: 'HTML5',
      desc: '超文本标记语言'
    }, {
      name: 'ES6',
      desc: 'ECMAScript2016'
    }, {
      name: 'Vue.js',
      desc: '渐进式框架'
    }, {
      name: 'React.js',
      desc: '前端框架'
    }, {
      name: 'Angular',
      desc: '前端框架'
    }, {
      name: '微信小程序',
      desc: 'weixinweb'
    }, {
      name: 'Node.js',
      desc: '非阻塞I/O'
    }, {
      name: 'webpack',
      desc: '打包工具'
    }
  ],
  rearEnd: [
    {
      name: 'Java',
      desc: 'java'
    },{
      name: 'Python',
      desc: 'python'
    }, {
      name: 'C#',
      desc: 'C#'
    }, {
      name: 'C++',
      desc: 'C++'
    }, {
      name: 'C',
      desc: 'C'
    }, {
      name: 'Go',
      desc: 'GO'
    }, {
      name: 'PHP',
      desc: 'PHP'
    }
  ],
  IOS: [
    {
      name: 'Swift',
      desc: 'Swift'
    }, {
      name: 'Objective-C',
      desc: 'Objective-C'
    }, {
      name: 'Flutter',
      desc: 'Flutter'
    }, {
      name: 'App',
      desc: 'App'
    }
  ],
  Android: [
    {
      name: 'FFmpeg',
      desc: 'FFmpeg'
    }, {
      name: 'Kotlin',
      desc: 'Kotlin'
    }, {
      name: 'OpenGL',
      desc: 'OpenGL'
    }, {
      name: 'OKHttp',
      desc: 'OKHttp'
    }
  ],
  coder: [
    {
      name: '代码规范',
      desc: '代码规范'
    }, {
      name: '求职',
      desc: '求职'
    }, {
      name: '面试',
      desc: '面试'
    }, {
      name: '职业规划',
      desc: '职业规划'
    }
  ]
}

const initBlogTag = async () => {
  const tagEntries = Object.entries(BLOG_TAG)
  for (const [key, value] of tagEntries) {
    const cate = await blogCategory.findOne({value: key})
    const cateId = cate._id
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      new blogTag({
        categoryId: cateId,
        name: item.name,
        desc: item.desc
      }).save((err, doc) => {
        if (err) {
          console.log(`>>>类别：${key}下插入${item.name}失败！`)
        } else {
          console.log(`>>>类别：${key}下插入${item.name}成功！`)
        }
      })
    }
  }
}

module.exports = {
  initSuperUser,
  initSystemUser,
  initAccountPool,
  initBlogCategory,
  initBlogTag
}

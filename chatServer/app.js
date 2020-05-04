var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
let session = require('express-session')
let server = require('http').createServer(app)
let io = require('socket.io')(server)

const { formatDate } = require('./utils')
const onLineUser = {}
exports.onLineUser = onLineUser
const API_VERSION = require('./const').API_VERSION
const useMiddleware = require('./middleware')

const user = require('./routes/user')
const friendly = require('./routes/friendly')
const group = require('./routes/group')
const news = require('./routes/news')
const groupNews = require('./routes/groupNews')
const system = require('./routes/sys')
const validate = require('./routes/validateNews')
const pyq = require('./routes/pyq')
const superUser = require('./routes/superUser')
const blog = require('./routes/blog')

// const socketHandler = require('./utils/socket')


const options = {
  setHeaders(res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*')
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), options));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

/**中间件使用 */
useMiddleware(app)

/* session验证方式
app.use(`${API_VERSION}/*`, (req, res, next)　=> {
  console.log(req.session)
  if (req.session.login) {
    next()
  } else {
    if (whiteList.includes(req.originalUrl)) {
      next()
    } else {
      res.json({
        status: 2002,
        data: '',
        msg: '用户未登录或登录过期'
      })
    }
  }
})
*/

/**后期改这里 */
app.get(`${API_VERSION}/user/onlineusers`, (req, res) => {
  return res.json({
    status: 2000,
    data: onLineUser,
    msg: '获取在线用户成功'
  })
})
app.use(`${API_VERSION}/user`, user)
app.use(`${API_VERSION}/friendly`, friendly)
app.use(`${API_VERSION}/group`, group)
app.use(`${API_VERSION}/news`, news)
app.use(`${API_VERSION}/groupnews`, groupNews)
app.use(`${API_VERSION}/sys`, system)
app.use(`${API_VERSION}/validate`, validate)
app.use(`${API_VERSION}/pyq`, pyq)
app.use(`${API_VERSION}/superUser`, superUser)
app.use(`${API_VERSION}/blog`, blog)
/**前台初始资源路径 */
app.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html')
})
/**后台资源初始路劲 */
app.get('/admin', (req, res) => {
  // res.sendfile(__dirname + '/admin.html')
  res.sendfile(__dirname + '/public/build/index.html')
})

const { insertNewNews } = require('./controller/news')
const { insertValidateNews, changeValidateNewsStatus } = require('./controller/validateNews')
const { insertNewGroupNews } = require('./controller/groupNews')
const { addFriend } = require('./controller/friendly')
const { addNewGroupUser } = require('./controller/group')
const { updateUserOnlineTime } = require('./controller/user')
const { conversationTypes } = require('./const')

const conversationList = {}
/**
 * socket实现P2P的消息传输有两种
 * 1. 使用socket.id来将消息发送给对方
 * toSocketID.send(...arg)
 * 2. 使用socket.join(roomid)方法，
 * socket.join(roomid)
 * io.in(roomid).emit()
 */
io.on('connection', (socket) => {
  console.log('>>>客户端新上线用户连接成功')
  socket.on('goOnline', val => {
    if (!val) return
    if (Object.keys(onLineUser).length < 200) {
      onLineUser[socket.id] = {
        _id: val._id,
        name: val.name,
        nickname: val.nickname,
        loginTime: Date.now()
      }
    }
    io.emit('onlineUser', onLineUser)
  })
  socket.on('join', val => {
    const { roomid } = val
    socket.join(roomid, () => {
      conversationList[roomid] = socket.id
      io.in(roomid).emit('conversationList', conversationList)
    })
  })
  socket.on('sendNewMessage', async news => {
    // console.log('newmessage',news)
    /**
     * 接收到新的消息对消息类型所属的会话进行判断
     */
    if (news.conversationType === conversationTypes.friend) {
      console.log('friend')
      delete news['conversationType']
      const data = await insertNewNews(news)
      console.log('插入的数据', data)
    } else if (news.conversationType === conversationTypes.group) {
      console.log('group')
      delete news['conversationType']
      insertNewGroupNews(news)
    }
    socket.to(news.roomid).emit('receiveMessage', news)
  })
  socket.on('sendValidateMessage', news => {
    console.log(news)
    insertValidateNews(news)
    socket.to(news.roomid).emit('receiveValidateMessage', news)
  })
  socket.on('sendAgreeFriendValidate', data => {
    const friendly = {
      userM: data.senderId,
      userY: data.reveiverId,
      createDate: formatDate(new Date(), false)
    }
    addFriend(friendly)
    const { roomid, reveiverId, senderId } = data
    const senderRoomId = roomid.replace(reveiverId, senderId)
    socket.to(senderRoomId).emit('receiveAgreeFriendValidate', data)
    socket.to(roomid).emit('receiveAgreeFriendValidate', data)
    changeValidateNewsStatus(data, 1) // 用户同意加好友之后改变验证消息的状态
  })
  socket.on('sendAgreeGroupValidate', data => {
    const groupUser = {
      groupId: data.groupId._id,
      userId: data.senderId,
      userName: data.senderName,
      manager: 0,
      holder: 0,
      card: ''
    }
    console.log('groupUser', groupUser)
    addNewGroupUser(groupUser)
  })
  socket.on('isReadMsg', data => {
    console.log('isReadMsg', data)
    const { roomid } = data
    if (!roomid) return
    console.log(roomid)
    socket.to(roomid).emit('isReadMsg', data)
  })


  socket.on('apply', data=>{ // 转发申请
    console.log('apply user to', data.myNickname)
    // sockS[data.account].emit('apply', data);
    socket.to(data.roomid).emit('apply', data);
  })
  socket.on('reply', data=>{ // 转发回复
    console.log('reply', data.myNickname)
    socket.to(data.roomid).emit('reply', data)
  })
  socket.on('1v1answer', data=>{ // 转发 answer
    console.log('1v1anwser', data.myNickname)
    socket.to(data.roomid).emit('1v1answer', data)
  })
  socket.on('1v1ICE', data=>{ // 转发 ICE
    console.log('1v1ICE', data.myNickname)
    socket.to(data.roomid).emit('1v1ICE', data)
  })
  socket.on('1v1offer', data=>{ // 转发 Offer
    console.log('1v1offer', data.myNickname)
    socket.to(data.roomid).emit('1v1offer', data)
  })
  socket.on('1v1hangup', data=>{ // 转发 hangup
    console.log('1v1hangup', data.myNickname)
    socket.to(data.roomid).emit('1v1hangup', data)
  })
  socket.on('disconnect', async (val) => {
    console.log('disconnection user', val)
    const id = socket.id
    if (!id) return
    const logoutTime = Date.now()
    const { loginTime, _id } = onLineUser[id] || {}
    if (!loginTime || !_id) return
    const onlineTime = logoutTime - loginTime
    console.log(onlineTime)
    await updateUserOnlineTime({userId: _id, time: onlineTime})
    delete onLineUser[id]
    io.emit('onlineUser', onLineUser)
  })
  socket.on('leave', async () => {
    const id = socket.id
    if (!id) return
    // 计算在线时间
    const logoutTime = Date.now()
    const { loginTime, _id } = onLineUser[id] || {}
    if (!loginTime || !_id) return
    const onlineTime = logoutTime - loginTime
    console.log(onlineTime)
    await updateUserOnlineTime({userId: _id, time: onlineTime})
    delete onLineUser[id]
    io.emit('onlineUser', onLineUser)
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(3333, () => {
  console.log('node.js服务在3333端口成功启动')
});

module.exports = app;

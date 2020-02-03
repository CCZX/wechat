var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
let session = require('express-session')
let server = require('http').createServer(app)
let io = require('socket.io')(server)

const { fromatTime } = require('./utils')

const user = require('./routes/user')
const friendly = require('./routes/friendly')
const group = require('./routes/group')
const news = require('./routes/news')
const groupNews = require('./routes/groupNews')
const system = require('./routes/sys')
const validate = require('./routes/validateNews')

// const socketHandler = require('./utils/socket')

const API_VERSION = require('./const').API_VERSION
const whiteList = [`${API_VERSION}/user/login`, `${API_VERSION}/user/register`, `${API_VERSION}/user/getcode`] // `${API_VERSION}/user/getcode`

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

// app.use(`${API_VERSION}/*`, (req, res, next)　=> {
//   console.log(req.session)
//   if (req.session.login) {
//     next()
//   } else {
//     if (whiteList.includes(req.originalUrl)) {
//       next()
//     } else {
//       res.json({
//         status: 2002,
//         data: '',
//         msg: '用户未登录或登录过期'
//       })
//     }
//   }
// })
app.use(`${API_VERSION}/user`, user)
app.use(`${API_VERSION}/friendly`, friendly)
app.use(`${API_VERSION}/group`, group)
app.use(`${API_VERSION}/news`, news)
app.use(`${API_VERSION}/groupnews`, groupNews)
app.use(`${API_VERSION}/sys`, system)
app.use(`${API_VERSION}/validate`, validate)

const { insertNewNews } = require('./controller/news')
const { insertValidateNews, changeValidateNewsStatus } = require('./controller/validateNews')
const { insertNewGropNews } = require('./controller/groupNews')
const { addFriend } = require('./controller/friendly')
const { conversationTypes } = require('./const')

const onLineUser = []
const conversationList = {}
io.on('connection', (socket) => {
  console.log('连接成功')
  socket.on('goOnline', val => {
    const userItem = {_id: val._id, name: val.name, nickname: val.nickname, code: val.code}
    onLineUser.push(userItem)
    socket.broadcast.emit('onlineUser', onLineUser)
  })
  socket.on('join', val => {
    const { roomid } = val
    // console.log('join', val)
    socket.join(roomid, () => {
      conversationList[roomid] = socket.id
      io.in(roomid).emit('conversationList', conversationList)
    })
  })
  socket.on('sendNewMessage', news => {
    // console.log('newmessage',news)
    /**
     * 接收到新的消息对消息类型所属的会话进行判断
     */
    if (news.conversationType === conversationTypes.friend) {
      console.log('friend')
      delete news['conversationType']
      insertNewNews(news)
    } else if (news.conversationType === conversationTypes.group) {
      console.log('group')
      delete news['conversationType']
      insertNewGropNews(news)
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
      createDate: fromatTime(new Date(), false)
    }
    addFriend(friendly)
    const { roomid, reveiverId, senderId } = data
    const senderRoomId = roomid.replace(reveiverId, senderId)
    socket.to(senderRoomId).emit('receiveAgreeFriendValidate', data)
    changeValidateNewsStatus(data, 1)
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
  console.log('服务器在3333启动')
});

module.exports = app;

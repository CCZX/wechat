var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
let session = require('express-session')
let server = require('http').createServer(app)
let io = require('socket.io')(server)

let user = require('./routes/user')
let friendly = require('./routes/friendly')
let group = require('./routes/group')
const news = require('./routes/news')

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

const insertNewNews = require('./controller/news').insertNewNews

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
    socket.join(roomid, () => {
      conversationList[roomid] = socket.id
      io.in(roomid).emit('conversationList', conversationList)
    })
  })
  socket.on('sendNewMessage', news => {
    console.log('newmessage',news)
    insertNewNews(news)
    socket.to(news.roomid).emit('receiveMessage', news)
    console.log('end')
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

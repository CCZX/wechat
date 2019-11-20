> 聊天系统

毕业设计项目，因为本人后端不是太熟悉参考了[江三疯](https://github.com/wuyawei)的后端聊天系统设计。本系统分为`Client`，`Server`，`Admin`三个端：其中`Client`为客户端，`Server`为服务器端。

> 技术路线

本项目为前后端分离的开发模式，前端主要使用了`Vue`、`React`等技术栈，后端使用的是`node.js`，数据库使用的是`MongoDB`。在实现聊天的全双工数据通信使用的是`WebSocket`。

> 启动项目

- 启动服务器
```javascript
cd chatServer
npm install
node app.js
```
- 启动客户端
```javascript
cd chatClient
npm install
npm run dev
```
- 启动管理员端
```javascript
cd chatAdmin
npm install
npm start
```

> 联系

E-mail：`ccdebuging@gmail.com`



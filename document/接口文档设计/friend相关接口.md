### 接口文档

> this document is about friend API

### 1、获取用户好友列表

GET：`/api/v1/friendly/myfriends`

> 传递参数

```javascript
{
    id: Number, //用户ID
}
```

> 返回数据

```javascript
{
    status: Number,
    data: [{..},{..}],
    msg: ''
}
```

### 2、获取用户最近会话的好友列表

GET：`/api/v1/friendly/recentconversation`

> 描述：最近会话可能有群聊，目前没有做群聊相关

> 传递参数

```javascript
{
    userId: String, //用户ID
    recentFriendIds: Array // 最近会话的好友ID数组
}
```

> 返回数据

```javascript
{
    status: Number,
    data: [{..},{..}],
    msg: ''
}
```

### 3、删除好友

GET：`/api/v1/friendly/deletefriend`

> 描述：删除好友，在删除时会从token判断是不是自己主动删除的，不是就不会成功！

> 传递参数

```javascript
{
    userM: String, // 主动删除者ID
    userY: String // 被动删除者ID
}
```

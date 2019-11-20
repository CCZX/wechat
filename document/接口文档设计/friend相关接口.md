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


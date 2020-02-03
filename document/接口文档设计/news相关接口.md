
> this document is about news API

### 1、获取两个用户之间最近的聊天信息

GET：`/api/v1/news/recent`

> 传递参数

```JavaScript
{
  roomid: String // 两两好友之间的唯一标识符，分别有两个用户的`_id`组成：`_id1-_id2`
}
```
> 返回数据
```javascript
{
  status: Number,
  data: [{}, {}],
  msg: ''
}
```

### 2、获取用户的验证消息

GET：`/api/v1/validate/myvalidatenews`

> 传递参数

```JavaScript
{
  id: String // 用户的id
}
```
> 返回数据
```javascript
{
  status: Number,
  data: [{}, {}],
  msg: ''
}
```

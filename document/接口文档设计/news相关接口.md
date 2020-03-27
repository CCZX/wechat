
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

### 3、获取好友之间的最后一条聊天记录

GET：`/api/v1/news/last`

> 传递参数

```JavaScript
{
  roomid: String // 房间ID
}
```
> 返回数据
```javascript
{
  status: Number,
  data: {},
  msg: ''
}
```

### 4、设置消息已读

GET：`/api/v1/news/isread`

> 传递参数

```JavaScript
{
  roomid: String, // 房间ID
  userId: String // 用户ID
}
```
> 返回数据
```javascript
{
  status: Number,
  data: [],
  msg: ''
}
```

### 5、获取历史消息

GET：`/api/v1/news/historymsg`

> 传递参数

```JavaScript
{
  roomid: String, // 房间ID
  type: String, // 搜索的类型，all、img、file等
  query: String, // 查询关键字
  date: String, // 查询日期
  page: Number,
  pageSize: Number
}
```
> 返回数据
```javascript
{
  status: Number,
  data: {
    data: [], // 数据
    count: Number // 数据总数
  },
  msg: ''
}
```

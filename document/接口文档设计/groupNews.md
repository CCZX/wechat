
> this document is about groupNews API

### 1、获取指定群聊最近的聊天信息

GET：`/api/v1/groupnews/recent`

> 传递参数

```JavaScript
{
  roomid: String // 群聊唯一标识，对应group实体的`_id`字段
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
### 2、获取指定群历史消息

GET：`/api/v1/groupnews/historymsg`

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
  data: [{}, {}],
  msg: ''
}
```


> this document is about pyq(朋友圈) API

### 1、发表朋友圈

GET：`/api/v1/pyq/publishpyqnews`

> 传递参数

```JavaScript
{
  userId: String, // 用户ID
  createDate: String, // 发表时间
  content: String, // 发表内容
  pictures: Array // 图片地址数组，目前最多只能上传两张
}
```
> 返回数据
```javascript
{
  status: Number,
  data: [{}],
  msg: ''
}
```
### 2、获取好友朋友圈

GET：`/api/v1/pyq/getfridenlypyq`

> 传递参数

```JavaScript
{
  id: String, // 用户的ID
  page: Number,
  pageSize: Number
}
```

> 接口如何工作？

我们首先需要获取到该用户所有好友的ID，组成一个好友id数组：ids，然后查询的时候使用，`$in`指令就可以了：
```javascript
db.pyqNews.find({
  userId: {$in: ids}
})
```

> 返回数据
```javascript
{
  status: Number,
  data: [{}, {}, ...],
  msg: ''
}
```

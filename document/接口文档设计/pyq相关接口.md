
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
### 3、朋友圈点赞

> 描述：目前只支持点赞不支持取消点赞

POST：`/api/v1/pyq/like`

> 传递参数

```JavaScript
{
  authorId: String, // 用户ID
  pyqId: String // 朋友圈ID
}
```
> 返回数据
```javascript
{
  status: Number, // 2000成功，2004：已经点赞，重复操作
  data: [{}],
  msg: ''
}
```

### 4、朋友圈评论

> 描述：目前只支持点赞不支持取消点赞

POST：`/api/v1/pyq/comment`

> 传递参数

```TypeScript
{
  pyqId: String, // 朋友圈Id
  content: String, // 评论内容
  authorId: String, // 评论者Id
  parentId?: String, // 夫评论，用户回复别人的评论时别人评论的引用
  level?: Number, // 评论层级，默认为0
  replyToAuthorInfo: Object, // 被回复者的信息
}
```
> 返回数据
```javascript
{
  status: Number, // 2000成功
  data: [{}],
  msg: ''
}
```

### 4、删除自己的朋友圈

> 描述：用户只能删除自己的朋友圈不能删除别人的

在删除朋友圈的同时会删除该朋友圈关联的评论以及点赞信息。

POST：`/api/v1/pyq/deletepyq`

> 传递参数

```TypeScript
{
  pyqId: String, // 朋友圈Id
  userId: String, // 本人Id
}
```
> 返回数据
```javascript
{
  status: Number, // 2000成功
  data: [],
  msg: ''
}
```

### 5、获取某条朋友圈详细信息

> 描述：只有当朋友圈Id以及用户Id都匹配时才能获取到

GET：`/api/v1/pyq/pyqinfo`

> 传递参数

```javascript
{
  pyqId: String, // 朋友圈Id
  userId: String // 用户Id
}
```

> 返回数据

```javascript
{
  status: Number,
  data: [{}],
  msg: String
}
```

### 6、更新某条朋友圈

> 描述：只有朋友圈Id以及userId相同时才能更新。只能更新content以及pictures
 
POST: `/api/v1/pyq/pyqmodify`

> 传递参数

```javascript
{
  pyqId: String, // 朋友圈Id
  userId: String, // 用户Id
  content: String, // 更新后的content
  pictures: Array // 更新后的图片
}
```

> 返回数
```javascript
{
  status: Number,
  data: [{}],
  msg: String
}
```

### 7、获取某个用户的朋友圈

> 描述：
 
POST: `/api/v1/pyq/getuserpyq`

> 传递参数

```javascript
{
  userId: String, // 用户Id
  page: Number, // 
  pageSize: Number // 
}
```

> 返回数
```javascript
{
  status: Number,
  data: [{}],
  msg: String
}
```

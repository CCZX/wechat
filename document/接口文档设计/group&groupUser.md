## 群聊相关接口

#### 1、根据用户名（在user表中对应name）来获取群聊

GET：`/api/v1/group/getmygroup`

> 传递参数

```javascript
{
    userName: '' // 用户名，在user表中对应name字段
}
```

#### 2、获取群聊详情

GET：`/api/v1/group/groupinfo`

> 传递参数

```javascript
{
    id: '' // 群聊的唯一ID
}
```

#### 2、在搜索时获取群聊

GET：`/api/v1/group/prefetchgroup`

> 传递参数

```javascript
{
    type: String, // 搜索的类型，比如群聊号（对应code字段），群聊名称（对应title字段）
    q: String, // keyWord
    page: Number, // 页码
    pageSize: Number
}
```
> 返回数据

```javascript
{
    status: Number,
    data: [],
    msg: ''
}

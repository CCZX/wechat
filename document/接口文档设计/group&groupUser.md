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



> this document is about system API

### 1、获取系统用户（系统用户负责发送好友验证等系统消息）

GET：`/api/v1/sys/sysusers`

> 传递参数

```JavaScript
{
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
### 2、获取七牛云Token

GET：`/api/v1/sys/qiniutoken`

> 传递参数

```JavaScript
{
}
```
> 返回数据
```javascript
{
  status: Number,
  data: 'dasdqweqweqwew',
  msg: ''
}
```

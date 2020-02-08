### USER相关的响应状态码

| 状态码 | 描述                               |
| ------ | ---------------------------------- |
| 1000   | 登录成功                           |
| 1001   | 登录失败：账号或密码错误           |
| 1002   | 验证码错误                         |
| 1003   | 用户已被注册                       |
| 1004   | 注册失败，可能是后台逻辑问题引起的 |
| 1005   | 注册成功                           |
| 1006   | 用户账号被冻结                     |
| 1007   | 用户账号被注销                     |

### 接口文档

#### 1、登录

POST：`/api/v1/user/login`

> 传递参数设计

```javascript
{
    account: String, // 账号
    password: String, // 密码
    cvCode: String. // 验证码
}
```

> 返回数据格式

```javascript
{
    status: Number, //
    data: String | Object, // 登录成功返回用户信息
    msg: String,
}
```



#### 2、注册

POST：`/api/v1/user/register`

> 传递参数设计

```javascript
{
    account: String, // 账号
    password： String, // 密码
    rePassword: String, // 确认密码
    cvCode: String // 验证码
}
```

> 返回数据格式

```javascript
{
    status: Number, //
    data: String | Object, // 注册成功返回用户账号
    msg: String,
}
```



#### 3、获取用户详情

GET：`/api/v1/user/userinfo`

> 传递参数设计

```javascript
{
    id: String // 用户的唯一标识
}
```

> 返回数据格式

```javascript
{
    status: Number,
    data: Object || String，// 用户信息，如果没有获取到返回空字符串
   	msg: ''
}
```

#### 4、预获取用户

> 描述：有时候在一些场景（比如：添加好友）需要根据输入框内容获取用户列表。

GET：`/api/v1/user/prefetchuser`

> 传递参数

```javascript
{
    type: '', // 搜索的类型，比如根据账号（对应code字段）、昵称（对应nickname字段）等
    q: '', // 搜索的关键字
    page: Number,
    pageSize: Number
}
```

#### 5、获取所有用户

> 描述：这个接口应用在Admin端，来查看所有的用户

GET：`/api/v1/user/getalluser`

> 传递参数

```javasc
// 目前不用传递参数，后期可能会传递page,pageSize两个参数
```

> 返回数据格式

#### 6、根据注册时间获取用户

> 描述：应用在Amind端。目前获取的是指定的某个月中用户的注册数量

GET：`/api/v1/user/getuserbysigntime`

> 传递参数

```javascript
{
    lt: String, // 截至 exp: '2020-01'
    gt: String // 开始 exp: '2020-02'
}
```

#### 7、改变用户状态

> 描述：

POST：`/api/v1/user/changestatus`

> 传参

```javascript
{
    id: String // 用户唯一标识符
    state: Number // 将要改变的状态
}
```

### 8、获取在线用户

> 描述：获取当前的在线用户

GET: `/api/v1/user/onlineusers`

> 传参

```javascript
{
    // none
}
```

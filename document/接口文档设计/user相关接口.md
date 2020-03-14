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

### 9、添加分组

> 描述：添加新的好友分组，如果已有该分组则不添加

POST: `/api/v1/user/addfenzu`

> 传参

```javascript
{
    userId: String, // 用户Id
    name: String // 新添加分组的名称
}
```

### 10、修改好友分组

> 描述：添加新的好友分组，如果已有该分组则不添加

POST: `/api/v1/user/modifyuserfenzu`

> 描述：修改好友的分组

> 传参

```javascript
{
    userId: String, // 用户Id
    friendId: String, // 好友Id
    newFenzu: String // 好友被添加到的分组
}
```

### 10、修改好友备注

> 描述：添加新的好友分组，如果已有该分组则不添加

POST: `/api/v1/user/modifyfriendbeizhu`

> 描述：修改好友的分组

> 传参

```javascript
{
    userId: String, // 用户Id
    friendId: String, // 好友Id
    friendBeizhu: String // 备注名称
}
```

### 11、删除某个分组

> 描述：删除后该分组下的好友会默认添加至【我的好友】分组

POST: `/api/v1/user/delfenzu`

> 传参

```javascript
{
    userId: String, // 用户Id
    fenzuName: String, // 分组名称
}
```

### 12、修改某个分组

> 描述：删默分组【我的好友】不可以配置

POST: `/api/v1/user/editfenzu`

> 传参

```javascript
{
    oldFenzu: String, // 分组原来的名字
    newFenzu: String, // 分组新的名字
    userId： String // 用户Id
}
```

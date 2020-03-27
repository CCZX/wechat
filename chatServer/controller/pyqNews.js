const PYQ_NEWS = require('./../models/pyqNews')
const FRIEND = require('./../models/friendly')
const PYQ_LIKE = require('./../models/pyqLike')
const PYQ_COMMENT = require('./../models/pyqComment')

// 用户在朋友圈发表动态
const publishPyqNews = async (req, res) => {
  const { userId, content, pictures } = req.body
  const data = {
    userId, content, pictures
  }
  try {
    const doc = await PYQ_NEWS.insertMany(data)
    return res.json({
      status: 2000,
      data: doc,
      msg: '发表成功'
    })
  } catch (error) {
    return res.json({
      status: 2003,
      data: error,
      msg: '服务端错误！'
    })
  }
}

// 获取我的好友的朋友圈列表
const getMyFriendPyqNews = async (req, res) => {
  const { id, page, pageSize } = req.query
  const friendlyList = []
  FRIEND.findFriendByUserM(id).then(userM => {
    FRIEND.findFriendByUserY(id).then(userY => {
      userM.forEach(v => {
        friendlyList.push({
          _id: v.userY._id
        })
      })
      userY.forEach(v => {
        friendlyList.push({
          _id: v.userM._id
        })
      })
      const friendlyIdList = friendlyList.map(item => item._id)
      friendlyIdList.push(id)
      PYQ_NEWS.findUserPyq(id, friendlyIdList, page, pageSize).then(pyqList => {
        const pyqIds = pyqList.map(item => item._id)
        PYQ_LIKE.find({
          pyqId: {$in: pyqIds}
        }).populate({path: 'authorId', select: 'nickname photo signature'}).then(likeList => {
          PYQ_COMMENT.find({
            pyqId: {$in: pyqIds}
          }).populate({path: 'authorId', select: 'nickname photo signature'}).then(commentList => {
            // 处理点赞逻辑
            let likeObj = {}
            likeList.forEach(item => {
              likeObj[item.pyqId] = likeObj[item.pyqId] ? [...likeObj[item.pyqId], item] : [item]
            })
            // end

            // 处理子评论逻辑
            const childComment = commentList.filter(item => item.parentId)
            const childCommentObj = {}
            childComment.forEach(item => {
              childCommentObj[item.parentId] = childCommentObj[item.parentId] ? [...childCommentObj[item.parentId], item] : [item]
            })
            const hasChildCommentList = JSON.parse(JSON.stringify(commentList.filter(item => !item.parentId)))
            hasChildCommentList.forEach(item => {
              item.reply = childCommentObj[item._id] || []
            })
            // end

            // 朋友圈添加对应的评论逻辑
            let commentObj = {}
            hasChildCommentList.forEach(item => {
              commentObj[item.pyqId] = commentObj[item.pyqId] ? [...commentObj[item.pyqId], item] : [item]
            })
            const tmp = JSON.parse(JSON.stringify(pyqList))
            tmp.forEach(item => {
              item.likes = likeObj[item._id] || []
              item.comments = commentObj[item._id] || []
            })
            // end
            return res.json({
              status: 2000,
              data: tmp,
              msg: '获取好友朋友圈成功！'
            })
          })
        })
      })
    })
  }).catch(err => {
    return res.json({
      status: 2003,
      data: err,
      msg: '服务端错误'
    })
  })
}

// 删除朋友圈
const deletePyqItem = async (req, res) => {
  const { pyqId, userId } = req.body
  PYQ_NEWS.findOneAndDelete({
    _id: pyqId,
    userId: userId
  }).then(doc => {
    PYQ_COMMENT.remove({
      pyqId: pyqId
    }).then(commentdoc => {
      PYQ_LIKE.remove({
        pyqId: pyqId
      }).then(likedoc => {
        return res.json({
          status: 2000,
          data: doc,
          msg: '删除成功'
        })
      })
    })
  }).catch(err => {
    return res.json({
      status: 2004,
      data: err,
      msg: '服务端错误'
    })
  })
}

// 获取某条朋友圈信息
const getPyqItemInfo = async (req, res) => {
  const { pyqId, userId } = req.query
  try {
    const doc = await PYQ_NEWS.find({
      _id: pyqId,
      userId
    }).populate({path: 'userId', select: 'nickname photo signature'})
    return res.json({
      status: 2000,
      data: doc,
      msg: '获取成功'
    })
  } catch (error) {
    return res.json({
      status: 2003,
      data: error,
      msg: '服务端错误'
    })
  }

}

// 修改某条朋友圈
const modifyPyqItem = async (req, res) => {
  const { pyqId, userId, content, pictures = [] } = req.body
  PYQ_NEWS.update({
    _id: pyqId,
    userId
  }, {
    content,
    pictures
  }).then(doc => {
    return res.json({
      status: 2000,
      data: doc,
      msg: '更新成功'
    })
  }).catch(err => {
    return res.json({
      status: 2003,
      data: err,
      msg: '服务端错误'
    })
  })
}

// 获取某个用户的朋友圈
const getUserPyq = async (req, res) => {
  const { userId, page, pageSize } = req.body
  const pyqList = await PYQ_NEWS.find({
    userId: userId
  }).populate({path: 'userId', select: 'nickname photo signature'})
  const pyqIds = pyqList.map(item => item._id)
  PYQ_LIKE.find({
    pyqId: {$in: pyqIds}
  }).populate({path: 'authorId', select: 'nickname photo signature'}).then(likeList => {
    PYQ_COMMENT.find({
      pyqId: {$in: pyqIds}
    }).populate({path: 'authorId', select: 'nickname photo signature'}).then(commentList => {
      // 处理点赞逻辑
      let likeObj = {}
      likeList.forEach(item => {
        likeObj[item.pyqId] = likeObj[item.pyqId] ? [...likeObj[item.pyqId], item] : [item]
      })
      // end

      // 处理子评论逻辑
      const childComment = commentList.filter(item => item.parentId)
      const childCommentObj = {}
      childComment.forEach(item => {
        childCommentObj[item.parentId] = childCommentObj[item.parentId] ? [...childCommentObj[item.parentId], item] : [item]
      })
      const hasChildCommentList = JSON.parse(JSON.stringify(commentList.filter(item => !item.parentId)))
      hasChildCommentList.forEach(item => {
        item.reply = childCommentObj[item._id] || []
      })
      // end

      // 朋友圈添加对应的评论逻辑
      let commentObj = {}
      hasChildCommentList.forEach(item => {
        commentObj[item.pyqId] = commentObj[item.pyqId] ? [...commentObj[item.pyqId], item] : [item]
      })
      const tmp = JSON.parse(JSON.stringify(pyqList))
      tmp.forEach(item => {
        item.likes = likeObj[item._id] || []
        item.comments = commentObj[item._id] || []
      })
      // end
      return res.json({
        status: 2000,
        data: tmp,
        msg: '获取好友朋友圈成功！'
      })
    })
  })
  // return res.json({
  //   status: 2000,
  //   data: pyqList,
  //   msg: '获取成功'
  // })
}

module.exports = {
  publishPyqNews,
  getMyFriendPyqNews,
  deletePyqItem,
  getPyqItemInfo,
  modifyPyqItem,
  getUserPyq
}

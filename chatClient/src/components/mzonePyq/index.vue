<template>
  <div class="pyq-com">
    <div class="pyq-com-wrapper">
      <div class="item">
        <div class="header">
          <el-avatar :size="60" src="Iitem.senderAvatar" @error="()=>true">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
          <div class="info">
            <div class="nickname">
              <span>chenchao</span>
            </div>
            <div class="time secondary-font">
              <span>2010-12-12 12:12</span>
            </div>
          </div>
        </div>
        <div class="body">
          <span>
            [SiriYang's Blog | AppWishList for iOS] 网页链接 
           许是为了促使用户立马买下中意的App，AppStore从iOS 11取消了愿望单系统，
            从此没有了类似Steam那样的应用关注和收藏功能。很多时候喜欢的应用打折也不
            能及时得知，或者是看到有意思的App过段时间想用时又想不起名字找不到了。
          </span>
        </div>
        <div class="info">
          <div class="read">
            <span class="secondary-font">阅读：12次</span>
          </div>
          <div class="operation">
            <i class="item iconfont icon-pinglun1 comment"></i>
            <i class="item iconfont icon-dianzan like"></i>
            <i class="item iconfont icon-zhuanfa farward"></i>
          </div>
        </div>
        <div class="comment-like">
          <div class="like iconfont icon-dianzan">
            <span>
              16-计科-四班-徐傲、15计科2班边小丰、计科 16 唐圣雄、16计科章格宁、16 计科 王志宏、张潇、曾泉文、谢必瑞、李阳、Stamina、最后一天、taco哥、情、说丶、、Shilling、.、林曜曜、SuMm Er.、。。等55人觉得很赞
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
export default {
  
}
</script>

<style lang="scss">
.pyq-com {
  .pyq-com-wrapper {
    .item {
      background-color: #fff;
      padding: 10px;
      .header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #C0C4CC;
        padding: 0 0 10px;
        .info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 10px;
          .time {
            margin-top: 10px;
          }
        }
      }
      .body {
        padding: 10px 0;
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .operation {
          .item {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
        }
      }
      .comment-like {
        padding: 10px 0;
        .like {
          &::before {
            padding: 1px;
            color: #c35673;
          }
        }
      }
    }
  }
}
</style>



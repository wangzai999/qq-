<template>
  <div id="find">
      <div class="find_img">
          <img src="" alt="">
      </div>
      <div class="find_content">
          <div class="find_lerease">
              <ul>
                  <li>
                      <h4><img src="" alt="">唱片评审团<span>发布文章</span></h4>
                      <div>
                          <div>
                              <p>十多个还是你说过你是个欧冠怂奥二夫人 方式</p>
                              <p>设哦哥 色工共竞聘上岗可是个骗局品三国屁股上评审供热个 聘任看哦二个共共设个帅哥跟谁过生日太过投入共</p>
                          </div>
                          <img src="" alt="">
                      </div>
                      <p><span>热门推荐</span><span>2 <i class="glyphicon glyphicon-comment"></i></span><span>17<i class="glyphicon glyphicon-thumbs-up"></i></span></p>
                  </li>
                  <li>
                      <h4><img src="" alt="">唱片评审团<span>发布文章</span></h4>
                      <div>
                          <div>
                              <p>十多个还是你说过你是个欧冠怂奥二夫人 方式</p>
                              <p>设哦哥 色工共竞聘上岗可是个骗局品三国屁股上评审供热个 聘任看哦二个共共设个帅哥跟谁过生日太过投入共</p>
                          </div>
                          <img src="" alt="">
                      </div>
                      <p><span>热门推荐</span><span>2 <i class="glyphicon glyphicon-comment"></i></span><span>17<i class="glyphicon glyphicon-thumbs-up"></i></span></p>
                  </li>
              </ul>
          </div>
          <div class="find_flash">
              <p>24小时快讯</p>
             <div>
                 <p>
                    <img src="" alt="">
                    <img src="" alt="">
                    <img src="" alt="">
                    <img src="" alt="">
                    <img src="" alt="">

                 </p>
             </div>
          </div>
           <div class="find_lerease">
              <ul>
                  <li>
                      <h4><img src="" alt="">唱片评审团<span>发布文章</span></h4>
                      <div>
                          <div>
                              <p>十多个还是你说过你是个欧冠怂奥二夫人 方式</p>
                              <p>设哦哥 色工共竞聘上岗可是个骗局品三国屁股上评审供热个 聘任看哦二个共共设个帅哥跟谁过生日太过投入共</p>
                          </div>
                          <img src="" alt="">
                      </div>
                      <p><span>热门推荐</span><span>2 <i class="glyphicon glyphicon-comment"></i></span><span>17<i class="glyphicon glyphicon-thumbs-up"></i></span></p>
                  </li>
                  <li>
                      <h4><img src="" alt="">唱片评审团<span>发布文章</span></h4>
                      <div>
                          <div>
                              <p>十多个还是你说过你是个欧冠怂奥二夫人 方式</p>
                              <p>设哦哥 色工共竞聘上岗可是个骗局品三国屁股上评审供热个 聘任看哦二个共共设个帅哥跟谁过生日太过投入共</p>
                          </div>
                          <img src="" alt="">
                      </div>
                      <p><span>热门推荐</span><span>2 <i class="glyphicon glyphicon-comment"></i></span><span>17<i class="glyphicon glyphicon-thumbs-up"></i></span></p>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
#find {
  position: absolute;
  top: 5.5rem;
  width: 100%;
  height: 38rem;
  overflow: scroll;
  .find_img {
    width: 100%;
    height: 30rem;
    background-color: #f00;
  }
  .find_content {
      padding-left: 1rem;
    width: 100%;
    .find_lerease {
      width: 100%;
      ul {
        li {
            margin-top: 1rem;
            border-bottom:1px solid #ccc;
            height: 15rem;
          h4 {
            font-size: 1.2rem;
            font-weight: bold;
            img {
              display: inline-block;
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              background-color: #0f0;
              margin-right: 1rem;
            }
            span {
              color: #666;
              font-size: 0.8rem;
              margin-left: 1rem;
            }
          }
          > div {
            width: 100%;
            display: flex;
            flex-direction: row;
            height: 8rem;
            div {
              width: 65%;
              p:first-child{
                  font-size: 1.1rem;
                  font-weight: bolder;
              }
              p:last-child{
                  font-size: 0.8rem;
                  color: #666;
              }
            }
            img {
              display: inline-block;
              width: 30%;
              height: 100%;
              margin-left: 2.5%;
              background-color: #0ff;
            }
          }
          >p{
              padding-right: 2rem;
              margin-top: 1rem;
              text-align: right;
              span:first-child{
                  float: left;
              }
              span:nth-child(n+1){
                  display: inline-block;
                  width: 4rem;
                  i{
                      margin-left: 0.5rem;
                  }
              }
          }
        }
      }
    }
    .find_flash{
        width: 100%;
        border-bottom: 1px solid #ccc;
        height:9rem;
        >p{
            width: 6rem;
            background-color: #000;
            color: white;
            text-align: center;
        }
        div{
            // width: 100%;
            height: 5.5rem;
            overflow-y: scroll;
            p{
                height: 5.5rem;
                white-space: nowrap;
                margin: 0;
                width: 250%;
                img{
                float: left;
                width: 10rem;
                height: 100%;
                background-color: #ff0;
                margin-right: 0.5rem;
            }
            }
            
        }
    }
  }
}
</style>

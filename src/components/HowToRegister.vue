<template>
  <div id="backView">
    <h1 class="title">视频：摇摇机商户端注册流程</h1>
    <p class="time">杭州瀚隆 2018-01-01 </p>
    <p class="content">相信有一部分人打开我们的公众号无法注册，在这里我们针对这些问题录制了以下视频来提供帮助。</p>
    <video class="video" controls="controls">
      <source src="http://www.anyibaowifi.com/howRegister.mp4" type="video/mp4">
      <source src="http://www.anyibaowifi.com/howRegister.mp4" type="video/ogg">
      您的浏览器不支持 HTML5 video 标签。
    </video>
    <p class="endContent">当然，这些只是正常的注册流程视频，如果遇到更多的问题，请拨打0571-88056596咨询，或者关注我们的公众号，在公众号内留言！（公众号-<span id="changecolor">摇摇机商户平台</span>）</p>
  </div>
</template>

<script>
  import {getCookie,setCookie} from "@/util/util";
  export default{
    mounted() {
      setCookie("mapptCloseIt","1");
    },
    created(){
      setCookie("mapptCloseIt","1");
    }
  }
</script>

<style type="text/css">
  *{
    margin: 0;
    padding: 0;
  }
  html, body{
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    background-color: #ffffff;
    font-size : 0.16rem;
  }
  #backView {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    color: #000000;

  }
  /*标题*/
  .title {
    text-align: center;
    padding-top: 60px;
    font-size: 3.2em;
    color: #333333;
  }
  /*时间  公司  应用名称*/
  .time {
    margin-top: 28px;
    color: #b5b5b5;
    font-size: 2em;
    text-align: center;
  }
  /*内容描述*/
  .content {
    margin-left: 38px;
    margin-right: 38px;
    margin-top: 48px;
    color: #333333;
    font-size: 2.4em;
    line-height: 2.2em;
  }
  /*视频*/
  .video{
    width: 100%;
    height: 35em;
    background-color: black;
    margin: 30px 0 auto 0;
  }
  /*结束语*/
  .endContent{
    margin: 24px 38px auto 38px;
    font-size: 2.4em;
    color: #333333;
    line-height: 2.2em;
  }
  #changecolor{
    color: #2da8f4;  /*颜色：红*/
  }
</style>




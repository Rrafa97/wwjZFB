<template>
<div class="back">
  <img class="not-online" src="../assets/img/notOnine.png">
  <span class="not-online-span">设备未绑定</span>
  <span class="not-online-span">你有免费10个游戏币可以进行测试</span>
  <router-link to="/ProductTest">
    <button class="not-online-btn"> 测试</button>
  </router-link>
</div>
</template>

<style>
  @import "../assets/css/common.css";
  @import "../assets/css/style-notOnline.css";
</style>

<script language="javascript">
  //防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
  });
</script>

<script>
  import {getCookie,setCookie} from "@/util/util";

  export default {
    mounted: function () {
      // setCookie("indexUrl", window.location.href.split('#')[1]);
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
      });
    }
  }
</script>

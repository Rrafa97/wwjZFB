<template>
  <div class="follow">
    <img src="../assets/img/DQ.jpg" alt="">
    <div class="follow-msg">扫描二维码，<span>关注公众号</span></div>
  </div>
</template>

<script>
  export default {
    name: "follow"
  }
</script>

<style scoped>
  .follow{
    text-align: center;
    padding-top: 1.8rem;
  }
  .follow img{
    width: 3.3rem;
    height: 3.3rem;
  }
  .follow-msg{
    margin-top: 0.9rem;
    width: 100%;
    text-align: center;
    font-size: 0.28rem;
    color: #999;
  }
  .follow-msg span{
    color: #218ef4;
  }


</style>

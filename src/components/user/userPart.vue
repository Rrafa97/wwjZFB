<template>
  <div class="userMsg">
    <div class="head-img-left">
      <img :src='userMsg.userAvatar' class="head-img">
      <div class="coin-number"><span>{{userMsg.userCoin}}</span>      <img src="../../assets/img/coin.png" class="head-img-coin"></div>

      <div class="coin-msg">当前游戏币</div>
    </div>
    <router-link to="/UserConsume">
    <div class="head-img-right">
      个人中心
    </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ['userMsg'],
    data() {
      return {
      }
    }
  }
</script>
<style>
  @import "../../assets/css/common.css";
</style>
<style scoped>
  .userMsg{
    height: 1.26rem;
    width: 100%;
    background-color: #fff;
  }
  .head-img-left{
    float: left;
    margin-left: 0.27rem;
    position: relative;
  }
  .head-img{
    position: absolute;
    top: 0.27rem;
    width: 0.72rem;
    height: 0.72rem;
    border-radius: 50%;
  }
  .head-img-coin{
    width: 0.15rem;
    height: 0.15rem;

  }
  .coin-number{
    position: absolute;
    display: flex;
    font-size:0.44rem ;
    color: #d14040;
    left: 1rem;
    top: 0.32rem;
  }
  .coin-number img{
    margin-top: 0.3rem;
  }
  .coin-msg{
    position: absolute;
    left: 0.8rem;
    top: 0.8rem;
    font-size: 0.18rem;
    color: #333333;
    width: 2rem;
  }
  .head-img-right{
    font-size: 0.347rem;
    color: #0ea3ff;
    float: right;
    margin-right: 0.34rem;
    line-height: 1.26rem;
  }

</style>

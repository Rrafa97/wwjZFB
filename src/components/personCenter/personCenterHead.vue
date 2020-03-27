<template>
  <div class="personCenter">
    <div class="head-msg">
      <div class="head-img">
        <img :src=personInfo.userAvatar>
      </div>
      <div class="name">{{personInfo.userName}}</div>
      <div class="coin">剩余币数：<span>{{personInfo.userCoin}}</span></div>
      <div class="integration">我的积分：{{personInfo.userLevelPoint}}分</div>
    </div>
    <div class="toggle">
      <span :class="{'toggle-choose':toggle==='coin'}" @click="changeTag('coin')">投币记录</span>
      <span :class="{'toggle-choose':toggle==='record'}" @click="changeTag('record')">充值记录</span>
    </div>
      <div  class="member">
        <img src="../../assets/img/VIP.png" alt="">
        成为会员
      </div>
  </div>
</template>

<script>

  export default {
    name: "personCenterHead",
    props:['toggle','personInfo'],
    data() {
      return {
        //toggle: 'coin',
      }
    },
    methods: {
      changeTag:function(tag) {
        this.$emit("listenToChildEvent",tag)
        //this.toggle = tag
      }
    }
  }
</script>

<style scoped>

  .personCenter {
    font-size: 0;
    position: relative;
    width: 100%;
    height: 3.6rem;
    background: -webkit-linear-gradient(right, #3fb9ff, #3fb9ff 26%, #2fe1fe); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #3fb9ff, #3fb9ff 26%, #2fe1fe); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #3fb9ff, #3fb9ff 26%, #2fe1fe); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #3fb9ff, #3fb9ff 26%, #2fe1fe); /* 标准的语法 */
    box-shadow: 0 0 0.2rem 0.1rem rgba(54,198,255,0.2);
  }

  .head-msg {
    width: 100%;
    text-align: center;
    padding-top: 0.44rem;
  }

  .head-img {
    position: relative;
    width: 1rem;
    height: 1rem;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 50%;
  }

  .head-img img {
    position: absolute;
    width: 94%;
    height: 94%;
    border-radius: 50%;
    top: 3%;
    left: 3%;
  }

  .name {
    color: #fefefe;
    font-size: 0.28rem;
    line-height: 0.28rem;
    margin-top: 0.15rem;
    font-weight: 600;
  }

  .coin {
    font-size: 0.26rem;
    line-height: 0.26rem;
    color: #fefefe;
    margin-top: 0.17rem;
  }

  .coin span {
    color: #f15050;
  }

  .integration {
    font-size: 0.26rem;
    line-height: 0.26rem;
    color: #fefefe;
    margin-top: 0.17rem;
  }

  .toggle {
    position: absolute;
    bottom: 0;
    height: 0.53rem;
    width: 100%;
  }

  .toggle span:first-child {
    position: absolute;
    top: 0;
    left: 1.55rem;
    font-size: 0.32rem;
    line-height: 0.32rem;
    font-weight: 600;
    color: #bee4f9;
  }

  .toggle span:last-child {
    position: absolute;
    top: 0;
    right: 1.25rem;
    font-size: 0.32rem;
    line-height: 0.32rem;
    color: #bee4f9;
  }

  .toggle-choose {
    font-weight: 600 !important;
    color: #fff !important;
    border-bottom: solid 0.05rem #fff;
    padding-bottom: 0.17rem;
  }
  .member{
    position: absolute;
    background-color: #fff;
    right: 0.4rem;
    top: 0.22rem;
    /*width: 1.43rem;*/
    height: 0.3rem;
    border-radius: 0.1rem;
    line-height: 0.3rem;
    font-size: 0.16rem;
    padding-left: 0.38rem;
    color: #f5bd22;
    padding-right: 0.2rem;
  }
  .member img:first-child{
    position: absolute;
    width: 0.43rem;
    margin-left: -0.42rem;
    margin-top: -0.1rem;
  }

</style>

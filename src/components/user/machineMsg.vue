<template>
  <div class="machine-msg">
    <!--<img src="../../../static/img/productImg-1-s.png" class="img-left">-->
    <img :src="devAvatar" class="img-left">
    <!--<img :src="machineMsg.devAmount" class="img-left">-->
    <div class="machineState">
      <div class="machineState-1">启动单价: <span>{{machineMsg.devCoin}}币/次</span></div>
      <div class="machineState-2">当前设备: <span>{{machineMsg.devName}}</span></div>
      <div class="machineState-3">平均日投: <span>{{machineMsg.devAmount}}币</span></div>
      <div class="machineState-4">好评率: <span>{{machineMsg.devPraise*100}}%</span></div>
    </div>
    <router-link :to="{path:'/productdetail',query:{machineId:devId}}">
      <div class="getMoreMsg">了解更多详情>></div>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ['machineMsg'],
    data() {
      return {
        devId: this.$route.params.machineId
      }
    },
    mounted() {
    },
    computed: {
      devAvatar() {
        // return  'http://1/' + this.machineMsg.devAvatar
        return 'http://zfb.hzhltec.com' + this.machineMsg.devAvatar
      }
    }
  }
</script>

<style scoped>
  .machine-msg {
    position: relative;
    margin-top: 0.2rem;
    height: 2.1rem;
    width: 100%;
    background-color: #fff;
    padding-left: 0.24rem;
    padding-right: 0.34rem;
  }

  .img-left {
    float: left;
    height: 2.1rem;
    width: 2.1rem;
  }

  .machineState {
    position: absolute;
    top: 0.37rem;
    left: 2.5rem;
  }

  .machineState-1 {
    font-size: 0.32rem;
    color: #000;
    line-height: 0.4rem;
  }

  .machineState-1 span {
    color: #c21e1e;
  }

  .machineState-2 {
    font-size: 0.28rem;
    color: #7c7b7b;
    line-height: 0.5rem;
  }

  .machineState-3 {
    font-size: 0.24rem;
    color: #c8c7c7;
    line-height: 0.3rem;
  }

  .machineState-4 {
    font-size: 0.20rem;
    color: #c9c8c8;
    line-height: 0.3rem;
  }

  .getMoreMsg {
    position: absolute;
    right: 0.24rem;
    top: 1.5rem;
    font-size: 0.25rem;
    color: #0ea3ff;
  }

</style>

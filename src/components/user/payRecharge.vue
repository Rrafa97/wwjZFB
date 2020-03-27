<template>
  <div class="bc">

    <div class="choose-head" v-if="coin==0">
      请选择充值金额
    </div>
    <div class="choose-tip"  v-if="coin==0">（先充值后投币，充值到余额长期有效）</div>
    <div  v-if="coin==0" v-for="item in pack" class="choose-box" @click="payMonStart(item.packageId)">
      <span>{{item.packagePrice}} 元</span>
      <span>{{item.packageCurrency}} 币</span>
    </div>
    <div class="choose-head" v-if="coin>0">
      点击下方按钮进行投币
    </div>
    <div  class="choose-box" style="width: 3.5rem; height: 2rem; margin-left: 1.9rem; line-height: 1.3rem"  v-if="coin>0" @click="payStart(1)" >
      <span>投 1 币</span>
    </div>
    <div class="choose-tip tip2">充值不退.可分次投到游戏机,长期有效.</div>
  </div>
</template>
<script>
  import {MessageBox, Toast} from 'mint-ui';
  import {DEVONLINE} from '@/api/request'
  import {getCookie} from "../../util/util";

  export default {
    name: "payRecharge",
    props: ['pack','coin'],
    methods: {
      payStart: function (price) {
        // if (/MicroMessenger/.test(window.navigator.userAgent)) {
        DEVONLINE(getCookie('machineId')).then(res => {
          if (res.data.code === 200) {
            this.$emit("onStart", price)
          } else {
            Toast('当前设备不在线')
            // MessageBox.confirm('当前设备不在线，是否充值？').then(action => {
            //   this.$emit("onStart", price)
            // });
          }
        })
        // } else {
        //   Toast('支付宝未开发该功能，请前往微信使用')
        // }
      },
      payMonStart: function (packageId) {
        DEVONLINE(getCookie('machineId')).then(res => {
          if (res.data.code === 200) {
            this.$emit("payMon", packageId)
          } else {
            Toast('当前设备不在线')
            // MessageBox.confirm('当前设备不在线，是否充值？').then(action => {
            //   this.$emit("payMon", packageId)
            // });
          }
        })
      }
    }
  }
</script>
<style scoped>
  .bc {
    width: 7.5rem;
  }

  .choose-head {
    font-size: 0.4rem;
    color: #333;
    width: 100%;
    text-align: center;
    margin-bottom: 0.3rem;
    padding-top: 0.3rem;
  }

  .choose-tip {
    font-size: 0.28rem;
    font-weight: bold;
    color: red;
    width: 100%;
    text-align: center;
    margin-bottom: 0.3rem;

  }

  .choose-box {
    display: inline-block;
    background: url("../../assets/img/choose-box.png") no-repeat;
    background-size: cover;
    width: 2.45rem;
    height: 1.43rem;
    color: #939393;
    font-size: 0.38rem;
    text-align: center;
    line-height: 0.38rem;
    padding-top: 0.25rem;
  }


  .choose-box span {
    display: block;
  }
  .choose-box:active {
    display: inline-block;
    background: url("../../assets/img/choose-box1.png") no-repeat;
    background-size: cover;
    width: 2.45rem;
    height: 1.43rem;
    color: #666;
    font-size: 0.38rem;
    text-align: center;
    line-height: 0.38rem;
    padding-top: 0.25rem;
  }
  .tip2{
    height: 2.8rem;
    font-size: 0.4rem;
    text-indent: 1em;
    padding: 0.3rem 0.1rem;
    line-height: 1rem;
    text-align: left;
    color: #26a2ff;
  }

</style>

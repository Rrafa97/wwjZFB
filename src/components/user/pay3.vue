<template>
  <div class="bc">
    <div class="choose-head">
      请选择投币金额
    </div>
    <div class="choose-tip">（投币一概不存不退，只能在本机使用，请合理投币）</div>
    <div v-for="item in pack" class="choose-box" @click="payStart(item.packagePrice)">
      <span>{{item.packagePrice}} 元</span>
      <span>{{item.packageCurrency}} 币</span>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Toast} from 'mint-ui';
  import {DEVONLINE} from '@/api/request'
  import {getCookie} from "../../util/util";

  export default {
    name: "pay2",
    props: ['pack'],
    methods: {
      payStart: function (price) {
        // if (/MicroMessenger/.test(window.navigator.userAgent)) {
        DEVONLINE(getCookie('machineId')).then(res => {
          if (res.data.code === 200) {
            this.$emit("onStart", price)
          } else {
            MessageBox.confirm('当前设备不在线，是否充值？').then(action => {
              this.$emit("onStart", price)
            });
          }
        })
        // } else {
        //   Toast('支付宝未开发该功能，请前往微信使用')
        // }
      }
    }
  }
</script>

<style scoped>
  .bc {
    width: 7.5rem;
    height: 5.4rem;
    background-color: #fff;
    margin-top: 0.2rem;
    padding-top: 0.6rem;
    font-size: 0;
  }

  .choose-head {
    font-size: 0.4rem;
    color: #333;
    width: 100%;
    text-align: center;
    margin-bottom: 0.3rem;
  }

  .choose-tip {
    font-size: 0.3rem;
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

  .choose-box:hover {
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

</style>

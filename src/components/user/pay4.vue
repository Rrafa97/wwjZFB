<template>
  <div class="bc">
    <div class="choose-head">
      请选择支付金额
    </div>
    <div class="choose-tip">（投币一概不存不退，只能在本机使用，请合理投币）</div>
    <div class="choose-box" @click="payStart(1)">1元</div>
    <div class="choose-box" @click="payStart(2)">2元</div>
    <div class="choose-box" @click="payStart(3)">3元</div>
    <div class="choose-box" @click="payStart(4)">4元</div>
    <div class="choose-box" @click="payStart(5)">5元</div>
    <div class="choose-box" @click="payStart(6)">6元</div>
    <div class="choose-box" @click="payStart(7)">7元</div>
    <div class="choose-box" @click="payStart(8)">8元</div>
    <div class="choose-box" @click="payStart(9)">9元</div>
  </div>
</template>

<script>
  import { MessageBox} from 'mint-ui';
  import {DEVONLINE} from '@/api/request'
  import {getCookie} from "../../util/util";
  export default {
    name: "pay4",
    data() {
      return {
      }
    },
    methods: {
      payStart: function (coin) {
        DEVONLINE(getCookie('machineId')).then(res => {
          if (res.data.code === 200) {
            this.$emit("onStart", coin)
          } else {
            MessageBox.confirm('当前设备不在线，是否充值？').then(action => {
              this.$emit("onStart", coin)
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .bc {
    width: 7.5rem;
    height: 7.4rem;
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
    margin-bottom: 0.6rem;
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
    color: #30d7f2;
    font-size: 0.48rem;
    text-align: center;
    line-height: 1.43rem;
  }
</style>

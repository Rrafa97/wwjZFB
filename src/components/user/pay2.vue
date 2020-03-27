<template>
  <div class="bc">
    <div class="choose-head">
      请选择投币金额
    </div>
    <div class="choose-tip">（投币一概不存不退，只能在本机使用，请合理投币）</div>
    <div class="choose-box" @click="payStart(10)">10元</div>
    <div class="choose-box" @click="payStart(20)">20元</div>
    <div class="choose-box" @click="payStart(50)">50元</div>
    <div class="choose-box" @click="payStart(100)">100元</div>
    <div class="choose-box" @click="payStart(150)">150元</div>
    <div class="choose-box" @click="payStart(200)">200元</div>
  </div>
</template>

<script>
  import { MessageBox} from 'mint-ui';
  import {DEVONLINE} from '@/api/request'
  import {getCookie} from "../../util/util";
  export default {
    name: "pay2",
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

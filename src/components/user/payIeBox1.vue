<template>
  <div class="bc">
    <div class="pay-coin">
      <div class="choose-head">投币区</div>
      <div class="choose-tip" v-if="coin==0">（投币一概不存不退,只能在本机使用,请合理投币）</div>
      <div
        v-for="item in pack"
        class="choose-box"
        v-if="coin==0"
        @click="payStart(item.packagePrice)"
      >
        <span>{{item.packagePrice}} 元</span>
        <span>{{item.packageCurrency}} 币</span>
      </div>
      <div class="choose-head" v-if="coin>0||rentstate">点击下方按钮进行投币</div>
      <div
        class="choose-box"
        style="width: 3.5rem; height: 2rem; margin-left: 1.9rem; line-height: 1.3rem"
        v-if="coin>0||rentstate==true"
        @click="payStart(1)"
      >
        <span>投 1 币</span>
      </div>
    </div>
    <div class="pay-monthly">
      <div class="choose-head">VIP套餐/活动专区</div>
      <div class="choose-tip">（充值到余额,预充不退.可分次投到游戏机,长期有效.）</div>
      <div v-for="item in packMon" class="choose-box" @click="payMonStart(item.packageId)">
        <span>{{item.packagePrice}} 元</span>
        <span>{{item.packageCurrency}} 币</span>
      </div>
    </div>
  </div>
  <!--<div class="line">-->

  <!--</div>-->

  <!--<div class="choose-head" style="padding-top: 0.6rem;">-->
  <!--套餐/活动专区-->
  <!--</div>-->
  <!--<div class="choose-tip">（预充不退，用完为止。）</div>-->
  <!--<div v-for="item in packMon" class="choose-box" @click="payMonStart(item.packageId)">-->
  <!--<span>{{item.packagePrice}} 元</span>-->
  <!--<span>{{item.packageCurrency}} 币</span>-->
  <!--</div>-->
</template>

<script>
  import {MessageBox, Toast} from "mint-ui";
  import {DEVONLINE, checkDev, checkUser} from "@/api/request";
  import {getCookie} from "../../util/util";

  export default {
    name: "pay2",
    props: ["pack", "packMon", "coin"],
    data: {
      machineId: getCookie("machineId"),
      uid: getCookie("mapptUser"),
      rentstate_: false
    },
    mounted() {
      checkDev(this.machineId).then(res => {
        if(res.data.code === 201) {
          checkUser(this.uid).then(res_ => {
            if(res_.data.code === 201){
              if(res_data.msg === this.machineId) {
                this.rentstate_ = true
              }
            }
          })
        } 
      })
    },
    methods: {
      payStart: function (price) {
        // if (/MicroMessenger/.test(window.navigator.userAgent)) {
        DEVONLINE(getCookie("machineId")).then(res => {
          if (res.data.code === 200) {
            this.$emit("onStart", price);
          } else {
            Toast("当前设备不在线");
            // MessageBox.confirm('当前设备不在线，是否充值？').then(action => {
            //   this.$emit("onStart", price)
            // });
          }
        });
        // } else {
        //   Toast('支付宝未开发该功能，请前往微信使用')
        // }
      },
      payMonStart: function (packageId) {
        DEVONLINE(getCookie("machineId")).then(res => {
          if (res.data.code === 200) {
            // 0("payMon", packageId)
            this.$emit("payMon", packageId);
          } else {
            Toast("当前设备不在线");
            // MessageBox.confirm('当前设备不在线，是否充值？').then(action => {
            //   this.$emit("payMon", packageId)
            // });
          }
        });
      }
    }
  };
</script>

<style scoped>
  .bc {
    width: 7.5rem;
  }

  .pay-coin {
    width: 7.5rem;
    /*height: 5.4rem;*/
    margin-top: 0.2rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    font-size: 0;
    background-color: #fff;
  }

  .pay-monthly {
    width: 7.5rem;
    /*height: 3rem;*/
    background-color: #0ea3ff47;
    margin-top: 0.2rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
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
</style>

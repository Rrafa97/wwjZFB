<template>
  <div v-bind:class="[height>700?'foot-b':'foot']">
    <div class="foot-img-box">
      <router-link to="/FAQ">
        <img src="../../assets/img/FAQ.png" />
        <br />
        <span>常见问题</span>
      </router-link>
    </div>
    <div @click class="foot-chongzhi">
      加盟/招商/合作热线：
      <a style=" color: red;" :href="'tel:' +joinPhone">{{joinPhone}}</a> 微信同号
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="Pay-package">
        <div @click="onStart" class="Pay-package-head">
          <span>花费{{devCoin}}元</span>
          <span>启动设备</span>
        </div>
        <div class="Pay-package-num" v-for="data in packageMsg" @click="parentPay(data.packageId)">
          <p class="useCoin">{{data.packagePrice}}元</p>
          <p>{{data.packageCurrency}}个币</p>
        </div>
        <div class="botton-desc">
          充值成功后无法退回
          <br />如有问题
          <router-link to="/follow">
            <span>关注公众号</span>
          </router-link>联系客服
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Toast, Popup, Indicator, MessageBox } from "mint-ui";
import { DEVONLINE } from "@/api/request";

export default {
  name: "consumerPart",
  props: ["packageMsg", "uid", "machineId", "devCoin", "machineType", "height"],
  data() {
    return {
      popupVisible: false,
      joinPhone: "15968845047"
    };
  },
  created() {
    this.$http
      .post(
        "/list/wwj.json",
        { cmd: "AGENTDESC", machineId: this.machineId },
        { emulateJSON: true }
      )
      .then(
        function(res) {
          if (res.body.code === 200) {
            this.joinPhone = res.body.joinPhone;
          }
        },
        function(res) {
          // 处理失败的结果
          this.joinPhone = "15968845047";
        }
      );
  },
  methods: {
    parentPay: function(packageId) {
      this.popupVisible = false;
      DEVONLINE(this.machineId).then(res => {
        if (res.data.code === 200) {
          this.$emit("pay", packageId);
        } else {
          MessageBox.confirm("当前设备不在线，是否充值？").then(action => {
            this.$emit("pay", packageId);
          });
        }
      });
    },
    onStart: function() {
      this.popupVisible = false;
      this.$emit("payStart");
    },
    showCut: function(data) {
      let cut = data.coinVip - data.coin;
      return cut;
    },
    payMoney: function() {
      if (/MicroMessenger/.test(window.navigator.userAgent)) {
        Toast("该功能未开放,直接选择金额投币");
      } else {
        this.popupVisible = true;
      }
    }
  }
};
</script>

<style scoped>
.foot {
  /*position: absolute;*/
  height: 1rem;
  width: 7.5rem;
  bottom: 0;
  line-height: 1rem;
  color: #fff;
  font-size: 0;
  margin-top: 0.3rem;
}
.foot-b {
  position: absolute;
  height: 1rem;
  width: 7.5rem;
  bottom: 0;
  line-height: 1rem;
  color: #fff;
  font-size: 0;
  margin-top: 0.3rem;
}

.foot-img-box {
  float: left;
  width: 1.25rem;
  height: 1rem;
  background-color: #fcff63;
  font-size: 0;
  text-align: center;
  line-height: 0.45rem;
}

.foot-img-box img {
  margin-top: 0.07rem;
  height: 0.44rem;
}

.foot-img-box span {
  width: 100%;
  margin: 0 auto;
  font-size: 0.23rem;
  color: red;
}

.foot-chongzhi {
  display: inline-block;
  vertical-align: top;
  background-color: #fcff63;
  height: 1rem;
  /*text-align: center;*/
  width: 6.25rem;
  font-size: 0.28rem;
  font-weight: bold;
  color: red;
}

.Pay-package {
  height: 9.37rem;
  width: 7.5rem;
  background-color: #fff;
  z-index: 99;
  text-align: left;
  padding-left: 0.4rem;
}

.Pay-package-head {
  background: url("../../assets/img/startImg.png");
  background-size: cover;
  margin: 0 auto;
  margin-top: 0.76rem;
  margin-bottom: 0.4rem;
  width: 2.71rem;
  height: 2.71rem;
  color: #fff;
  text-align: center;
  padding-top: 1rem;
}

.Pay-package-head span {
  display: block;
  font-size: 0.32rem;
  line-height: 0.34rem;
  letter-spacing: 0.15rem;
}

.Pay-package-num {
  position: relative;
  display: inline-block;
  width: 2.03rem;
  height: 1.14rem;
  background: url("../../assets/img/packageBtn.png");
  margin: 0.14rem;
  text-align: center;
  background-size: cover;
}

.coin-Vip {
  position: absolute;
  width: 0.87rem;
  height: 0.77rem;
  left: 0.08rem;
  top: 0.02rem;
  background: url("../../assets/img/coinVip.png");
  background-size: cover;
  color: #fff;
  font-size: 0.16rem;
  line-height: 0.22rem;
  text-align: left;
  padding-left: 0.05rem;
}

.useCoin {
  font-size: 0.32rem;
  color: #f2c230;
  top: 0.1rem;
  z-index: 9;
  line-height: 0.8rem !important;
}

.Pay-package-num p:last-child {
  font-size: 0.28rem;
  color: #f2c230;
  line-height: 0rem;
}

.botton-desc {
  position: absolute;
  bottom: 0.88rem;
  width: 100%;
  text-align: center;
  font-size: 0.24rem;
  line-height: 0.32rem;
  color: #999999;
}

.botton-desc span {
  color: #2088e9;
}
</style>

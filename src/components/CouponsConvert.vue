<template>
  <div @focus="getFocus">
    <div class="coupons">
      <div class="coupons-header">
        <div class="coupons-header-usermsg">
          <img :src="usermsgIcon" alt width="70px" height="70px" />
          <div class="coupons-header-usermsg-userKm">
            <p class="coupons-header-usermsg-userNickName">{{userMsgNickName}}</p>
            <p>{{uid}}</p>
          </div>
        </div>
        <div class="coupons-header-userConponsTimes">
          <p class="coupons-header-userConponsTimes-userCouponsText1">{{coin}}</p>
          <p>{{userCouponsText2}}</p>
        </div>
      </div>
      <div class="coupons-body">
        <span class="coupons-title-h3">券码兑币</span>
        <span>领取成功后游戏币将会存放到个人账户中</span>
        <input
          type="text"
          name
          id="couponsId"
          class="coupons-body-input"
          placeholder="请输入兑换码"
          v-model="couponsId"
          @focus="getFocus"
        />
        <button class="coupons-body-button" id="coupons-body-button">立即兑换</button>
      </div>
      <div class="coupons-footer">
        <span class="coupons-footer-title-span">使用方法</span>
        <div class="coupons-footer-ul-li">
          <ul class="coupons-footer-ul">
            <li class="coupons-footer-ul-img-text-setting-flex">
              <!-- <ion-icon name="create"></ion-icon> -->
              <img src="../assets/img/create_1.png" alt="" class="ion-icon">
              <p class="coupons-use-ban-nowrap">输入券码兑换</p>
            </li>
            <li class="coupons-footer-ul-img-text-setting-flex">
              <!-- <ion-icon name="arrow-forward" class="ion-icon-right"></ion-icon> -->
              <img src="../assets/img/from_to.png" alt="" class="ion-icon" id="ion-icon-right">
            </li>
            <li class="coupons-footer-ul-img-text-setting-flex">
              <!-- <ion-icon name="camera" id="coupons-use-cmp" class="coupons-footer-ul-li-animation"></ion-icon> -->
              <img src="../assets/img/sqcant_get.png" alt="" id="coupons-use-cmp" class="coupons-footer-ul-li-animation ion-icon">
              <p class="coupons-use-ban-nowrap">立即扫码使用</p>
            </li>
          </ul>
        </div>
        <span>长按二维码关注公众号</span>
        <img src="../assets/logoSq.jpg" class="coupons-footer-img" alt />
      </div>
    </div>
    <div id="mask">
      <div
        class="coupon coupon-wave-left coupon-wave-right coupon-blue-gradient"
        id="coupons-display"
      >
        <div class="coupon-info coupon-info-right-dashed">
          <div class="coupon-store">兑换成功！</div>
          <div class="coupon-price">
            {{value}}
            <span>游戏币</span>
          </div>
          <div class="coupon-description">使用方法</div>
          <div>
            <span>点击右方扫描二维码立即使用，点击空白处关闭</span>
          </div>
        </div>
        <div class="coupon-get">
          <div class="coupon-desc" id="coupon-desc-use" onClick="event.cancelBubble = true">立即使用</div>
          <!-- <div class="coupon-expiry-date">2018.12.01<br />2018.12.12</div> -->
        </div>
      </div>
    </div>
    <div id="mask-tips">{{Tips}}</div>
  </div>
</template>

<script>
import { personInfo, WXCONFIG, getCoinByCoupon } from "@/api/request";
import { getCookie, setCookie } from "@/util/util";
import { Toast, MessageBox } from "mint-ui";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      uid: getCookie("mapptUser"),
      usermsgIcon: "",
      userMsgNickName: "",
      coin: 0,
      userCouponsText2: "剩余币数",
      couponsId: "",
      code: "",
      Tips: "",
      value: 0
    };
  },
  created() {
    // this.getWxOpenId()
    console.warn("请使用微信客户端打开");
    if (/MicroMessenger/.test(window.navigator.userAgent)) {
      console.log(wx);
      WXCONFIG().then(response => {
        if (response.data.code === 200) {
          // console.log(response)
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: "wx1f4ed91c7207f884", // 必填，公众号的唯一标识.
            timestamp: response.data.data[0].timestamp, // 必填，生成签名的时间戳
            nonceStr: response.data.data[0].nonceStr, // 必填，生成签名的随机串
            signature: response.data.data[0].signature, // 必填，签名，见附录1
            jsApiList: ["chooseWXPay", "scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      });
    }
  },
  mounted() {
    this.getUserMsg();
    var maskStateClose = document.getElementById("mask");
    var buttonGet1 = document.getElementById("coupons-body-button");
    console.log(this.uid);
    buttonGet1.onclick = () => {
      // if (this.couponsId == 111) {
      //     console.log(this.couponsId)
      //     maskState.style.display = "flex"
      // }
      //   console.log(this.maskState);
      this.conversionCode(this.couponsId, this.uid);
      console.log("券码查询中...");
      // document.getElementById("mask").style.display = "flex"
    };
    maskStateClose.onclick = () => {
      let mo = function(e) {
        e.preventDefault();
      };
      document.getElementById("mask").style.display = "none";
      // document.body.style.overflow = ""; //出现滚动条
      // document.removeEventListener("touchmove", mo, { passive: false });
    };
    history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", function() {
      history.pushState(null, null, window.location.href);
    });
    document.getElementById("coupons-display").onclick = event => {
      var e = window.event || event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    };
    document.getElementById("coupon-desc-use").onclick = () => {
      wx.scanQRCode({
        desc: "scanQRCode desc",
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        }
      });
    };
    document.getElementById("coupons-use-cmp").onclick = () => {
      wx.scanQRCode({
        desc: "scanQRCode desc",
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        }
      });
    };
    $("input").blur(function() {
      setTimeout(function() {
        var scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    });
    // this.pushHistory();
    // window.addEventListener(
    //   "popstate",
    //   function(e) {
    //     wx.closeWindow();
    //     // window.close();
    //   },
    //   false
    // );
    //  if (window.location.hash == "") {
    //     history.pushState("change", '', "#pageone");
    //     state = "change"
    // }
    //
    // window.onpopstate = function (e) {
    //
    //
    //         if (state == "confirm") {
    //             history.pushState("change", '', "#pageone");
    //             state = "change";
    //             mui.closePopup();
    //             return;
    //         }
    //         history.pushState("confirm", '', "#pageone");
    //         state = "confirm";
    //         mui.confirm("是否退出编辑？", "", ["否", "是"], function (e) {
    //             if (e.index == 0) {
    //                 history.replaceState("change", '', "#pageone");
    //                 state = "change";
    //
    //             }
    //             else {
    //                 history.go(-2)
    //             }
    //
    //         }, "div");
    //
    //      }
  },
  updated() {},
  destroyed() {},
  methods: {
    //获取access_token
    // getWxCode() {
    //   var getWxOpedIdUrl =
    //     "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    //     this.wxCode +
    //     "&redirect_uri=" +
    //     this.redUrl +
    //     "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
    //   window.open(getWxOpedIdUrl);
    //   var str = location.href;
    //   this.code = str.substring(
    //     str.indexOf("code=") + 5,
    //     str.indexOf("&state=")
    //   );
    // },
    //换取userMsg
    getUserMsg() {
      //用户信息
      this.$http
        .post(
          "/list/wwj.json",
          { cmd: "PERSONMSG", uid: this.uid },
          { emulateJSON: true }
        )
        .then(
          function(res) {
            if (res.body.code == 200) {
              this.userMsgNickName = res.body.nickName;
              this.usermsgIcon = res.body.avatar;
              this.coin = res.body.coin;
            }
          },
          function(res) {}
        );
      // personInfo(this.uid).then(response => {
      //   if (response.data.code === 200) {
      //     this.usermsgIcon = response.data.userAvatar;
      //     this.coin = response.data.userCoin;
      //   }
      // });
    },
    //用兑换码和uid获取状态
    conversionCode(couponsId, uid) {
      let mo = function(e) {
        e.preventDefault();
      };
      event.stopPropagation();
      var reqCouponsIdState = true;
      if (this.couponsId === "") {
        this.tipsMassage("请输入兑换码");
      } else {
        getCoinByCoupon(this.uid, this.couponsId).then(
          res => {
            console.log(res);
            if (res.data.code == 200) {
              this.coin = Number(this.coin) + Number(res.data.value);
              this.value = res.data.value;
              document.getElementById("mask").style.display = "flex";
              // document.body.style.overflow = "hidden";
              // document.addEventListener("touchmove", mo, { passive: false }); //禁止页面滑动
            } else {
              this.tipsMassage(res.data.msg);
            }
          },
          function(res) {}
        );
      }
    },
    tipsMassage(message) {
      let maskCheck = document.getElementById("mask-tips");
      this.Tips = message;
      maskCheck.style.display = "flex";
      maskCheck.style.transition = "1s";
      setTimeout(() => {
        maskCheck.style.display = "none";
      }, 3000);
    },
    //使用pushState增加一个本页的url,代表本页
    //  getFocus() {
    //   document.getElementsByTagName("input").on("blur", function() {
    //     window.scroll(0, 0);
    //   });
    // },
    getFocus() {
      $("input,textarea,div").on("blur", function() {
        window.scroll(0, 0);
      });
    }
  }
};
</script>

<style scoped>
[contenteditable="true"],
input,
textarea {
  -webkit-user-select: auto !important;
  -khtml-user-select: auto !important;
  -moz-user-select: auto !important;
  -ms-user-select: auto !important;
  -o-user-select: auto !important;
  user-select: auto !important;
}
.coupons {
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 0.3rem;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
}

.coupons-header {
  height: 20vh;
  background: #6c5ce7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #fff;
  padding: 15px;
  font-size: 0.3rem;
}

.coupons-header-usermsg {
  display: flex;
  flex-direction: row;
}

.coupons-header-usermsg img {
  border-radius: 50%;
}

.coupons-header-usermsg-userKm {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.coupons-footer-img {
  margin-top: 10px;
  /* border: 5px solid cyan; */
  padding: 10px;
  /* width: 60%; */
}

.coupons-header-usermsg-userKm p {
  line-height: 25px;
}

.coupons-header-usermsg-userNickName {
  font-size: 0.5rem;
}

.coupons-header-userConponsTimes {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;
  right: 8vw;
}

.coupons-header-userConponsTimes-userCouponsText1 {
  font-size: 20px;
  margin: 10px;
}

.coupons-body {
  height: 30%;
  width: 80%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  left: 10%;
  position: relative;
  top: -0.3rem;
  z-index: 5;
  color: #636e72;
  border-radius: 10px;
  box-shadow: 0 0 20px 10px rgba(27, 21, 21, 0.2);
}

.coupons-body span {
  margin: 10px;
}

.coupons-title-h3 {
  font-size: 0.5rem;
}

.coupons-body-input {
  border-left: 0;
  border-right: 0;
  border-top: 0;
  height: 50px;
  width: 90%;
  font-size: 1.2em;
  outline: none;
  -webkit-overflow-scrolling: touch;
}

.coupons-body-button {
  width: 80%;
  height: 40px;
  margin: 20px;
  border-right: 20px;
  border: 0;
  color: #fff;
  background: linear-gradient(-45deg, #dbc86d, #f4d497);
  outline: none;
  box-shadow: 0 0 5px 3px rgba(27, 21, 21, 0.1);
  transition: 0.1s;
  letter-spacing: 5px;
  font-size: 0.4rem;
}

.coupons-body-button:active {
  box-shadow: 0 0 1px 1px rgba(27, 21, 21, 0.1);
}

.coupons-footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.coupons-footer-title-span {
  font-size: 1.3em;
  padding: 0 10px;
  color: #b2bec3;
  border-left: 5px solid #d83526;
  border-right: 5px solid #d83526;
}

.coupons-footer-ul-li {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 0.25rem;
}

.coupons-footer-ul-li-animation {
  animation: coupons-footer-ul-li-animation 3s ease-in-out 0s infinite;
}

@keyframes coupons-footer-ul-li-animation {
  0% {
    transform: scaleX(1);
  }
  8% {
    transform: translateY(-20%);
  }
  10% {
    transform: translateY(0);
  }
  15% {
    transform: translateY(-10%);
  }
  20% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-5%);
  }
  30% {
    transform: translateY(0);
  }
  40% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(25deg);
  }
  63% {
    transform: rotate(-25deg);
  }
  66% {
    transform: rotate(10deg);
  }
  69% {
    transform: rotate(-10deg);
  }
  72% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  78% {
    transform: rotate(4deg);
  }
  83% {
    transform: rotate(-4deg);
  }
  86% {
    transform: rotate(2deg);
  }
  90% {
    transform: rotate(-2deg);
  }
  93% {
    transform: rotate(0);
  }
}

.coupons-footer-ul {
  color: #b2bec3;
  line-height: 1.5em;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  list-style: none;
}

.coupons-footer-img {
  /* border: 5px solid cyan; */
  padding: 2px;
  width: 4rem;
  height: 4rem;
}

#mask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  /* background: rgba(0, 0, 0, 0.7); */
  border: 0;
  z-index: 999;
  display: none;
  justify-content: center;
  align-items: center;
  font-size: 0.3rem;
  color: #fff;
  transition: 0.3s;
  /* -webkit-overflow-scrolling: touch; */
  animation: coupons-covert-mask-display-animation 0.3s ease-in-out 0s 1;
}

@keyframes coupons-covert-mask-display-animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.7;
  }
}

.coupon {
  display: inline-flex;
  color: white;
  position: relative;
  padding-left: 0.5em;
  padding-right: 0.5em;
  margin: 0.4rem;
  border-top-right-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
  /* overflow: hidden; */
}

.coupon-blue-gradient {
  background-image: linear-gradient(-150deg, #fad390 50%, #f8c291 50%);
}

.coupon-wave-left::before,
.coupon-wave-right::after {
  content: "";
  position: absolute;
  top: 0;
  height: 100%;
  width: 14px;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.9) 4px,
    #fad390 4px,
    transparent 0
  );
  background-size: 14px 14px;
  background-position: 0 2px;
  background-repeat: repeat-y;
  z-index: 1;
  -webkit-overflow-scrolling: touch;
}

.coupon-wave-left::before {
  left: -7px;
}

.coupon-wave-right::after {
  right: -7px;
}

.coupon-info {
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1em;
  padding-bottom: 1.5em;
  position: relative;
  min-width: 1.5em;
}

.coupon-info-right-dashed {
  border-right: 2px dashed white;
}

.coupon-info-right-solid {
  border-right: 2px solid white;
}

.coupon-hole::before,
.coupon-hole::after {
  content: "";
  width: 1em;
  height: 1em;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  right: -0.5em;
}

.coupon-info::before {
  top: -0.5em;
}

.coupon-info::after {
  bottom: -0.5em;
}

.coupon-info > div {
  margin-bottom: 0.2em;
}

.coupon-price {
  font-size: 250%;
  font-weight: bold;
}

.coupon-price > span {
  font-size: 40%;
  margin-left: 0.5rem;
  font-weight: normal;
}

.coupon-get {
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 5em;
  position: relative;
}

.coupon-store {
  font-size: 0.4rem;
  font-weight: bold;
  color: #fd79a8;
}

.coupon-description {
  font-weight: bold;
  color: #fd79a8;
  font-style: italic;
  font-size: 0.34rem;
  line-height: 0.5rem;
}

.coupon-get > .coupon-desc {
  font-size: 150%;
  margin-bottom: 0.5em;
  font-weight: bold;
}

#mask-tips {
  position: absolute;
  left: 10%;
  top: 45%;
  width: 70%;
  height: 10%;
  background: #333;
  border: 0;
  border-radius: 40px;
  z-index: 999;
  display: none;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
  font-size: 0.29rem;
  color: #fff;
  margin: 10px;
  padding: 2px;
  transition: 0.3s;
  animation: coupons-covert-mask-tips-display-animation 0.5s ease-in-out 0s 1;
}

@keyframes coupons-covert-mask-tips-display-animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
}
.ion-icon {
  /* font-size: 50px; */
  height: 1.2rem;
  width: 1.2rem;
  margin: 0.2rem;
  /* margin: 0 15px; */
}
#ion-icon-right {
  /* font-size: 30px; */
  height: 0.5rem;
  /* padding: 20px; */
  width: 0.5rem;
  margin-top: 0.5rem;
}
.coupons-use-ban-nowrap {
  white-space: nowrap;
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
}
.coupons-footer-ul-img-text-setting-flex {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}
</style>

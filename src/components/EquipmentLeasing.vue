<template>
  <div class="leBody-box" id="leBody-box">
    <section>
      <div class="container-fluid">
        <div class="container">
          <div class="row">
            <div class="col-sm-4">
              <div class="card text-center">
                <div class="title">
                  <!-- <i class="fa fa-paper-plane" aria-hidden="true"></i> -->
                  <img src="../assets/logo-w.png" class="fa" alt />
                  <h2>云逸宝娱乐BOX</h2>
                </div>
                <div class="price">
                  <h4>
                    <sup>￥</sup>20
                  </h4>
                </div>
                <div class="option">
                  <ul>
                    <li>
                      <!-- <i class="fa fa-check" aria-hidden="true"></i> -->
                      因租借人原因造成的游戏设备损坏，相关维修费用应当由租借人承担。
                    </li>
                    <li>租赁前应确认设备编号是否和屏幕上的编号一致。</li>
                    <li>租赁时间：20元可租赁24小时。</li>
                  </ul>
                  <span class="span-tips">当前设备： {{machineId}}</span>
                </div>

                <button @chick="this.pay()" id="rentToPayButton_">现在租赁</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="mask">{{Tips}}</div>
    <div id="theTipsMask"></div>
  </div>
</template>

<script>
import { WXCONFIG, wxRent, aliRent, checkDev, checkUser } from "@/api/request";
import { Toast, MessageBox } from "mint-ui";
import { getCookie, setCookie } from "@/util/util";
import wx from "weixin-js-sdk";

export default {
  data() {
    return {
      Tips: "",
      machineId: getCookie("machineId"),
      uid: getCookie("mapptUser")
    };
  },
  created() {
    //请求微信权限注入
    console.warn("微信权限注入测试");
    console.log(wx);
    if (/MicroMessenger/.test(window.navigator.userAgent)) {
      WXCONFIG().then(response => {
        if (response.data.code === 200) {
          // console.log(response)
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: "wx1f4ed91c7207f884", // 必填，公众号的唯一标识.
            timestamp: response.data.data[0].timestamp, // 必填，生成签名的时间戳
            nonceStr: response.data.data[0].nonceStr, // 必填，生成签名的随机串
            signature: response.data.data[0].signature, // 必填，签名，见附录1
            jsApiList: ["getLocation", "chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      });
    }
  },
  mounted() {
    let theTipsMask = document.getElementById("theTipsMask");
    let app = document.getElementById("leBody-box");
    checkDev(this.machineId).then(response => {
      if (response.data.code === 438) {
        if (response.data.code === 438) {
          app.style.filter = "grayscale(90%)";
          theTipsMask.style.display = "flex"; // this.tipsMassage("设备编号不能为空");
          this.tipsMassage(response.data.msg);
        } else if (response.data.code === 500) {
          // this.tipsMassage("出现异常");
          this.tipsMassage(response.data.msg);
          theTipsMask.style.display = "flex";
        } else if (response.data.code === 201) {
          app.style.filter = "grayscale(90%)"; // this.tipsMassage("当前设备已被租赁");
          this.tipsMassage(response.data.msg);
          theTipsMask.style.display = "flex";
        } else if (response.data.code === 200) {
          console.log("当前设备可以租赁" + response.data.code);
        } else {
          // this.tipsMassage("设备异常");
          this.tipsMassage(response.data.msg);
          theTipsMask.style.display = "flex";
        }
      }
    });
    checkUser(this.uid).then(response => {
      if (response.data.code === 438) {
        // this.tipsMassage("用户编号不能为空");
        this.tipsMassage(response.data.msg);
        theTipsMask.style.display = "flex"; //阻止用户点击按钮
      } else if (response.data.code === 200) {
        if (response.data.msg == this.machineId) {
          app.style.filter = "grayscale(90%)";
          this.tipsMassage("您已租赁当前设备，正前往扫码启动");
          // this.tipsMassage(response.data.msg);
          theTipsMask.style.display = "flex";
          this.$router.push({
            path: "../../page/user" //扫码启动路径
          });
        }
      }
    });
    document.getElementById("rentToPayButton_").onclick = () => {
      if (/MicroMessenger/.test(window.navigator.userAgent)) {
        console.log("wx");
        this.wxPay();
      } else {
        this.aliPay();
        console.log("ali");
      }
    };
    // this.checkState();
  },
  methods: {
    //封装的提示
    tipsMassage(message) {
      var maskCheck = document.getElementById("mask");
      this.Tips = message;
      maskCheck.style.display = "flex";
      setTimeout(() => {
        maskCheck.style.display = "none";
        maskCheck.style.transition = "0.5s";
      }, 3000);
    },

    // 状态检测
    // checkState() {
    //   var theTipsMask = document.getElementById("theTipsMask");
    //   var app = document.getElementById("leBody-box");
    //   checkUser(this.uid).then(response => {
    //     if (response.data.code === 438) {
    //       // this.tipsMassage("用户编号不能为空");
    //       this.tipsMassage(response.data.msg);
    //       theTipsMask.style.display = "flex"; //阻止用户点击按钮
    //     } else if (response.data.code === 200) {
    //       app.style.filter = "grayscale(90%)";
    //       //this.tipsMassage("您已租赁当前设备，正前往扫码启动");
    //       this.tipsMassage(response.data.msg);
    //       theTipsMask.style.display = "flex";
    //       this.$router.push({
    //         path: "../../page/user" //扫码启动路径
    //       });
    //     } else if (response.data.code === 201) {
    //       checkDev(this.machineId).then(response => {
    //         if (response.data.code === 438) {
    //           app.style.filter = "grayscale(90%)";
    //           theTipsMask.style.display = "flex";
    //           // this.tipsMassage("设备编号不能为空");
    //           this.tipsMassage(response.data.msg);
    //         } else if (response.data.code === 500) {
    //           // this.tipsMassage("出现异常");
    //           this.tipsMassage(response.data.msg);
    //           theTipsMask.style.display = "flex";
    //         } else if (response.data.code === 201) {
    //           app.style.filter = "grayscale(90%)";
    //           // this.tipsMassage("当前设备已被租赁");
    //           this.tipsMassage(response.data.msg);
    //           theTipsMask.style.display = "flex";
    //         } else if (response.data.code === 200) {
    //           console.log("当前设备可以租赁" + response.data.code);
    //         } else {
    //           // this.tipsMassage("设备异常");
    //           this.tipsMassage(response.data.msg);
    //           theTipsMask.style.display = "flex";
    //         }
    //       });
    //     }
    //   });
    // },

    // pay() {
    //   if (/MicroMessenger/.test(window.navigator.userAgent)) {
    //     console.log("wx");
    //     wxPay();
    //   } else {
    //     aliPay();
    //     console.log("ali");
    //   }
    // },
    //微信支付
    wxPay() {
      wxRent(this.uid, this.machineId).then(response => {
        if (response.data.code === 200) {
          let msg = JSON.parse(response.data.data);
          let appId = response.data.appId;
          let PAYTimestamp = msg.PAYTimestamp;
          let PAYnonceStr = msg.PAYnonceStr;
          let prepay_id = msg.prepay_id;
          let sign = msg.sign;
          wx.chooseWXPay({
            appId: appId,
            timestamp: PAYTimestamp,
            nonceStr: PAYnonceStr,
            package: prepay_id,
            signType: "MD5",
            paySign: sign,
            success: function(res) {
              Toast("充值成功");
              //_this.reloadMsg();
            },
            fail: function(res) {
              Toast("支付失败，系统异常");
            }
          });
        } else {
          Toast("支付失败");
        }
      });
    },
    aliPay() {
      aliRent(this.uid, this.machineId).then(response => {
        let data = response.data;
        if (response.data.code === 200) {
          ap.tradePay(
            {
              tradeNO: data.data
            },
            function(res) {
              if (res.resultCode == 9000) {
                Toast("充值成功");
                //_this.reloadMsg();
              }
            }
          );
        } else {
          Toast(response.data.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css");
.leBody-box {
  background: linear-gradient(
    -45deg,
    rgba(9, 132, 227, 1),
    rgba(129, 236, 236, 1)
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
section {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 140px 0;
}

.card {
  position: relative;
  max-width: 700px;
  height: auto;
  background: linear-gradient(-45deg, #fe0847, #0984e3);
  border-radius: 20px;
  margin-top: -50px;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
  padding: 50px;
}

.col-sm-4:nth-child(1) .card .title .fa {
  background: linear-gradient(-45deg, #0984e3, #81ecec);
}

.card::before {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 53%;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
  transform: skewY(-5deg);
}

.title .fa {
  color: #fff;
  font-size: 60px;
  width: 80px;
  margin: 10px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  line-height: 100px;
  box-shadow: 0 10px 10px rgba(27, 21, 21, 0.3);
}

@media screen and (max-width: 375px) {
  .card {
    margin-top: -120px;
    padding: 30px;
  }
}

@media screen and (min-width: 700px) {
  .card {
    padding: 60px;
    transition: 0.5s;
  }
  .col-sm-4 {
    display: flex;
    justify-content: center;
    margin-left: 30%;
  }

  .title .fa {
    width: 100px;
    height: 100px;
  }

  .title h2 {
    font-size: 30px;
  }

  .price h4 {
    font-size: 80px;
  }
}

.title h2 {
  position: relative;
  margin: 10px 0 0;
  padding: 0;
  color: #fff;
  font-size: 20px;
  z-index: 2;
}

.price {
  position: relative;
  z-index: 2;
}

.price h4 {
  margin: 0;
  padding: 20px 0;
  color: #fff;
  font-size: 50px;
}

.option {
  position: relative;
  z-index: 2;
}

.option ul {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
}

.option ul li {
  margin: 0 0 10px;
  padding: 0;
  color: #fff;
  font-size: 12px;
}

.card button {
  position: relative;
  z-index: 2;
  background: #fff;
  color: #333;
  width: 150px;
  height: 40px;
  display: block;
  text-align: center;
  margin: 20px auto 0;
  outline: none;
  border: 0;
  line-height: 40px;
  border-radius: 40px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}
.card button:hover {
  background: #ecf0f1;
  transform: scaleY(1.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}
.card button:active {
  color: #ecf0f1;
  background: #2c3e50;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.card button:hover {
  text-decoration: none;
}

#mask {
  position: absolute;
  left: 15%;
  top: 25%;
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
  font-size: 1.1em;
  color: #fff;
  margin: 10px;
  padding: 20px;
  transition: 0.3s;
}

#enterCoinInterface {
  position: absolute;
  left: 15%;
  top: 25%;
  width: 70%;
  height: 20%;
  background: #fff;
  border: 0;
  border-radius: 40px;
  z-index: 999;
  display: none;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
  font-size: 1.4em;
  color: #333;
  transition: 0.3s;
}

.span-tips {
  text-align: center;
  font-size: 1.3em;
  color: #fff;
}
#theTipsMask {
  width: 100%;
  height: 100%;
  position: absolute;
  display: none;
  z-index: 9999;
}
</style>

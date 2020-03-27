<template>
  <div :style="{height: fullHeight + 'px'}" class="bg-bk">
    <firstAdvert></firstAdvert>
    <userPart :userMsg=userMsg></userPart>
    <machineMsg v-if="this.machineMsg.devName.indexOf('云逸宝娱乐BOX(酒店)')==-1" :machineMsg=machineMsg :machineId=machineId></machineMsg>
    <machineMsg2 v-else-if="this.machineMsg.devName.indexOf('云逸宝娱乐BOX(酒店)')>-1" :machineMsg=machineMsg :machineId=machineId></machineMsg2>
    <paySec v-if="this.machineMsg.devName.indexOf('夺宝机')>-1" @onStart="onStart"></paySec>
    <payThree v-else-if="this.machineMsg.devName.indexOf('兑币机')>-1" :pack="changePackageMsg"
              @onStart="onStart"></payThree>
    <payIeBox1 v-else-if="this.machineMsg.devName.indexOf('云逸宝娱乐BOX')>-1" :pack="changePackageMsg" :packMon="monPackage"
               :coin=userMsg.userCoin
               @payMon="payMon"
               @onStart="onStart"></payIeBox1>
    <payRecharge v-else-if="this.machineMsg.devName.indexOf('云逸宝游戏机')>-1" :pack="changePackageMsg"
                 :coin=userMsg.userCoin
                 @payMon="payMon" @onStart="onStart">

    </payRecharge>
    <pay4 v-else-if="this.machineMsg.devName.indexOf('售卖机')>-1" :pack="changePackageMsg"
          @onStart="onStart"></pay4>
    <pay v-else :machineMsg=machineMsg :userMsg=userMsg :uid=uid :machineId=machineId @onStart="onStart"></pay>
    <consumerPart @pay="pay" @payStart="payStart" :packageMsg=packageMsg :uid=uid :machineId=machineId
                  :devCoin=machineMsg.devCoin :machineType="machineMsg.devName" :height="fullHeight"></consumerPart>
    <prompt></prompt>


    <mt-popup v-model="popupVisible" position="bottom">
      <div class="Pay-package">
        {{content}}
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import firstAdvert from '../components/loading/advert.vue'
  import advert from '../components/user/advert.vue'
  import userPart from '../components/user/userPart.vue'
  import machineMsg from '../components/user/machineMsg.vue'
  import machineMsg2 from '../components/user/machineMsg2.vue'
  import pay from '../components/user/pay.vue'
  import paySec from '../components/user/pay2.vue'
  import payThree from '../components/user/pay3.vue'
  import payIeBox from '../components/user/payIeBox.vue'
  import payIeBox1 from '../components/user/payIeBox1.vue'
  // import payMonthly from '../components/user/payMonthly.vue'
  import consumerPart from '../components/user/consumerPart.vue'
  import prompt from '../components/user/prompt.vue'
  import pay4 from '../components/user/pay4.vue'
  import payRecharge from '../components/user/payRecharge'
  import {
    personInfo,
    SHOWPACKET,
    getDevState,
    RECCOIN,
    PACKET,
    WXCONFIG,
    PAY,
    PAYMON,
    ALIPAYMON,
    DEVSTAR,
    START,
    WXPAY,
    ALIPAY,
    SHOWMONPACKET,
  } from '@/api/request'
  import {Toast, MessageBox} from 'mint-ui'
  import {getCookie, setCookie} from "../util/util"
  import wx from 'weixin-js-sdk'

  export default {
    components: {
      userPart,
      firstAdvert,
      advert,
      machineMsg,
      machineMsg2,
      pay,
      paySec,
      consumerPart,
      prompt,
      payThree,
      pay4,
      payIeBox,
      payIeBox1,
      payRecharge
    },
    mounted() {
      window.onpopstate = () => {
        if (!this.allowBack) {    //    这个allowBack 是存在vuex里面的变量
          history.go(1)
        }
      };
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
      });
    },
    data() {
      return {
        uid: getCookie('mapptUser'),
        machineId: getCookie('machineId'),
        //这部分为头部信息
        userMsg: {
          // userAvatar:
          //   "https://tfs.alipayobjects.com/images/partner/T1GKJfXnliXXXXXXXX",
          // userCoin: 50
        },
        //中间广告部分
        advertMsg: [],
        //设备信息部分
        machineMsg: {},
        packageMsg: [],
        changePackageMsg: [],
        monPackage: [],
        //获取屏幕高度
        fullHeight: document.documentElement.clientHeight,
        timeOld: 0,
        popupVisible: false,
        content: ""
      }
    },
    created() {

      if (location.href.indexOf('reback') === -1) {
        setCookie("machineId", this.machineId)
      } else {

      }
      this.timeOld = new Date().getTime() - 3000
      // const _this = this
      getDevState(this.machineId).then(response => {
        if (response.data.code === 200) {
          this.machineMsg = response.data.data
        } else {
          Toast(response.data.msg)
        }
      })

      if (/MicroMessenger/.test(window.navigator.userAgent)) {
        WXCONFIG().then(response => {
          if (response.data.code === 200) {
            // console.log(response)
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wx1f4ed91c7207f884', // 必填，公众号的唯一标识.
              timestamp: response.data.data[0].timestamp, // 必填，生成签名的时间戳
              nonceStr: response.data.data[0].nonceStr, // 必填，生成签名的随机串
              signature: response.data.data[0].signature,// 必填，签名，见附录1
              jsApiList: ['getLocation', 'chooseWXPay']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
          }
        })
      }
      personInfo(this.uid).then(response => {
        if (response.data.code === 200) {
          this.userMsg = response.data.data
          let coin;
          coin = response.data.data.userCoin;
          console.log(coin)
          console.log(this.machineMsg.devName)
          let Type = this.machineMsg.devName
          if (Type === undefined) {
            getDevState(this.machineId).then(response => {
              if (response.data.code === 200) {
                this.machineMsg = response.data.data
                console.log( this.machineMsg)
                console.log( response.data.data.devName)
                Type = response.data.data.devName
                console.log( Type)
                if (Type.indexOf('云逸宝游戏机') > -1) {
                  SHOWMONPACKET(this.machineId, 'PAY-MAX').then(response => {
                    if (response.data.code === 200) {
                      this.changePackageMsg = response.data.data
                    } else {
                      Toast(response.data.msg)
                    }
                  })

                } else {
                  SHOWPACKET(this.machineId, coin).then(response => {
                    if (response.data.code === 200) {
                      this.changePackageMsg = response.data.data
                    } else {
                      Toast(response.data.msg)
                    }

                    if (Type.indexOf('云逸宝娱乐BOX') > -1) {
                      SHOWMONPACKET(this.machineId, 'PAY-MON').then(response => {
                        if (response.data.code === 200) {
                          this.monPackage = response.data.data
                        } else {
                          Toast(response.data.msg)
                        }
                      })
                    }
                  })
                }
              } else {
                Toast(response.data.msg)
              }
            })
          }
          console.log(Type)

          if (Type.indexOf('云逸宝游戏机') > -1) {
            SHOWMONPACKET(this.machineId, 'PAY-MAX').then(response => {
              if (response.data.code === 200) {
                this.changePackageMsg = response.data.data
              } else {
                Toast(response.data.msg)
              }
            })

          } else {
            SHOWPACKET(this.machineId, coin).then(response => {
              if (response.data.code === 200) {
                this.changePackageMsg = response.data.data
              } else {
                Toast(response.data.msg)
              }

              if (Type.indexOf('云逸宝娱乐BOX') > -1) {
                SHOWMONPACKET(this.machineId, 'PAY-MON').then(response => {
                  if (response.data.code === 200) {
                    this.monPackage = response.data.data
                  } else {
                    Toast(response.data.msg)
                  }
                })
              }
            })
          }
        } else {
          Toast(response.data.msg)
        }
      })

      console.log(typeof getCookie('nowLatitude'))
    },


    methods: {
      pay(packageId) {
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
          this.wxPay(packageId)
        } else {
          let Type = this.machineMsg.devName
          if (Type.indexOf('夺宝机') > -1) {
            // alert('支付宝该功能未开放，请在微信中打开')
            ALIPAY(that.machineId, payment, count).then(response => {
              let data = response.data;
              if (response.data.code === 200) {
                ap.tradePay({
                  tradeNO: data.data
                }, function (res) {
                  if (res.resultCode == 9000) {
                    Toast('充值成功，请在上方投币区投币');
                    this.reloadMsg();
                  }

                });
              } else {
                Toast(response.data.msg);
              }
            });
          } else if (Type.indexOf('兑币机') > -1) {
            ALIPAY(that.machineId, payment, count).then(response => {
              let data = response.data;
              if (response.data.code === 200) {
                ap.tradePay({
                  tradeNO: data.data
                }, function (res) {
                  if (res.resultCode == 9000) {
                    Toast('正在启动设备');
                    this.reloadMsg();
                  }
                });
              } else {
                Toast(response.data.msg);
              }
            });
          } else {
            ALIPAY(that.machineId, payment, count).then(response => {
              let data = response.data;
              if (response.data.code === 200) {
                ap.tradePay({
                  tradeNO: data.data
                }, function (res) {
                  if (res.resultCode == 9000) {
                    Toast('正在启动设备');
                    this.reloadMsg();
                  }

                });
              } else {
                Toast(response.data.msg);
              }
            });
          }

        }
      },
      wxPay: function (packageId) {
        const _this = this
        PAY(packageId, this.uid).then(response => {
          if (response.data.code === 200) {
            let msg = JSON.parse(response.data.data)
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
              success: function (res) {
                Toast("充值成功，请在上方投币区投币")
                if (_this.machineMsg.devName.indexOf('兑币机') > -1) {
                  _this.changePay(packageId)
                  return
                }
                for (let n in _this.packageMsg) {
                  if (_this.packageMsg[n].packageId === packageId) {
                    _this.userMsg.userCoin += _this.packageMsg[n].packageCurrency
                  }
                }
              },
              fail: function (res) {
                Toast('支付失败，系统异常')
              }
            });
          } else {
            Toast('支付失败')
          }
        })
      },
      payStart: function () {
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
          this.wxStart()
        } else {
          Toast('该功能暂未开放')
        }
      },
      wxStart: function () {
        DEVSTAR(this.uid, this.machineId).then(response => {
          if (response.data.code === 200) {
            let msg = JSON.parse(response.data.data)
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
              success: function (res) {
                this.userMsg.userCoin = 0
                Toast('正在启动设备')
                this.reloadMsg();
              },
              fail: function (res) {
                Toast('支付失败，系统异常')
              }
            });
          } else {
            Toast('设备离线')
          }
        })
      },
      onStart: function (count) {
        let coin = this.userMsg.userCoin - count
        if (count === 0) {
          Toast('点击加号，增加游戏币')
          return
        }
        if (new Date().getTime() - this.timeOld > 3000) {
          this.timeOld = new Date().getTime()
          START(count, this.machineId).then(response => {
            if (response.data.code === 200) {
              Toast('正在启动设备')

              if (coin >= 0) {
                this.userMsg.userCoin = coin
              }
              SHOWPACKET(this.machineId, coin).then(response => {
                if (response.data.code === 200) {
                  this.changePackageMsg = response.data.data
                } else {
                  Toast(response.data.msg)
                }
              })
            } else if (response.data.code === 201) {
              let that = this
              let payment = response.data.payment
              if (/MicroMessenger/.test(window.navigator.userAgent)) {
                console.log(payment);
                console.log(count);
                WXPAY(that.machineId, payment, count).then(response => {
                  if (response.data.code === 200) {
                    let msg = JSON.parse(response.data.data)
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
                      success: function (res) {
                        that.userMsg.userCoin = 0
                        Toast('正在启动设备,剩余游戏币:' + that.userMsg.userCoin)
                        this.reloadMsg();
                      },
                      fail: function (res) {
                        this.reloadMsg();
                        console.log(res);
                        Toast('支付失败，系统异常' + res.errMsg)
                      }
                    });
                  } else {
                    Toast('设备离线')
                  }
                })

              } else {
                ALIPAY(that.machineId, payment, count).then(response => {
                  let data = response.data;
                  if (response.data.code === 200) {
                    ap.tradePay({
                      tradeNO: data.data
                    }, function (res) {
                      if (res.resultCode == 9000) {
                        Toast('正在启动设备');
                        this.reloadMsg();
                      }
                    });
                  } else {
                    Toast(response.data.msg);
                    this.reloadMsg();
                  }
                });
              }
            } else {
              Toast(response.data.msg)
            }
          })
        } else {
          Toast('请您稍后再试')
        }
      },
      changePay: function (packageId) {
        let count = 0
        for (let n in this.packageMsg) {
          if (this.changePackageMsg[n].packageId === packageId) {
            count = this.changePackageMsg[n].packageCurrency
          }
        }
        START(count, this.machineId).then(response => {
          if (response.data.code === 200) {
            Toast('正在兑币')
          } else {
            Toast(response.data.msg)
          }
        })
      },
      payMon(pachageId) {
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
          const _this = this
          PAYMON(pachageId, this.uid).then(response => {
            if (response.data.code === 200) {
              let msg = JSON.parse(response.data.data)
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
                success: function (res) {
                  Toast("充值成功，请在上方投币区投币");
                  _this.reloadMsg();

                },
                fail: function (res) {
                  Toast('支付失败，系统异常')
                }
              });
            } else {
              Toast('支付失败')
            }
          })
        } else {
          const _this = this
          // location.href = "/list/alipay/alipay?packageId=" + packageId + "&userId=" + getCookie('mapptUser') + "&vid=" + this.machineId;
          ALIPAYMON(pachageId, this.uid).then(response => {
            let data = response.data;
            if (response.data.code === 200) {
              ap.tradePay({
                tradeNO: data.data
              }, function (res) {
                if (res.resultCode == 9000) {
                  Toast('充值成功，请在上方投币区投币');
                  _this.reloadMsg();
                }

              });
            } else {
              Toast(response.data.msg);
            }
          });
        }

      }, reloadMsg() {
        const _this = this
        personInfo(_this.uid).then(response => {
          if (response.data.code === 200) {
            this.userMsg = response.data.data
            let coin;
            coin = response.data.data.userCoin;
            console.log(coin)
            SHOWPACKET(_this.machineId, coin).then(response => {
              if (response.data.code === 200) {
                _this.changePackageMsg = response.data.data
              } else {
                Toast(response.data.msg)
              }
            })
          } else {
            Toast(response.data.msg)
          }
        })
      }
    }
  }

</script>
<style scoped>
  .bg-bk {
    background-color: #ebebeb;
    height: 100%;
    overflow-x: scroll;
    position: relative;
  }

</style>

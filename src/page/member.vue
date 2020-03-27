<template>
  <div :style="{height: fullHeight + 'px'}" class="member">
    <div class="member-head">
      <img :src=memberHeadImg>
      <div class="vip-msg">
        <img :src="headImg(0)">
        <div class="vip-span">
          <span class="vip-span-head">{{headMsg(0)}}</span><br>
          <span>{{contentOne(0)}}</span><br>
          <span>{{contentTwo(0)}}</span><br>
        </div>
      </div>
    </div>
    <div class="member-part">
      <div class="member-box">
        <img :src="headImg(1)">
        <div class="member-box-msg">
          <span>{{headMsg(1)}}</span><br>
          <span>{{contentOne(1)}}</span><br>
          <span>{{contentTwo(1)}}</span><br>
        </div>
      </div>
      <div class="member-box">
        <img :src="headImg(2)">
        <div class="member-box-msg">
          <span>{{headMsg(2)}}</span><br>
          <span>{{contentOne(2)}}</span><br>
          <span>{{contentTwo(2)}}</span><br>
        </div>
      </div>
      <div class="member-box">
        <img :src="headImg(3)">
        <div class="member-box-msg">
          <span>{{headMsg(3)}}</span><br>
          <span>{{contentOne(3)}}</span><br>
          <span>{{contentTwo(3)}}</span><br>
        </div>
      </div>
      <div class="member-box">
        <img :src="headImg(4)">
        <div class="member-box-msg">
          <span>{{headMsg(4)}}</span><br>
          <span>{{contentOne(4)}}</span><br>
          <span>{{contentTwo(4)}}</span><br>
        </div>
      </div>
    </div>
    <div class="member-rule">会员规则></div>
    <div class="foot-button" @click="deposit" v-text="isMember?'退 押 金':'成为会员'"></div>
  </div>
</template>

<script>
  import {ADVERTACT, ACTIVITY, DEPOSITPAY, USERINFO, DEVSITBACK, WXCONFIG} from '@/api/request'
  import {Toast} from 'mint-ui'
  import {getCookie} from "../util/util";
  import wx from 'weixin-js-sdk'

  export default {
    name: "member",
    data() {
      return {
        uid: getCookie('mapptUser'),
        memberMsg1: [
          {
            "actContent1": "成为VIP",
            "actContent2": "获取更多权益",
            "actId": 1,
            "actImg": "logo1",
            "actTitle": "缴纳押金"
          }, {
            "actContent1": "多买多送",
            "actContent2": "更加划算",
            "actId": 2,
            "actImg": "logo2",
            "actTitle": "买十送一"
          }, {
            "actContent1": "会员价格更加优惠",
            "actContent2": "更加惊喜",
            "actId": 3,
            "actImg": "logo3",
            "actTitle": "会员专享价"
          },
          {
            "actContent1": "初期会员",
            "actContent2": "仅需50元",
            "actId": 4,
            "actImg": "logo4",
            "actTitle": "今日特价"
          },
          {
            "actContent1": "初期会员",
            "actContent2": "仅需50元",
            "actId": 4,
            "actImg": "logo4",
            "actTitle": "今日特价"
          }
        ],
        memberHeadImg: '',
        fullHeight: document.documentElement.clientHeight,
        isMember: false
      }
    },
    methods: {
      headMsg: function (n) {
        return this.memberMsg1[n].actTitle
      },
      contentOne: function (n) {
        return this.memberMsg1[n].actContent1
      },
      contentTwo: function (n) {
        return this.memberMsg1[n].actContent2
      },
      headImg: function (n) {
        return this.memberMsg1[n].actImg
      },
      deposit: function () {
        if (this.isMember) {
          DEVSITBACK(this.uid).then(response => {
            if (response.data.code === 200) {
              Toast('退押金成功')
              this.isMember = false
              this.$router.push('/user/' + getCookie('machineId'));
            } else if (response.data.code === 201) {
              Toast('退押金成功')
              this.isMember = false
              this.$router.push('/user/' + getCookie('machineId'));
            } else {
              Toast(response.data.msg)
            }
          })
        } else {
          const _this = this
          DEPOSITPAY(_this.uid).then(response => {
            if (response.data.code === 200) {
              const json = JSON.parse(response.data.data)
              let appId = json.appId;
              let PAYTimestamp = json.PAYTimestamp;
              let PAYnonceStr = json.PAYnonceStr;
              let prepay_id = json.prepay_id;
              let sign = json.sign;
              wx.chooseWXPay({
                appId: appId,
                timestamp: PAYTimestamp,
                nonceStr: PAYnonceStr,
                package: prepay_id,
                signType: "MD5",
                paySign: sign,
                success: function (res) {
                  Toast("恭喜您成为会员")
                  _this.isMember = true
                  _this.$router.push('/user/' + getCookie('machineId'));
                },
                fail: function (res) {
                  Toast('支付失败，系统异常')
                }
              })
            } else if (response.data.code === 201) {
              Toast('已经成为会员')
              _this.isMember = true
              _this.$router.push('/user/' + getCookie('machineId'));
            } else {
              Toast(response.data.msg)
            }
          })
        }
      }
    }
    ,
    created() {
      WXCONFIG().then(response => {
        if (response.data.code === 200) {
          console.log(response)
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
      ADVERTACT().then(response => {
        if (response.data) {
          this.memberHeadImg = response.data.advertExUrl
        } else {
          Toast(response.data.msg)
        }
      })
      ACTIVITY().then(response => {
        if (response.data) {
          this.memberMsg1 = response.data.data
        } else {
          Toast(response.data.msg)
        }
      })
      USERINFO(this.uid).then(response => {
        if (response.data.code === 200) {
          console.log(response.data)
          if (response.data.data.isVip === "1") {
            this.isMember = true
          } else {
            this.isMember = false
          }
        } else {
          Toast(response.data.msg)
        }
      })
    }
  }
</script>

<style scoped>
  html, body {
    padding: 0;
    margin: 0;
  }

  .member {
    background-color: #f7f7f7;
  }

  .member-head {
    height: 4.93rem;
    width: 100%;
    position: relative;
  }

  .member-head img:first-child {
    width: 7.5rem;
    height: 3.95rem;
  }

  .vip-msg {
    width: 6.9rem;
    height: 1.94rem;
    box-shadow: 0 0.05rem 0.05rem 0.02rem rgba(35, 135, 205, 0.1);
    background-color: #fff;
    position: absolute;
    top: 3.1rem;
    left: 0.3rem;
    z-index: 5;
    font-size: 0.26rem;
    line-height: 0.34rem;
    border-radius: 0.1rem;
    color: #808080;

  }

  .vip-msg img:first-child {
    position: absolute;
    top: 0.32rem;
    left: 0.78rem;
    width: 1.57rem;
    height: 1.04rem;
  }

  .vip-span {
    display: inline-block;
    margin-left: 3rem;
    margin-top: 0.25rem;
  }

  .vip-span-head {
    font-size: 0.32rem;
    color: #333333;
    line-height: 0.5rem;
  }

  .member-part {
    display: inline-block;
    padding-left: 0.16rem;
    padding-top: 0.4rem;
  }

  .member-box {
    position: relative;
    background-color: #fff;
    float: left;
    width: 3.35rem;
    height: 1.87rem;
    margin-left: 0.16rem;
    margin-top: 0.24rem;
    border-radius: 0.1rem;
    box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
  }

  .member-box img {
    position: absolute;
    top: 0.44rem;
    left: 0.24rem;
    width: 1.1rem;
    height: 1.1rem;
  }

  .member-box-msg {
    position: relative;
    left: 1.5rem;
    top: 0.24rem;
    font-size: 0.26rem;
    color: #808080;
    line-height: 0.34rem;
    white-space: nowrap;
    width: 1.7rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .member-box-msg span:first-child {
    font-size: 0.32rem;
    color: #333;
    line-height: 0.7rem;
  }

  .member-rule {
    width: 100%;
    position: absolute;
    bottom: 2rem;
    color: #ffbc1f;
    text-align: center;
    font-size: 0.26rem;
  }

  .foot-button {
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 0.34rem;
    color: #ffffff;
    background-color: #e6363e;
    text-align: center;
    line-height: 1rem;
    height: 1rem;

  }
</style>

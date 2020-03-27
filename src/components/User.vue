<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="back">
    <div class="head">
      <!--<div :style="headImg" class="head-img"></div>-->
      <img :src=headImg class="head-img">
      <div class="coin-msg">游戏币 ： <span>{{coin}}</span></div>
      <div class="head-right-msg">
        <router-link to="/userconsume">会员消费</router-link>
      </div>
    </div>
    <div class="head-GK"></div>
    <div class="after-head">
      <div class=" after-head-R"><img class="laba" src="../assets/img/laba.png" alt="">
        <div class="warp-msg-list">
          <div id="award-list">
            <div class="swiper-container" id="swiper1">
              <div class="swiper-wrapper">
                <div v-for="(item ,index) in nearProduct" class="swiper-slide"><span
                  class=" award-msg">{{item.nearDev}}</span></div>
                <!--     <div class="swiper-slide"><span class=" award-msg">星光大道2楼娃娃机中奖率20%</span></div>
                                <div class="swiper-slide"><span class=" award-msg">星光大道3楼娃娃机中奖率30%</span></div>-->
              </div>
            </div>
          </div>
        </div>
        <span id="product-number" @click="popupVisible2 = true">共{{machineSize}}台摇摆机</span>
      </div>
      <img class=" direct Fright" src="../assets/img/direct.png">
    </div>

    <div class="swiper-container" id="swiper2">
      <div class="swiper-wrapper">
        <div style="flex-shrink: 1" class="swiper-slide" v-for="(item, index) in productList">
          <!-- v-if='index<=showNum'>-->
          <!---->
          <router-link :to="{path:'/productdetail',query:{machineId:item.machineId}}">
            <!-- @click="onSelect(item.machineNumber)"-->
            <div :id="item.machineId" class="swiper-slide-box">
              <div class="white-line"></div>
              <img
                src="../assets/img/product.png" class="product-img">
              <!--<div class="product-img"></div>-->
              <div class="product-line"><span>{{item.devName}}</span>
                {{addStarList(item,index)}}
                <ul id="rating">
                  <li :class=item.starList[0].type></li>
                  <li :class=item.starList[1].type></li>
                  <li :class=item.starList[2].type></li>
                  <li :class=item.starList[3].type></li>
                  <li :class=item.starList[4].type></li>
                </ul>
                <br>
                <div class="product-msg">{{item.devDetail}}</div>
                <img src="../assets/img/coin.png"><span>{{item.machineCoin}}币/次</span>
              </div>
            </div>
          </router-link>
        </div>

        <!--        <div @click="moreShow()" class="swiper-slide">
                  <div v-if="isLoad != 1" class="swiper-slide-box">
                    <div class="more-product">更多摇摇机</div>
                    <div class="more-product-msg">要精彩等你来</div>
                    <div class="more-product-direct">
                      <img src="../assets/img/direct.png" alt="">
                    </div>
                  </div>
                  <div v-if="isLoad == 1" class="swiper-slide-box">
                    <img class="loadImg" src="../assets/img/load.gif" alt="">
                  </div>
                </div>-->

      </div>
    </div>


    <div class="mid">
      <div class="after-mid">
        <div @click="dec" class="btn-left-cut">
          <div class="cut"></div>
        </div>
        <div class="btn-mid-msg">投<span>{{count}}</span>币</div>
        <div @click="inc" class="btn-right-up"><span class="up">+</span></div>
      </div>
      <div v-bind:style="[isActive ? activeClass : errorClass]" class="begin-btn" @click="onStart">启动 <span>{{serverName}}</span>号机
      </div>
      <div class="after-begin-btn">充值后点击按钮启动设备</div>

    </div>

    <div class="foot">
      <div class="foot-img-box"><a href="tel:0571-88056596"><img src="../assets/img/kefu-normal.png"></a></div>
      <!--<div class="foot-img-box" @click="placeWaite"> <router-link to="/test"><img src="../assets/img/near-active.png"></router-link></div>-->
      <div class="foot-img-box">
        <router-link to="/productMap"><img src="../assets/img/near-active.png"></router-link>
      </div>
      <div @click="popupVisible = true" class="foot-chongzhi">充值</div>
    </div>


    <mt-popup v-model="popupVisible" position="bottom">
      <div class="Pay-package">
        <div class="Pay-package-head">充值套餐</div>
        <div class="Pay-package-num" v-for="data in packageData" @click="pay(data.packageId)">
          <p>{{data.packagePrice}}元</p>
          <p>{{data.packageCurrency}}个币</p>
        </div>
        <div class="botton-desc">——游戏币一经售出，概不退款——</div>
      </div>
    </mt-popup>


    <!--    <mt-popup v-model="popupVisible2" position="bottom">
          <div class="produc-list">
            <div class="produc-list-head">请选择设备编号</div>
            <div class="List">
              <div v-for="(item, index) in productList" :id="index" @click='chooseProduct(index,item)'
                   class="produc-list-num"><p>{{item.machineNumber}}号机器</p>
                <p>{{item.machineCoin}}币</p></div>
            </div>
          </div>
        </mt-popup>-->


  </div>
</template>

<style scoped>
  @import "../assets/css/common.css";
  /*@import "../assets/css/style-index.css";*/
  @import "../assets/css/swiper.min.css";
</style>

<script language="javascript">
  //防止页面后退
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
  });
</script>


<script type="text/ecmascript-6">
  import "../assets/js/swiper.min.js"
  import wx from 'weixin-js-sdk'
  import {Toast, Popup, Indicator} from 'mint-ui';
  import {getCookie, setCookie} from "@/util/util";
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  var swiper2;
  export default {
    name: 'User',
    data() {
      return {
        //   listImg :null,
        uid: "",
        headImg: "",//头像提前给出空间
        productList: "",//设备列表提前给出空间
        nearProduct: "",//附近设备提前给出信息
        machineId: "",
        serverName: 1,//第几个机器
        count: 0,//投币的数量处理
        coin: 0,//当前有多少金币
        isActive: false,//是否允许投币
        activeClass: {'background': '-webkit-linear-gradient(#58ceeb, #3290ff)', 'color': '#fff'},
        errorClass: {'background': '#fff', 'color': '#000'},
        popupVisible: false,
        popupVisible2: false,//对应两个弹窗
        machineSize: 0,//设备的数量
        packageData: [],//套餐数据
        machineCoin: 1,
        latitude: 0,
        longitude: 0,
        url: "",
        showNum: 400,
        isLoad: 1,
        isStart:true
      }
    },
    methods: {

      ...mapActions([
        'add'
      ]),
      ...mapGetters([
        'addGet', 'getUserId'
      ]),
      ...mapMutations([
        'setUserId'
      ]),
      /*对应增加减少币的数量*/
      inc() {
        if (this.coin > 0) {
          this.count += this.machineCoin;
          if (this.coin > 0) {
            this.isActive = true;
          }
        } else {
          Toast("您还没有购买游戏币哦")
        }
      },
      dec() {
        if (this.count >= this.machineCoin) {
          this.count -= this.machineCoin;
          if (this.count == 0) {
            this.isActive = false;
          }
        } else {
          this.count = 0;
        }
      },
      placeWaite() {
        Toast("功能暂未开放，敬请等待")
      },
      handleClick() {
        this.popupVisible = true
      },
      moreShow() {
        this.showNum += 4
      },
      onSelect(name) {
        this.serverName = name;
      },
      onStart() {
        var _this = this;
        if (_this.isActive &&_this.isStart&& _this.count > 0) {
          _this.isStart = false
          this.$http.post("/list/wwj.json", {
            cmd: 'START',
            uid: this.uid,
            costCurrency: this.count,
            machineId: _this.machineId,
            machineLatitude: _this.latitude,
            machineLongitude: _this.longitude,
            appId:new Date()
          }, {emulateJSON: true}).then(
            function (res) {
              console.log(res.body);
              if (res.body.code === 200) {
                _this.coin = this.coin - _this.count;
                _this.count = 0;
                _this.isActive = false;
                Indicator.open('加载中...');
                setTimeout(function () {
                  Indicator.close();
                  Toast('投币成功')
                }, 2000);
                _this.isStart = true
              } else {
                //  _this.isActive = true;
                Toast(res.body.msg)
                _this.isStart = true
              }

            }, function (res) {
              // 处理失败的结果
            }
          );
        }
      },
      /*通过set方法设置item对应的star样式*/
      addStarList(item, index) {
        let num = 0
        if (typeof item.starList === "undefined") {
          const intValue = parseInt(item.starLevel);
          const floatValue = item.starLevel - intValue;
          var json = [];
          for (var i = 0; i < intValue; i++) {
            json.push({
              //"index": i,
              "type": "rating-item"
            });
            num++
          }
          if (!floatValue === 0) {
            json.push({
              //"index": i,
              "type": "rating-item-half"
            });
            num++
          }
          for (var j = 0; j < 5 - num; j++) {
            json.push({
              //"index": i,
              "type": "rating-item-nop"
            })
          }
          this.$set(item, "starList", json);
          console.log("idnex is" + index + item.starList)
        }
      },

      /*      chooseProduct(index, item) {
              var elemet = '#' + index;
              $(".produc-list-num").removeClass("produc-list-num-active");
              $(elemet).addClass("produc-list-num-active");
              this.popupVisible2 = !this.popupVisible2;
              swiper2.slideTo(index);
              this.machineId = document.getElementsByClassName("swiper-slide-active")[1].getElementsByClassName("swiper-slide-box")[0].id;
              //$().addcss()
            },*/

      lunbo() {
        var _this = this;
        var swiper1 = new Swiper('#swiper1', {
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
          loop: true,
          autoplay: 3000,
          direction: 'vertical',
          speed: 400
        });
        swiper2 = new Swiper('#swiper2', {
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
          slidesPerView: 2,
          centeredSlides: true,
          effect: "coverflow",
          coverflow: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows: true
          },
          grabCursor: true,
          setWrapperSize: true,
          mousewheelControl: true,
          /*          onSlideChangeEnd: function (swiper) {
           var name = _this.productList[swiper.activeIndex].machineNumber;
           _this.machineId = _this.productList[swiper.activeIndex].machineId;
           _this.machineCoin = _this.productList[swiper.activeIndex].machineCoin;
           _this.onSelect(name)
           },*/
          onTouchEnd: function (swiper) {
            setTimeout(function () {
              var name = _this.productList[swiper.activeIndex].machineNumber;
              _this.machineId = _this.productList[swiper.activeIndex].machineId;
              _this.machineCoin = _this.productList[swiper.activeIndex].machineCoin;
              _this.onSelect(name)
            }, 100)
          }
        });

      },
      pay(packageId) {
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
          this.wxpay(packageId)
        } else {
          location.href = "/list/alipay/alipay?packageId=" + packageId + "&userId=" + getCookie('mapptUser');
        }

      },
      wxpay(packageId) {

        var _this = this;
        this.$http.post("/list/PAY", {
          "uid": getCookie('mapptUser'),
          "packageId": packageId
        }, {emulateJSON: true}).then(
          function (res) {
            // 处理成功的结果
            if (res.body !== 500) {
              var appId = res.body.appId;
              var PAYTimestamp = res.body.PAYTimestamp;
              var PAYnonceStr = res.body.PAYnonceStr;
              var prepay_id = res.body.prepay_id;
              var sign = res.body.sign;
              wx.chooseWXPay({
                appId: appId,
                timestamp: PAYTimestamp,
                nonceStr: PAYnonceStr,
                package: prepay_id,
                signType: "MD5",
                paySign: sign,
                success: function (res) {
                  for (var n in _this.packageData) {
                    if (_this.packageData[n].packageId == packageId) {
                      _this.coin += _this.packageData[n].packageCurrency
                    }

                  }
                },
                error: function (res) {
                  alert(res)
                }
              });
            }
          }, function (res) {

          }
        );
      }
    },
    mounted() {
      window.onpopstate = () => {
        if (!this.allowBack) {    //    这个allowBack 是存在vuex里面的变量
          history.go(1);
        }
      }

      this.url = location.href;
      setCookie("indexUrl", window.location.href.split('#')[1]);
      document.title = '云逸宝扫码投币系统'
      // document.getElementsByClassName("swiper-slide").css({'flex-shrink':"1"})
      var _this = this;

      var machineId = this.$route.params.machineId;
      if (machineId == 'reback') {
        machineId = getCookie('machineId');
        _this.machineId = machineId;
      } else {
        setCookie("machineId", machineId);
        _this.machineId = machineId;
      }

      var stateObject = {};
      var title = "Wow Title";
      var newUrl = "/#/user/" + machineId;
      //     history.pushState(stateObject, title, newUrl);
      _this.uid = getCookie('mapptUser');

      //  _this.setUserId(_this.uid);
      console.log(machineId);

     /* this.$http.post("/list/wwj.json", {
        cmd: 'WXCONFIG',
        payUrl: window.location.href.split('#')[0],
//        payUrl: location.href
      }, {emulateJSON: true}).then(function (res) {
        console.info(res.body);
        if (res.body.code == 200) {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx665a4daf2b66a5fc', // 必填，公众号的唯一标识
            timestamp: res.body.data[0].timestamp, // 必填，生成签名的时间戳
            nonceStr: res.body.data[0].nonceStr, // 必填，生成签名的随机串
            signature: res.body.data[0].signature,// 必填，签名，见附录1
            jsApiList: ['chooseWXPay', 'getLocation']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      }, function (res) {

      });*/

      this.$http.post("/list/wwj.json", {
        cmd: 'INDEXMSG',
        uid: this.uid,
        machineId: machineId,
      }, {emulateJSON: true}).then(
        function (res) {
          // 处理成功的结果
          if (res.body.code == 200) {
            _this.headImg = res.body.avatar;
            var indexMsg = res.body;
            console.log(indexMsg.nearDevList);
            this.$set(this, "productList", indexMsg.devList);
            this.$set(this, "nearProduct", indexMsg.nearDevList);
            this.machineSize = res.body.devTotal;
            if (_this.machineSize > 5) {
              setTimeout(function () {
                console.log("make change isLoad")
                _this.isLoad = 2
              }, 1500);
            } else {
              _this.isLoad = 2
            }


            this.serverName = res.body.defaultDev;
            this.coin = res.body.ownCoin;
            let num = 0;
            console.log(this.productList);
            for (var product in this.productList) {
              if (this.productList[product].machineId != machineId) {
                console.log(this.productList[product]);
                num++;
              } else {
                swiper2.slideTo(num);
                this.machineCoin = indexMsg.devList[num].machineCoin;
                if (this.machineCoin < this.coin) {
                  this.count = this.machineCoin;
                  this.isActive = true;
                }
                break;
              }
            }
          } else if (res.body.code == 438) {
            //    location.href='/#/process';
          } else Toast(res.body.msg)

        }, function (res) {

        }
      );
      wx.ready(function () {
        wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            console.log(res.latitude + '   ' + res.longitude)
            _this.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            _this.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            setCookie("nowLatitude", _this.latitude);
            setCookie("nowLongitude", _this.longitude);
          }, fail: function (res) {
            //Toast('获取位置失败')
            setCookie("nowLatitude", 0);
            setCookie("nowLongitude", 0);
          }
        });

        /*        var state = {
         title: "myCenter",
         url: _this.url.substring(_this.url.indexOf('#'))
         };
         window.history.pushState(state, state.title, state.url);
         window.addEventListener('popstate', function (e) {
         // alert(location.href)
         // window.WeixinJSBridge.call('closeWindow')
         }, false)*/
      });

      this.lunbo();

    },
    created() {
      this.$http.post("/list/wwj.json", {cmd: 'PACKAGE'}, {emulateJSON: true}).then(
        function (res) {
          // 处理成功的结果
          if (res.body.code == 200) {
            this.packageData = res.body.data;
          }
          /*else  Toast(res.body.msg)*/
        }, function (res) {

        }
      );
    }
  }
</script>

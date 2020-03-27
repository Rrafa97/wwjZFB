<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
<div>
  <div class="head">
    <!--<div :style="headImg" class="head-img"></div>-->
    <img src="../assets/img/head-logo.png" class="head-img">
    <div class="coin-msg">游戏币 ： <span>{{coin}}</span></div>
    <div @click="pageLoad()" class="head-right-msg">
      刷新
    </div>
  </div>
  <div class="mid-machineId-box">
    <div class="mid-machineId">{{machineId}}</div>
  </div>
  <div class="mid">
        <div class="after-mid">
          <div @click="dec" class="btn-left-cut">
            <div class="cut"></div>
          </div>
          <div class="btn-mid-msg">投<span>{{count}}</span>币</div>
          <div @click="inc" class="btn-right-up"><span class="up">+</span></div>
        </div>
        <div v-bind:style="[isActive ? activeClass : errorClass]" class="begin-btn" @click="onStart">启动设备
        </div>
        <div class="after-begin-btn">充值后点击按钮启动设备</div>
  </div>
</div>
</template>

<style scoped>
  @import "../assets/css/common.css";
  @import "../assets/css/style-notOnline.css";
  @import "../assets/css/style-index.css";
</style>
<script language="javascript">
  //防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
  });
</script>

<script>
  import { Toast,Popup,Indicator } from 'mint-ui';
  import {getCookie,setCookie} from "@/util/util";
  export default {
    data() {
      return {
        coin:10,
        machineId:'000001',
        count:0,
        activeClass: {'background': '-webkit-linear-gradient(#58ceeb, #3290ff)', 'color': '#fff'},
        errorClass: {'background': '#fff', 'color': '#000'},
        machineCoin:1,
        isActive:false,
        isStart:true
      }
    },
    methods: {
      /*对应增加减少币的数量*/
      inc() {
        if (this.coin > 0) {
          this.count += this.machineCoin;
          if (this.coin > 0) {
            this.isActive = true;
          }
        } else {
          Toast("剩余游戏币不足")
        }
      },
      dec() {
        if (this.count >= this.machineCoin) {
          this.count -= this.machineCoin;
          if (this.count === 0) {
            this.isActive = false;
          }
        }else {
          this.count = 0 ;
        }
      },
      onStart(){
        var _this = this;
        const sendtime =new Date()
        console.log(sendtime)
        if (_this.isActive&&_this.isStart) {
          if(_this.count <= _this.coin){
            _this.$http.post("/list/wwj.json", {
              cmd: 'TESTSTART',
              machineId: _this.machineId,
              uid:sendtime.getSeconds(),
              appId:_this.showTime("yyyy-MM-dd hh:mm:ss"),
              costCurrency:_this.count,
            }, {emulateJSON: true}).then(function (res) {
              console.info(res.body);
              if (res.body.code === 200) {
                Toast('正在启动设备')
                _this.coin = _this.coin -  _this.count;
                _this.count = 0 ;
                _this.isActive = false;
              }else {Toast(res.body.msg)}
            }, function (res) {
            });
          }else  Toast("剩余游戏币不足")
        }
      },
      pageLoad(){
        Indicator.open('加载中');
        var _this = this;
        this.$http.post("/list/wwj.json", {
          cmd: 'OWNCOIN',
          machineId: _this.machineId,
        }, {emulateJSON: true}).then(function (res) {
          if (res.body.code === 200) {
            _this.coin= res.body.ownCoin;
            Indicator.close();
          }else {Toast(res.body.msg)}
        }, function (res) {

        });
      },
      showTime(fmt) {
        const _time = new Date()
        const o = {
          "M+": _time.getMonth() + 1, //月份
          "d+": _time.getDate(), //日
          "h+": _time.getHours(), //小时
          "m+": _time.getMinutes(), //分
          "s+": _time.getSeconds(), //秒
          "q+": Math.floor((_time.getMonth() + 3) / 3), //季度
          "S": _time.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (_time.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o){
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        }
        return fmt;
      }
    },
    mounted() {
      var _this = this;
      _this.machineId = getCookie("machineId");
      this.pageLoad()
    }
  }
</script>

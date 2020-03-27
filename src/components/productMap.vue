<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <div id="container" class="map"></div>
    <div id="panel"></div>
    <div class="list">
      <div class="list-head">最近设备</div>
      <hr style="margin-left: 0.3rem">
      <div  v-for="(data, index) in nearDev" >
        <div class="list-box" :id='listBoxId(index)'>
          <div @click="changeCenter(data.longitude,data.latitude,index)" class="list-box-left">
            <div class="list-box-head">{{data.positionMsg}}</div>
            <div class="list-box-msg">
              {{data.devMsg}}
            </div>
            <div class="list-box-msg" style="padding-bottom: 0.2rem">{{data.distance}}公里{{data.positionMsg}}</div>
          </div>
          <div class="list-box-right" style="padding-bottom: 0.2rem" ><img @click="openLocation(data.longitude,data.latitude,data.distance,data.positionMsg)" src="../assets/img/goToThere.png"></div>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  @import "../assets/css/common.css";

  .map {
    position: absolute;
    height: 42%;
    width: 100%;
  }

  .list {
    position: absolute;
    width: 100%;
    height: 58.2%;
    bottom: 0;
    background-color: #fff;
    overflow: scroll;
  }

  .list-box {
    margin-left: 0.3rem;
  }

  .list-box-left {
    display: inline-block;
    width: 5.5rem;
  }

  .list-box-right {
    float: right;
  }

  .list-box-right img {
    width: 0.78rem;
    height: 0.99rem;
    margin-top: 0.44rem;
    margin-right: 0.33rem;
  }

  .list-head {
    margin-left: 0.3rem;
    font-size: 0.3rem;
    color: #999;
    line-height: 0.8rem;
    height: 0.8rem;
  }

  .list-box-head {
    font-size: 0.32rem;
    color: #000;
    font-weight: bold;
    margin-top: 0.2rem;
    line-height: 0.52rem;
    height: 0.52rem;
  }

  .list-box-msg {
    font-size: 0.26rem;
    color: #999;
    line-height: 0.46rem;
  }

  .list-box-msg span {
    color: #e74c3c;
  }

  #container {
    font-size: 0.16rem;
  }
</style>


<script type="text/ecmascript-6">
  import wx from 'weixin-js-sdk';
  import {getCookie,setCookie} from "@/util/util";
  import { Toast,Popup,Indicator } from 'mint-ui';
  import {WXCONFIG} from '@/api/request'
  export default {
    data () {
      return {
        map:{},
        nearDev:[],
        myIcon : new BMap.Icon(require("../assets/img/icoNew.png"), new BMap.Size(34,34))
      }
    },
    mounted: function () {
      var _this =this;
      this.map = new BMap.Map("container");


//      var marker = new BMap.Marker(new BMap.Point(116.404, 39.915)); // 创建点
//      this.map.addOverlay(marker);

      WXCONFIG().then(response => {
        if (response.data.code === 200) {
          console.log(response)
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx1f4ed91c7207f884', // 必填，公众号的唯一标识
            timestamp: response.data.data[0].timestamp, // 必填，生成签名的时间戳
            nonceStr: response.data.data[0].nonceStr, // 必填，生成签名的随机串
            signature: response.data.data[0].signature,// 必填，签名，见附录1
            jsApiList: ['getLocation','openLocation']  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      })


      this.$http.post("/list/wwj.json", {
        cmd: 'NEARDEV',
        machineId:getCookie('machineId'),
        nowLongitude:getCookie('nowLongitude'),
        nowLatitude:getCookie('nowLatitude'),
      }, {emulateJSON: true}).then(function (res) {
        console.info(res.body)
        if(res.body.code === 200){
          var point = new BMap.Point(res.body.nowLongitude, res.body.nowLatitude);
          _this.map.centerAndZoom(point, 13);
          //  _this.BMapMark(res.body.nowLongitude, res.body.nowLatitude);
          _this.nearDev = res.body.data;
          for (var index in _this.nearDev){
            _this.showPoints(index,_this.nearDev[index]);
          }
          console.log(_this.nearDev)
        } else {Toast(res.body.msg)}
      }, function (res) {

      });


      wx.ready(function(){

        /*
              wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                  console.log(res)
                  _this.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                  _this.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                }, fail: function (res) {
                  Toast('获取位置失败')
                }
              })
        */

      })



    },
    methods: {
      BMapMark:function(longitude, latitude){
        var marker = new BMap.Marker(new BMap.Point(longitude, latitude)); // 创建点
        this.map.addOverlay(marker);
      },
      listBoxId: function (index){
        return "list-box" +index
      },
      openLocation: function (longitude,latitude,distance,positionMsg) {
        wx.openLocation({
          latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
          name: positionMsg, // 位置名
          address: distance+'公里，'+positionMsg, // 地址详情说明
          scale: 26, // 地图缩放级别,整形值,范围从1~28。默认为最大
        });
      },
      changeCenter: function (longitude,latitude,index) {
        var point = new BMap.Point(longitude,latitude);
        this.map.centerAndZoom(point, 15);
        var ele = "#list-box"+index;
        /*      $(".list-box").css({'background-color':'#fff'});
              $(ele).css({'background-color':'#ebebeb'})*/
      },
      showPoints:function(index,data){
        var point = new BMap.Point(data.longitude,data.latitude);

        var marker = new BMap.Marker(point,{icon:this.myIcon});  // 创建标注
        this.map.addOverlay(marker);              // 将标注添加到地图中
        var opts = {
          width : 220,     // 信息窗口宽度
          height: 60,     // 信息窗口高度
          // title : data.positionMsg,  // 信息窗口标题

        }
        var msg = `<div style="margin: 0 auto;width: 1.2rem;height: 1.2rem;font-size: 0.5rem;color: #000;line-height: 1.2rem;">`+data.positionMsg+`</div>`
        // var infoWindow = new BMap.InfoWindow(msg,opts);  // 创建信息窗口对象
        marker.addEventListener("click", function(){
          var ele = "#list-box"+index;
          /*          $(".list-box").css({'background-color':'#fff'});
                    $(ele).css({'background-color':'#ebebeb'})*/
        });
      }
    }
  }
</script>

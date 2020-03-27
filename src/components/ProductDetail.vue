<template>
    <div>
      <div class="gary-line"></div>
      <!--<div class="product-head-img"></div>-->
      <div class="gary-line"></div>
      <div class="">
        <div class="evaluate-head-left-img vertical-Top"></div>
        <div class="productDetail-part-2">
          <div class="productDetail-part-2-line1">{{machineData.machineNumber}}{{machineData.machineType}}</div>
          <div class="productDetail-part-2-line2">日投{{machineData.coinOfDay}}币 <!--好评率{{machineData.machinePraise}}%--></div>
          <div class="productDetail-part-2-line3">好评率{{machineData.machinePraise*100}}%</div>
          <div class="productDetail-part-2-line4">投币不启动自动退币</div>
        </div>
        <div class="productDetail-part-3">
          <div class="productDetail-part-3-line1">{{machineData.machineCoin}}币/次</div>
          <div class="productDetail-part-3-line2" @click="backIndex">立即投币</div>
        </div>
      </div>
      <div class="gary-line"></div>
      <div class="address-msg">
        <div class="address-msg-head-img vertical-Top"></div>
        <div class="address-msg-head-img-part-1 vertical-Top">
          <div class="address-msg-head-img-part-1-line1">商家信息</div>
          <div class="address-msg-head-img-part-1-line2">{{agentData.business}}</div>
          <div class="address-msg-head-img-part-1-line3">{{agentData.address}}</div>
        </div>
        <div class="address-msg-head-img-part-2 vertical-Top">
          <a :href="'tel:'+agentData.phoneNumber"><img  src="../assets/img/phone.png"></a>
        </div>
      </div>
      <div class="gary-line"></div>


      <div class="evaluate-list">
        <div class="evaluate-list-head">
          <ul id="rating-blue">
            <li class="rating-item-blue" :class="[evaluateStar > 1 ? '' : (evaluateStar == 0.5 ? 'star-half' :'star-nop')]"></li>
            <li class="rating-item-blue" :class="[evaluateStar > 2 ? '' : (evaluateStar == 1.5 ? 'star-half' :'star-nop')]"></li>
            <li class="rating-item-blue" :class="[evaluateStar > 3 ? '' : (evaluateStar == 2.5 ? 'star-half' :'star-nop')]"></li>
            <li class="rating-item-blue" :class="[evaluateStar > 4 ? '' : (evaluateStar == 3.5 ? 'star-half' :'star-nop')]"></li>
            <li class="rating-item-blue" :class="[evaluateStar == 5 ? '' : (evaluateStar == 4.5 ? 'star-half' :'star-nop')]"></li>
          </ul>
          <span class="vertical-Top">{{evaluateStar}}分</span>
          <div class="evaluate-number">{{evaluateCount}}人评价</div>
        </div>
        <hr style="margin-left: 0.24rem">
        <evaluatelist></evaluatelist>
      </div>



      <!--<div class="back-gary">-->
        <!--<img class="show-better" src="../assets/img/show-better.png">-->
      <!--</div>-->

      <!--<div class="other-address-msg">-->
        <!--<div class="address-msg-head-img vertical-Top"></div>-->
        <!--<div class="address-msg-head-img-part-1 vertical-Top">-->
          <!--<div class="address-msg-head-img-part-1-line1">星光大道二期摇摇车</div>-->
          <!--<div class="address-msg-head-img-part-1-line3  top-1">星光大道二期</div>-->
          <!--<div class="address-msg-head-img-part-1-line2">好评率100% 中奖率10%</div>-->
          <!--<div class="address-msg-head-img-part-1-line2">已投100币</div>-->
        <!--</div>-->
        <!--<div class="address-msg-head-img-part-3 vertical-Top">-->
          <!--<div class="how-far"><img src="../assets/img/place-note.png"><span>6.1km</span></div>-->
          <!--<div class="coin-time">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2币/次</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<hr>-->
      <!--<div class="other-address-msg">-->
        <!--<div class="address-msg-head-img vertical-Top"></div>-->
        <!--<div class="address-msg-head-img-part-1 vertical-Top">-->
          <!--<div class="address-msg-head-img-part-1-line1">星光大道二期摇摇车</div>-->
          <!--<div class="address-msg-head-img-part-1-line3  top-1">星光大道二期</div>-->
          <!--<div class="address-msg-head-img-part-1-line2">好评率100% 中奖率10%</div>-->
          <!--<div class="address-msg-head-img-part-1-line2">已投100币</div>-->
        <!--</div>-->
        <!--<div class="address-msg-head-img-part-3 vertical-Top">-->
          <!--<div class="how-far"><img src="../assets/img/place-note.png"><span>6.1km</span></div>-->
          <!--<div class="coin-time">2币/次</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="gary-line" style="height: 1.2rem"></div>-->
    </div>
</template>

<style scoped>
  @import "../assets/css/common.css";
  @import "../assets/css/style-user.css";
</style>

<script>
    import evaluatelist  from "../components/EvaluateList.vue";
    import {getCookie,setCookie} from "@/util/util";
    export default{
        data () {
            return {
              machineData :"",
              agentData:"",
              evaluateCount : 0,
              evaluateStar: 0,
            }
        },
        components:{
          evaluatelist
        },
        created(){
          document.body.overflow="hidden";
          document.title = '云逸宝扫码投币系统'
          this.$http.post("/list/wwj.json", {cmd: 'MACHINEDESC', machineId:this.$route.query.machineId}, {emulateJSON: true}).then(
            function (res) {
              if(res.body.code === 200 ){
                this.machineData = res.body;
              }

            }, function (res) {
              // 处理失败的结果
            }
          );

          this.$http.post("/list/wwj.json", {cmd: 'AGENTDESC', machineId:this.$route.query.machineId}, {emulateJSON: true}).then(
            function (res) {
              if(res.body.code === 200 ){
                //胡总的手机号转为公司的固话
                if(res.body.phoneNumber==='18958100066'){
                  res.body.phoneNumber='057188056596'
                }
                this.agentData = res.body;
              }

            }, function (res) {
              // 处理失败的结果
            }
          );
          this.$http.post("/list/wwj.json", {cmd: 'EVALUATELIST', machineId:this.$route.query.machineId ,begin: 1, size: 1}, {emulateJSON: true}).then(
            function (res) {
//              console.info(res.body)
              if(res.body.code ===200 ){
//                this.evaluateData = res.body.data;
                this.evaluateCount = res.body.count;
                this.evaluateStar = res.body.star;
              }

            }, function (res) {
              // 处理失败的结果
            }
          );



        },
      methods:{
        backIndex(){
            history.go(-1)
        }
      }
    }
</script>

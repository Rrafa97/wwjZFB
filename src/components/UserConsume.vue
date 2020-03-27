<template>
  <div style="background-color: #ebebeb">
    <div class="head-user-consume">
      <div class="head-person-msg">
        <div class="head-person-msg-L">
          <div class="head-img-out">
            <!--<div class="person-head-img"></div>-->
            <img :src="data.avatar" class="person-head-img">
            <!--<div class="person-head-img-level"></div>-->
            <img src="../assets/img/level-1.png" v-if="data.level == 'VIP-1'" class="person-head-img-level">
            <img src="../assets/img/level-1.png" v-else-if="data.level == 'VIP-0'" class="person-head-img-level">
            <img src="../assets/img/level-2.png" v-else-if="data.level == 'VIP-2'" class="person-head-img-level">
            <img src="../assets/img/level-3.png" v-else-if="data.level == 'VIP-3'" class="person-head-img-level">
            <img src="../assets/img/level-4.png" v-else-if="data.level == 'VIP-4'" class="person-head-img-level">
            <img src="../assets/img/level-5.png" v-else-if="data.level == 'VIP-5'" class="person-head-img-level">
            <img src="../assets/img/level-6.png" v-else="data.level == 'VIP-6'" class="person-head-img-level">
          </div>
          <div class="msg-L">
            <span>{{data.nickName}}</span><br>
            <span class="msg-right">ID:{{data.uid}}</span><!--<span class="msg-right">杭州瀚隆</span>-->
          </div>
        </div>
      </div>
    </div>
    <div class="level-msg">
      <div class="level-msg-line1"><span>{{data.levelMsg}}</span>
        <div class="answer-radius" @click="popupVisible = true">?</div>
        <img src="../assets/img/level-pic.png">
      </div>
    </div>


    <div class="record-tool">
      <div class="record-tool-left  ">
        <span :class="{'record-tool-active':selected=='coin'}"  @click="toggleTab('coin')">投币记录</span>
      </div>
      <div class="mid-line"></div>
      <div class="record-tool-right">
        <span :class="{'record-tool-active':selected=='recharge'}" @click="toggleTab('recharge')">充值记录</span>
      </div>
    </div>

    <coin :is="currentTab" :user="user"></coin>

    <mt-popup v-model="popupVisible" position="center">
      <div class="alert-msg">
        <div class="alert-msg-ling1">会员成长说明</div>
        <textarea class="textarea-box" rows="8" cols="35" readonly>
会员累积充值金额越多等级越高，可享受的会员权益越多：
黄铜：累积充值金额0~100元
白银：累积充值金额100~300元
黄金：累积充值金额300~500元
铂金：累积充值金额500~2000元
砖石：累积充值金额2000~5000元
王者：累积充值金额5000以上
        </textarea>
        <div class="hr"></div>

        <div class="alert-msg-ling2" @click="popupVisible = false">我知道了</div>

      </div>
    </mt-popup>

  </div>

</template>

<style scoped>
  @import "../assets/css/common.css";
  @import "../assets/css/style-person.css";
</style>

<script>
    import coin from "../components/CoinRecording"
    import recharge from "../components/RechargeRecord"
    import { Toast,Popup,Indicator } from 'mint-ui';
    import {getCookie,setCookie} from "@/util/util";
    export default{
        data () {
            return {
              selected : 'coin',
              popupVisible:false,
              currentTab :'coin',
              user: {uid:getCookie('mapptUser')},
              data : []
            }
        },
        components:{
          coin,recharge
        },
        methods:{
          toggleTab: function(tab) {
            this.selected = tab;
            this.currentTab = tab; // tab 为当前触发标签页的组件名
          }
        },
        created(){
          document.title = '云逸宝扫码投币系统'
          this.$http.post("/list/wwj.json", {cmd: 'PERSONMSG', uid:this.user.uid}, {emulateJSON: true}).then(
            function (res) {
//              console.info(res.body)
              if(res.body.code == 200 ){
                this.data = res.body;
              }

            }, function (res) {
              // 处理失败的结果
            }
          );
        }
    }
</script>

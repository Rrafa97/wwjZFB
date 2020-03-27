<template>
  <div>
    <div class="machine-msg">
      <!--<img src="../../../static/img/productImg-1-s.png" class="img-left">-->
      <img :src="devAvatar" class="img-left"/>
      <div class="img-left-mask" id="imgState">
        <p>点我租赁</p>
        <div class="machine-msg-img-left-mask-hotel">
          <p>酒店特惠</p>
        </div>
      </div>
      <!--<img :src="machineMsg.devAmount" class="img-left">-->
      <div class="machineState">
        <div class="machineState-1">
          启动单价:
          <span>{{machineMsg.devCoin}}币/次</span>
        </div>
        <div class="machineState-2">
          当前设备:
          <span>{{machineMsg.devName}}</span>
        </div>
        <!--<div class="machineState-3">-->
          <!--平均日投:-->
          <!--<span>{{machineMsg.devAmount}}币</span>-->
        <!--</div>-->
        <!--<div class="machineState-4">-->
          <!--好评率:-->
          <!--<span>{{machineMsg.devPraise*100}}%</span>-->
        <!--</div>-->
        <div class="machineState-1">
          <!-- <router-link to="../LeasePart">设备租赁</router-link> -->
        </div>
      </div>
      <router-link :to="{path:'/productdetail',query:{machineId:devId}}">
        <div class="getMoreMsg">了解更多详情>></div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import {checkDev} from "@/api/request";

  export default {
    props: ["machineMsg"],
    data() {
      return {
        devId: this.$route.params.machineId
      };
    },
    mounted() {
      console.log(img);
      var img = document.getElementById("imgState");

      img.onclick = () => {
        this.$router.push({
          name: "EquipmentLeasing", //name： index.js路由名
        });
      };
      /*      checkDev(this.devId).then(function (response) {
              if (response.data.code == 200) {
                img.style.display = "flex";
                img.onclick = () => {
                  this.$router.params({
                    name: "EquipmentLeasing", //name： index.js路由名
                  });
                };
              }
            });*/
    },
    computed: {
      devAvatar() {
        // return  'http://1/' + this.machineMsg.devAvatar
        return "http://zfb.hzhltec.com" + this.machineMsg.devAvatar;
      }
    }
  };
</script>

<style>
  .machine-msg-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .machine-msg {
    position: relative;
    margin-top: 0.2rem;
    height: 2.1rem;

    background: #fff;
    padding-right: 0.34rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .img-left {
    float: left;
    height: 2.1rem;
    border: 0;
    width: 2.1rem;
  }

  .img-left-mask {
    float: left;
  height: 2.1rem;
  width: 2.34rem;
  font-size: 20px;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  color: rgba(255, 234, 167, 1);
  position: absolute;

  background: rgba(97, 71, 71, 0.5);
  }

  .machineState {
    position: absolute;
    top: 0.37rem;
    left: 2.5rem;
  }

  .machineState-1 {
    font-size: 0.32rem;
    color: #000;
    line-height: 0.4rem;
  }

  .machineState-1 span {
    color: #c21e1e;
  }

  .machineState-2 {
    font-size: 0.28rem;
    color: #7c7b7b;
    line-height: 0.5rem;
  }

  .machineState-3 {
    font-size: 0.24rem;
    color: #c8c7c7;
    line-height: 0.3rem;
  }

  .machineState-4 {
    font-size: 0.2rem;
    color: #c9c8c8;
    line-height: 0.3rem;
  }

  .getMoreMsg {
    position: absolute;
    right: 0.24rem;
    top: 1.5rem;
    font-size: 0.25rem;
    color: #0ea3ff;
  }
  .machine-msg-img-left-mask-hotel {
  background: #e74c3c;
  position: absolute;
  top: -10px;
  right: -30px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  height: 1.4em;
}
.machine-msg-img-left-mask-hotel p {
  font-size: 0.5em;
  color: #fff;
}
</style>

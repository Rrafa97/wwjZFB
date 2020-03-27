<template>

  <div v-if="showIt" :style="{ height : docHeight + 'px'}" class="first-advert">
      <img class="advertImg" :style="{ marginLeft : imgLeft + 'px',}"
           :src="firstAdvert">
    <router-link :to="'/User/'+devId">
      <div class="timer" @click="skip">{{second}} <span>跳过</span></div>
    </router-link>
  </div>
</template>

<script>
  import {getCookie} from "../../util/util";
  import { ADVERTEX } from "@/api/request"
  import { Toast } from "mint-ui"
  export default {
    data() {
      return {
        docHeight: document.documentElement.clientHeight,
        imgLeft: 0,
        second: 3,
        showIt: false,
        devId: getCookie('machineId'),
        firstAdvert:""
      }
    },
    mounted() {
      const that = this
      const st = setInterval(function () {
        that.second = that.second - 1
        if (that.second === 0) {
          clearInterval(st);
          that.showIt = false
        }
      }, 1000)

      ADVERTEX().then(response => {
        if (response.data.code===200) {
          this.showIt = true
          this.advertExUrl = response.data.advertExUrl
        } else if (response.data.code===210) {
          this.skip()
        } else  {
          Toast(response.data.msg)
        }
      })
      // this.imgWidth = this.$refs.advertImg
      /*      console.log(this.$refs.advertImg.width)
            console.log(document.getElementById("advertImg").width)
            this.imgLeft = (document.documentElement.clientWidth - this.$refs.advertImg.width) / 2*/
    },
    methods: {
      skip() {
        this.showIt = false
      }
    }
  }
</script>

<style scoped>
  .advertImg {
    display: block;
    margin: 0 auto;
  }

  .first-advert {
    position: absolute;
    width: 100%;
    font-size: 0;
    top: 0;
    background-color: #fff;
    z-index: 99;
  }

  .first-advert img {
    display: block;
    margin: 0 auto !important;
    height: 100%;
  }

  .timer {
    position: absolute;
    top: 0.16rem;
    right: 0.18rem;
    height: 0.3rem;
    width: 0.7rem;
    border-radius: 0.12rem;
    font-size: 0.12rem;
    background-color: #a6a6a6;
    color: #fefefe;
    line-height: 0.3rem;
    text-align: center;
  }
</style>

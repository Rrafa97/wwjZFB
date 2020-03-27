<template>
  <div :style="{'height':clientHeight  + 'px',backgroundColor:'#ebebeb','overflow':'hidden'}">
    <advert :personInfo="personInfo" :toggle="toggle" v-on:listenToChildEvent="parentChange"></advert>
    <pay :uid=uid v-show="toggle==='record'"></pay>
    <coin :uid=uid v-show="toggle ==='coin'"></coin>
  </div>
</template>

<script>
  import advert from '../components/personCenter/personCenterHead.vue'
  import coin from '../components/personCenter/coin.vue'
  import pay from '../components/personCenter/pay.vue'
  import {USERINFO} from '@/api/request'
  import {getCookie, setCookie} from "../util/util"
  import {Toast} from "mint-ui";

  export default {
    name: "personCenter",
    components: {
      advert, coin, pay
    },
    data() {
      return {
        clientHeight: document.documentElement.clientHeight,
          toggle: 'coin',
          uid: getCookie('mapptUser'),
          personInfo: {
            "userAvatar": "https://tfs.alipayobjects.com/images/partner/T1GKJfXnliXXXXXXXX",
            "userCoin": 0,
            "userLevelName": " ",
            "userLevelPoint": 0,
          "userName": "wx"
        },
      }
    },
    methods: {
      parentChange: function (tag) {
        this.toggle = tag
      },
    },
    created() {
      USERINFO(this.uid).then(response => {
        if (response.data) {
          this.personInfo = response.data.data
        } else {
          Toast(response.data.msg)
        }
      })
    }
  }
</script>

<style scoped>

</style>

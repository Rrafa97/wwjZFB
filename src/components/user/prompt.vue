<template>
    <div v-if="advertShow" :style="{ height : clientHeight + 'px'}" class="back-bg">
      <div class="advert-alert">
        <img class="closeAdvert" @click="closeAdvert" src="../../assets/img/close-btn.png">
        <img class="advertExUrl" :src="advertExUrl">
      </div>
    </div>
</template>

<script>
  import { ADVERTIN }  from '@/api/request'
  import { Toast } from 'mint-ui'
  export default {
    name: "prompt",
    data() {
      return {
        clientHeight: document.documentElement.clientHeight,
        advertShow: false,
        advertExUrl:''
      }
    },
    methods: {
      closeAdvert() {
        this.advertShow = false
      }
    },
    created() {
      ADVERTIN().then(response => {
        if (response.data.code===200) {
          this.advertShow = true
          this.advertExUrl = response.data.advertExUrl
        } else if (response.data.code===210) {
          this.advertShow = false
        } else  {
          Toast(response.data.msg)
        }
      })
    }
  }
</script>

<style scoped>
  .back-bg {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 98;
  }

  .advert-alert {
    position: absolute;
    width: 4.66rem;
    height: 5.67rem;
    top: calc(50% - 2.835rem);
    left: calc(50% - 2.33rem);
  }

  .closeAdvert{
    position: absolute;
    width: 0.53rem;
    height: 0.53rem;
    top: -0.265rem;
    right: -0.265rem;
    z-index: 9;
  }

  .advertExUrl {
    width: 4.66rem;
    height: 5.67rem;
  }
</style>

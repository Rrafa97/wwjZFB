<template>
  <div class="advert" ref="advert">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for = "(item ,index) in advertMsg" :key = "index" >
          <div class="advert-left">
            <div class="first">{{item.adTitle}}</div>
            <div class="second">{{item.adContent}}</div>
          </div>
        </swiper-slide>
        <!--      <swiper-slide>
                <div class="advert-left">
                  <div class="first">{{advertMsg.firstMsg}}2</div>
                  <div class="second">{{advertMsg.secondMsg}}</div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="advert-left">
                  <div class="first">{{advertMsg.firstMsg}}3</div>
                  <div class="second">{{advertMsg.secondMsg}}</div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="advert-left">
                  <div class="first">{{advertMsg.firstMsg}}4</div>
                  <div class="second">{{advertMsg.secondMsg}}</div>
                </div>
              </swiper-slide>-->
      </swiper>
    <img class="diamond" src="../../assets/img/diamond.png">
    <img class="vip" src="../../assets/img/vip-logo.png">
  </div>

</template>

<script>
  import 'swiper/dist/css/swiper.css'

  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "advert",
    components: {swiper, swiperSlide},
    props: ['advertMsg'],
    data() {
      return {
        swiperOption: {
          direction: 'vertical',
          setWrapperSize: true,
          height: document.documentElement.clientWidth / 7.5 * 1.47,
          autoplay: true,
          simulateTouch: true,//禁止鼠标模拟
          allowTouchMove: false,//禁止鼠标拖动
          loop:true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .advert {
    margin-top: 0.2rem;
    height: 1.47rem;
    background-color: #fff;
    overflow: hidden;
  }

  .advert-left {
    position: relative;
    font-size: 0.3rem;
    font-weight: 500;
    width: 5rem;
    height: 1.47rem;
    color: #3a342a;
    top: 0.36rem;
    left: 0.4rem;
  }

  .first {
    position: absolute;
    color: #0ea3ff;
    font-weight: 600;
  }

  .first span:first-child {
    color: #0ea3ff;
  }

  .second {
    position: absolute;
    color: #b4b3b1;
    top: 0.5rem;
  }

  .diamond {
    position: absolute;
    right: 0.2rem;
    top: 1.6rem;
    width: 1.5rem;
    height: 1.2rem;
  }
  .vip{
    position: absolute;
    left:0.02rem;
    top: 1.48rem;
    height: 0.42rem;
    width: 0.34rem;
  }
</style>

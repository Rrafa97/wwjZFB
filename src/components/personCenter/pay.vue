<template>
  <div class="scroll-hidden">
    <div class="pay-scroll">
      <mt-loadmore :bottom-method="payLoadMore" :bottom-all-loaded="payAllow" :bottomPullText='bottomText'
                   ref="loadmore">
      <div class="pay-list">
        <div v-for="item in payInfo">
          <div class="pay-box">
            <div class="time1">支付时间:{{item.payTime}}</div>
            <div class="pay-type" v-if="item.payType ==='WXPAY'">支付方式 : <span>微信支付</span></div>
            <div class="pay-type" v-if="item.payType !=='WXPAY'">支付方式 : <span>支付宝支付</span></div>
            <div class="money">支付金额: <span>{{item.payMoney/100}}元={{item.payCoin}}个币</span></div>
            <div class="pay-order">订单编号:{{item.orderId}}</div>
          </div>
        </div>
      </div>
      </mt-loadmore>
    </div>
  </div>


</template>

<script>
  import {Loadmore,Toast} from 'mint-ui';
  import {PAYINFO} from '@/api/request'
  export default {
    name: "pay",
    props: ['uid'],
    components: {
      'mt-loadmore':Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      // 推荐应用组件时用a-b形式起名
    },
    data() {
      return {
        bottomText: '上拉加载更多...',
        payAllow: false,
        payInfo:[],
        begin:1,
        size:4
      }
    },
    methods: {
      payLoadMore() {
        PAYINFO(this.uid, this.begin, this.size).then(response => {
          this.begin++
          if (response.data.count === this.begin) {
            this.payAllow = true
          }
          if (response.data.code === 200) {
            this.payInfo = this.payInfo.concat(response.data.data)
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位

          } else {
            Toast(response.data.msg)
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
          }
        })
      }
    },
    created() {
      PAYINFO(this.uid, this.begin, this.size).then(response => {
        if (response.data.count === this.begin) {
          this.payAllow = true
        }
        if (response.data.code === 200) {
          this.payInfo = response.data.data
          this.begin++
        } else {
          Toast(response.data.msg)
        }
      })
    }
  }
</script>

<style scoped>
  .scroll-hidden{
    width: 7.5rem;
    height: calc( 100% - 3.6rem);
    overflow-x: hidden;

  }
  .pay-scroll{
    height:100%;
    overflow-y: scroll;
    width: 7.9rem;
  }
  .pay-list{
    background-color: #ebebeb;
    padding-left: 0.28rem;
  }
  .pay-box {
    width: 6.95rem;
    height: 2.436rem;
    background-color: #fff;
    box-shadow: 0 0 0.2rem 0.1rem rgba(0, 0, 0, 0.1);
    font-size: 0.3rem;
    color: #b5b5b5;
    line-height: 0.56rem;
    margin-top: 0.2rem;
    padding-left: 0.28rem;
    padding-top: 0.06rem;
    border-radius: 0.13rem;
  }

  .pay-box span {
    color: #000 !important;
  }

</style>
<style>
  .mint-loadmore-text{
    font-size: 0.34rem!important;
  }

</style>

<template>
  <div class="scroll-hidden">
    <div class="coin-scroll">
      <mt-loadmore :bottom-method="pushLoadMore" :bottom-all-loaded="pushAllow" :bottomPullText='bottomText' :autoFill="autoFill"
                   ref="loadmore2">
        <div class="coin-list">
          <div v-for="item in pushInfo">
            <div class="coin-box">
              <div class="coin-img-box">
                <img src="../../../static/img/productImg-1-s.png"></div>
              <div class="coin-msg">
                <div class="place">{{item.devPostion}}</div>
                <div class="time1">{{item.recTime}}</div>
                <div class="coin-time">共20次，实投<span>40</span>个币</div>
              </div>
              <div class="coin-state">
                <div class="machine-name">{{item.devName}}</div>
                <div v-if="item.isEvaluate ===1" class="evaluate-state">评价成功</div>
                <router-link :to="{path:'/evaluate',query:{machineId:machineId,devName:item.devName,uid:uid,payTime:item.recTime}}"><div v-if="item.isEvaluate !==1" class="un-evaluate-state">评价</div></router-link>
              </div>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import {Loadmore,Toast} from 'mint-ui';
  import {PUSHINFO} from '@/api/request'
  import {getCookie} from "../../util/util";

  export default {
    name: "coin",
    props: ['uid'],
    components: {
      'mt-loadmore': Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      // 推荐应用组件时用a-b形式起名
    },
    data() {
      return {
        bottomText: '上拉加载更多...',
        pushAllow: false,
        pushInfo: [],
        begin: 1,
        size: 4,
        autoFill:false,
        uid: getCookie('mapptUser'),
        machineId: getCookie('machineId') ,
      }
    },
    methods: {
      pushLoadMore() {
        PUSHINFO(this.uid, this.begin, this.size).then(response => {
          this.begin++
          if (response.data.count === this.begin) {
            this.pushAllow = true
          }
          if (response.data.code === 200) {
            this.pushInfo = this.pushInfo.concat(response.data.data)
            this.$refs.loadmore2.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
          } else {
            Toast(response.data.msg)
            this.$refs.loadmore2.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
          }
        })
      }
    },
    created() {
            PUSHINFO(this.uid, this.begin, this.size).then(response => {
              if (response.data.count === this.begin) {
                this.pushAllow = true
              }
              if (response.data.code === 200) {
                this.pushInfo = response.data.data
                this.begin++
              } else {
                Toast(response.data.msg)
              }
            })

    }
  }
</script>

<style scoped>
  .scroll-hidden {
    width: 7.5rem;
    height: calc(100% - 3.6rem);
    overflow-x: hidden;
  }

  .coin-scroll {
    height: 100%;
    overflow-y: scroll;
    width: 7.9rem;
  }

  .coin-list {
    position: relative;
    background-color: #ebebeb;
  }

  .coin-box {
    margin-top: 0.2rem;
    margin-left: 0.18rem;
    position: relative;
    width: 7.19rem;
    height: 1.93rem;
    background-color: #fff;
    border-radius: 0.13rem;
    box-shadow: 0 0 0.4rem 0.1rem rgba(0, 0, 0, 0.1);
  }

  .coin-img-box {
    position: absolute;
    top: 0.38rem;
    left: 0.28rem;
    width: 0.84rem;
    height: 0.84rem;
    color: #eeeeee;

  }

  .coin-img-box img {
    position: absolute;
    top: 0.02rem;
    left: 0.02rem;
    width: 0.8rem;
    height: 0.8rem;
  }

  .coin-msg {
    position: absolute;
    left: 1.6rem;
    top: 0.4rem;
  }

  .place {
    font-size: 0.3rem;
    line-height: 0.3rem;
    color: #666666;
  }

  .time1 {
    font-size: 0.24rem;
    color: #999999;
    line-height: 0.54rem;
  }

  .coin-time {
    font-size: 0.24rem;
    color: #999999;
    margin-left: -0.05rem;
  }

  .coin-time span {
    color: #e74c3c;
  }

  .coin-state {
    position: absolute;
    right: 0.28rem;
    top: 0.4rem;
  }

  .machine-name {
    font-size: 0.28rem;

  }

  .evaluate-state {
    font-size: 0.24rem;
    margin-top: 0.6rem;
    color: #fac020;
    text-align: right;
  }

  .un-evaluate-state {
    position: absolute;
    right: 0.0rem;
    top: 0.6rem;
    width: 0.83rem;
    height: 0.42rem;
    background-color: #0ea3ff;
    color: #fff;
    text-align: center;
    line-height: 0.42rem;
    font-size: 0.24rem;
    vertical-align: center;
    border-radius: 0.06rem;

  }
</style>

<style>
  .mint-loadmore-text{
    font-size: 0.34rem!important;
  }

</style>

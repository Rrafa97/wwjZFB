<template>

    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">

      <div class="record-list" v-if="data.length > 0">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomPullText='bottomText' ref="loadmore">
          <div  v-for="item in data">
            <hr>
            <div class="record">
            <div class="record-line1"><span>支付时间</span> : {{item.payTime}}</div>
            <div class="record-line1"><span>支付方式</span> : <span class="black-font">{{item.payType}}</span> </div>
            <div class="record-line1"><span>支付金额</span> : <span class="black-font">{{item.payCoin}}</span></div>
            <div class="record-line1"><span>订单编号</span> : {{item.orderId}}</div>
          </div>
          </div>
        </mt-loadmore>
      </div>
      <div class="no-record" v-else>
      </div>

    </div>
</template>

<style>
  @import "../assets/css/style-person.css";
  .page-loadmore-wrapper{
    overflow: scroll;
    background-color: #fff;
  }
</style>

<script type="text/ecmascript-6">
  import {Loadmore} from 'mint-ui';
  export default{
    data () {
      return {
        data:[],
        pageNo: 1,
        size : 10,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        totalCount: 0,
        wrapperHeight: 0
      }
    },
    props:['user'],
    created() {
      console.log(this.user.uid) ;
      this.$http.post("/list/wwj.json", {cmd: 'USERRECORD', uid: this.user.uid ,begin: this.pageNo, size: this.size}, {emulateJSON: true}).then(
        function (res) {
          console.info(res.body) ;
          if( res.body.code == 200 ){
            this.data = res.body.recordList;
            this.totalGetCount = res.body.count;
          }
        }, function (res) {
          // 处理失败的结果
        }
      );
    },
    methods :{
      loadBottom() {
        console.info('reflush')
        this.pageNo += 1;
        if (this.pageNo == this.totalGetCount) {
          this.allLoaded = true;
        }
        setTimeout(() => {
          this.$http.post("/list/wwj.json", {cmd: 'USERRECORD', uid: this.user.uid ,begin: this.pageNo, size: this.size}, {emulateJSON: true}).then(response => {
          console.info(response.body)
        if(response.body.code == 200){
          this.data = this.data.concat(response.body.recordList );
          if(response.body.count > 2){
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
          }
        }
      }, response => {
        });
      }, 1500);
       // this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  }
</script>

<template>
  <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomPullText='bottomText' ref="loadmore">
        <div class="evaluate-box" v-for="item in evaluateData">
          <img :src="item.avatar" class="evaluate-user-head">
          <div class="evaluate-box-part vertical-Top">
            <div class="evaluate-box-part-line1">{{item.nickName}}
              <img src="../assets/img/level-1.png" v-if="item.level == 'VIP-1'">
              <img src="../assets/img/level-2.png" v-else-if="item.level == 'VIP-2'">
              <img src="../assets/img/level-3.png" v-else-if="item.level == 'VIP-3'">
              <img src="../assets/img/level-4.png" v-else-if="item.level == 'VIP-4'">
              <img src="../assets/img/level-5.png" v-else-if="item.level == 'VIP-5'">
              <img src="../assets/img/level-6.png" v-else="item.level == 'VIP-6'">
              <span>{{item.createTime}}</span></div>
            <ul class="evaluate-user-star">
              <li class="evaluate-user-star-item" :class="[item.starNum >= 1 ? '' : 'star-nop']"></li>
              <li class="evaluate-user-star-item" :class="[item.starNum >= 2 ? '' : 'star-nop']"></li>
              <li class="evaluate-user-star-item" :class="[item.starNum >= 3 ? '' : 'star-nop']"></li>
              <li class="evaluate-user-star-item" :class="[item.starNum >= 4 ? '' : 'star-nop']"></li>
              <li class="evaluate-user-star-item" :class="[item.starNum == 5 ? '' : 'star-nop']"></li>
            </ul>
            <div class="address-msg-head-img-part-1-line1">{{item.content}}</div>
            <div class="evaluate-box-img-list" v-for="url in toJson(item.imgList)">
              <img :src="url" class="evaluate-box-img">
            </div>
          </div>
        </div>

      </mt-loadmore>
  </div>
</template>

<style scoped>
  @import "../assets/css/style-user.css";
  .page-loadmore-wrapper{
    overflow: scroll;
  }
</style>

<script type="text/ecmascript-6">
    import {Loadmore} from 'mint-ui';
    export default{
        data () {
            return {
              evaluateData :[],
              pages : 0,
              pageNo: 1,
              size : 10,
              allLoaded: false,
              bottomText: '上拉加载更多...',
              wrapperHeight: 0
            }
        },
        created(){
          this.$http.post("/list/wwj.json", {cmd: 'EVALUATELIST', machineId:this.$route.query.machineId ,begin: this.pageNo, size: this.size}, {emulateJSON: true}).then(
            function (res) {
              console.info(res.body)
              if(res.body.code == 200 ){
                this.evaluateData = res.body.data;
                this.pages = res.body.pages;
              }

            }, function (res) {
              // 处理失败的结果
            }
          );
        },
        methods:{
          toJson:function(str){
            const _str =(new Function("","return "+str))();
            return _str;
          },
          loadBottom() {
            console.log(this.pageNo+" = this.pageNo-----------this.pages="+this.pages)
              this.pageNo += 1;
              if (this.pageNo == this.pages) {
                console.info('this allLoaded is true')
                this.allLoaded = true;
              }
            setTimeout(() => {
              console.info('request again ')
              this.$http.post("/list/wwj.json", {cmd: 'EVALUATELIST', machineId:this.$route.query.machineId ,begin: this.pageNo, size: this.size}, {emulateJSON: true}).then(response => {
              console.info(response.body)
              if(response.body.code == 200){
                this.evaluateData = this.evaluateData.concat(response.body.data);
                if(response.body.count > 2){
                  this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
                }

                }
              }, response => {
                });
            }, 1500);
          },
        },
        mounted() {
          this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
    }
</script>

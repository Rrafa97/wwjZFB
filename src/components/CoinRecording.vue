<template>
  <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <div v-if="data.length > 0">
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :bottomPullText="bottomText"
        ref="loadmore"
      >
        <div v-for="item in data">
          <hr />
          <div class="consume-msg">
            <div class="consume-msg-part1 half-part">
              <div class="person-head-left-img"></div>
              <div class="consume-msg-detail">
                <div class="detail-line1">{{item.address}}</div>
                <div class="detail-line2">{{item.payTime}}</div>
                <div class="detail-line3">
                  共投
                  <span>{{item.payRecord}}</span>次，实投
                  <span class="red-font">{{item.payCoin}}</span>个币
                </div>
              </div>
            </div>
            <div class="consume-msg-part2 half-part">
              <div class="product-name">{{item.devName}}</div>
              <div v-if="item.isEvaluate == 0">
                <router-link
                  :to="{path:'/evaluate',query:{machineId:item.machineId,devName:item.devName,uid:user.uid,payTime:item.payTime}}"
                  class="evaluate"
                >评价</router-link>
              </div>
              <div v-else class="product-name">已评价</div>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>

    <div class="no-record" v-else></div>
  </div>
</template>

<style>
@import "../assets/css/style-person.css";
.page-loadmore-wrapper {
  overflow: scroll;
  background-color: #fff;
}
</style>

<script type="text/ecmascript-6">
import { Loadmore } from "mint-ui";
export default {
  data() {
    return {
      data: [],
      pageNo: 1,
      size: 5,
      allLoaded: false,
      bottomText: "上拉加载更多...",
      totalCount: 0,
      wrapperHeight: 0
    };
  },
  props: ["user"],
  created() {
    this.$http
      .post(
        "/list/wwj.json",
        {
          cmd: "USERCONSUME",
          uid: this.user.uid,
          begin: this.pageNo,
          size: this.size
        },
        { emulateJSON: true }
      )
      .then(
        function(res) {
          console.info(res.body);
          if (res.body.code == 200) {
            this.data = res.body.data;
            this.totalGetCount = res.body.count;
          }
        },
        function(res) {
          // 处理失败的结果
        }
      );
  },
  methods: {
    loadBottom() {
      this.pageNo += 1;
      if (this.pageNo === this.totalGetCount) {
        this.allLoaded = true;
      }
      setTimeout(() => {
        this.$http
          .post(
            "/list/wwj.json",
            {
              cmd: "USERCONSUME",
              uid: this.user.uid,
              begin: this.pageNo,
              size: this.size
            },
            { emulateJSON: true }
          )
          .then(
            response => {
              console.info(response.body);
              if (response.body.code === 200) {
                this.data = this.data.concat(response.body.data);
                if (response.body.count > 2) {
                  this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位
                }
              }
            },
            response => {}
          );
      }, 1500);
      //            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
    }
  },
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
    console.log(this.wrapperHeight);
  }
};
</script>

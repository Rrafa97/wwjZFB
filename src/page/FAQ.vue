<template>
  <div v-bind:style="{minHeight:clientHeight + 'px'}" class="FAQ">
    <div class="FAQ-head">
      常见问题
    </div>
    <div class="FAQ-list" v-for="(item,index) in questionList">
        <div class="FAQ-item">
          <span>{{index+1 }}、{{item.quesTitle}}？</span>
          <span>{{item.quesContent}}</span>
        </div>
        <hr>
    </div>
      <!--<div class="FAQ-foot">-->
        <!--如还有疑惑，请<router-link to="/follow"><span>关注公众号</span></router-link><br>-->
        <!--点击联系客服-->
      <!--</div>-->
  </div>
</template>

<script>
  import {QUESINFO} from '@/api/request'

  export default {
    name: "FAQ",
    data() {
      return {
        clientHeight: document.documentElement.clientHeight,
        questionList: []
      }
    },
    created() {
      QUESINFO().then(response => {
        if (response.data) {
          this.questionList = response.data.data
        } else {
          Toast(response.data.msg)
        }
      })
    }
  }
</script>
<style>
  @import "../assets/css/common.css";
</style>
<style scoped>
  body {
    overflow-y: scroll;
  }

  .FAQ {
    width: 100%;
    background-color: #f0eff5;
  }

  .FAQ-head {
    height: 0.84rem;
    line-height: 0.84rem;
    font-size: 0.28rem;
    padding-left: 0.25rem;
  }

  .FAQ-item {
    min-height: 1.26rem;
    background-color: #fff;
    padding-left: 0.25rem;
    font-size: 0;
  }

  .FAQ-item span:first-child {
    display: block;
    font-size: 0.32rem;
    color: #474748;
    padding-top: 0.23rem;
  }

  .FAQ-item span:last-child {
    display: block;
    font-size: 0.28rem;
    color: #b3adbb;
    margin-top: 0.2rem;
    padding-bottom: 0.2rem;
  }

  .FAQ-foot {
    height: 1.67rem;
    background-color: #e3e2e4;
    line-height: 0.45rem;
    padding-top: 0.4rem;
    text-align: center;
    font-size: 0.26rem;
    color: #999999;
  }

  .FAQ-foot span:first-child {
    color: #79bae5;
    letter-spacing: 0px;
  }
</style>

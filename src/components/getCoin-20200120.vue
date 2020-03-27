<template id='welo'>
  <div class="body" :style="{height: fullHeight + 'px'}">
    <div class="red-packet" id="red-packet">
      <header>
        <img src="../assets/logo.png" class="img-head"/>
      </header>
      <main>

        <p class="author">云逸宝</p>
        <button class="open" @click="getMethod()">领</button>
        <h2>点击免费领取一个币</h2>

      </main>
    </div>
    <div id="maked"></div>
    <div id="getMark">
      <label
        @click="close()"
        id="msg"
        style="color:#ffffff;
        text-align:center"
      ></label>
    </div>
  </div>
</template>
<script>
  import {getCoin,WXCONFIG} from "@/api/request"
  import {getCookie, setCookie} from "@/util/util"
  import wx from 'weixin-js-sdk'
  export default {
    data() {
      return {
        uid: getCookie('mapptUser'),
        time: Date.parse(new Date()),
        flag_1: 0,
        fullHeight: document.documentElement.clientHeight,
      };

    },
    mounted() {
      window.onpopstate = () => {
        if (!this.allowBack) {    //    这个allowBack 是存在vuex里面的变量
          history.go(1);
        }
      };
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
      });
    },
    methods: {
      //向后台发送
      /** */
      getMethod() {
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
          // console.log(this.time);
          let msg;
          let _this = this;
          if (_this.time > 1579536000000) {
            msg = '该活动已结束！'
            document.getElementById('msg').innerHTML = msg;
            _this.flag_1 = 1;
          } else if (_this.flag_1 == '') {
            console.log(_this.flag_1)
            getCoin(_this.uid).then(function (res) {
              res = res.data;
              if (res.code == null || res.code == "") {
                console.log("请求失败");
              } else if (res.code == 438) {
                msg = '您已领取,请勿重复领取！'
                document.getElementById('msg').innerHTML = msg;
                //alert("您已经领过了，请勿重复领取");
                _this.flag_1 = 1;
              } else {
                msg = '您已经成功领取到一个币！';
                document.getElementById('msg').innerHTML = msg;
                //alert("您已经领取到1个币");
                _this.flag_1 = 1;
              }

            });
          }
          var s = document.getElementById("maked");
          // console.log(s);
          s.style.display = "flex";
          var l = document.getElementById("getMark");
          l.style.display = "flex";
          setTimeout(() => {
            s.style.display = "none";
            l.style.display = "none";
          }, 3000);
        } else {
          alert("请用微信扫码！");
        }
      },
      close() {
        var s = document.getElementById("maked");
        s.style.display = "none";
        var l = document.getElementById("getMark");
        l.style.display = "none";
      },
    }
  };
</script>

<style scope="this api replaced by slot-scope in 2.5.0+">
  /* 改变间距计算方式 */
  * {
    box-sizing: border-box;
  }

  /* 设置间距和字体 */
  .body {
    background: #c9c7c4;
    padding: 2.5em;
    font: lighter 14px "微软雅黑";
    overflow: hidden;
  }

  /* 标题变细 */
  h1,
  h2,
  h3 {
    font-weight: lighter;
  }

  /* 图片响应式 */
  .img-head {
    height: auto;
    max-width: 100%;
    background: #ffffff;
  }

  .red-packet {
    color: #fff;
    padding: 1em;
    height: 35em;
    margin: auto;
    max-width: 25em;
    overflow: hidden;
    position: relative;
    border-radius: 1em;
    background: #c40b00;
  }

  .red-packet header {
    top: -14.5em;
    left: 0;
    right: 0;
    height: 20em;
    position: absolute;
    border-radius: 100%;
    background: #b00b00;
  }

  .red-packet img {
    left: 0;
    right: 0;
    bottom: -2em;
    margin: auto;
    max-width: 5em;
    position: absolute;
    border-radius: 100%;
    border: 0.25em solid #fff;
  }

  .red-packet main {
    margin-top: 10em;
    text-align: center;
  }

  .red-packet .author {
    opacity: 0.7;
  }

  .red-packet .open {
    outline: 0;
    width: 3em;
    height: 3em;
    color: #fff;
    border: none;
    display: block;
    font-size: 2em;
    cursor: pointer;
    margin: 1em auto;
    background: #ffb03a;
    border-radius: 100%;
    transition: background 0.3s, transform 0.3s;
  }

  .red-packet .open:hover {
    transform: scale(1.1);
  }

  .red-packet .open:active {
    background: #eba534;
  }

  #marke {
    width: 100%;
    height: 100%;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 0.3;
    display: none;
  }

  #getMark {
    width: 70%;
    height: 20%;
    background: rgba(0, 0, 0, 0.5);
    margin: auto;
    position: absolute;
    z-index: 3;
    top: -30%;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
    text-align: center;
    border-radius: 30px;
    font-size: 1.5em;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  @keyframes red-packet {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>

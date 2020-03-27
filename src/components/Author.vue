<template>
</template>
<script language="javascript">
//防止页面后退
history.pushState(null, null, document.URL);
window.addEventListener("popstate", function() {
  history.pushState(null, null, document.URL);
});
</script>
<script type="text/ecmascript-6">
import { Toast, Popup, Indicator } from "mint-ui";
import router from "../router";
import { getCookie, setCookie } from "@/util/util";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      msg: "这个是Home模板页",
      code: "",
      state: "132465",
      redUrl: "http%3a%2f%2fzfb.hzhltec.com%2f%23%2fauthor",
      wxCode: "wx1f4ed91c7207f884",
      aliCode: "2017122301113289"
    };
  },
  mounted() {
    var _this = this;
    let backurl = getCookie("beforeLoginUrl");
    console.log(backurl);
    _this.state = backurl.substring(backurl.indexOf("#") + 7) || "noMachineId";

    if (/MicroMessenger/.test(window.navigator.userAgent)) {
      _this.code = _this.$route.query.auth_code || "000";
      var str = location.href;
      this.code = str.substring(
        str.indexOf("code=") + 5,
        str.indexOf("&state=")
      );
      if (!getCookie("mapptUser") && this.code.length < 10) {
        setCookie("requestType", "userinfo");
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          this.wxCode +
          "&redirect_uri=" +
          this.redUrl +
          "&response_type=code&scope=snsapi_userinfo&state=" +
          _this.state +
          "#wechat_redirect";
        return false;
      } else if (getCookie("mapptUser") && this.code.length < 10) {
        setCookie("requestType", "base");
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          this.wxCode +
          "&redirect_uri=" +
          this.redUrl +
          "&response_type=code&scope=snsapi_base&state=" +
          _this.state +
          "#wechat_redirect";
        return false;
      } else if (this.code.length > 10) {
        this.login();
        return false;
      }
    } else {
      _this.code = _this.$route.query.auth_code || "000";
      if (_this.code.length > 10) {
        _this.aliLogin();
        return false;
      } else {
        setCookie("requestType", "userinfo");
        window.location.href =
          "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=" +
          this.aliCode +
          "&scope=auth_user&redirect_uri=" +
          this.redUrl +
          "&state=132465";
      }
    }
  },
  methods: {
    ...mapActions(["add"]),
    ...mapGetters(["addGet", "getUserId"]),
    ...mapMutations(["setUserId"]),
    judgeMachine() {
      let backurl = getCookie("beforeLoginUrl");
      let machineId = backurl.substring(backurl.indexOf("#") + 7);
      this.$http
        .post(
          "/list/wwj.json",
          { cmd: "DEVSTATUS", machineId: machineId },
          { emulateJSON: true }
        )
        .then(
          function(res) {
            if (res.body.status === "0") {
              this.$router.push("/NotBind");
            } else {
              this.goBeforeLoginUrl();
            }
          },
          function(res) {}
        );
    },
    aliLogin() {
      this.$http
        .post(
          "/list/wwj.json",
          { cmd: "ALIUSER", authCode: this.code },
          { emulateJSON: true }
        )
        .then(
          function(res) {
            if (res.body.code === 200) {
              setCookie("mapptUser", res.body.uid);
              this.setUserId(res.body.uid);
              this.judgeMachine();
            }
          },
          function(res) {}
        );
    },
    login() {
      if (getCookie("requestType") === "userinfo") {
        this.getUid(this.code);
      } else if (getCookie("requestType") === "base") {
        this.getOpenId(this.code);
      } else {
        setCookie("requestType", "userinfo");
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          this.wxCode +
          "&redirect_uri=" +
          this.redUrl +
          "&response_type=code&scope=snsapi_userinfo&state=" +
          this.state +
          "#wechat_redirect";
      }
    },
    goBeforeLoginUrl() {
      var url = getCookie("beforeLoginUrl");
      if (!url || url.indexOf("/author") !== -1) {
        this.$router.push("/user");
      } else {
        if (url === "/") {
          url = "/user";
        }
        setCookie("beforeLoginUrl", "");
        console.log(url);
        this.$router.push(url);
      }
    },
    getOpenId(code) {
      this.$http
        .post(
          "/list/wwj.json",
          { cmd: "DIFFUSER", code: code, type: "WX" },
          { emulateJSON: true }
        )
        .then(
          function(res) {
            if (res.body.code === 200) {
              setCookie("mapptUser", res.body.uid);
              this.setUserId(res.body.uid);
              this.judgeMachine();
            } else {
              setCookie("requestType", "userinfo");
              //window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce707c694c026d58&redirect_uri='+this.redUrl+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
              window.location.href =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
                this.wxCode +
                "&redirect_uri=" +
                this.redUrl +
                "&response_type=code&scope=snsapi_userinfo&state=" +
                this.state +
                "#wechat_redirect";
              return false;
            }
          },
          function(res) {}
        );
    },
    getUid(code) {
      this.$http
        .post(
          "/list/wwj.json",
          { cmd: "NEWUSER", code: code },
          { emulateJSON: true }
        )
        .then(
          function(res) {
            if (res.body.code === 200) {
              setCookie("mapptUser", res.body.uid);
              this.setUserId(res.body.uid);
              this.judgeMachine();
            } else {
              setCookie("mapptUser", "", -1);
            }
          },
          function(res) {}
        );
    }
  }
};
</script>

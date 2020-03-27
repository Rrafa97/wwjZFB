<template>
  <div id="app">
    <!--<header>
      &lt;!&ndash; router-link 定义点击后导航到哪个路径下 &ndash;&gt;
      <router-link to="/">Home</router-link>
      <router-link to="/user">About</router-link>
    </header>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted() {
      //   window.onpopstate = () => {
      //     if (!this.allowBack) {    //    这个allowBack 是存在vuex里面的变量
      //     history.go(1)
      //     }
      //   }

    }
  }
</script>

<style>
  body{
    margin:0 ;
  }

  * {
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  #app{
    padding :0;
    margin: 0;
  }
</style>

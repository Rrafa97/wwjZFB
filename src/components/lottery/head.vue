<template>
  <div class="userMsg">
    <div class="head-img-left">
      <img :src='userMsg.userAvatar' class="head-img">
    </div>
    <router-link to="/UserConsume">
      <div class="head-img-right">
        个人中心
      </div>
    </router-link>
  </div>
</template>

<script>
    export default {
        name: "head"
    }
</script>

<style scoped>

</style>

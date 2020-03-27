<template>
    <div class="pay-monthly">
      <div class="choose-head">
        套餐/活动专区
      </div>
      <div class="choose-tip">（先充值再启动设备。预充不退，用完为止）</div>
      <div v-for="item in packMon" class="choose-box" @click="payMonStart(item.packageId)">
        <span>{{item.packagePrice}} 元</span>
        <span>{{item.packageCurrency}} 币</span>
      </div>

    </div>
</template>

<script>
    export default {
        name: "payMonthly",
        props: ['packMon'],
      data: function () {
        return {
          popupVisible: false
        }
      },
      methods: {
      payMonStart: function (packageId) {
        DEVONLINE(getCookie('machineId')).then(res => {
          if (res.data.code === 200) {
            this.$emit("payMon", packageId)
          } else {
            MessageBox.confirm('当前设备不在线，是否充值？').then(action => {
              this.$emit("payMon", packageId)
            });
          }
        })
      }
      }
    }
</script>

<style scoped>

  .pay-monthly {
    width: 7.5rem;
    height: 3rem;
    background-color: #0ea3ff47;
    margin-top: 0.2rem;
    padding-top: 0.6rem;
    font-size: 0;
  }

  .choose-head {
    font-size: 0.4rem;
    color: #333;
    width: 100%;
    text-align: center;
    margin-bottom: 0.3rem;
  }

  .choose-tip {
    font-size: 0.28rem;
    font-weight: bold;
    color: red;
    width: 100%;
    text-align: center;
    margin-bottom: 0.3rem;

  }

  .choose-box {
    display: inline-block;
    background: url("../../assets/img/choose-box.png") no-repeat;
    background-size: cover;
    width: 2.45rem;
    height: 1.43rem;
    color: #939393;
    font-size: 0.38rem;
    text-align: center;
    line-height: 0.38rem;
    padding-top: 0.25rem;
  }


  .choose-box span {
    display: block;
  }
  .choose-box:active {
    display: inline-block;
    background: url("../../assets/img/choose-box1.png") no-repeat;
    background-size: cover;
    width: 2.45rem;
    height: 1.43rem;
    color: #666;
    font-size: 0.38rem;
    text-align: center;
    line-height: 0.38rem;
    padding-top: 0.25rem;
  }
</style>

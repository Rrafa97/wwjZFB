<template>
  <div class="pay">
    <div class="choose-tip">（投币一概不存不退，只能在本机使用，请合理投币）</div>
    <div class="coin-number">
      <div class="up" @click="coinCut" @touchstart="cutStart()" @touchend="cutEnd">
        <div class="up-cut"></div>
      </div>
      <input type="number" :change="checkPrice()" v-model="coin" class="coin-input">
      <div class="up" @click="coinAdd" @touchstart="addStart()" @touchend="addEnd()">+</div>
      <!--      <div class="coin-input-box">
              <input type="number" :change="checkPrice()" v-model="coin" class="coin-input">
            </div>
            <div class="up-down">
              <div class="up" @click="coinAdd" @touchstart="addStart()" @touchend="addEnd()">+</div>
              <div class="up" @click="coinCut" @touchstart="cutStart()" @touchend="cutEnd">-</div>
            </div>-->
    </div>
    <img class="pig-nose" src="../../assets/img/pig-nose.png">
    <div class="pig-nose-click" @click="start"></div>
  </div>
</template>

<script>
  import {getDevState} from '@/api/request'
  import {Toast} from 'mint-ui'

  export default {
    props: ['userMsg', 'machineMsg', 'uid', 'machineId'],
    data() {
      return {
        coin: 1,
        paycoin: 1,
        addTime: 0,
        addTravel: null,
        addIsTravel: true,
        cutTime: 0,
        cutTravel: null,
        cutIsTravel: true,

      }
    },
    mounted() {
      getDevState(this.machineId).then(response => {
        if (response.data.code === 200) {
          this.coin = response.data.data.devCoin
          this.paycoin = response.data.data.devCoin
        } else {
          Toast(response.data.msg)
        }
      })
    },
    methods: {
      checkPrice() {
        if (this.coin > 250) {
          Toast('金额不能大于250')
          this.coin = 250
        } else if (this.coin < 0) {
          this.coin = 0
        }
      },
      showImgNum(num) {
        if (num < 10) {
          return '../../../static/img/' + num + '.png'
        } else {
          return '../../../static/img/' + 0 + '.png'
        }
      },
      showImgTen() {
        if (this.coin > 9) {
          let one = this.coin % 10;
          let ten = (this.coin - one) / 10 % 10;
          return '../../../static/img/' + ten + '.png'
        } else {
          return '../../../static/img/' + 1 + '.png'
        }
      },
      showImgOne() {
        if (this.coin > 9) {
          let one = this.coin % 10;
          return '../../../static/img/' + one + '.png'
        } else {
          return '../../../static/img/' + 1 + '.png'
        }

      },
      coinAdd() {
        if (this.coin < 99) {
          this.coin += this.paycoin
        }
      },
      coinCut() {
        if (this.coin >= this.machineMsg.devCoin) {
          this.coin -= this.paycoin
        }
      },
      start() {
        if (this.coin > 250 ) {
          Toast('单次不支持250元以上支付')
        } else {
          this.$emit("onStart", this.coin)
          this.coin = 0
        }
      },
      addStart(ev) {
        ev = ev || event;
        ev.preventDefault();
        this.addIsTravel = true
        this.addTime = ev.timeStamp.toFixed(2)
        const that = this
        setTimeout(function () {
          if (that.addIsTravel) {
            that.addTravel = setInterval(function () {
              if (that.addIsTravel) {
                that.coin++
              } else {
                clearInterval(that.addTravel)
                that.addTravel = null
              }
            }, 100)
          } else {
            clearInterval(that.addTravel)
            that.addTravel = null
          }
        }, 800)
      },
      addEnd(ev) {
        ev = ev || event;
        ev.preventDefault();
        this.addIsTravel = false
        let endTime = ev.timeStamp.toFixed(2)
        let changeTime = endTime - this.addTime

        if (changeTime < 800) {
          this.coin = this.coin + this.paycoin
        }
      },
      cutStart(ev) {
        ev = ev || event
        ev.preventDefault()
        this.cutIsTravel = true
        this.cutTime = ev.timeStamp.toFixed(2)
        const that = this
        setTimeout(function () {
          that.cutTravel = setInterval(function () {
            if (that.cutIsTravel) {
              that.coin--
            } else {
              clearInterval(that.cutTravel)
            }
          }, 100)
        }, 800)
      },
      cutEnd(ev) {
        ev = ev || event
        ev.preventDefault()
        this.cutIsTravel = false
        let cutEndTime = ev.timeStamp.toFixed(2)
        const changeTime = this.cutTime - cutEndTime
        if (changeTime < 800) {
          this.coin = this.coin - this.paycoin
        }

      }
    },

  }
</script>

<style scoped>
  .pay {
    position: relative;
    padding-top: 0.6rem;
  }

  .coin-number {
    width: 100%;
    position: relative;
    height: 0.62rem;
    font-size: 0;
    text-align: center;
  }

  .coin-number-in-1 {
    position: absolute;
    left: 3.3rem;
    width: 0.62rem;
    top: -0.31rem;
  }

  .coin-number-in-2 {
    position: absolute;
    left: 3.7rem;
    width: 0.62rem;
    top: -0.31rem;
  }

  .coin-number-in-3 {
    position: absolute;
    left: 3.5rem;
    width: 0.62rem;
    top: -0.31rem;
  }

  .coin-cut {
    position: absolute;
    left: 2.25rem;
    width: 0.52rem;
    height: 0.21rem;
    top: -0.105rem;
  }

  .coin-more {
    position: absolute;
    right: 2.25rem;
    width: 0.42rem;
    height: 0.42rem;
    top: -0.21rem;
  }

  .pig-nose {
    position: absolute;
    left: calc(50% - 2.1rem);
    top: 1.9rem;
    width: 4.2rem;
    height: 4.2rem;
  }

  .pig-nose-click {
    position: absolute;
    left: calc(50% - 1.5rem);
    top: 2.6rem;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;

  }

  .pay-coin {
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.62rem;
    vertical-align: top;
  }

  .coin-input {
    width: 1.4rem;
    line-height: 0.66rem;
    border: none;
    vertical-align: top;
    margin-top: -0.1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    text-align: center;
    font-size: 0.38rem;
  }

  .coin-input-box {
    margin-left: 0.1rem;
    display: inline-block;
    width: 1.32rem;
    height: 0.62rem;
    border: #d3d3d3 solid 1px;
    background-color: #fff;
  }

  .up-down {
    margin-left: 0.1rem;
    display: inline-block;
    height: 0.62rem;
    width: 0.48rem;
    vertical-align: top;
    font-size: 0.24rem;

  }

  .up {
    display: inline-block;
    line-height: .5rem;
    color: #5e5e5e;
    text-align: center;
    font-size: .6rem;
    font-weight: 600;
    padding: 0.2rem;
    margin-top: -0.2rem;
  }

  .up-cut {
    display: block;
    background-color: #5e5e5e;
    width: 0.28rem;
    height: 0.04rem;
    margin-top: -0.1rem;
  }

  .choose-tip {
    font-size: 0.3rem;
    font-weight: bold;
    color: red;
    width: 100%;
    text-align: center;
    margin-bottom: 0.3rem;

  }

</style>

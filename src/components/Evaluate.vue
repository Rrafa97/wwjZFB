<template>
  <div>
    <form>
      <div class="gary-line"></div>
      <div class="evaluate-head">
        <div class="evaluate-head-left">
          <div class="evaluate-head-left-img"></div>
          <div class="evaluate-head-left-msg">{{devName}}</div>
        </div>
        <div class="evaluate-head-right">
          <ul id="rating">
            <li class="evaluate-rating-item" :class="[item<=curId ? 'evaluate-rating-item-star':'']"
                v-for="item in stararr" @click="setStar(item)"></li>
          </ul>
          <input type="hidden" name="star" v-model="curId">
        </div>
      </div>
      <hr>
      <div class="evaluate-content">
        <div class="evaluate-content-msg">
          <textarea placeholder="宝贝满足你的期待吗？说说你的心得，分享给想买的他们吧" v-model="content"></textarea>
          <div class="evaluate-content-img">
            <!--<img src="../assets/img/take-pic.png" alt="" >-->
            <uploader :src="'/api/imgs'" :class="isNop?'foot-btn-NOP':''" @transferFiles="getFiles"></uploader>
          </div>
        </div>
      </div>

      <!--       <hr style="margin-left: 0.24rem"/>
             <div class="evaluate-isHidden">
               <img src="../assets/img/isHidden-true.png">
               <span class="black-font">匿名</span>
               <span class="gary-font">你写的评价会以匿名的形式展现</span>
             </div>-->
      <div class="foot-btn" @click="submitForm($event)">提交</div>
      <!--<div class="foot-btn" @click="AAA">提交</div>-->
    </form>
  </div>
</template>

<style scoped>
  @import "../assets/css/common.css";
  @import "../assets/css/style-user.css";
</style>

<script type="text/ecmascript-6">
  import uploader from './uploader.vue'

  import { Toast,Popup,Indicator } from 'mint-ui';

  export default{
    data () {
      return {
        stararr: [1, 2, 3, 4, 5],
        curId: 0,
        files: [],
        content: "",
        isUpdate: true,
        devName:"",
        isNop:false
      }
    },
    components: {
      uploader
    },
    methods: {
      setStar(id) {
        // console.log(id);
        this.curId = id;
      },
      compress(file, quality, callback) {
        if (!window.FileReader || !window.Blob) {
          return errorHandler('您的浏览器不支持图片压缩')();
        }

        var reader = new FileReader();
        var mimeType = file.type || 'image/jpeg';

        reader.onload = createImage;
        reader.onerror = errorHandler('图片读取失败！');
        reader.readAsDataURL(file);

        function createImage() {
          var dataURL = this.result;
          var image = new Image();
          image.onload = compressImage;
          image.onerror = errorHandler('图片加载失败');
          image.src = dataURL;
        }

        function compressImage() {
          var canvas = document.createElement('canvas');
          var ctx;
          var dataURI;
          var result;

          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;
          ctx = canvas.getContext('2d');
          ctx.drawImage(this, 0, 0);
          dataURI = canvas.toDataURL(mimeType, quality);
          result = dataURIToBlob(dataURI);

          callback(null, result);
        }

        function dataURIToBlob(dataURI) {
          var type = dataURI.match(/data:([^;]+)/)[1];
          var base64 = dataURI.replace(/^[^,]+,/, '');
          var byteString = atob(base64);

          var ia = new Uint8Array(byteString.length);
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }

          return new Blob([ia], {type: type});
        }

        function errorHandler(message) {
          return function () {
            var error = new Error('Compression Error:', message);
            callback(error, null);
          };
        }
      },

      runAsync(callback){
        setTimeout(function () {
          console.log('执行完成');
          resolve('随便什么数据');
        }, 2000);
      },
      AAA(){
        var _this = this;
        new Promise(function (resolve) {
          _this.files.forEach((item) => {
            _this.compress(item.file, 0.5, function (err, data) {
              if (err) {
                alert(err);
                return;
              }
              alert(data);
              // formData.append(item.name, data);
              //resolve(formData);
              console.log("this is first one ");
              //console.log(formData.get(item.name));
              // 接下来就可以用 ajax 提交 fromdData
              resolve(data)
            });
            //alert("支持")

          })}).then(function (data) {
          alert(data)
        })
      },
      submitForm($event){
        var formData = new FormData()
        var _this = this;
        var time = 0.5;
        event.preventDefault();


        new Promise(function (resolve) {
          if(_this.files.length >0){
            _this.files.forEach((item) => {
              console.info('item.file  ' + item.file)
              console.info(item.file)
              if (item.size > 50000) {
                var time = 0.2;
              }
              _this.compress(item.file, time, function (err, data) {
                if (err) {
                  console.log(err);
                  return;
                }
                console.log(data);
                formData.append(item.name, data);
                resolve(formData);
                console.log("this is first one ");
                console.log(formData.get(item.name));
                // 接下来就可以用 ajax 提交 fromdData
              });
            })}else {resolve(formData);}
        }).then(function (data) {
            Indicator.open('图片上传中');
            console.log(data)//这里的data就是上面resolve传进来的formdata
            formData.append('cmd', 'EVALUATE');
            formData.append('machineId', _this.$route.query.machineId);
            formData.append('date', _this.$route.query.payTime);
            formData.append('starNum', _this.curId);
            formData.append('content', _this.content)
            formData.append('isHidden', 1);
            formData.append('uid', _this.$route.query.uid);
            console.log("this is second one ")
            //alert(_this.isUpdate)
            // console.log(formData.get("content"))
            if (_this.isUpdate) {
              _this.isUpdate = false;
              _this.isNop = true
              //$(".foot-btn").addClass('foot-btn-NOP');
              console.log('进入图片上传部分')
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              };

              _this.$http.post('/list/wwj.json', formData, config).then(function (res) {
                //alert(res.body.code  +  res.body.msg)
                if (res.body.code === 200) {
                  Indicator.close();
                  /*这里做处理*/
                  console.info('---------------图片上传成功----------------');
                  console.info(res.msg);
                  Toast('评价成功')
                  setTimeout(function () {
                    history.go(-1);
                  }, 1200)

                }else {
                  Toast('系统异常，评价失败')
                  Indicator.close();
                }
              })
            }
          }
        )
        /*        _this.runAsync().then(function () {
         }).then(function () {

         })*/
        /*   formData.append(item.name, item.file)
         console.log(item.file);
         console.log(item);*/
      },

      getFiles(files){
        this.files = files;
      }

    },


    created: function () {
      var id = this.$route.query.machineId;
      this.devName = this.$route.query.devName;
      console.info(this.$route.query.uid);
      console.info('isUpdate is ' + this.isUpdate);

      console.info(id)
    },
  }
</script>

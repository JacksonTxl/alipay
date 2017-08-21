<template>
  <main class="near">
     <ul v-if="poles.length>0">
         <li v-on:click="goDetail(pole.device_no, pole.device_type)" v-for="pole in poles" >
             <div class="text">
                 <label>{{pole.device_name}}</label>
                 <div class="address"><img src="../../images/near-log.png">{{pole.device_address}}</div>
                 <div class="number"><img src="../../images/near-power.png">空闲中{{pole.free_total}}个</div>
             </div>
             <div class="distance">
                 <img src="../../images/near-arrow.png">
                 {{pole.distance}}km
             </div>
         </li>
     </ul>
     <p v-else class="no-data">暂无数据</p>
  </main>
</template>

<script>
import  { Indicator, MessageBox } from 'mint-ui'
import CONSTANT from '../../util/constant';
  export default {
    data() {
      document.title="附近的桩";

      return {
           poles : [],
           ali_user_id: ''
      }
    },
    components: {

    },
    filters: {
        dealData : (value)=>{
            return CONSTANT.basic.CHARGE_STATION_PIC+value.split(",")[0];
        }
    },
    methods: {
       goDetail(device_no, device_type){
            if (device_type == 1) {
                location.href=location.origin + '/payQRcode.html?device_no=' + device_no;
            }
       },


       tips(message,title,func){
             if(typeof func == "function"){
                MessageBox.alert( message , title ).then(func);
             }else {
                MessageBox.alert( message , title );
             }
       },
       loading(type){
           if(type=='open'){
                Indicator.open({
                  text: '加载中...',
                  spinnerType: 'fading-circle'
                });
           }else if (type== 'close'){
                Indicator.close();
           }
       },
       getUserId () {
           var _this = this;
           this.$http.post(CONSTANT.api.GET_USER_ID,{
               params : {
                   auth_code : _this.$route.query.auth_code || '123',
               }
           })
               .then((response) => {
                   response.text().then((value) => {
                       var data = JSON.parse(value);
                       if(data.status){
                           _this.ali_user_id = data.data.ali_user_id;
                           _this.loading("close");
                           _this.getLocationAlipay();

                       }else{
                           _this.loading("close");
                           _this.tips(data.error_msg || '获取用户id失败！',"提示");
                       }

                   })
               })
       },
       getLocationAlipay(){
           var _this = this;

           if (window.AlipayJSBridge) {
               _this.loading("open");
               getLocationAlipayInternal();
           } else {
               // 不是在支付宝里面打开的
               this.tips('请在支付宝内打开链接！','错误')
           }
           function getLocationAlipayInternal(){
               AlipayJSBridge.call('getLocation', {requestType: 2}, function (result) {
                   if (result.error) {
                       alert(result.errorMessage);
                       return;
                   }

                   const PI = 3.14159265358979324 * 3000.0 / 180.0;
                   let lat = result.latitude; // 纬度，浮点数，范围为90 ~ -90
                   let lon = result.longitude; // 经度，浮点数，范围为180 ~ -180。
                   let z = Math.sqrt(lon * lon + lat * lat) + 0.00002 * Math.sin(lat * PI);
                   let theta = Math.atan2(lat, lon) + 0.000003 * Math.cos(lon * PI);

                   lon = z * Math.cos(theta) + 0.0065;
                   lat = z * Math.sin(theta) + 0.006;
                   _this.$http.post(CONSTANT.api.APP_GET_DEVICE_LIST,{
                       params : {
                           device_lat : lat,
                           device_lng : lon
                       }
                   },{
                       headers: {
                           'ali-user-id': _this.ali_user_id
                       }
                   })
                       .then((response) => {
                           response.text().then((value) => {
                               var data = JSON.parse(value);
                               if(data.status){
                                   _this.poles = data.data.list;
                                   _this.poles.map((element, index) => {

                                       // 获取距离
                                       let pLat = element.device_lat;
                                       let pLon = element.device_lng;

                                       let lat1 = (Math.PI / 180) * lat;
                                       let lat2 = (Math.PI / 180) * pLat;

                                       let lon1 = (Math.PI / 180) * lon;
                                       let lon2 = (Math.PI / 180) * pLon;

                                       const R = 6371;

                                       let distance = Math.acos(Math.sin(lat1) *
                                           Math.sin(lat2) +
                                           Math.cos(lat1) *
                                           Math.cos(lat2) *
                                           Math.cos(lon2 - lon1)) * R;

                                       element.distance = distance.toFixed(1);
                                   })
                                   console.log(_this.poles);
                                   // 按距离远近排序
                                   _this.poles.sort((a, b) => {
                                       return a.distance * 10 - b.distance * 10;
                                   });
                                   _this.loading("close");
                               }else{
                                   _this.loading("close");
                                   _this.tips(data.error_msg || '获取附近的充电桩失败！',"提示");
                               }

                           })
                       })
               });
           }

       }
    },
    mounted(){
        this.$nextTick(function () {
            this.getUserId();
        })
    }
  }

</script>
<style lang="scss">
.near{
    >ul{
        margin: 10px 0 55px 0 ;
        padding: 0;
        background-color: #fff;
        position: relative;
        >li{
            display: flex;
            padding: 10px 15px;
            position: relative;
            >img{
                height: 70px;
                width: 70px;
                margin-right: 11px;
            }
            >.text{
                flex: 1;
                align-items: flex-start;
                -webkit-box-align: start;
                -webkit-align-items: flex-start;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                font-size: 12px;
                >label{
                    font-size: 16px;
                    color: #333;
                    font-weight: bold;
                }
                >.address{
                    margin-top: 8px;
                    >img{
                        height: 12px;
                        margin-right: 6px;
                    }
                }
                >.number{
                    margin-top: 3px;
                    >img{
                        height: 12px;
                        margin-right: 6px;
                    }
                }
            }
            >.distance{
                font-size: 14px;
                line-height: 12px;
                >img{
                    height: 12px;
                }
            }
            &:after{
                content:"";
                position: absolute;
                bottom:0px;
                left:0px;
                right:0px;
                border-bottom: 1px solid #d9d9d9;
                -webkit-transform:scaleY(0.5);
                -webkit-transform-origin:0 0;
            }
        }
        &:after{
            content:"";
            position: absolute;
            top:0px;
            left:0px;
            right:0px;
            border-top: 1px solid #d9d9d9;
            -webkit-transform:scaleY(0.5);
            -webkit-transform-origin:0 0;
        }
    }
    >.no-data{
        margin-top: 20px;
        color: #666;
        text-align: center;
    }
}
</style>
<template>
    <div class="orderdetails">
        <div class="order-details">
            <div class="title">{{orderdetails.device_name}}</div>
            <div class="descript"><label>{{orderdetails.order_sum}}</label><p v-if="orderdetails.order_status === 5" class="error">{{orderdetails.order_status_name}}</p><p v-if="orderdetails.order_status != 5">{{orderdetails.order_status_name}}</p></div>
            <ul>
                <li><div class="name">订单号</div><div class="value">{{orderdetails.order_no}}</div></li>
                <li><div class="name">充电桩编号</div><div class="value">{{orderdetails.device_no}}</div></li>
                <li><div class="name">商品名称</div><div class="value">{{orderdetails.commodity_name}}</div></li>
                <li><div class="name">商品描述</div><div class="value">{{orderdetails.commodity_description}}</div></li>
                <li><div class="name">所充时长</div><div class="value">{{orderdetails.order_duration}}</div></li>
                <li><div class="name">充电口</div><div class="value">{{orderdetails.gun_num}}</div></li>
                <li><div class="name">商家</div><div class="value">{{orderdetails.business_name}}</div></li>
                <li><div class="name">创建时间</div><div class="value">{{orderdetails.create_time}}</div></li>
                <li><div class="name">设备地址</div><div class="value">{{orderdetails.address}}</div></li>
            </ul>
        </div>

    </div>
</template>

<script>
import  { Indicator, MessageBox } from 'mint-ui'
import CONSTANT from '../../util/constant';
export default {

    data () {
        // 修改标题
        document.title = '充电记录详情';
        const ORDERID = this.$route.query.orderid;
        const ALIUSERID = CONSTANT.getCookie('ali_user_id');

        return {
            orderid : ORDERID,
            ali_user_id : ALIUSERID || '',
            orderdetails: {},

        };
    },
    components: {

    },
    filters : {
        dealMoney : (value)=>{
          return '¥ '+value;
        },
        dealData : (value)=>{
            return (Number(value)/1000).toFixed(3);
        }
    },
    methods : {
        getOrderDetail(){
            let _this=this;
            _this.loading("open");
            this.$http.post(CONSTANT.api.APP_GET_ORDER,{
                params:{
                    order_id: _this.orderid
                }
            },{
                headers: {
                    'ali-user-id': _this.ali_user_id
                }
            })
             .then((response) => {
                response.text().then(function (value) {
                  _this.loading("close");
                  var data = JSON.parse(value);
                  if(data.status){
                     _this.orderdetails = data.data.order;
                  }else{
                     _this.tips(data.error_msg || '获取充电记录详情失败！',"提示");
                  }
                })
             })
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
    },
    mounted(){
        this.getOrderDetail();
    },
};
</script>

<style lang="scss" scoped>
    .orderdetails{
        background-color: white;
        font-size: 14px;
        color: #000;
        height: 100%;
        .order-details{
            .title{
                font-size: 16px;
                height: 65px;
                line-height: 65px;
                text-align: center;
                margin-left: 35px;
                margin-right: 35px;
                border-bottom: 1px solid #d9d9d9;
            }

            .descript{
                text-align: center;
                border-bottom: 1px solid #d9d9d9;
                margin-left: 35px;
                margin-right: 35px;
                height: 105px;
                label{
                    display: inline-block;
                    line-height: 86px;
                    font-size: 40px;
                }
                p{
                    font-size: 16px;
                    line-height: 0px;
                    margin-top: -9px;
                }
                .error{
                    color: #e30e0e;
                }
            }

            ul{
                margin: 0;
                list-style-type: none;
                padding: 0 35px;
                padding-top: 9px;
                li{
                    padding-bottom: 9px;
                    display: flex;
                    .name{
                        float: left;
                        color: #808080;
                    }
                    .value{
                        padding-left: 90px;
                        word-wrap: break-word;
                        word-break: break-all;
                    }
                }
            }
        }
    }


</style>

<template>
  <main class="order">
      <p v-if="order.length === 0">
          暂无充电记录
      </p>
      <div class="weui_cells" v-for="record in order" track-by="$index" @click="goOrderDetail(record.order_id);">
          <div class="weui_cell">
              <div class="left">
                  <h2>{{record.device_name}}</h2>
                  <span>{{record.order_status_name}}</span>
                  <time>{{record.create_time}}</time>
              </div>
              <div class="right">
                  <span> {{record.order_sum | dealMoney}}</span>
              </div>
          </div>
      </div>


  </main>
</template>

<script>
 import { Indicator, MessageBox } from 'mint-ui'
 import CONSTANT from '../../util/constant';

  export default {
    data() {
      document.title="充电记录";
      var ALIUSERID = CONSTANT.getCookie('ali_user_id');
      return {
        page : 1 ,
        total : 1 ,
        order:[],
        ali_user_id: ALIUSERID || ''
      }

    },
    filters : {
        dealMoney : (value)=>{
          return '¥ '+value;
        }
    },
    components: {

    },
    methods: {
        getUserId () {
            var _this = this;
            this.$http.post(CONSTANT.api.GET_USER_ID,{
                params : {
                    auth_code : _this.$route.query.auth_code || '123',
                }
            })
                .then((response) => {
                    response.text().then((value) => {
                        _this.loading("close");
                        var data = JSON.parse(value);
                        if(data.status){
                            _this.ali_user_id = data.data.ali_user_id;
                            CONSTANT.setCookie('ali_user_id', data.data.ali_user_id ,24*60*60*1000);
                            _this.getOrderList();

                        }else{
                            _this.loading("close");
                            _this.tips(data.error_msg || '获取用户id失败！',"提示");
                        }

                    })
                })
        },
        getOrderList(){
            let _this=this;
            _this.loading("open");
            this.$http.post(CONSTANT.api.APP_GET_ORDER_LIST , {
                params : {
                    page_now : _this.page,
                    limit : 10,
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
                     _this.order = _this.order.concat(data.data.list);
                     _this.total = Math.ceil(data.data.total_num / 10);
                  }else{
                     _this.tips(data.error_msg || '获取充电记录失败！',"提示");
                  }
                })
             })
        },
        getPageList(){
            let _this = this;
            document.addEventListener('scroll', () => {
                if (window.innerHeight + pageYOffset === document.body.scrollHeight) {
                    if (_this.page < _this.total) {
                        _this.loading("open");
                        _this.page += 1;
                        _this.getOrderList();
                    }
                }
             });
        },
        goOrderDetail(id){
            location.href = location.origin + '/dist/#/orderdetails?orderid='+id ;
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
        if(this.ali_user_id){
          this.getOrderList();
        }else{
          this.getUserId();
        }
        this.getPageList();
    }
  }
</script>
<style lang="scss" scope>
    .order {
        color: #333;
        margin-bottom: 55px;
        .weui_cells {
            margin-top: 0;
            .weui_cell {
                height: 70px;
                padding-top: 0;
                padding-bottom: 0;
                display: flex;
                background-color: #fff;
                position: relative;
                .left {
                    flex: 2;
                    h2 {
                        width: 100%;
                        height: 1.5em;
                        margin: 0px;
                        font-size: 15px;
                        display: block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    span {
                        position: relative;
                        top: 4px;
                        color: #808080;
                        font-size: 12px;
                        display: block;
                    }
                    .red{
                        color: red;
                    }
                    time {
                        position: relative;
                        top: 4px;
                        color: #808080;
                        font-size: 13px;
                    }
                }
                .right {
                    height: 100%;
                    text-align: center;
                    flex: 1;
                    span {
                        font-size: 20px;
                        vertical-align: top;
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
        }
        >p {
            margin-top: 20px;
            color: #666666;
            text-align: center;
        }
    }
</style>
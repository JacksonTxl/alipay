export default {
    basic: {
        SERVICE_CODE: '',
        APPID: 'wx6c71eca4e9639fae',//公众号id
        APERATORID: '6F72670000000000a000000000000003',//平台id
        STATE : 'newQC',
        SCOPE : 'snsapi_base',
        CHARGE_STATION_PIC : 'http://int01.unicharge.net/api/pub/api/get_file/hash/',
    },
    dialog: {
        SUCCESS:'支付完成!',
    },
    api: {
        GET_USER_ID: location.origin + '/api/quchong/app/get_alipay_user_id/',
        APP_GET_DEVICE_LIST: location.origin + '/api/quchong/app/app_get_device_list/',
        APP_GET_ORDER_LIST: location.origin + '/api/quchong/app/app_get_order_list/',
        APP_GET_ORDER: location.origin + '/api/quchong/app/app_get_order/',

        GET_WX_ID: location.origin + '/api/mni/api/get_wx_id/hash/',
        GET_USER_INFO_BY_WX: location.origin + '/api/mni/api/get_user_info_by_wx/hash/',
        GET_JSAPI_SIGN: location.origin + '/api/mni/api/get_jsapi_sign/hash/',
        WX_SEND_MOBILE_CODE: location.origin + '/api/mni/api/wx_send_mobile_code/hash/',
        WX_BIND_MOBILE: location.origin + '/api/mni/api/wx_bind_mobile/hash/',
        //充电接口
        GET_EVSE_BY_EVSE_CODE_APP: location.origin + '/api/mni/api/get_evse_by_evse_code_app/hash/',
        START_CHARGE_APP: location.origin + '/api/mni/api/app_start_charge_app/hash/',
        STOP_CHARGE_APP: location.origin + '/api/mni/api/app_stop_charge_app/hash/',
        GET_CHARGE_REALTIME_APP: location.origin + '/api/mni/api/get_charge_realtime_app/hash/',
        GET_ORDER_LIST_APP: location.origin + '/api/mni/api/get_order_list_app/hash/',
        GET_ORDER_AND_DETAILS_WX: location.origin + '/api/mni/api/get_order_and_details_wx/hash/',
        WECHAT_UNIFIED_ORDER: location.origin + '/api/mni/api/wechat_unified_order/hash/',
        CREATE_DEPOSIT_ORDER: location.origin + '/api/mni/api/create_deposit_order/hash/',
        GET_WX_USER_LOG_LIST: location.origin + '/api/mni/api/get_wx_user_log_list/hash/',
        GET_CHARGE_USER_LOG_LIST_APP: location.origin + '/api/mni/api/get_charge_user_log_list_app/hash/',
        GET_CHARGE_STATION_LIST_WX: location.origin + '/api/mni/api/get_charge_station_list_wx/hash/',
        GET_CHARGE_STATION_INFO_APP: location.origin + '/api/mni/api/get_charge_station_info_app/hash/',
    },
    getparams : function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    getParamsNew : function(name){
        var reg = new RegExp('^http.*'+name+'=([^&]*)(&|$)');
        var r = window.location.href.match(reg);
        if(r!=null)return  unescape(r[1]); return null;
    },
    getCookie : function(c_name){
        if (document.cookie.length>0){
            var c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1){
                c_start=c_start + c_name.length+1
                var c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    },
    setCookie : function(c_name,value,expiredays){
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }

};

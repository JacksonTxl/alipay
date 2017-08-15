var request = require('request');
var fs = require('fs');
//去充的阿里生活号
var APPID = '2016090501849245';
// var METHOD = 'alipay.open.public.menu.modify';
var METHOD = 'alipay.open.public.personalized.menu.create';

var CHARSET = 'utf-8';
var FORMAT = 'JSON';

var SIGNTYPE = 'RSA2';
var SIGN = 'VxnOwhwnA38mO5WLwYNe9VDS4XoTEPKQb0EVbHDA1AMUjglH5lq2Owzt7S0W1F3+dMC5dBYCxUm5ItdV8Esozk3/heFSG17mn1X6+1J4Sy2oRePGhmgL+d7OwXoO5vs062c0t8JZ6FtihFuTkZfEuHbPQvOfPEiapwKpoNK7424G1G6PNSWXPw3BRCIzzzaB0Oi037FVNfmpe5/ERqIgY+DbSQBLRn68eH/SskQRn5WS5GwCTuL8y01zGFAVyR3n98sCMWvy3dc/aYydp1bfGjRtb5Pg8KthuCeuvpteXTEjEQ0E1eepEAn1b/UZMzXHSFrZvvwLNZkcR3OXEVNxzg==';
var VERSION = '1.0';
var TIMESTAMP = '2017-08-14 17:24:00';


//自定义菜单
function createMenue (){
    var menu = {
        button:[
            {
                name:"附近",
                action_type:"map",
                action_param:"徐家汇"
            },{
                name:"扫码充电",
                action_type:"consumption"
            },{
                name:"我的",
                sub_button:[{
                    name:"我的账户",
                    action_type:"link",
                    action_param:"http://w.iquchong.com/payQRcode.html"
                },{
                    name:"充电记录",
                    action_type:"link",
                    action_param:"http://www.baidu.com"
                },{
                    name:"绑定手机",
                    action_type:"link",
                    action_param:"http://www.baidu.com"
                },{
                    name:"关于我们",
                    action_type:"link",
                    action_param:"http://w.iquchong.com/#!/view"
                },{
                    name:"下载APP",
                    action_type:"link",
                    action_param:"http://w.iquchong.com/#!/download"
                }]
            }
        ],
        type:"text"
    };
    var menuperson = {
        button: [{
            name:"附近",
            action_type:"map",
            action_param:"徐家汇",
            icon: 'http://w.iquchong.com/alipayicon/phone.png'
        }],
        label_rule: [{
            label_id: 69,
            operator: '',
            label_value: '主页',
        }],
        type:'icon'
    };
    var createUrl='https://openapi.alipay.com/gateway.do?timestamp='+encodeURIComponent(TIMESTAMP)+'&method='+encodeURIComponent(METHOD)+'&app_id='+encodeURIComponent(APPID)+'&sign_type='+encodeURIComponent(SIGNTYPE)+'&sign='+encodeURIComponent(SIGN)+'&version='+encodeURIComponent(VERSION)+'&format='+encodeURIComponent(FORMAT)+'&charset='+encodeURIComponent(CHARSET)+'&biz_content='+encodeURIComponent(JSON.stringify(menuperson));
    console.log('timestamp='+TIMESTAMP+'&method='+METHOD+'&app_id='+APPID+'&sign_type='+SIGNTYPE+'&version='+VERSION+'&format='+FORMAT+'&charset='+CHARSET+'&biz_content='+JSON.stringify(menuperson));
    request.get(createUrl, function (error, response, body) {
        console.log(body);
    });
}



//创建标签
function createLabel (){
    var biz_content = {
        label_name: '主页'
    }
    var method = 'alipay.open.public.life.label.create';
    var createLableUrl='https://openapi.alipay.com/gateway.do?timestamp='+encodeURIComponent(TIMESTAMP)+'&method='+encodeURIComponent(method)+'&app_id='+encodeURIComponent(APPID)+'&sign_type='+encodeURIComponent(SIGNTYPE)+'&sign='+encodeURIComponent(SIGN)+'&version='+encodeURIComponent(VERSION)+'&format='+encodeURIComponent(FORMAT)+'&charset='+encodeURIComponent(CHARSET)+'&biz_content='+encodeURIComponent(JSON.stringify(biz_content));
    console.log('timestamp='+TIMESTAMP+'&method='+method+'&app_id='+APPID+'&sign_type='+SIGNTYPE+'&version='+VERSION+'&format='+FORMAT+'&charset='+CHARSET+'&biz_content='+JSON.stringify(biz_content));
    request.get(createLableUrl, function (error, response, body) {
        console.log(body);
    });
}
// createLabel();




function getImgBlob(){
    fs.readFile('images/user-2.png', (err, data) => {
        if (err) throw err;
        var m = new ArrayBuffer([data])
        console.log('isBuffer: ' + Buffer.isBuffer(data)) // isBuffer: true
        console.log(m) // <Buffer 72 6f ... >
        return data;

    });

    // var xhr = new  window.XMLHttpRequest();
    // var param= {
    //     a:11,
    //     b:22
    // }
    // xhr.responseType='arraybuffer';
    // xhr.open('POST','images/user-2.png');
    // xhr.onload=function(){
    //     var result = xhr.response;
    //     var blob = new Blob([result]);
    //
    //     console.log(xhr.response);
    //     // image.src=window.URL.createObjectURL(blob);
    //     return result;
    //
    // }
    // xhr.send(JSON.stringify(param));
}

//上传门店照片和视频接口
// function upImg(){
//     var image_content=[-119, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 60, 0, 0, 0, 60, 8, 6, 0, 0, 0, 58, -4, -39, 114, 0, 0, 6, 2, 73, 68, 65, 84, 104, 67, -19, -101, -53, -113, 84, 69, 20, -58, 15, 127, -127, -104, 56, 108, 105, -106, -50, 44, -60, 4, -36, 14, 44, 65, 19, 53, 2, 59, 97, 32, 110, 76, 52, 106, 28, 113, 92, -8, 64, 23, -54, 43, -96, 60, -122, 29, -113, -115, 17, -57, 8, -119, 58, 75, 24, -73, 74, -48, -59, -116, 75, -103, -19, -76, -119, -70, -104, -34, 106, 126, 55, 117, 110, 14, 55, 125, -69, 78, -35, 91, 119, 122, -45, 39, -23, 0, -35, 85, 117, -22, 59, -25, 59, -113, -86, 123, -39, 38, -35, -53, -84, -120, -20, 11, -97, -19, 34, -78, -69, -94, -14, 55, 17, -7, 71, 68, -18, -121, -49, 74, -105, 91, -38, -42, -47, -30, -128, 122, 75, 68, 94, 18, 17, 64, -90, 8, -32, -17, -120, -56, -105, 34, -126, 49, -78, 74, 110, -64, 0, -67, 16, -68, 105, 55, -6, 123, 0, -63, 119, -22, 81, -2, 110, 61, -114, 113, -98, -87, -96, -61, -21, -17, -28, 4, -98, 11, 48, 27, -1, 88, 68, -34, 54, 27, -122, -102, 120, -118, -49, 35, -89, -101, 122, -127, 21, -128, 39, 20, 84, 46, 6, -32, -50, 101, -22, -121, -27, 0, -116, 87, -81, -101, -40, 92, 15, -64, 1, -38, 70, -26, 68, -28, 19, 17, -39, 25, 22, -127, 25, 47, 39, 24, 111, -88, -18, -74, -128, 1, 123, -49, -60, 41, -12, -61, 27, 57, 5, -42, 16, 38, 8, -15, -67, -65, 13, -59, -37, 0, -74, 96, -1, 13, 113, -101, 61, -55, 4, -96, 100, 121, 24, -13, 68, 91, -48, 77, 1, 91, -80, 36, 36, 98, -50, 27, -89, -60, -69, 38, -89, -108, 18, -124, -50, 27, 97, 110, 99, 79, 55, 1, -52, -122, -95, 49, 27, -64, -77, -4, 25, 3, 59, -86, 76, -63, 10, 45, 67, 0, 25, 37, -84, 67, -26, -58, -45, -52, -125, -34, -79, 57, -113, -83, -41, 4, 48, 49, 74, -115, 69, -98, -115, -60, -45, -80, -20, 93, 7, -120, -115, 31, 55, -27, -85, 110, 28, -12, -58, -32, 8, -75, -38, 86, -122, 104, -18, 72, 5, -116, -123, 31, -122, 85, 61, 9, -22, -5, 64, 119, 121, 122, 122, 70, 102, 103, -9, -55, -12, -12, -116, 76, -19, -40, 81, 44, -79, -74, -70, 42, 107, 107, -85, -78, -4, -45, 15, 50, 24, 12, 116, -77, -128, -122, -70, -93, -60, 38, -78, -104, -47, 91, 121, 24, -53, 98, 97, 74, 15, 53, 115, -108, 80, 82, -88, -51, -14, -22, -79, 57, 57, 120, -16, -123, -38, -79, -101, -101, -101, 114, -2, -36, 25, -7, 99, 109, 85, -57, -20, 114, -124, 9, 97, 68, -55, -126, -30, 80, -37, 37, 41, 30, -74, 84, 66, 1, -118, -22, 4, 99, -4, -55, -113, -81, 28, 58, 34, -121, 14, 31, 113, 109, 102, -31, -28, -68, -84, -81, 23, -23, -64, 3, -126, 58, 77, -3, 71, 98, -5, 41, -11, -89, 0, -122, 102, -57, 68, -124, -52, 10, -8, 40, -27, -98, -102, -102, -110, 75, -105, 23, 93, 96, 25, 4, -59, 63, -5, -76, 32, 5, -30, -15, 50, -122, -95, 35, -69, 41, 34, 24, 32, 42, 41, -128, -1, 14, 13, -122, 39, -58, -120, -13, -35, 7, 14, 60, 47, 71, -25, 24, -18, -105, 55, -33, 120, 93, -2, -22, -9, -103, -32, -55, 17, 26, -53, 36, -68, 39, 61, 90, -68, -128, 45, -99, 61, -106, -1, 15, -27, 31, 126, 116, 74, -90, 103, 102, 60, -5, 40, -57, 44, 94, -67, 44, 63, -81, 20, -47, -30, -15, 90, 25, 58, 94, 90, 123, 1, 107, 2, -94, -55, -88, -98, 103, -85, -128, -54, 77, 124, 126, -6, -84, -12, 122, -40, -57, 47, 75, -33, -34, -106, -17, -106, 110, 51, -63, 19, 58, -116, -93, 30, -45, -56, -100, 10, -67, -9, 72, 101, 94, -64, 26, 43, -98, 69, 75, 54, 124, -3, -51, -110, 31, 105, 24, -71, 114, -1, -98, 92, 91, -68, -110, 2, 88, -99, -31, 50, -112, 23, 48, 25, 23, -49, 117, 14, -40, 36, 46, 23, -128, -32, 85, 50, 29, -23, 61, 74, 39, 47, -32, 34, 38, -99, 113, -78, -43, 30, -90, -113, -89, -63, 65, -94, 120, -94, 3, -62, 66, 41, -128, -53, 110, -20, -85, 75, 87, -53, -82, -54, -53, -19, 6, 49, 108, 19, 106, 20, 79, 116, 64, 3, -64, 76, 105, -100, -91, 111, -35, -72, 46, -53, -53, 63, 122, -77, 52, -29, 58, 1, 76, -99, -29, -124, -30, -19, 104, -118, -74, 47, -42, 82, 14, -13, -6, -62, -5, -13, -78, -2, -88, -24, -74, 60, -7, -94, 51, -64, -102, -91, 61, -51, 0, -101, 40, -70, -78, -99, -67, -98, 124, 113, -6, -100, -105, -51, 66, 79, -3, -38, 9, -102, -71, 66, -68, -121, 2, -51, -46, -98, -2, 62, 30, -28, 65, 121, 74, 89, 98, 74, -103, 72, 82, -30, -40, -60, 47, -25, 108, -17, -11, -82, 30, 87, 93, 89, -35, 27, -61, -70, 40, 69, 30, -53, 123, -92, -96, -11, -98, -67, -49, -55, -69, -13, 39, -93, -29, -5, 27, 27, -14, -63, -62, 123, -123, -105, 19, -24, -52, -40, -94, -115, -11, -50, -15, 2, -74, -25, 96, 122, 86, -49, 45, 67, -23, 101, 78, 75, -100, -102, -22, 4, -112, 28, 26, 66, -20, 66, 77, -12, 121, 116, -64, 2, 122, 124, -124, 27, -51, -24, 77, -87, 23, 48, 11, 106, -30, -14, 28, 30, 20, -101, -98, -80, -118, -125, 63, 73, -52, -74, -102, 0, 125, -16, -21, 47, 2, -107, -5, -3, 13, -99, -29, 77, -116, -116, -41, 35, -94, 59, 4, 82, 0, -21, -26, 61, 103, 85, -21, 76, -19, -46, -54, -17, 72, 102, -125, -51, -127, 5, -87, -65, -91, -124, 12, 115, -12, 66, -62, 115, -48, 40, 116, -92, 0, -74, -76, -10, 122, -63, 94, -59, 112, -16, -88, 62, 74, 97, 15, 120, 7, 35, -66, 24, 80, 123, 25, -108, 114, 33, 81, 26, 59, 5, 48, -109, 82, -68, 76, 127, 75, -55, 64, -12, -78, -115, 126, 92, 63, -124, -120, 62, 53, -76, 107, -13, 119, -26, 81, -121, 71, -119, 122, -41, -107, -99, 117, -95, 84, -64, -10, -4, 89, 87, -109, -79, 60, 87, 47, 122, -25, -27, -91, 27, 9, -120, -92, -93, -49, -108, -96, 55, 58, -122, 93, 37, 89, -26, 120, -39, -106, 76, 105, 53, -46, -80, 107, 90, 54, 11, 37, -15, -116, -67, -36, -13, 118, 75, -42, -109, -27, -27, 95, -8, 18, -32, -24, -68, 27, 24, 97, 67, -85, -13, 107, 90, -101, 92, -120, 71, 106, 45, 27, -94, 4, 89, -127, 102, 100, -48, -40, 5, 125, 29, 101, 1, 5, 72, -5, 4, -111, -79, 48, -128, -33, 48, 42, 57, 1, 54, 121, -54, 87, -29, 24, -42, -119, 40, 4, 40, -3, -75, 10, -55, -121, 13, -31, -95, -90, 64, -85, 6, 0, 28, -12, -59, -96, 85, 93, -128, 77, 126, -106, -107, 26, -61, 118, 67, -10, -79, 7, -33, 123, 123, -33, 72, 46, 26, -6, -77, -91, 113, 43, 93, 109, 0, -93, -72, 10, 26, 111, 16, 87, 57, -59, 102, -5, -42, 79, 41, -37, 2, 86, -48, -6, 84, -113, 127, -109, 85, 73, 86, -93, 46, -22, 61, 6, -127, -78, -128, -43, 59, 112, 98, -106, -68, -112, 76, 99, -85, 44, 7, 96, -42, 35, 75, 19, -69, -6, -112, 77, -127, -109, 120, 72, 96, -34, -60, -94, -39, 30, 96, -10, -78, 31, -42, -80, -66, 119, -99, 90, -125, -26, 2, -84, 10, -40, 36, 27, -85, 102, 87, 125, 36, -54, -122, -85, 30, 34, 44, 0, 74, 98, -86, 94, 1, 99, 44, -42, 107, -53, -106, -42, 89, 58, 70, 73, -128, -29, -91, -14, 52, 31, -101, 80, -7, -99, 102, -123, 48, -55, 6, 84, -41, -49, -19, -31, 42, 46, 60, -89, 47, -91, -31, 61, 62, -74, -68, 48, -98, 68, -124, -41, -7, -24, -53, 105, -83, -87, 91, 103, -32, -82, 1, 39, 58, -74, -5, -31, 19, -64, -35, -37, 120, -68, 26, 38, 30, 30, -81, -3, -69, -41, 62, -15, 112, -9, 54, 30, -81, -122, -90, 30, -42, -41, -124, -57, -71, -5, 70, -81, 21, 55, 5, 92, -67, -107, 24, 7, -16, 38, -73, 41, 73, -73, -106, 22, 20, 29, 20, -83, -93, -9, 113, 72, 110, -125, -48, -119, -47, 122, 38, 119, 100, 77, 61, -100, 27, -64, -106, -83, 55, 1, -68, 101, -90, 30, -109, -94, -119, -121, -57, 100, -8, 45, 83, -101, -37, -61, 92, -33, -22, 127, -54, -56, 5, -126, -57, -89, -71, -82, 125, 27, -105, -91, 58, 48, -6, 62, 102, 46, -80, -84, -29, 126, -113, -46, -93, 52, -73, -121, -11, 53, 64, -113, 110, -17, 24, -49, -21, -114, -34, -75, -28, 127, 123, -79, -97, 76, -127, 12, -15, -103, 0, 0, 0, 0, 73, 69, 78, 68, -82, 66, 96, -126];
//     // console.log(image_content)
//     var uploadUrl='https://openapi.alipay.com/gateway.do?timestamp='+encodeURIComponent(TIMESTAMP)+'&method=alipay.offline.material.image.upload&app_id='+encodeURIComponent(APPID)+'&sign_type=RSA2&sign='+encodeURIComponent(SIGN)+'&version='+VERSION+'&image_type="jpg"&format='+FORMAT+'&image_name="home"&image_content='+encodeURIComponent(image_content);
//     // console.log('timestamp='+TIMESTAMP+'&method=alipay.offline.material.image.upload&app_id='+APPID+'&sign_type=RSA2&version='+VERSION+'&image_type="png"&format='+FORMAT+'&image_name="home"&image_content='+image_content)
//     request.get(uploadUrl, function (error, response, body) {
//         console.log(body);
//     });
// }
// upImg();
// 去充支付宝生活号
// pay@unicharge.cn
// Unicharge1234


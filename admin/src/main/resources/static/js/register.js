/**
 * 注册
 */
// $(function(){
//      layui.use(['form' ,'layer'], function() {
//          var form = layui.form;
//          var layer = layui.layer;
//          form.on("submit(register)",function () {
//              register();
//              return false;
//          });
//          var path=window.location.href;
//          if(path.indexOf("kickout")>0){
//              layer.alert("您的账号已在别处登录；若不是您本人操作，请立即修改密码！",function(){
//                  window.location.href="/login";
//              });
//          }
//      })
//  });

function register(){
    var params = {};
    params.sername = $("#username").val();
    params.email = $("#email").val();
    params.password = $("#password").val();
    $.post("/user/register",params,function (data) {
        console.log(data);
    });
}

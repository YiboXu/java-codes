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

// layer.alert("您的账号已在别处登录；若不是您本人操作，请立即修改密码！",function(){
//     window.location.href="/login";
// });
function register() {
    var userName = $("#username").val();
    if (userName == null || userName.trim() == '') {
        layer.alert("请输入用户名~", {icon: 5, title: '喵呜'});
        return;
    }

    var email = $("#email").val();
    if (!verifyEmail(email)) {
        return;
    }

    var password = $("#password").val();
    if (password == null || password.trim() == '') {
        layer.alert("请输入密码~", {icon: 5, title: '喵呜'});
        return;
    }

    $.ajax({
        url: "/user/register",
        type: "post",
        dataType: "json",
        async: false,
        data: {
            userName: userName,
            email: email,
            password: password
        },
        success: function (data) {
            console.log(data);
            if(data != null && data.code == 200){
                // layer.alert("注册成功,即将跳往首页~", {icon: 6, title: '喵呜'});
                layer.msg('注册成功！<span name="count" style="color: red;">3</span>秒后跳转到首页~', {
                    icon: 1,
                    title: '喵呜',
                    success: function (layero, index) {
                        var countElem = layero.find('span[name="count"]');
                        var timer = setInterval(function () {
                            var countTemp = parseInt(countElem.text()) - 1;
                            countTemp === 0 ? clearInterval(timer):countElem.text(countTemp);
                        }, 1000)
                    }
                }, function () {
                    alert('跳转');
                    location.href="/home";
                });
                // todo 做邮箱验证

            } else {
                layer.alert(data.message, {icon: 5, title: '喵呜'});
            }
        }
    });

}

function verifyEmail(email) {
    if (email == '' || $.trim(email).length == 0) {
        layer.alert("请输入邮箱~", {icon: 5, title: '喵呜'});
        return false;
    }
    ///^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
    //return !email.match(/^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/);
    if (!email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
        $("input[name='email']").val("");
        $("input[name='email']").focus();
        // $("#verifyEmail").val("");
        layer.alert("您输入的邮箱格式有误，请重新输入~", {icon: 5, title: '喵呜'});
        return false;
    }
    return true;
}

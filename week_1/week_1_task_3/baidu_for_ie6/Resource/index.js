/**
 * Created by Joker on 2015/10/17.
 */
//使用jquery使得输入框获取焦点时改变颜色
$(document).ready(function () {
    $("#wd").focus(function () {
       $(".input-span").css({
          "border":"1px solid #38f"
       });
    });
    $("#wd").blur(function () {
        $(".input-span").css({
            "border":"1px solid #888"
        });
    });
});
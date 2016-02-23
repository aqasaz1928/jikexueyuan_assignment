/**
 * Created by Joker on 2015/10/17.
 */
//使用jquery使得输入框获取焦点时改变颜色
$(document).ready(function () {
    var screenHeight = document.documentElement.clientHeight;
    screenHeight -= 5;
    console.log(screenHeight);
    $(".wrapper").css({
        "min-height": screenHeight
    });

    $("#wd").focus(function () {
        $(".input-span").css({
            "border": "1px solid #38f"
        });
    });

    $("#wd").blur(function () {
        $(".input-span").css({
            "border": "1px solid #888"
        });
    });
    $("#setting").hover(function () {
        $(".setting-pannel").css({
            "display": "inline-block"
        });
    });
    $(".setting-pannel").mouseleave(function () {
        $(this).css({
            "display": "none"
        });
    });
    $("#more-products").hover(function () {
        $(this).css({
            "opacity": "0"
        });
        $(".more-items").css({
            "display": "inline-block"
        });
    });
    $(".more-items").mouseleave(function () {
        $(this).hide();
        $("#more-products").css({
            "opacity": "1"
        });
    });

    $(".glyphicon-menu-down").click(function () {
        var navHeight = $(".phone-nav").height();
        if (navHeight == 150) {
            $(".phone-nav").height(300);
        } else {
            $(".phone-nav").height(150);
        }
        $(this).toggleClass("glyphicon-menu-down")
            .toggleClass("glyphicon-menu-up");
    });

    $("#hot-site-right").click(function () {
        $("#hot-site-setting").toggle();
    });
    $("#service-right").click(function () {
        $("#service-setting").toggle();
    });
    $(".position-locate-btn").click(function () {
        $(".position-locate-text").text("正在获取位置信息...");
        $(this).attr("disabled", true).css("background", "#dddddd");
        $(".glyphicon-screenshot").removeClass("glyphicon-screenshot")
            .addClass("glyphicon-retweet");

    });

    $(".show-more-service").click(function () {
        var phoneService = $(".phone-service");
        var serviceHeight = phoneService.height();
        if (serviceHeight != 900) {
            phoneService.height(900);
            $(this).text("收起")
        }else{
            phoneService.height(590);
            $(this).text("展开全部");
        }
    });

    $("#into-phone-manager").on('click', function () {
       $(".phone-manager").show();

    });
    $("#manager-back").on('click', function () {
        $(".phone-manager").hide();
    });

    $(".toggle-1").on('click', function () {
        if($(".phone-hot-site").is(":hidden")){
            $(this).css({
                "background":"#00aa00"
            });
            $(".switch-1").css({
                "float":"right",
                "margin-right":"10%"
            });
            $(".phone-hot-site").show();
        }else{
            $(this).css({
                "background":"#ccc"
            });
            $(".switch-1").css({
                "float":"left",
                "margin-left":"10%"
            });
            $(".phone-hot-site").hide();
        }

    });

    $(".toggle-2").on('click', function () {
        if($(".phone-hot-news").is(":hidden")){
            $(this).css({
                "background":"#00aa00"
            });
            $(".switch-2").css({
                "float":"right",
                "margin-right":"10%"
            });
            $(".phone-hot-news").show();
        }else{
            $(this).css({
                "background":"#ccc"
            });
            $(".switch-2").css({
                "float":"left",
                "margin-left":"10%"
            });
            $(".phone-hot-news").hide();
        }

    });

    $(".toggle-3").on('click', function () {
        if($(".phone-service").is(":hidden")){
            $(this).css({
                "background":"#00aa00"
            });
            $(".switch-3").css({
                "float":"right",
                "margin-right":"10%"
            });
            $(".phone-service").show();
            $(".show-more-service").show();
        }else{
            $(this).css({
                "background":"#ccc"
            });
            $(".switch-3").css({
                "float":"left",
                "margin-left":"10%"
            });
            $(".phone-service").hide();
            $(".show-more-service").hide();
        }

    });

});
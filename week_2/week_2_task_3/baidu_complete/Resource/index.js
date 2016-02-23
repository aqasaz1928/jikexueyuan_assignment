/**
 * Created by Joker on 2015/10/17.
 */

$(function () {

    window.onscroll = function () {
            //监听鼠标滚动事件
          if($(window).scrollTop()>180){
              //滚动到一定位置显示返回上方按钮和固定搜索栏
              $('.fixed-search').fadeIn(500);
              $('.back-to-top').fadeIn(500)
          }else{
              $('.fixed-search').fadeOut(500);
              $('.back-to-top').fadeOut(500);
          }
    };
    //点击返回顶部按钮，在500毫秒后返回
    $('.back-to-top').click(function () {
        $('body,html').animate({scrollTop:0},500);
    });


    //载入页面时检查是否保存有账户密码，如果是则自动登录
    if(localStorage){
        if(localStorage.userName&&localStorage.userPassword&&localStorage.userAutoLogin){
            $('#login').text('CEO').addClass('CEO-panel');
            $('.before-login').addClass('after-login').removeClass('before-login');
        }
    }
    //拿到页面高度
    var screenHeight = document.documentElement.clientHeight;
        screenHeight -= 5;
    $(".wrapper").css({
        //设定页面高度
        "min-height": screenHeight
    });

    //点击事件，在点击登录时触发
    $('#login-submit').on('click', function () {
        var userName      = $('#userName').val()            //拿到用户名
            ,userPassword = $('#userPassword').val()        //拿到密码
            ,autoLogin    = $('#auto-login').is(":checked");//是否选择自动登录
        if(userName=='李彦宏'&&userPassword=='admin'){       //对用户名密码进行匹配
            $('.login-panel').hide();                       //登录成功后隐藏登录框
            $('#login').text('CEO').addClass('CEO-panel');  //将登陆按钮设置为用户名
            //如果选择了自动登录，则将信息写入localstorage
            if(autoLogin && localStorage){
                localStorage.userName = '李彦宏';
                localStorage.userPassword = 'admin';
                localStorage.userAutoLogin = true;
            }
            //将界面替换成登陆之后的样式
            $('.before-login').addClass('after-login').removeClass('before-login');
        }else{
            //用户名密码错误，给出提示
            alert('用户名或密码错误！\n请输入李彦宏，密码为admin登录');
        }
    });
    //用户点击退出登录
    $("#exit-ceo").click(function () {
        localStorage.clear();//清空缓存
        $('.after-login').addClass('before-login').removeClass('after-login'); //恢复登陆前页面
        $('#login').text('登录').removeClass('CEO-panel');//将用户名改为登陆
        $(".ceo-control-panel").hide();                  //隐藏用户控制面板

    });

    //鼠标一开用户控制面板则将其隐藏
    $(".ceo-control-panel").mouseleave(function () {
        $(this).hide();
    });

   //点击登录框右上关闭按钮
    $('#close-login-panel').on('click', function () {
        $('.login-panel').hide();
    });


    //在搜索框获取焦点和失去焦点时改变其边框颜色
    $("#wd").focus(function () {
        $(".input-span").css({
            "border": "1px solid #38f"
        });
    }).blur(function () {
        $(".input-span").css({
            "border": "1px solid #888"
        });
    });



    //当鼠标移动到列表其他选项时，隐藏当前控制面板
    $("#tieba").mouseenter(function () {
        $(".ceo-control-panel").hide();
    });
    $(".setting-pannel").mouseleave(function () {
        $(this).css({
            "display": "none"
        });
    });

    //显示更多设置的面板
    $("#setting").mouseenter(function () {
        $(".setting-pannel").css({
            "display": "inline-block"
        });
        $(".ceo-control-panel").hide();
    });




    $('#login').on('click', function (event) {
        //当登录按钮点击时，根据类名判断是否已经登陆
        if($(this).hasClass('CEO-panel')){
            return 0;                           //如果已经登陆则直接跳出
        }
        $('.login-panel').show();               //否则先是登录框
    }).mouseenter(function () {
        $('.setting-pannel').hide();            //当鼠标移入登录框时，隐藏之前显示的控制面板
        if($(this).hasClass('CEO-panel')){
            $(".ceo-control-panel").show();     //如果当前已经登录成功，则显示用户控制面板
        }
    });
    //鼠标移入‘更多产品’按钮
    $("#more-products").hover(function () {
        $(this).css({
            "opacity": "0"
        });
        $(".more-items").css({
            "display": "inline-block"
        });
        $('.setting-pannel').hide();
    });
    //鼠标移出“更多产品”区域
    $(".more-items").mouseleave(function () {
        $(this).hide();
        $("#more-products").css({
            "opacity": "1"
        });
    });

    //主要内容面板导航栏设置
    $(".content-header-nav").find('li').click(function (e) {             //当点击列表项时触发
        var activeLi = $(e.target);                                      //拿到目前点击的列表项
        $(".content-header-nav").find('.active').removeClass('active');  //将上一个激活的列表项移除激活
        $(".content-box-body").hide();                                   //先将所有内容面板隐藏
        activeLi.addClass('active');                                     //将点击的列表项设为激活状态
        //对当前点击的列表项的内容进行判断
        //然后根据判断显示对应的内容区域
        switch (activeLi.text()){
            case '我的关注':
                $("#my-focus").show();
                break;
            case '推荐':
                $("#my-recommend").show();
                break;
            case '导航':
                $("#my-navigation").show();
                break;
            case '视频':
                $("#my-video").show();
                break;
            case '购物':
                $("#my-shopping").show();
                break;
            default :
                break;
        }
        console.log(activeLi.text());

    });

    //###########################
    //手机端脚本
    //**************************************
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

    //点击内容栏右上侧的按钮，弹出更多内容
    $("#hot-site-right").click(function () {
        $("#hot-site-setting").toggle();
    });
    $("#service-right").click(function () {
        $("#service-setting").toggle();
    });

    //点击定位按钮，出现搜索位置的效果
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



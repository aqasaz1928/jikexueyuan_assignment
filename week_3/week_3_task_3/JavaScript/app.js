//create date 2015-11-17


$(function () {
    //定义方法监听鼠标滚动事件
    window.onscroll = function () {
        if($(window).scrollTop()>110){
            //滚动位置超过110展示回到顶部按钮
            $("#back-to-top").fadeIn(1000);
        }else{
            //滚动位置小于110时将回到顶部按钮隐藏
            $("#back-to-top").fadeOut(1000);
        }
    };
    //点击回到顶部按钮，在500秒内回到顶部
    $("#back-to-top").on('click', function () {
        $('body,html').animate({scrollTop:0},500);
    });


    //定义两个函数，实现图片轮播
    var sliderUl = $('.top-banner').find('ul'); //拿到图片列表
    //移动到下一张图片
    function moveToNext() {
        setTimeout(function () {
            var ulPosition = sliderUl.css('left');                   //获得图片最左的位置
            ulPosition = ulPosition.slice(0, -2);
            if (ulPosition > -2200) {                                //当没有轮到最后一张图片显示时
                ulPosition = (parseInt(ulPosition) - 570) + 'px';
                sliderUl.css({
                    left: ulPosition                                 //将图片向左移一格
                });
            } else {                                                 //当显示到最后一张图片的时候
                sliderUl.css({                                       //快速将图片移到第一个位置，因为最后一张图片和第一张一致
                    'transition-duration': '0s',                     //因此将不会产生任何效果
                    '-webkit-transition-duration': '0s',
                    left: '0'
                });
                setTimeout(function () {                             //设定一个间隔时间，等待上一步动作完成
                    sliderUl.css({                                   //当上一步完成之后，再次将动画时间还原，然后对图片进行移动
                        'transition-duration': '1s',
                        '-webkit-transition-duration': '1s',
                        left: '-570px'
                    });
                }, 100);

            }

        }, 50);

    }
    //移动到前一张图片的方法
    //思路类似于移动到下一张
    function moveToPre() {
        setTimeout(function () {
            var ulPosition = sliderUl.css('left');
            ulPosition = ulPosition.slice(0, -2);
            console.log(ulPosition);

            if (ulPosition > -600) {
                ulPosition = (parseInt(ulPosition) + 570) + 'px';
                sliderUl.css({
                    left: ulPosition
                });
                setTimeout(function () {
                    sliderUl.css({
                        'transition-duration': '0s',
                        '-webkit-transition-duration': '0s',
                        left: '-2280px'
                    });
                    setTimeout(function () {
                        sliderUl.css({
                            'transition-duration': '1s',
                            '-webkit-transition-duration': '1s'

                        });
                    }, 100);

                }, 1000);

            } else {
                ulPosition = (parseInt(ulPosition) + 570) + 'px';
                sliderUl.css({
                    left: ulPosition
                });
            }
        }, 50);
    }

    //将两个移动的方法分别绑定到前后箭头按钮上
    $('.banner-change-left').click(function () {
        moveToPre();
    });
    $('.banner-change-right').click(function () {
        moveToNext();
    });
    //设定一个函数，间隔一段时间执行移动图片方法
    setInterval(function () {
        moveToNext();
    },5000);


    //为节省时间，使用flexslider扩展来实现后面的几个轮播
    $('.flexslider').flexslider({
        animation: 'slider',
        minItems: 1,
        move: 1,
        itemWidth: 150,
        itemMargin: 10,
        animationLoop: true,
        customDirectionNav: $(".banner-controller-partner a"),
        controlNav: false,

    });
    $(".media-content").flexslider({
        animation: 'slider',
        minItems: 1,
        move: 1,
        itemWidth: 150,
        itemMargin: 10,
        animationLoop: true,
        customDirectionNav: $(".banner-controller-media a"),
        controlNav: false,
    });
    $(".school-content").flexslider({
        animation: 'slider',
        minItems: 1,
        move: 1,
        itemWidth: 150,
        itemMargin: 10,
        animationLoop: true,
        customDirectionNav: $(".banner-controller-school a"),
        controlNav: false,
    });

    //点击广告栏右侧上方的关闭按钮,将对应的广告隐藏
    $(".close-ad").click(function () {
        $(this).parent('div').hide();
    });

    //搜索框获得焦点时,隐藏边框和搜索热词
    $("#search-input").focus(function () {
        $(this).css({
            'outline':'none'
        });
        $(".hot-search").hide();
    }).blur(function () {
        //失去焦点时把搜索热词显示出来
        $(".hot-search").show();
    });


    
    $('.class-recommendation-box').hover(function (event) {
        var contentTabs = $('.class-classify-box').find('ul');
        contentTabs.hide();
        var thisFor = $(this).attr('class').split(' ')[1];
        switch (thisFor.substr(-1)) {
            case 'a':
                contentTabs.eq(0).show();
                break;
            case 'b':
                contentTabs.eq(1).show();
                break;
            case 'c':
                contentTabs.eq(2).show();
                break;
            case 'd':
                contentTabs.eq(3).show();
                break;
            case 'e':
                contentTabs.eq(4).show();
                break;
            case 'f':
                contentTabs.last().show();
                break;
            default :
                break;
        }
    }).mouseenter(function () {
        $('.class-recommendation-box').css({
            'border-bottom': '1px solid #ccc',
        });
        $('.class-recommendation').find('a').css({
            color: '#666'
        });
        $(this).css({
            'border-bottom': '2px solid #35b558',
        }).find('a').css('color', '#35b558');

    });

    $('.lessons-classify-tab').mouseenter(function () {
        $(".lessons-classify-content").find('div').hide();
        var tabName = $(this).attr('id');
        tabName = '.' + tabName;
        $(tabName).show();
    }).mouseleave(function (event) {
        console.log(event.pageY);
        if (event.pageY >= 535) {
            $(".lessons-classify-content").find('div').hide();
            $(".lessons-classify").css({
                'height': '100%'
            });
        }
    });
    $('.lessons-classify-outer').mouseover(function () {
        $(".lessons-classify-content").find('div').hide();
        $(".lessons-classify").css({
            'height': '100%'
        });
    });
    $(".lessons-classify-content").find('div').mouseleave(function () {
        $(this).hide();
        $(".lessons-classify").css({
            'height': '100%'
        });
    });
    $('.lessons-classify').mouseenter(function () {
        $(this).css({
            'z-index': '99',
            'height': '410px'
        });
    });

});
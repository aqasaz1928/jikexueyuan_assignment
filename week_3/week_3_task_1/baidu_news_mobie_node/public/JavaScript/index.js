/**
 * Created by Joker on 2015/12/11.
 */
$(function () {

    var pageSubject = $("#page-subject");
    //使用flexslider实现图片轮播
    $(".flexslider").flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: false
    });
    //使用flexslider实现热点新闻上下滚动
    $(".hot-news-slider").flexslider({
        animation: 'slide',
        directionNav: false,
        controlNav: false,
        slideshow: true,
        slideshowSpeed: 3000,
        direction: 'vertical', //将方向设为垂直
    });


    //调用方法获得数据
    function getNewsBySubject(subject, pageStart) {
        var url = '/list';
        //通过变量配置请求的地址
        if (subject == '') {
            url = url + '?pageStart=' + pageStart;
        } else {
            url = url + '/' + subject + '?pageStart=' + pageStart;
        }
        //使用ajax方法来请求数据
        $.get(url, function (data) {
            //当没有更多数据时将请求功能关闭
            if (data.length == 0) {
                $('.btn-more-news').text('没有更多的新闻了').attr('disabled', true);
            } else {
                //对数据进行遍历，分别调用函数来处理
                //函数将更具其具体信息，产生不同的DOM元素，炳添加到页面中
                $.each(data, function (i, news) {
                    var newsData = newsDataHandler(news);
                    //对新闻类型进行判断，分别产生不同的dom元素
                    switch (newsData['newsType']) {
                        case 'a':
                            CreateNewsTypeA(newsData);
                            break;
                        case 'b':
                            CreateNewsTypeB(newsData);
                            break;
                        case 'c':
                            CreateNewsTypeC(newsData);
                            break;
                        default :
                            break;
                    }
                });
            }

        });
    }


    //点击头部导航栏实现页面内容分类
    $('.nav-item').click(function () {
        //先将内容区域清空
        $('.news-list').empty();
        //将更多新闻按钮复原
        var moreNews = $('.btn-more-news');
        moreNews.attr('disabled', false);
        moreNews.text('更多新闻');
        //将页面位置复原
        $('#pageStart').val('0');
        //拿到当前分类名称
        var subject = ($(this).text() == '推荐') ? '' : $(this).text();
        pageSubject.val(subject);
        getNewsBySubject(subject);
    });

    //点击更多新闻时触发该方法
    $('.btn-more-news').click(function () {
        //修改并记录页面位置信息
        var pageStart = parseInt($('#pageStart').val()) + 1;
        $('#pageStart').val(pageStart);
        var subject = (pageSubject.val() == '推荐') ? '' : pageSubject.val();
        getNewsBySubject(subject, pageStart);
    });
    //初始化时候调用一次方法
    getNewsBySubject('',0);

});
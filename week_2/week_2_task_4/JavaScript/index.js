/**
 * Created by Joker on 2015/12/11.
 */
$(function () {

    var loadingTimes = $("#loading-times");
    var newsCount    = $("#news-count");
    var displaySubject = $("#subject-display");
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

    function getAllNews() {
        $.get('./app/db_manipulate.php?action=getAll', function (data) {

            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                if (i < 10) {
                    var newsData = newsDataHandler(data[i]);
                    //对新闻类型进行判断，分别产生不同的dom元素
                    switch (newsData['news_type']) {
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
                }
            }

        });
    }

    function getNewsBySubject(subject) {
        $.get('./app/db_manipulate.php?action=getNews&subject=' + subject, function (data) {
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                if (i < 10) {
                    var newsData = newsDataHandler(data[i]);
                    //对新闻类型进行判断，分别产生不同的dom元素
                    switch (newsData['news_type']) {
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
                }

            }

        });
    }

    function getNewsByRow(start, rows, subject) {
        $.get('./app/db_manipulate.php?action=getRows&start=' + start + '&rows=' + rows+'&subject='+subject, function (data) {
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                var newsData = newsDataHandler(data[i]);
                //对新闻类型进行判断，分别产生不同的dom元素
                switch (newsData['news_type']) {
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
            }

        });
    }

    //查询数据条数
    function getNewsCount(subject) {
        console.log('方法调用');
        $.get('./app/db_manipulate.php?action=count&subject=' + subject, function (data) {
            data = JSON.parse(data);
            console.log(data);
            $('#news-count').val(data[0]['count(*)']);
        });
    }

    $('.nav-item').click(function () {
        $('.news-list').empty();
        var moreNews = $('.btn-more-news');
        moreNews.attr('disabled',false);
        moreNews.text('更多新闻');
        $('#loading-times').val('1');
        var subject = ($(this).text() == '推荐') ? 'all' : $(this).text();
        displaySubject.val(subject);
        getNewsBySubject(subject);
        getNewsCount(subject);
    });

    $('.btn-more-news').click(function () {
        var newsDisplay = loadingTimes.val()*10;
        var newsRemain  = newsCount.val()-newsDisplay;
        var newsSubject = displaySubject.val();
        loadingTimes.val(parseInt(loadingTimes.val())+1);
        if(newsRemain>10){
            getNewsByRow(newsDisplay,10,newsSubject);
        }else if(newsRemain>0){
            getNewsByRow(newsDisplay,newsRemain,newsSubject);
        }else{
            $(this).text('没有更多新闻了');
            $(this).attr('disabled',true);
        }
    });
    getAllNews();
    getNewsCount('all');


});
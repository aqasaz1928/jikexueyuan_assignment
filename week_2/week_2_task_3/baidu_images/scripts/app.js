/**
 * Created by Joker on 2015/11/29.
 */
$(document).ready(function () {
    $(window).on('load', function () {
        imgLocation();
        var imgData = {"data":[
            {"src":"img1.jpg"},{"src":"img2.jpg"},{"src":"img3.jpg"},{"src":"img4.jpg"},
            {"src":"img5.jpg"},{"src":"img6.jpg"},{"src":"img7.jpg"},{"src":"img8.jpg"},
            {"src":"img9.jpg"},{"src":"img10.jpg"},{"src":"img11.jpg"},{"src":"img12.jpg"}]};

        window.onscroll = function () {
            scrollEventHandler(imgData);
        }
    });
});

//响应并处理鼠标滚动事件
function scrollEventHandler(data){
    var box             = $('.content-box');                            //获得盒子模型
    var lastBoxTop      = box.last().get(0).offsetTop;                  //获得最后一个盒子的顶部高度
    var windowHeight    = $(window).height();                           //获得窗口的高度
    var scrollHeight    = $(window).scrollTop();                        //获得鼠标滚动的高度
    var imgLoading      = (lastBoxTop<(windowHeight+scrollHeight));     //当最后一个图片出现时开始加载新图片
    var fixHeader       = $('.fix-header');

    if(scrollHeight>=100){
        fixHeader.show();
    }else{
        fixHeader.hide();
    }

    if  (imgLoading){
        //设定一个延迟时间模拟通信
        setTimeout(function () {
            //对传入的字典进行遍历
            $.each(data.data, function (index, value) {
                //生成一个新的图片盒子并加载到后面
                var box    = $("<div>").addClass("content-box").appendTo(".main-content");
                var imgBox = $("<div>").addClass('img-box').appendTo(box);
                var img    = $("<img>").attr("src","./images/"+value.src).appendTo(imgBox);
            });
            //在盒子加载完后再对整体进行一次布局
            imgLocation();
        },1000);

    }
}


function imgLocation(){
    var box          = $('.content-box'); //获得盒子的JQuery对象
    var boxHeightArr = [];                //盒子高度的数组
    var boxNum       = parseInt($('.main-content').width()/(box.width()+5));
    //对所有盒子进行遍历
    box.each(function (index, value) {
        if(index<boxNum){
            //将第一排的盒子高度纪录进数组
           boxHeightArr[index] = box.eq(index).height();
        }else{
            //遍历进行到第二排开始对盒子进行布局
            var boxHeightMin   = Math.min.apply(null,boxHeightArr);    //拿到数组中最小的高度
            var minHeightIndex = $.inArray(boxHeightMin,boxHeightArr); //拿到最小高度盒子的索引
            //对盒子进行布局
            $(value).css({
                'position': 'absolute',
                    'top' : boxHeightMin,                           //高度为目前已排布的最小高度
                    'left': box.eq(minHeightIndex).position().left, //将盒子与最小高的的列对齐
            });
            //将排布好的盒子高度加入最小高度
            boxHeightArr[minHeightIndex] += $(value).height();
        }

    });
}
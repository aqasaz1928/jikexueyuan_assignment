/**
 * Created by Joker on 2015/12/12.
 */

//  分别定义三种不同类型的的新闻的dom结构，
//  使其可以使用js、代码动态的加载
var typeA_Dom = "<div class=\"news-type-a\">" +
    "<div class=\"news-content-box\">" +
    "<img src=\"\" class=\"news-img-box\"/>" +
    "<div class=\"news-title-box\"></div>" +
    "<div class=\"news-abstract\"></div>" +
    "<div class=\"news-time\"></div>" +
    "</div></div>";

var typeB_Dom = "<div class=\"news-type-b\">" +
    "<div class=\"news-content-box\">" +
    "<div class=\"news-title-box\"></div>" +
    "<div class=\"news-abstract\"></div>" +
    "<div class=\"news-time\"></div>" +
    "</div></div>";

var typeC_Dom = "<div class=\"news-type-c\">" +
    "<div class=\"news-content-box\">" +
    "<div class=\"news-title-box\"></div>" +
    "<div class=\"news-img-list\">" +
    "<ul>" +
    "<li><img src=\"\"/></li>" +
    "<li><img src=\"\" /></li>" +
    "<li><img src=\"\" /></li>" +
    "</ul>" +
    "</div>" +
    "<div class=\"news-info\">" +
    "<div class=\"news-time\"></div>" +
    "</div>" +
    "</div>" +
    "</div>";

//通过js代码动态加载typeA新闻，并传入新闻所需的信息
function CreateNewsTypeA(newsData) {
    var newsList = $(".news-list");
    newsList.append(typeA_Dom);
    var appendedNews = newsList.find('.news-type-a').last();
    appendedNews.find('img').attr('src', newsData['img1']);
    appendedNews.find('.news-title-box').text(newsData['title']);
    appendedNews.find('.news-abstract').text(newsData['abstract']);
    appendedNews.find('.news-time').text(newsData['updateTime']);
}

//通过js代码动态加载typeB新闻，并传入新闻所需的信息
function CreateNewsTypeB(newsData) {
    var newsList = $(".news-list");
    newsList.append(typeB_Dom);
    var appendedNews = newsList.find('.news-type-b').last();
    appendedNews.find('.news-title-box').text(newsData['title']);
    appendedNews.find('.news-abstract').text(newsData['abstract']);
    appendedNews.find('.news-time').text(newsData['updateTime']);
}

//通过js代码动态加载typeC新闻，并传入新闻所需的信息
function CreateNewsTypeC(newsData) {
    var newsList = $(".news-list");
    newsList.append(typeC_Dom);
    var appendedNews = newsList.find('.news-type-c').last();
    appendedNews.find('.news-title-box').text(newsData['title']);
    appendedNews.find('li:first-child img').attr('src', newsData['img1']);
    appendedNews.find('li:nth-child(2) img').attr('src', newsData['img2']);
    appendedNews.find('li:nth-child(3) img').attr('src', newsData['img3']);
    appendedNews.find('.news-time').text(newsData['updateTime']);
}

//对拿到的原始数据对象进行一些处理
function newsDataHandler(data) {
    var newsType = data['newsType'];                               //首先拿到新闻类型方便分类操作
    var timeNow = Date.parse(new Date());                          //拿到现在的时间
    data["updateTime"] = timeConvert(timeNow - (Date.parse(data['updateTime']))); //将新闻显示的时间设置成距离发布的时间
    data['img1'] = data['newsImg1'];
    data['img2'] = data['newsImg2'];
    data['img3'] = data['newsImg3'];
    return data;

}
//通过毫秒数来转化成时间字符串
function timeConvert(time) {
    time = Math.floor(time/1000);
    //传入描述来转换时间显示方式
    if (time < 60) {
        //时间不足一分钟
        return '1分钟前';
    } else {
        var minutes = Math.floor(time / 60);
        //时间不足一天
        if (minutes < 1440) {
            //时间大于一小时
            if (minutes > 60) {
                return Math.floor(minutes / 60) + "小时前";
            } else {
                //时间小于一小时
                return minutes + '分钟前';
            }
            //时间超过一天
        } else {
            var days = Math.floor((minutes / 60) / 24);
            return days + '天前';
        }
    }
}

//删除数据方法
function doDelete(id) {
    //弹出窗口等待用户确认
    if (confirm("是否确认删除该项？")) {
        $.get('./delete?newsId='+id, function (data) {
            alert(data);
            window.location.href='./list';
        });
    }
}
//退出登录
function quit() {
    if (confirm("确定退出吗？")) {
        window.location.href = './logout';
    }
}

function checkInputValueByName(name) {
    var value = $("input[name=" + name + "]").val();
    if ((value == '') || (typeof value == 'undefined')) {
        console.log(name + ' false');

        return false;
    } else {
        return true;
    }
}
function checkSelectValueByName(name) {
    var value = $("select[name=" + name + "]").val();
    if ((value == '') || (typeof value == 'undefined')) {
        console.log(name + ' false');
        return false;
    } else {
        return true;
    }
}
function checkAbstractValue() {
    var value = $('textarea').val();
    if ((value == '') || (typeof value == 'undefined')) {
        return false;
    } else {
        return true;
    }
}


//进行提交前的表单检查
function submitDataVerify() {
    var newsType = $("#news-type").val();
    var result = checkInputValueByName('news-title') & checkSelectValueByName('news-subject');
    console.log(result);
    console.log(newsType);
    if (result) {
        switch (newsType) {
            case 'type-a':
            case 'a':
                result = checkAbstractValue() & checkInputValueByName('img-1');
                break;
            case 'type-b':
            case 'b':
                result = checkAbstractValue();
                console.log(result);
                break;
            case 'type-c':
            case 'c':
                result = checkInputValueByName('img-1')&checkInputValueByName('img-2')&
                    checkInputValueByName('img-3');
                break;
            default :
                result = false;
                break;

        }
    }
    return result;

}



function onToggleBtnClick() {
    var main = $('.main-content');
    if (main.css('top') == '40px') {
        main.css({
            'top': '300px'
        });
    } else {
        main.css({
            'top': '40px'
        });
    }



}


function isImgFile(url) {
    url = url.toLowerCase();
    var imgType = url.split('.')[url.split('.').length - 1];
    if (imgType == 'jpg' || imgType == 'png' || imgType == 'jpeg' || imgType == 'gif' || imgType == 'bmp') {
        return true;
    } else {
        return false;
    }
}

//定义方法，当上传结束后执行一些ui操作
function afterUploadHandler(data){
    data = '/images/' + data.split('/')[data.split('/').length - 1]; //获取图片的可用路径
    alert('上传成功！');                                               //提示用户
    $(".img-edit-window").fadeOut(500);                              //关闭上传操作窗口
    $("#loading-img").hide();                                        //隐藏载入图标
    $(".submit-img").text('开始上传').attr('disabled', false);         //还原按钮文字
    $("#" + $("#for-img").val()).attr('src', data);                   //将表单中的图片预览设置成上传的图片
    $("#img-file").attr('readonly', false);
    var imgInput = $("#for-img").val().replace('img', 'img-');        //拿到需要修改的表单元素
    //console.log(imgInput);
    $("#" + imgInput).val(data);                                       //设置表单元素的的值
}


//    关闭图像上传对话框
function closeImgWindow() {
    $(".submit-img").text('开始上传').attr('disabled', false);
    $(".img-edit-window").fadeOut(500).find('input').val('');
    $("#img-file").attr('readonly', false);
    $("#loading-img").hide();
}


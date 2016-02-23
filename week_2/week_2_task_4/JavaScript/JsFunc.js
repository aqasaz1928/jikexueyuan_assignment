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
    appendedNews.find('img').attr('src', newsData['news_imgs']);
    appendedNews.find('.news-title-box').text(newsData['news_title']);
    appendedNews.find('.news-abstract').text(newsData['news_abstract']);
    appendedNews.find('.news-time').text(newsData['news_time']);
}

//通过js代码动态加载typeB新闻，并传入新闻所需的信息
function CreateNewsTypeB(newsData) {
    var newsList = $(".news-list");
    newsList.append(typeB_Dom);
    var appendedNews = newsList.find('.news-type-b').last();
    appendedNews.find('.news-title-box').text(newsData['news_title']);
    appendedNews.find('.news-abstract').text(newsData['news_abstract']);
    appendedNews.find('.news-time').text(newsData['news_time']);
}

//通过js代码动态加载typeC新闻，并传入新闻所需的信息
function CreateNewsTypeC(newsData) {
    var newsList = $(".news-list");
    newsList.append(typeC_Dom);
    var appendedNews = newsList.find('.news-type-c').last();
    appendedNews.find('.news-title-box').text(newsData['news_title']);
    appendedNews.find('li:first-child img').attr('src', newsData['news_imgs'][0]);
    appendedNews.find('li:nth-child(2) img').attr('src', newsData['news_imgs'][1]);
    appendedNews.find('li:nth-child(3) img').attr('src', newsData['news_imgs'][2]);
    appendedNews.find('.news-time').text(newsData['news_time']);
}

//对拿到的原始数据对象进行一些处理
function newsDataHandler(data) {
    var newsType = data['news_type'];                               //首先拿到新闻类型方便分类操作
    var timeNow = Math.floor((Date.parse(new Date())) / 1000);      //拿到现在的时间
    data["news_time"] = timeConvert(timeNow - (data['news_time'])); //将新闻显示的时间设置成距离发布的时间

    if (newsType == 'a') {
        data['news_imgs'] = ((data['news_imgs']).split(';'))[0];    //typeA的新闻需要一张图片地址
    } else if (newsType == 'c') {
        data['news_imgs'] = ((data['news_imgs']).split(';'));       //typeC的新闻需要三张图片地址
    }
    return data;

}
//通过毫秒数来转化成时间字符串
function timeConvert(time) {
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
        //转到php执行数据库操作
        window.location = './app/db_manipulate.php?action=del&id=' + id;
    }
}
//退出登录
function quit() {
    if (confirm("确定退出吗？")) {
        window.location = './app/db_manipulate.php?action=quit';
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
//定义函数，使用ajax方法上传图片，并拿到url
function uploadImgByAjax(e) {
    var target = e.target;
    var formData = new FormData(); //创建FormData进行表单提交
    formData.append('upload-img', $(target)[0].files[0]); //将文件类添加到表单中提交
    $.ajax({                       //创建ajax
        url: 'app/FileUpload.php',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function (res) {
        console.log(res);
        //结果包含Error时，输出错误
        if (res.slice(0, 5) == 'Error') {
            alert(res);
        } else {
            //成功时将图片预览
            console.log(res.slice(3));
            $(target).siblings('img').attr('src', res.slice(3));
            $(target).prev().val(res.slice(3));
        }

    }).fail(function (res) {
        alert("服务器出错！");
    });

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
                result = checkAbstractValue() & checkInputValueByName('news-imgs-1');
                break;
            case 'type-b':
                result = checkAbstractValue();
                console.log(result);

                break;
            case 'type-c':
                result = checkInputValueByName('news-imgs-1')&checkInputValueByName('news-imgs-2')&
                    checkInputValueByName('news-imgs-3');
                break;
            default :
                result = false;
                break;

        }
    }
    return result;

}

function getImg1Preview() {
    var imgSrc = document.getElementById('news-imgs-1').value;
    if (imgSrc == '') {
        alert('图片地址不能为空');
    } else {
        document.getElementById('img1-preview').src = imgSrc;

    }

}
function getImg2Preview() {
    var imgSrc = document.getElementById('news-imgs-2').value;
    if (imgSrc == '') {
        alert('图片地址不能为空');
    } else {
        document.getElementById('img2-preview').src = imgSrc;

    }

}
function getImg3Preview() {
    var imgSrc = document.getElementById('news-imgs-3').value;
    if (imgSrc == '') {
        alert('图片地址不能为空');
    } else {
        document.getElementById('img3-preview').src = imgSrc;

    }

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


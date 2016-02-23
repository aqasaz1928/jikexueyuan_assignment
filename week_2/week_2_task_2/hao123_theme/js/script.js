/**
 * Created by Joker on 2015/11/14.
 */


var themeList = document.getElementById("theme-change-list");
//定义函数改变网站主题
function changeTheme(theme) {
    var themePath = "./themes/" + theme + ".css";                               //获得主题样式文件
    var fileref = document.createElement("link");                           //动态穿件css外部链接
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", themePath);
    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);      //加css外部文件加载到文档的头部
    }

}

//隐藏主题选择框
function hideListPanel() {
    if (themeList.style.display == 'inline-block') {
        themeList.style.display = 'none';
    }
}

//显示主题选择框
function toggleSelectTheme() {
    themeList.style.display = "inline-block";
}


changeTheme('theme-green');








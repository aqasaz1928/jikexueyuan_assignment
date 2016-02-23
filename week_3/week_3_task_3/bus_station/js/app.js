/**
 * Created by Joker on 2016/1/25.
 */
$(function () {
    var stations = $("#station-list").find('li');
    for(var i=0;i<stations.length;i++){
       var stationName = $(stations[i]).find('a').text();
        console.log();
        if(stationName.length==5){
            $(stations[i]).find('a').css({
                'line-height':'15px',
                top:'7px'
            });
        }else if(stationName.length==6){
            $(stations[i]).find('a').css({
                'line-height':'12px',
                top:'12px'
            });
        }
    }
    stations.mouseenter(function () {
        var station = $(this).find('a').text();
        var arrow = $(".selected")
            .removeClass('selected')
            .find('.selected-arrow');
        $(this)
            .addClass('selected')
            .find('a').append(arrow);

        $("#selected-station").text(station);
    });


});
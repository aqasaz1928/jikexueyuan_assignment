/**
 * Created by Joker on 2016/2/16.
 */
$(function () {
    var navbar = $(".side-nav");
    var navbarY = navbar.offset().top;
    listItem = [];
    for (var i = 0; i < 12; i++) {
        listItem[i] = $(".nav").children().eq(i);
    }
    var itemPos = {
        0: 0,
        1:700,
        2:1050,
        3:1390,
        4:2020,
        5:2270,
        6:2670,
        7:2870,
        8:2120,
        9:3610,
        10:4000,
        11:4750
    };

    window.onscroll = function () {
        var scrollY = document.documentElement.scrollTop || pageYOffset;
        if (scrollY >= 150) {
            navbar.css({
                'position': 'fixed',
                top: '15px'
            });
        } else {
            navbar.css({
                'position': 'absolute',
                'top': navbarY
            });
        }

        setTimeout(function () {
            navPosition(scrollY);
            console.log(scrollY);
        }, 50);

    };


    function navPosition(positionY) {
        if (positionY <= itemPos[1]) {
            listItemActive(listItem[0]);
        } else if (positionY > itemPos[1] && positionY <= itemPos[2]) {
            listItemActive(listItem[1]);
        } else if (positionY > itemPos[2] && positionY <= itemPos[3]) {
            listItemActive(listItem[2]);
        } else if (positionY > itemPos[3] && positionY <= itemPos[4]) {
            listItemActive(listItem[3]);

        } else if (positionY > itemPos[4] && positionY <= itemPos[5]) {
            listItemActive(listItem[4]);
        } else if (positionY > itemPos[5] && positionY <= itemPos[6]) {
            listItemActive(listItem[5]);
        } else if (positionY > itemPos[6] && positionY <= itemPos[7]) {
            listItemActive(listItem[6]);
        } else if (positionY > itemPos[7] && positionY <= itemPos[8]) {
            listItemActive(listItem[7]);
        } else if (positionY > itemPos[8] && positionY <= itemPos[9]) {
            listItemActive(listItem[8]);
        } else if (positionY > itemPos[9] && positionY <= itemPos[10]) {
            listItemActive(listItem[9]);
        } else if (positionY > itemPos[10]&& positionY <= itemPos[11]) {
            listItemActive(listItem[10]);
        }else{
            listItemActive(listItem[11]);
        }
    }

    function listItemActive(item) {
        $('.active').removeClass('active');
        item.addClass('active');
    }

    $('.a-nav').each(function (n) {
        $(this).on('click', function () {
            $('body,html').animate({scrollTop: itemPos[n]+1}, 200);
            listItemActive(listItem[n]);
        })
    });

    //
    //for (var j = 0; j < 11; j++) {
    //    listItem[j].find('a').on('click', function (e) {
    //        listItemActive(listItem[j]);
    //        $('body,html').animate({scrollTop: itemPos[j]}, 200);
    //    })
    //}
    //
});
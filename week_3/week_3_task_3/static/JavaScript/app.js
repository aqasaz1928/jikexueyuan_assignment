$(function(){function s(){setTimeout(function(){var s=t.css("left");s=s.slice(0,-2),s>-2200?(s=parseInt(s)-570+"px",t.css({left:s})):(t.css({"transition-duration":"0s","-webkit-transition-duration":"0s",left:"0"}),setTimeout(function(){t.css({"transition-duration":"1s","-webkit-transition-duration":"1s",left:"-570px"})},100))},50)}function n(){setTimeout(function(){var s=t.css("left");s=s.slice(0,-2),console.log(s),s>-600?(s=parseInt(s)+570+"px",t.css({left:s}),setTimeout(function(){t.css({"transition-duration":"0s","-webkit-transition-duration":"0s",left:"-2280px"}),setTimeout(function(){t.css({"transition-duration":"1s","-webkit-transition-duration":"1s"})},100)},1e3)):(s=parseInt(s)+570+"px",t.css({left:s}))},50)}window.onscroll=function(){$(window).scrollTop()>110?$("#back-to-top").fadeIn(1e3):$("#back-to-top").fadeOut(1e3)},$("#back-to-top").on("click",function(){$("body,html").animate({scrollTop:0},500)});var t=$(".top-banner").find("ul");$(".banner-change-left").click(function(){n()}),$(".banner-change-right").click(function(){s()}),setInterval(function(){s()},5e3),$(".flexslider").flexslider({animation:"slider",minItems:1,move:1,itemWidth:150,itemMargin:10,animationLoop:!0,customDirectionNav:$(".banner-controller-partner a"),controlNav:!1}),$(".media-content").flexslider({animation:"slider",minItems:1,move:1,itemWidth:150,itemMargin:10,animationLoop:!0,customDirectionNav:$(".banner-controller-media a"),controlNav:!1}),$(".school-content").flexslider({animation:"slider",minItems:1,move:1,itemWidth:150,itemMargin:10,animationLoop:!0,customDirectionNav:$(".banner-controller-school a"),controlNav:!1}),$(".close-ad").click(function(){$(this).parent("div").hide()}),$("#search-input").focus(function(){$(this).css({outline:"none"}),$(".hot-search").hide()}).blur(function(){$(".hot-search").show()}),$(".class-recommendation-box").hover(function(s){var n=$(".class-classify-box").find("ul");n.hide();var t=$(this).attr("class").split(" ")[1];switch(t.substr(-1)){case"a":n.eq(0).show();break;case"b":n.eq(1).show();break;case"c":n.eq(2).show();break;case"d":n.eq(3).show();break;case"e":n.eq(4).show();break;case"f":n.last().show()}}).mouseenter(function(){$(".class-recommendation-box").css({"border-bottom":"1px solid #ccc"}),$(".class-recommendation").find("a").css({color:"#666"}),$(this).css({"border-bottom":"2px solid #35b558"}).find("a").css("color","#35b558")}),$(".lessons-classify-tab").mouseenter(function(){$(".lessons-classify-content").find("div").hide();var s=$(this).attr("id");s="."+s,$(s).show()}).mouseleave(function(s){console.log(s.pageY),s.pageY>=535&&($(".lessons-classify-content").find("div").hide(),$(".lessons-classify").css({height:"100%"}))}),$(".lessons-classify-outer").mouseover(function(){$(".lessons-classify-content").find("div").hide(),$(".lessons-classify").css({height:"100%"})}),$(".lessons-classify-content").find("div").mouseleave(function(){$(this).hide(),$(".lessons-classify").css({height:"100%"})}),$(".lessons-classify").mouseenter(function(){$(this).css({"z-index":"99",height:"410px"})})});
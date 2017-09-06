/**
 * Created by bao on 2017/9/5.
 */

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


$(function () {
    var c = findGetParameter('third');
    var b = findGetParameter('second');

    $("html,body").animate({scrollTop: $('#section_1').offset().top}, 400);

    // $("html,body").animate({scrollTop: section.offset().top}, 500);

    var content = $('#content');
    var items = $('#content>div');

    for (var i = 0; i < items.length; i++) {
            var title = items.eq(i).children('div')[0].innerHTML;
            var first = $("<a></a>", {
                "class": "list-group-item list-group-item-info first",
                "data-index": i,
                "href": "#"
            }).text(title);
            $('#left-nav').append(first);
            if (items.eq(i).find('span').length > 0) {
                var p = items.eq(i).find('p');
                var span= $("<span></span>", {
                    "class": "abox",
                    "style": "display: none",
                    "data-index": i
                });
                for (var j = 0; j < p.length; j++) {
                    var secTitle = p.eq(j).children('span')[0].innerHTML;

                    var a = $("<a></a>", {
                        "class": "list-group-item second",
                        "data-index":  j,
                        "href": "#"
                    }).text(secTitle);
                    span.append(a);
                    (function (j,i) {
                        $(window).scroll(function (e) {
                            var span = $('#content>div').eq(i).find('span');
                            var screen = $(window).scrollTop();
                            var divHeight = span.eq(j).parent().height();
                            var a = span.eq(j).parent().offset().top;
                            if (a <= screen && (a + divHeight) > screen) {
                                $("#left-nav>a").removeClass("active");
                                $("#left-nav>a").eq(i).addClass('active');

                                $("#left-nav>span a").removeClass("secActive");
                                $("#left-nav>a").eq(i).next().show().find('a').eq(j).addClass("secActive");
                            }
                        });
                    })(j, i)
                }
                $('#left-nav').append(span);
            }
    }


    for (var d = 0; d < items.length; d++) {
        (function (d) {
            $(window).scroll(function (e) {
                var title = $('#content').find('.title');
                var screen = $(window).scrollTop();

                var divHeight = title.eq(d).height();
                var b = title.eq(d).offset().top;
                if (b <= screen && (b + divHeight) > screen) {

                    // if($('#content>div').eq(d).find('span').length===0){
                        $("#left-nav>span>a").removeClass("secActive");
                    // }

                    $("#left-nav>a").removeClass("active");
                    $("#left-nav>a").eq(d).addClass("active");
                }
            });
        })(d)

    }


        $('.first').click(function (e) {
        var index = $(this).data('index');
        var node = $(this).next()[0].nodeName;
        if(node !== "A"){
            $(this).next().toggle();
        }
        $("html,body").animate({scrollTop: $('.title').eq(index).offset().top}, 400, function () {
            setTimeout($("#left-nav>span>a").removeClass("active"), 100)
        });

    });

    $('.second').click(function (e) {
        var f = $(this).parent().prev().data('index');
        console.log(f)

        var section = $('#content>div').eq(f);
        var s = section.find('span');
        var i =  $(this).data('index');
        $("html,body").animate({scrollTop: s.eq(i).offset().top}, 400);
    })




    //     }
    //
    //     $('.list-group-item').click(function (e) {
    //         e.preventDefault();
    //         var index = $(this).data('index');
    //         // location.href = "text" + b + "_" + index+
    //         $("html,body").animate({scrollTop: span.eq(index).offset().top}, 400);
    //     })
    // } else {
    //     $('#content').removeClass('container').addClass('full');
    // }
    // $('.list-group-item:first-child').addClass('active');


    // if(c){
    //     $('.list-group-item').eq(c-1).click()
    // }


});

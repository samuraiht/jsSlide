//スライドショーの速度
const slideSpeed = 2000;//ミリ秒
//スライドショーの間隔
const slideInterval = 4000;//ミリ秒
//何番目のバナーが表示中か
let nthSlide = 0;
//setInterval用
let intervalId;

window.onload = function() {
    function slideNext() {
        $('#slideBanner ul').animate({marginLeft: "-1800px"}, slideSpeed, "swing", function() {
            $("#slideBanner li:first-child").appendTo('#slideBanner ul');
            $('#slideBanner ul').css("margin-left", "-900px");
            ++nthSlide;
            nthSlide %= 3;
            $('#slideButton span').removeClass('slideNow').eq(nthSlide).addClass('slideNow');
        });
    }
    function slidePrev() {
        $('#slideBanner ul').animate({marginLeft: "0px"}, slideSpeed, "swing", function() {
            $("#slideBanner li:left-child").prependTo('#slideBanner ul');
            $('#slideBanner ul').css("margin-left", "-900px");
            --nthSlide;
            nthSlide %= 3;
            $('#slideButton span').removeClass('slideNow').eq(nthSlide).addClass('slideNow');
        });
    }
    function slideNth(nth) {
        let move = nth - nthSlide;
        switch(move) {
            case -2:
                slideNext();
                break;
            case -1:
                slidePrev();
                break;
            case 1:
                slideNext();
                break;
            case 2:
                slidePrev();
                break;
        }
    }

//ページ読み込み時
    slideNext();
    intervalId = setInterval(slideNext, slideInterval);

    $('#slideButton span').on('click', function() {
        if($(this).hasClass('slideNow')) return;
        clearInterval(intervalId);
        slideNth($('#slideButton span').index(this));
        intervalId = setInterval(slideNext, slideInterval);
    });
};
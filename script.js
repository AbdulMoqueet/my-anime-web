let isOpen = false,
    isWorking = false,
    isNight = true,
    last_element,
    up_Arrow,
    timer = null;

/*
* Using Javascript ES6
*/

window.onload = () => {
    
    let loading = document.getElementById("loading");
    let body = document.getElementsByTagName('body')[0];

    last_element = document.getElementById("last_element");
    up_Arrow = document.getElementsByClassName("up-arrow")[0];

    loading.style.display = "none";
    body.style.overflowY = "auto";

    setTimeout(() => {

       enhanceArmament();

    }, 100);


    let textWrapper = document.querySelector('.title');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: true})
        .add({
            targets: '.title .letter',
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70 * i
        }).add({
        targets: '.title',
        opacity: 0,
        duration: 1500,
        easing: "easeOutExpo",
        delay: 500
    });

};

window.onscroll = () => {

    let myCarousel = document.getElementById('myCarousel');
    let myCarouselLength = parseInt(getComputedStyle(myCarousel).height);
    let nav = document.getElementsByClassName('nav')[0];
    
    let yOffset = window.pageYOffset;

    if (yOffset > myCarouselLength) {
        nav.style.position = 'fixed';
        nav.style.top = '0';
        if (isNight)
            nav.style.background = "#1e1e1e";
        else
            nav.style.background = "#6200ee";
    } else if (yOffset == 0) {
        nav.style.position = 'fixed';
        nav.style.top = '0';
        nav.style.background = "rgba(0, 0, 0, 0.4)";
    } else {
        nav.style.top = '-90px';
    }

    if (yOffset > last_element.offsetTop - last_element.offsetHeight) {
        up_Arrow.style.right = '10px';
    } else {
        up_Arrow.style.right = '-60px';
    }
    
};

$(document).ready(function () {

    
    const body = $("body"),
        day = $("#day"),
        night = $("#night");

    $(".day, .night").hide();

    $('.menu').click(() => {

        if (isWorking)
            return;

        isWorking = true;
        day.prop('disabled', true);
        night.prop('disabled', true);

        if (!isOpen) {

            openNavBar(null);

        } else {

            closeNavBar(null);

        }

    });

    function slideUp(target, duration, isResetable) {

        if (isResetable) {

            $(target).hide().css("animation", "none");

        } else {

            let anim = "bounceInUp " + duration;
            $(target).show().css("animation", anim);

        }
    }

    function openNavBar() {
        $('.l1').css('transform', 'rotate(45deg)');

        $('.l2').css('opacity', '0');

        $('.l3').css('transform', 'rotate(-45deg)');

        body.css('overflow-y', 'hidden');

        $('.nav-contents').animate({height: window.innerHeight}, 1500, () => {
            isOpen = true;

            slideUp(".sel-theme", "1.5s", false);
            slideUp(".day, .night", "2s", false);
            slideUp(".other-code", "2.5s", false);
            slideUp(".c1", "2.8s", false);
            slideUp(".c2", "2.9s", false);

            $(".c2").one('webkitAnimationEnd animationend', () => {
                day.prop('disabled', false);
                night.prop('disabled', false);
                

                if (isNight)
                    night.prop('checked', true);
                else
                    day.prop('checked', true);
            });

            setTimeout(() => {
                isWorking = false;
            }, 100);

        });
    }

    function closeNavBar(callBack) {

        $('.l1').css('transform', 'rotate(0deg)');

        $('.l2').css('opacity', '1');

        $('.l3').css('transform', 'rotate(0deg)');

        $('.nav-contents').animate({height: 0}, 1500, () => {

            body.css('overflow-y', 'auto');
            isOpen = false;

            slideUp(".sel-theme", "0", true);
            slideUp(".day, .night", "0", true);
            $(".day, .night").hide();
            slideUp(".other-code", "2.5s", true);
            slideUp(".c1", "0", true);
            slideUp(".c2", "0", true);
            night.prop('checked', false);
            day.prop('checked', false);

            setTimeout(() => {
                isWorking = false;
            }, 100);

            if (callBack != null)
                callBack();

        });

    }


    day.change((e) => {
        isNight = false;
        closeNavBar(() => {
            dayMode();
        });
        return false;
    });

    night.change(() => {
        isNight = true;
        closeNavBar(() => {
            nightMode();
        });
    });
    
    day.click((e)=>{
       e.stopPropagation();
    });
    
    night.click((e)=>{
        e.stopPropagation();
    })

    function dayMode() {

        body.css("background-color", "#efefef");
        handleNavtransparency();
        $(".anime-title").css("color", "#000000");
        $(".line").css("border-bottom", "1px solid #000000");

        $(".footer").css("background-color", "#6200ee");
        $(".up-arrow div").css("background-color", "#6200ee");

    }

    function nightMode() {

        body.css("background-color", "#121212");
        handleNavtransparency();
        
        $(".anime-title").css("color", "#ffffff");
        $(".line").css("border-bottom", "1px solid #ffffff");

        $(".footer").css("background-color", "#1e1e1e");
        $(".up-arrow div").css("background-color", "#000000");

    }

    body.click((event) => {
        
       star_brust(event);

    });

    function handleNavtransparency() {

        let myCarousel = document.getElementById('myCarousel');
        let myCarouselLength = parseInt(getComputedStyle(myCarousel).height);
        let yOffset = window.pageYOffset;
        let nav = document.getElementsByClassName('nav')[0];

        if (yOffset > myCarouselLength) {
            if (isNight)
                nav.style.background = "#1e1e1e";
            else
                nav.style.background = "#6200ee";
        }

    }
});

function scrollUp(targetElementId) {

    let MIN_PIXELS_PER_STEP = 16,
        MAX_SCROLL_STEPS = 80,
        target = document.getElementById(targetElementId),
        scrollTarget = target;

    do {
        scrollTarget = scrollTarget.parentNode;
        if (!scrollTarget) return;
        scrollTarget.scrollTop += 1;
    } while (scrollTarget.scrollTop === 0);

    let targetY = 0;
    do {
        if (target === scrollTarget) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    let pixelsPerStep = Math.max(MIN_PIXELS_PER_STEP,
        Math.abs(targetY - scrollTarget.scrollTop) / MAX_SCROLL_STEPS);

    let isUp = targetY < scrollTarget.scrollTop;

    let stepFunc = () => {
        if (isUp) {
            scrollTarget.scrollTop = Math.max(targetY, scrollTarget.scrollTop - pixelsPerStep);
            if (scrollTarget.scrollTop <= targetY) {
                return;
            }
        } else {
            scrollTarget.scrollTop = Math.min(targetY, scrollTarget.scrollTop + pixelsPerStep);

            if (scrollTarget.scrollTop >= targetY) {
                return;
            }
        }

        window.requestAnimationFrame(stepFunc);
    };

    window.requestAnimationFrame(stepFunc);
}

function redirect(targetURL) {
    setTimeout(() => {
        window.location = targetURL;
    }, 1000);
}



function enhanceArmament(){
    
     let Sick_Line_Bro_0x2930 = [
        'ease-out-back',
        'bottom-bottom'
    ];
    
    (function (_0x347f01, _0x5ae81d) {
        
        let _0x26ea9d = (_0x18b34c) => {
            while (--_0x18b34c) {
                _0x347f01['push'](_0x347f01['shift']());
            }
        };
        
        _0x26ea9d(++_0x5ae81d);
        
    }(Sick_Line_Bro_0x2930, 0x192));
    
    let Sick_Line_Bro_0x7a44 = (_0x1dcf84, _0x4a4ce2) => {
        _0x1dcf84 = _0x1dcf84 - 0x0;
        let _0x4f571c = Sick_Line_Bro_0x2930[_0x1dcf84];
        return _0x4f571c;
    };
    
    AOS['init']({
        'easing': Sick_Line_Bro_0x7a44('0x0'),
        'duration': 0x4b0,
        'delay': 0x64,
        'mirror': !![],
        'anchorPlacement': Sick_Line_Bro_0x7a44('0x1'),
        'offset': 0xa0
    });
    
}

function star_brust(event){
    
    let sick_line_bro_0x1e4f = ['scale(0.4)',
        'clientX',
        'clientY',
        '.star-brust',
        'show',
        'scale(0.7)',
        'css'];

    (function (_0x2f184b, _0x150adb) {

        let _0x66a54d = (_0x51fe1d) => {
            while (--_0x51fe1d) {
                _0x2f184b['push'](_0x2f184b['shift']());
            }
        };
        _0x66a54d(++_0x150adb);
    }(sick_line_bro_0x1e4f,
        0x10b));

    let sick_line_bro_0x456e = (_0x481068, _0x2b6af) => {
        _0x481068 = _0x481068 - 0x0;
        let _0x3068f4 = sick_line_bro_0x1e4f[_0x481068];
        return _0x3068f4;
    };

    let xPos = event[sick_line_bro_0x456e('0x0')],
        yPos = event[sick_line_bro_0x456e('0x1')];

    $(sick_line_bro_0x456e('0x2'))[sick_line_bro_0x456e('0x3')]()['css']({
        'left': xPos,
        'top': yPos,
        'transform': sick_line_bro_0x456e('0x4'),
        'opacity': 0x1
    });

    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    timer = setTimeout(() => {
        $(sick_line_bro_0x456e('0x2'))[sick_line_bro_0x456e('0x5')]({
            'transform': sick_line_bro_0x456e('0x6'),
            'opacity': 0x0
        });
    }, 0x4b0);
    
}

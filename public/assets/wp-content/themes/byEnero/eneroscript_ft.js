jQuery(window).on("load", function () {
    jQuery(".loader-wrapper").fadeOut();
    //jQuery(window).scrollTop(jQuery(window).scrollTop() + 1);
    // console.log("loaded");
});

//scroll to features phones
if (jQuery(window).width() < 550) {
    jQuery(".feature_wrap").click(function () {
        jQuery(window).scrollTop(jQuery("#features_ancor").offset().top);
    });
}

// OWL two carousel - Sub Header
jQuery(document).ready(function () {
    jQuery(".owl-six").owlCarousel({
        loop: true,
        nav: false,
        //animateOut: "fadeOut",
        margin: 0,
        responsiveClass: true,
        autoplay: true,
        autoplaySpeed: 500,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        items: 1,
        dots: false,
    });
});

// close download popup
jQuery("#close_download_popup").click(function () {
    jQuery("#download_popup").fadeOut();
});

// open download popup
jQuery(".open_download_popup").click(function () {
    jQuery("#download_popup").css("display", "flex");
});

jQuery(document).ready(function ($) {
    //new read more how does it work
    jQuery(".find_out.one").click(function () {
        jQuery(".overlay-text.one").slideToggle();
    });
    jQuery(".find_out.two").click(function () {
        jQuery(".overlay-text.two").slideToggle();
    });
    jQuery(".find_out.three").click(function () {
        jQuery(".overlay-text.three").slideToggle();
    });

    //Mobile popup
    jQuery("#close_mob_popup").click(function () {
        jQuery(".mobile_popup").slideToggle();
        jQuery("#fc_frame").attr("style", "margin-bottom:0px");
    });

    $(window).on("scroll", function () {
        if ($(window).width() < 550) {
            scrollPosition = $(this).scrollTop();
            if (scrollPosition >= 800) {
                // If the function is only supposed to fire once
                jQuery(".mobile_popup").slideToggle();
                $(this).off("scroll");

                jQuery("#fc_frame").attr("style", "margin-bottom:40px");
            }
            // Other function stuff here...
        }
    });

    //Hiding/showing text services

    jQuery(".service_tab").click(function () {
        jQuery(this).find(".service_description").slideToggle();
    });
    // OWL three carousel - features

    jQuery(document).ready(function () {
        jQuery(".owl-five").owlCarousel({
            loop: true,
            nav: false,
            margin: 0,
            lazyLoad: true,
            animateOut: "fadeOut",
            responsiveClass: true,
            autoplay: false,
            autoplaySpeed: 1000,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            URLhashListener: true,
            items: 1,
            dots: false,
        });
    });

    // OWL three carousel - features
    jQuery(document).ready(function () {
        var owlfour = jQuery(".owl-four");
        owlfour.owlCarousel({
            loop: true,
            nav: false,
            lazyLoad: true,
            margin: 0,
            animateOut: "fadeOut",
            responsiveClass: true,
            autoplay: false,
            autoplaySpeed: 1000,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            URLhashListener: true,
            items: 1,
            dots: false,
        });
        owlfour.on("changed.owl.carousel", function (property) {
            changfeature();
        });
    });

    // function to highlight feature

    function changfeature() {
        var hash = window.location.hash;
        jQuery("#features").find(".feature_wrap").removeClass("active");
        jQuery(hash + "-id")
            .find(".feature_wrap")
            .addClass("active");
        console.log(hash);
    }

    /*
 This is the Javascript module that helps to build and play the required Iframes from Youtube
 Its a javascript constructor that is being called with 3 required argument.
 Read the implementation documents for more information.
*/
    (function (moduleFunc) {
        try {
            if (typeof define === "function" && !!define.amd) {
                define("cmb-youtube-overlay", function () {
                    return moduleFunc(window, document);
                });
            } else if (!!window && typeof window === "object") {
                window.YoutubeOverlayModule = moduleFunc(window, document);
            } else {
                throw new Error(
                    "Error on Load -> Check - May be not sure about your dev environment"
                );
            }
        } catch (thisError) {
            console.error(thisError);
            return;
        }
    })(function (w, d) {
        /*
         * The constructor requires a request object that would have -
         * requestObj.sourceUrl (which is the youtube embed url)
         * requestObj.triggerElement (id value of the element upon which click event is registered)
         * requestObj.progressCallback (the function that gets called for updates from this Constructor for loading, completion etc...
         *
         * requestObj is mandatory;
         */
        var YtConst = function (requestObj) {
            try {
                if (!requestObj) {
                    throw new Error(
                        "Youtube overlay requires a request object argument."
                    );
                    return;
                } else if (
                    !("sourceUrl" in requestObj) ||
                    !("triggerElement" in requestObj)
                ) {
                    throw new Error(
                        "Youtube overlay requires requestObject with mandatory props"
                    );
                    return;
                } else if (
                    typeof requestObj.sourceUrl !== "string" ||
                    typeof requestObj.triggerElement !== "string"
                ) {
                    throw new Error(
                        "Youtube overlay requires requestObject with mandatory props which are of string types."
                    );
                    return;
                } else if (
                    !!requestObj.progressCallback &&
                    typeof requestObj.progressCallback !== "function"
                ) {
                    throw new Error(
                        "Youtube overlay - Progress Callback must be of function type if it is specified in the request"
                    );
                } else {
                    this.overlayContainer = "#youtubePlayerOverlay";
                    this.sourceUrl = requestObj.sourceUrl;
                    this.triggerElement = requestObj.triggerElement;
                    this.progressCallback = requestObj.progressCallback;
                    this._isDoneDone = {
                        progressType: "request-completed",
                        progressMessage: "Your request has been accepted and processed.",
                    };
                    this._isBeingDone = {
                        progressType: "processing-request",
                        progressMessage: "Your request is being processed. Please wait.",
                    };
                    this._isBeingClosed = {
                        progressType: "player-closed",
                        progressMessage: "The overlay player has been closed down.",
                    };
                }
            } catch (thisError) {
                console.error(thisError);
            }
        };
        var cpo = YtConst.prototype;
        /* initializes the entire process */
        cpo.activateDeployment = function () {
            var $this = this;
            $this.createPlayerContainer();
        };
        /* incase the overlay modal is not there, create it */
        cpo.createPlayerContainer = function () {
            var $this = this;
            if ($($this.overlayContainer).length === 0) {
                var o = $(
                        '<div class="videoPlayerOverlay hide hiddenTransform" id="youtubePlayerOverlay" data-hasloaded="false"></div>'
                    ),
                    cButton = $(
                        '<button id="youtubeOverlayCloser" class="defaultButton closeIcon"><i class="fas fa-times "></i></button>'
                    ),
                    b = $("body");
                cButton.appendTo(o);
                o.appendTo(b);
            }
            $this.triggerCheck();
        };
        /* makes sure that the trigger element is actually present */
        cpo.triggerCheck = function () {
            var $this = this;
            try {
                if ($($this.triggerElement).length === 0) {
                    throw new Error(
                        "Youtube Overlay Constructor -> Not able to locate the required Trigger-Element. Can you please check id? ---> " +
                        $this.triggerElement
                    );
                    return;
                }
                $this.activateOnClickHandler();
            } catch (thisError) {
                console.error(thisError);
            }
        };
        /* registers an on click event for the trigger element id */
        cpo.activateOnClickHandler = function () {
            var $this = this,
                t = $this.triggerElement,
                s = $this.sourceUrl,
                o = $this.overlayContainer;

            $(t).on("click", function () {
                $this.progressCallback($this._isBeingDone);
                var nowLoaded = $(o).attr("data-hasloaded"),
                    triggerId = $(t).attr("id"),
                    idEquals = nowLoaded === triggerId;

                if (idEquals) {
                    $this.openPlayerOverlay();
                    $this.progressCallback($this._isDoneDone);
                } else {
                    $(o).find("iframe").remove();
                    var requiredIframe = $(
                        '<iframe width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe>'
                    );
                    requiredIframe.attr({
                        src: $this.sourceUrl + "?showinfo=0&rel=0",
                    });
                    requiredIframe.appendTo($(o));
                    $(o).attr("data-hasloaded", triggerId);
                    $this.openPlayerOverlay();
                    $this.progressCallback($this._isDoneDone);
                }
            });
        };
        /* this function opens the modal overlay and helps to auto play the video
         * autoplay feature works on desktop only */
        cpo.openPlayerOverlay = function () {
            var $this = this,
                o = $this.overlayContainer;
            $(o).removeClass("hide");
            setTimeout(function () {
                $(o).removeClass("hiddenTransform");
                setTimeout(initTheseInternals, 280);
            }, 80);

            function initTheseInternals() {
                var thisIframe = $(o).find("iframe")[0];
                thisIframe.src += "&autoplay=1";

                $(o)
                    .find("#youtubeOverlayCloser")
                    .off("click")
                    .on("click", function () {
                        var nowVidSrc = thisIframe.src.split("&autoplay=1")[0],
                            srcAutoplayOff = nowVidSrc + "&autoplay=0";
                        thisIframe.src = srcAutoplayOff;
                        thisIframe.src = nowVidSrc;
                        $this.closePlayerOverlay();
                    });

                /* initialize escape key press event */
                $this.closeOnEscapeKeyPress();

                /* initialize scroll event */
                $this.closeOnScroll();
            }
        };
        /* closes the modal overlay and stop the video from playing */
        cpo.closePlayerOverlay = function () {
            var $this = this,
                o = $this.overlayContainer;
            $(o).addClass("hiddenTransform");
            setTimeout(function () {
                $(o).addClass("hide");
                $this.progressCallback($this._isBeingClosed);
            }, 260);
        };
        /* you can close this module overlay if the user presses the Escape key */
        cpo.closeOnEscapeKeyPress = function () {
            var $this = this,
                o = $this.overlayContainer;
            $(d).on("keyup", function (event) {
                if (event.which === 27 && !$(o).hasClass("hiddenTransform")) {
                    $(o).find("#youtubeOverlayCloser").trigger("click");
                }
            });
        };

        /* you can close this module overlay if the user scrools down */
        cpo.closeOnScroll = function () {
            var $this = this,
                o = $this.overlayContainer;
            $("#youtubePlayerOverlay").click(function (event) {
                if (!$(o).hasClass("hiddenTransform")) {
                    $(o).find("#youtubeOverlayCloser").trigger("click");
                }
            });
        };

        return YtConst;
    });

    /* Constructor */
    $(document).ready(function () {
        var img = $("#play");
        var configObject = {
            sourceUrl: img.attr("data-videourl"),
            triggerElement: "#" + img.attr("id"),
            progressCallback: function () {
                console.log("Callback Invoked.");
            },
        };

        var videoBuild = new YoutubeOverlayModule(configObject);
        videoBuild.activateDeployment();
    });

    // /. popu VIDEO
}); // WP jQuery workaround
//Paralax

jQuery(window).scroll(function (e) {
    //  parallax1();
    //    parallax2();
});

function parallax1() {
    var scroll = jQuery(window).scrollTop();
    var screenHeight = jQuery(window).height();

    if (jQuery(window).width() > 768) {
        jQuery(".hero_bg").each(function () {
            var offset = jQuery(this).offset().top;
            var distanceFromBottom = offset - scroll - screenHeight;

            if (offset > screenHeight && offset) {
                jQuery(this).css(
                    "background-position",
                    "center " + distanceFromBottom * 0.15 + "px"
                );
            } else {
                jQuery(this).css(
                    "background-position",
                    "center " + scroll * 0.15 + "px"
                );
            }
        });
    }
}

function parallax2() {
    var scroll = jQuery(window).scrollTop();
    var screenHeight = jQuery(window).height();
    if (jQuery(window).width() > 768) {
        jQuery(".header_bg").each(function () {
            var offset = jQuery(this).offset().top;
            var distanceFromBottom = offset - scroll - screenHeight;

            if (offset > screenHeight && offset) {
                jQuery(this).css(
                    "background-position",
                    "center " + distanceFromBottom * 0.45 + "px"
                );
            } else {
                jQuery(this).css(
                    "background-position",
                    "center " + scroll * 0.45 + "px"
                );
            }
        });
    }
}

//Smooth scroll to ancor
/*
jQuery('a[href*="#"]').on("click", function (e) {
  if (jQuery(jQuery(this).attr("href")).length) {
    e.preventDefault();

    jQuery("html, body").animate(
      {
        scrollTop: jQuery(jQuery(this).attr("href")).offset().top,
      },
      500,
      "linear"
    );
  }
});*/

// animations
(function (jQuery) {
    jQuery.fn.visible = function (partial) {
        var jQueryt = jQuery(this),
            jQueryw = jQuery(window),
            viewTop = jQueryw.scrollTop(),
            viewBottom = viewTop + jQueryw.height(),
            _top = jQueryt.offset().top,
            _bottom = _top + jQueryt.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return compareBottom <= viewBottom && compareTop >= viewTop;
    };
})(jQuery);

jQuery(window).scroll(function (event) {
    jQuery(".module").each(function (i, el) {
        var el = jQuery(el);
        if (el.visible(true)) {
            el.addClass("come-in");
        }
    });

    jQuery(".moduletwo").each(function (i, el) {
        var el = jQuery(el);
        if (el.visible(true)) {
            el.addClass("come-in two");
        }
    });
});

// OWL one carousel - how does it work
jQuery(document).ready(function () {
    var owlone = jQuery(".owl-one");
    owlone.owlCarousel({
        loop: true,
        nav: true,
        margin: 0,
        responsiveClass: true,
        autoplay: false,
        autoplayHoverPause: false,
        dots: false,
        items: 1,
        URLhashListener: true,
        lazyLoad: false,
    });

    owlone.on("changed.owl.carousel", function (property) {
        changesteps();
    });

    owlone.on("changed.owl.carousel", function (event) {
        // selecting the current active item
        var item = event.item.index - 2;
        // first removing animation for all captions
        jQuery(".hdw_text_wrap").removeClass("fade-in three");
        jQuery(".owl-item.active")
            .next()
            .find(".hdw_text_wrap")
            .addClass("fade-in three");
        jQuery(".hdw_text_wrap.prvni").addClass("fade-in three");
    });
});

// function to highlight steps

function changesteps() {
    var hash = window.location.hash;
    jQuery(".hdw_navigation").find(".step").removeClass("active");
    jQuery(hash + "_id").addClass("active");
    console.log(hash);
}

// OWL two carousel - testimonials
jQuery(document).ready(function () {
    jQuery(".owl-two").owlCarousel({
        loop: true,
        nav: false,
        animateOut: "fadeOut",
        margin: 0,
        responsiveClass: true,
        autoplay: true,
        autoplaySpeed: 2000,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        items: 1,
        dots: true,
    });
});

// OWL three carousel - tab1
jQuery(document).ready(function () {
    var owlthree = jQuery(".owl-three");
    owlthree.owlCarousel({
        items: 1,
        loop: false,
        lazyLoad: true,
        center: true,
        dots: false,
        margin: 0,
        URLhashListener: true,
        startPosition: "URLHash",
    });

    owlthree.on("changed.owl.carousel", function (property) {
        changetabs();
    });
});

// function to change tabs of table
function changetabs() {
    var hash = window.location.hash;
    var id = hash.substring(hash.indexOf("#") + 1);
    var no_table = hash.charAt(hash.indexOf("#") + 1);
    jQuery("#tabs_" + no_table)
        .find(".tab")
        .removeClass("active");
    jQuery("#tab_" + id).addClass("active");
}

jQuery(document).ready(function () {
    changetabs();
});

// Toggle price table
jQuery(document).ready(function () {
    jQuery(".pricingtable_section")
        .find(".tab_head")
        .click(function () {
            jQuery(this).next().slideToggle();
            jQuery(this).find(".arrow_open").toggleClass("rotate");
        });
});

jQuery(".owl-one").on("click", ".toggle", function () {
    jQuery(this)
        .children(".overlay-text")
        .slideToggle("slow", function () {});
});

// Fades out small How does it work

jQuery(window).scroll(function () {
    if (jQuery(window).scrollTop() < 110) {
        jQuery("#next").stop(true, true).fadeIn(4000);
    } else {
        jQuery("#next").stop(true, true).fadeOut(4000);
    }
});

//Simple jQuery Animated Counter
// (function (jQuery) {
//   jQuery.fn.jQuerySimpleCounter = function (options) {
//     let settings = jQuery.extend(
//       {
//         start: 0,
//         end: 100,
//         easing: "swing",
//         duration: 400,
//         complete: "",
//       },
//       options
//     );

//     const thisElement = jQuery(this);

//     jQuery({ count: settings.start }).animate(
//       { count: settings.end },
//       {
//         duration: settings.duration,
//         easing: settings.easing,
//         step: function () {
//           let mathCount = Math.ceil(this.count);
//           thisElement.text(mathCount);
//         },
//         complete: settings.complete,
//       }
//     );
//   };
// })(jQuery);

// CTA Section
// var ten_percent = false;
// var discount = 10;
// var counter = 30;
// var interval = 0;

// jQuery(document).ready(function () {
//   jQuery("#popup").fadeIn();
//   jQuery("#percent").jQuerySimpleCounter({
//     start: 0,
//     end: 10,
//     duration: 2500,
//   });
//   jQuery("#cta_odrer_now_btn").addClass("filled_33");

//   interval = setInterval(insideTimer, 1000);

//   ten_percent = true;
// });
// //-----counter1---------

// function insideTimer() {
//   counter--;
//   if (counter <= 0) {
//     // After completion
//     clearInterval(interval);
//     jQuery("#wantmore").html("Try again");
//     jQuery("#lets_not").hide();

//     jQuery("#hide_cta").hide();
//     jQuery("#snooze").show();

//     discount = 0;
//     counter = 30;
//     jQuery("#cta_odrer_now_btn").removeClass("filled_100");
//     jQuery("#cta_odrer_now_btn").removeClass("filled_66");
//     jQuery("#cta_odrer_now_btn").removeClass("filled_33");

//     // After click click
//   } else {
//     jQuery("#time").text(counter);
//   }
// }

// jQuery("#wantmore").click(function () {
//   if (discount == 30) {
//     // 3rd click - Dont try your luck
//     jQuery("#lets_not").show();
//     jQuery("#hide_cta").hide();
//     jQuery("#wantmore").html("I am sorry 😀");

//     discount = 100;
//     return;
//   }

//   if (discount == 100) {
//     jQuery("#lets_not").hide();
//     jQuery("#hide_cta").show();
//     jQuery("#wantmore").html("Don't push it");

//     discount = 30;
//     return;
//   }

//   if (discount == 20) {
//     clearInterval(interval);
//     counter = 11;
//     interval = setInterval(insideTimer, 1000);

//     // 2nd Click (discount 30%)
//     jQuery("#percent").jQuerySimpleCounter({
//       start: 20,
//       end: 30,
//       duration: 1000,
//     });

//     jQuery("#code_20").slideToggle("slow");
//     jQuery("#code_30").slideToggle("slow");
//     jQuery("#cta_odrer_now_btn").removeClass("filled_66");
//     jQuery("#cta_odrer_now_btn").addClass("filled_100");
//     discount = 30;
//     return;
//   }
//   if (discount == 10) {
//     clearInterval(interval);
//     counter = 21;
//     interval = setInterval(insideTimer, 1000);

//     // 1st Click (discount 20%)
//     jQuery("#percent").jQuerySimpleCounter({
//       start: 10,
//       end: 20,
//       duration: 1000,
//     });

//     jQuery("#code_10").slideToggle("slow");
//     jQuery("#code_20").slideToggle("slow");
//     jQuery("#wantmore").html("GET EVEN MORE");
//     jQuery("#cta_odrer_now_btn").removeClass("filled_33");
//     jQuery("#cta_odrer_now_btn").addClass("filled_66");

//     discount = 20;
//     return;
//   }

//   if (discount == 0) {
//     // Restart
//     jQuery("#time").html("30");
//     counter = 30;
//     interval = setInterval(insideTimer, 1000);

//     jQuery("#code_30").hide();
//     jQuery("#code_20").hide();
//     jQuery("#code_10").show();

//     jQuery("#hide_cta").show();
//     jQuery("#snooze").hide();
//     jQuery("#wantmore").html("Get More");

//     jQuery("#percent").jQuerySimpleCounter({
//       start: 0,
//       end: 10,
//       duration: 2000,
//     });
//     jQuery("#cta_odrer_now_btn").addClass("filled_33");

//     discount = 10;
//     return;
//   }
// });

jQuery("#close_popup").click(function () {
    jQuery("#popup").fadeOut();
});

// Save / read popup cookie

jQuery(".save_c").click(function () {
    window.sessionStorage.setItem("save_c", "1");
});

jQuery(document).ready(function () {
    // if (window.sessionStorage.getItem("save_c") != "1") {
    if (false) {
        jQuery("#popup").css("display", "flex");
        console.log("popup now");
    } else {
        jQuery("#popup").css("display", "none");
        console.log("dont popup now");
    }
});

//--------------------

// Mobile download detection

jQuery(document).ready(function () {
    var Name = "Unknown OS";
    if (navigator.userAgent.indexOf("Win") != -1) Name = "Windows OS";
    if (navigator.userAgent.indexOf("Mac") != -1) Name = "Macintosh";
    if (navigator.userAgent.indexOf("Linux") != -1) Name = "Linux OS";

    if (navigator.userAgent.indexOf("Android") != -1) {
        jQuery(".mobiledownload").attr(
            "href",
            "https://play.google.com/store/apps/details?id=com.laundryportal.app"
        );
        Name = "Android OS";
    } else if (navigator.userAgent.indexOf("like Mac") != -1) {
        jQuery(".mobiledownload").attr(
            "href",
            "https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1"
        );
        Name = "iOS";
    } else {
        jQuery(".mobiledownload").attr(
            "href",
            "https://thelaundryportal.com/about/#download"
        );
    }
});

// Mobile call to support
if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
) {
    jQuery(".sticky-logo-link").attr("href", "tel: +971528500040");
    jQuery(".sticky-logo").addClass("hidden");
    jQuery(".sticky-logo-link").append(
        '<span id="calltosupport" class="gradient_text"> <i class="fas  fa-phone-alt pr-1"></i> <span class="callus">CALL US</span> </span>'
    );
}

// Toggle detail wash forld

jQuery("#toggle_wash_fold_detail").click(function () {
    jQuery("#wash_fold_detail").slideToggle();
});

//Paralax

jQuery(window).scroll(function(e) {
  parallax1();
  parallax2();
});

function parallax1() {
  var scroll = jQuery(window).scrollTop();
  var screenHeight = jQuery(window).height();

  jQuery(".hero_bg").each(function() {
    var offset = jQuery(this).offset().top;
    var distanceFromBottom = offset - scroll - screenHeight;

    if (offset > screenHeight && offset) {
      jQuery(this).css(
        "background-position",
        "center " + distanceFromBottom * 0.15 + "px"
      );
    } else {
      jQuery(this).css("background-position", "center " + scroll * 0.15 + "px");
    }
  });
}

function parallax2() {
  var scroll = jQuery(window).scrollTop();
  var screenHeight = jQuery(window).height();

  jQuery(".header_bg").each(function() {
    var offset = jQuery(this).offset().top;
    var distanceFromBottom = offset - scroll - screenHeight;

    if (offset > screenHeight && offset) {
      jQuery(this).css(
        "background-position",
        "center " + distanceFromBottom * 0.45 + "px"
      );
    } else {
      jQuery(this).css("background-position", "center " + scroll * 0.45 + "px");
    }
  });
}

//Smooth scroll to ancor

jQuery('a[href*="#"]').on("click", function(e) {
  if (jQuery(jQuery(this).attr("href")).length) {
    e.preventDefault();

    jQuery("html, body").animate(
      {
        scrollTop: jQuery(jQuery(this).attr("href")).offset().top
      },
      500,
      "linear"
    );
  }
});

// animations
(function(jQuery) {
  jQuery.fn.visible = function(partial) {
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

jQuery(window).scroll(function(event) {
  jQuery(".module").each(function(i, el) {
    var el = jQuery(el);
    if (el.visible(true)) {
      el.addClass("come-in");
    }
  });

  jQuery(".moduletwo").each(function(i, el) {
    var el = jQuery(el);
    if (el.visible(true)) {
      el.addClass("come-in two");
    }
  });
});

// OWL one carousel - how does it work
jQuery(document).ready(function() {
  jQuery(".owl-one").owlCarousel({
    loop: true,
    nav: true,
    margin: 0,
    responsiveClass: true,
    autoplay: false,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        autoplay: false
      },
      992: {
        items: 2,
        autoplay: false
      },
      1200: {
        items: 2,
        autoplay: false
      },
      1900: {
        items: 2,
        autoplay: false
      }
    }
  });
});

// OWL two carousel - testimonials
jQuery(document).ready(function() {
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
    items: 1
  });
});

// OWL three carousel - tab1
jQuery(document).ready(function() {
  var owlthree = jQuery(".owl-three");
  owlthree.owlCarousel({
    items: 1,
    loop: false,
    lazyLoad: true,
    center: true,
    dots: false,
    margin: 0,
    URLhashListener: true,
    startPosition: "URLHash"
  });

  owlthree.on("changed.owl.carousel", function(property) {
    changetabs();
  });
});

// function to change tabs of table
function changetabs() {
  var hash = window.location.hash;
  var id = hash.substring(hash.indexOf("#") + 1);
  var no_table = hash.charAt(hash.indexOf("#") + 1);
  console.log(no_table);
  jQuery("#tabs_" + no_table)
    .find(".tab")
    .removeClass("active");
  jQuery("#tab_" + id).addClass("active");
}

jQuery(document).ready(function() {
  changetabs();
});

// Toggle price table
jQuery(document).ready(function() {
  jQuery(".pricingtable_section")
    .find(".tab_head")
    .click(function() {
      jQuery(this)
        .next()
        .slideToggle();
      jQuery(this)
        .find(".arrow_open")
        .toggleClass("rotate");
    });
});

// Sticky first line of the table

// Toggle text in How does it work cards
/*
jQuery(".toggle").click(function() {
  jQuery(this)
    .children(".overlay-text")
    .slideToggle("slow", function() {});
  console.log("stalose");
});*/

jQuery(".owl-one").on("click", ".toggle", function() {
  jQuery(this)
    .children(".overlay-text")
    .slideToggle("slow", function() {});
  console.log("this");
});

// Fades out small How does it work

jQuery(window).scroll(function() {
  if (jQuery(window).scrollTop() < 110) {
    jQuery("#next")
      .stop(true, true)
      .fadeIn(4000);
  } else {
    jQuery("#next")
      .stop(true, true)
      .fadeOut(4000);
  }
});

//Simple jQuery Animated Counter
(function(jQuery) {
  jQuery.fn.jQuerySimpleCounter = function(options) {
    let settings = jQuery.extend(
      {
        start: 0,
        end: 100,
        easing: "swing",
        duration: 400,
        complete: ""
      },
      options
    );

    const thisElement = jQuery(this);

    jQuery({ count: settings.start }).animate(
      { count: settings.end },
      {
        duration: settings.duration,
        easing: settings.easing,
        step: function() {
          let mathCount = Math.ceil(this.count);
          thisElement.text(mathCount);
        },
        complete: settings.complete
      }
    );
  };
})(jQuery);

// CTA Section
var ten_percent = false;

jQuery(window).scroll(function(event) {
  jQuery("#percent").each(function(i, el) {
    var el = jQuery(el);
    if (el.visible(true) && ten_percent == false) {
      jQuery("#percent").jQuerySimpleCounter({
        start: 0,
        end: 10,
        duration: 2000
      });
      ten_percent = true;
    }
  });
});

var discount = 10;

jQuery("#wantmore").click(function() {
  if (discount == 10) {
    //discount 10%
    jQuery("#percent").jQuerySimpleCounter({
      start: 10,
      end: 20,
      duration: 1000
    });
    jQuery("#time").jQuerySimpleCounter({
      start: 30,
      end: -1,
      duration: 30000
    });
    jQuery("#timer").slideToggle();

    jQuery(".cta_subheader").addClass("baunce_in");
    jQuery("#cta_code").html("WEB20");
    jQuery("#wantmore").html("GET EVEN MORE");

    discount = 20;
  } else if (discount == 20) {
    //discount 20%
    jQuery("#percent").jQuerySimpleCounter({
      start: 20,
      end: 30,
      duration: 1000
    });
    jQuery("#time").jQuerySimpleCounter({
      start: 20,
      end: -1,
      duration: 30000
    });

    jQuery(".cta_subheader").addClass("baunce_in2");
    jQuery("#cta_code").html("WEB30");
    discount = 30;
  } else if (discount == 30) {
    //discount 30%
    jQuery("#lets_not").addClass("fadeup");
    setTimeout(() => {
      jQuery("#lets_not").removeClass("fadeup");
    }, 2000);
  }
});

// Mobile download detection

jQuery(document).ready(function() {
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

// Email protection
/*
jQuery("#mail").click(function() {
  jQuery("#mailaddress").html("customercare@thelaundryportal.com");
});

jQuery("#mail").hover(function() {
  jQuery("#mailaddress").html("customercare@thelaundryportal.com");
});
*/

//Responsive

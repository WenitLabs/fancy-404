/*
Massively by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($, skel) {
    /**
   * Applies parallax scrolling to an element's background image.
   * @return {jQuery} jQuery object.
   */
  $.fn._parallax = function (intensity) {
    var $window = $(window)
    var $this = $(this)

    if (this.length === 0 || intensity === 0) {
      return $this
    }

    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) {
        $(this[i])._parallax(intensity)
      }
      return $this
    }

    if (!intensity) {
      intensity = 0.25
    }

    $this.each(function () {
      var $t = $(this)
      var $bg = $('<div class="bg"></div>').appendTo($t)
      var on
      var off

      on = function () {
        $bg
          .removeClass('fixed')
          .css('transform', 'matrix(1,0,0,1,0,0)')

        $window
          .on('scroll._parallax', function () {
            var pos = parseInt($window.scrollTop()) - parseInt($t.position().top)
            $bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')')
          })
      }

      off = function () {
        $bg
          .addClass('fixed')
          .css('transform', 'none')
        $window
          .off('scroll._parallax')
      }

      // Disable parallax on ..
      if (skel.vars.browser === 'ie' || // IE
        skel.vars.browser === 'edge' || // Edge
        window.devicePixelRatio > 1 || // Retina/HiDPI (= poor performance)
        skel.vars.mobile) { // Mobile devices
        off()
      } else { // Enable everywhere else.
        skel.on('!large -large', on)
        skel.on('+large', off)
      }
    })

    $window
      .off('load._parallax resize._parallax')
      .on('load._parallax resize._parallax', function () {
        $window.trigger('scroll')
      })

    return $(this)
  }

  $(function () {
    var $window = $(window)
    var $body = $('body')
    var $wrapper = $('#wrapper')
    var $header = $('#header')
    var $nav = $('#nav')
    var $main = $('#main')
    var $navPanelToggle
    var $navPanel
    var $navPanelInner

    // Disable animations/transitions until the page has loaded.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-loading')
        }, 100)
    })

    // Prioritize "important" elements on medium.
    skel.on('+medium -medium', function () {
        $.prioritize('.important\\28 medium\\29', skel.breakpoint('medium').active)
    })

    // Background.
    $wrapper._parallax(0.925)

    // Intro.
    var $intro = $('#intro')
    if ($intro.length > 0) {
      // Hack: Fix flex min-height on IE.
      if (skel.vars.browser === 'ie') {
        $window.on('resize.ie-intro-fix', function () {
          var h = $intro.height()
          if (h > $window.height()) {
            $intro.css('height', 'auto')
          } else {
            $intro.css('height', h)
          }
        }).trigger('resize.ie-intro-fix')
      }
    }
  })
})(jQuery, skel)
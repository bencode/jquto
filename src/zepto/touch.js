//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var support = $.support,
    supportTouch = "ontouchend" in document,
    supportPointer = navigator.msPointerEnabled;

  $.extend(support, {
    touch: supportTouch,
    pointer: supportPointer
  });

  if (!(supportTouch || supportPointer))
    return;

  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout,
    longTapDelay = 750, longTapTimeout,
    EVENT = supportTouch ? {
      START: 'touchstart',
      MOVE: 'touchmove',
      END: 'touchend',
      CANCEL: 'touchcancel'
    } : {
      START: 'MSPointerDown',
      MOVE: 'MSPointerMove',
      END: 'MSPointerUp',
      CANCEL: 'MSPointerCancel'
    }

  function parentIfText(node) {
    return 'tagName' in node ? node : node.parentNode
  }

  function swipeDirection(x1, x2, y1, y2) {
    var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
    return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  $(function(){
    var now, delta

    $(document.body)
      .on(EVENT.START, function(e){
        var touches = e.originalEvent.touches || [e.originalEvent];
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $(parentIfText(touches[0].target))
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = touches[0].pageX
        touch.y1 = touches[0].pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
      })
      .on(EVENT.MOVE, function(e){
        var touches = e.originalEvent.touches || [e.originalEvent];
        cancelLongTap()
        touch.x2 = touches[0].pageX
        touch.y2 = touches[0].pageY
        if (Math.abs(touch.x1 - touch.x2) > 10)
          e.preventDefault()
      })
      .on(EVENT.END, function(e){
         cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            touch.el.trigger('swipe')
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            touch = {}
          }, 0)

        // normal tap
        else if ('last' in touch)

          // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
          // ('tap' fires before 'scroll')
          tapTimeout = setTimeout(function() {

            // trigger universal 'tap' with the option to cancelTouch()
            // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
            var event = $.Event('tap')
            event.cancelTouch = cancelAll
            touch.el.trigger(event)

            // trigger double tap immediately
            if (touch.isDoubleTap) {
              touch.el.trigger('doubleTap')
              touch = {}
            }

            // trigger single tap after 250ms of inactivity
            else {
              touchTimeout = setTimeout(function(){
                touchTimeout = null
                touch.el.trigger('singleTap')
                touch = {}
              }, 250)
            }

          }, 0)

      })
      .on(EVENT.CANCEL, cancelAll)

    $(window).on('scroll', cancelAll)
  })
})(jQuery)

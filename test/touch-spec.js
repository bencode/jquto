define(function (require) {

  var $ = require('../build/jquto'),
    expect = require('expect'),
    eventSimulate = require('event-simulate'),
    support = $.support;

  function getKeys(obj) {
    var keys = [];
    for (var key in obj) {
      keys.push(key);
    }
    return keys;
  }

  describe('events', function () {
    var testDiv;
    var events = {};
    var stack = {};
    if (support.touch) {
      events = {
        START: 'touchstart',
        MOVE: 'touchmove',
        END: 'touchend',
        CANCEL: 'touchcancel'
      };
    } else if (support.pointer) {
      events = {
        START: 'MSPointerDown',
        MOVE: 'MSPointerMove',
        END: 'MSPointerUp',
        CANCEL: 'MSPointerCancel'
      };
    } else {
      events = {
        START: 'mousedown',
        MOVE: 'mousemove',
        END: 'mouseup',
        CANCEL: 'mousecancel'
      };
    }
    events.TRANSITIONEND = (function () {
      switch (support.vendor) {
        case 'webkit':
          return 'webkitTransitionEnd';
        case 'O':
          return 'oTransitionEnd';
        default :
          return 'transitionend';
      }
    })();

    before(function () {
      testDiv = $('<div>');
      $('body').append(testDiv);

      testDiv.on('tap',function (e) {
        stack.tap = e;
      }).on('singleTap',function (e) {
          stack.sinlegTap = e;
        }).on('longTap',function (e) {
          stack.longTap = e;
        }).on('doubleTap',function (e) {
          stack.doubleTap = e;
        }).on('swipe',function (e) {
          stack.swipe = e;
        }).on('swipeUp',function (e) {
          stack.swipeUp = e;
        }).on('swipeDown',function (e) {
          stack.swipeDown = e;
        }).on('swipeLeft',function (e) {
          stack.swipeLeft = e;
        }).on('swipeRight', function (e) {
          stack.swipeRight = e;
        });
    });
    after(function () {
      $(testDiv).remove();
    });
    beforeEach(function () {
      stack = {};
    });
    it('tap singleTap', function () {
      eventSimulate.simulate(testDiv.get(0), events.START);
      eventSimulate.simulate(testDiv.get(0), events.END);
      expect(getKeys(stack).length).to.be(2);
      expect(stack.tap).to.be.ok();
      expect(stack.sinlegTap).to.be.ok();
    });
  })
})
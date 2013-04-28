//     Zepto.js
//     (c) 2010-2012 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($, undefined){
  var support = $.support,
    document = window.document,
    dummyStyle = document.createElement('div').style,
    prefix = (function () {
      var prefixs = {'-webkit-': 'webkit', '-o-': 'O', '-moz-': 'Moz', '-ms-': 'ms'}, css, style;

      for (css in prefixs) {
        var v = prefixs[css];
        if ((v + 'Transform') in dummyStyle) {
          style = v;
          break;
        }
      }

      return {
        style: style,
        css: css
      };
    })(),
    endEventName, endAnimationName,
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    transform,
    transitionProperty, transitionDuration, transitionTiming,
    animationName, animationDuration, animationTiming,
    cssReset = {};

  function prefixStyle(style) { return prefix.style ? (prefix.style + style.charAt(0).toUpperCase() + style.slice(1)) : style; }
  function dasherize(str) { return downcase(str.replace(/([a-z])([A-Z])/, '$1-$2')) }
  function downcase(str) { return str.toLowerCase() }
  //有些浏览器新版本已经不识别增加前缀的事件类型了，例如Firefox
  function normalizeEvent(name) { return downcase(name) + (prefix.style ? ' ' + prefix.style + name : '') }

  transform = prefix.css + 'transform'
  cssReset[transitionProperty = prefix.css + 'transition-property'] =
  cssReset[transitionDuration = prefix.css + 'transition-duration'] =
  cssReset[transitionTiming   = prefix.css + 'transition-timing-function'] =
  cssReset[animationName      = prefix.css + 'animation-name'] =
  cssReset[animationDuration  = prefix.css + 'animation-duration'] =
  cssReset[animationTiming    = prefix.css + 'animation-timing-function'] = ''

  $.extend(support, {
    prefix: prefix,
    transform: prefixStyle('transform') in dummyStyle,
    trans3d: prefixStyle('perspective') in dummyStyle,
    transition: prefixStyle('transition') in dummyStyle
  });

  $.fx = {
    off: (prefix.style === '' && dummyStyle.style.transitionProperty === undefined),
    speeds: { _default: 400, fast: 200, slow: 600 },
    cssPrefix: prefix.css,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function(properties, duration, ease, callback){
    if ($.isPlainObject(duration))
      ease = duration.easing, callback = duration.complete, duration = duration.duration
    if (duration) duration = (typeof duration == 'number' ? duration :
                    ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
    return this.anim(properties, duration, ease, callback)
  }

  $.fn.anim = function(properties, duration, ease, callback){
    var key, cssValues = {}, cssProperties, transforms = '',
        that = this, wrappedCallback, endEvent = $.fx.transitionEnd

    if (duration === undefined) duration = 0.4
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssValues[animationName] = properties
      cssValues[animationDuration] = duration + 's'
      cssValues[animationTiming] = (ease || 'linear')
      endEvent = $.fx.animationEnd
    } else {
      cssProperties = []
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
        else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

      if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
      if (duration > 0 && typeof properties === 'object') {
        cssValues[transitionProperty] = cssProperties.join(', ')
        cssValues[transitionDuration] = duration + 's'
        cssValues[transitionTiming] = (ease || 'linear')
      }
    }

    wrappedCallback = function(event){
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).off(endEvent, wrappedCallback)
      }
      $(this).css(cssReset)
      callback && callback.call(this)
    }
    if (duration > 0) this.on(endEvent, wrappedCallback)

    // trigger page reflow so new elements can animate
    this.length && this.get(0).clientLeft

    this.css(cssValues)

    if (duration <= 0) setTimeout(function() {
      that.each(function(){ wrappedCallback.call(this) })
    }, 0)

    return this
  }
})(jQuery)

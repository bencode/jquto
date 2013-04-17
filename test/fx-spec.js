define(function (require) {

  var $ = require('../build/jquto'),
    expect = require('expect'),
    support = $.support,
    vendor = '', prefix;

  function prefixStyle(style) {
    return vendor ? (vendor + style.charAt(0).toUpperCase() + style.slice(1)) : style;
  }

  describe('$.support', function () {
    var dummyStyle;

    before(function () {
      dummyStyle = document.createElement('div').style;
      prefix = (function () {
        var vendors = {'-webkit-': 'webkit', '-o-': 'O', '-moz-': 'Moz', '-ms-': 'ms'}, key;

        for (key in vendors) {
          var v = vendors[key];
          if ((v + 'Transform') in dummyStyle) {
            vendor = v;
            return key;
          }
        }

        return '';
      })();
    });

    it('css3 support', function () {
      expect(support.vendor).to.be(vendor);
      expect(support.prefix).to.be(prefix);
      expect(support.transform).to.be(prefixStyle('Transform') in dummyStyle);
      expect(support.trans3d).to.be(prefixStyle('Perspective') in dummyStyle);
      expect(support.transition).to.be(prefixStyle('Transition') in dummyStyle);
    })
  })
  describe('$.animate', function () {
    var testDiv;
    beforeEach(function () {
      testDiv = document.createElement('div');
      document.body.appendChild(testDiv);
    });
    afterEach(function () {
      document.body.removeChild(testDiv);
    })
    it('transitionend event', function (done) {
      $(testDiv).animate({
        translate3d: '10px,20px,-30px'
      }, {
        complete: function () {
          done();
        }
      });
    });

    it('animationend event', function (done) {
      $(testDiv).animate('animName', {
        complete: function () {
          done();
        }
      });
    });

    it('transition-duration & transition-timing-function', function (done) {
      var tmpDiv = document.createElement('div'), tmpStyle = tmpDiv.style;
      document.body.appendChild(tmpDiv);
      tmpStyle[prefixStyle('transitionDuration')] = '200ms';
      tmpStyle[prefixStyle('transitionTimingFunction')] = 'ease-out';
      var div = $(testDiv);
      div.animate({
        left: '-100px'
      }, {
        duration: 200,
        easing: 'ease-out'
      });
      expect(div.css('transitionDuration')).to.be($(tmpDiv).css('transitionDuration'));
      expect(div.css('transitionTimingFunction')).to.be($(tmpDiv).css('transitionTimingFunction'));
      document.body.removeChild(tmpDiv);
      done();
    });

    it('transform', function (done) {
      var tmpDiv = document.createElement('div'), tmpStyle = tmpDiv.style;
      document.body.appendChild(tmpDiv);
      tmpStyle[prefixStyle('transform')] = 'translate3d(80px, 20px, -100px) rotateZ(90deg) scale(0.8)';
      tmpStyle['opacity'] = .5;
      tmpStyle['backgroundColor'] = '#BADA55';

      $(testDiv).animate({
        translate3d: '80px, 20px, -100px',
        rotateZ: '90deg',
        scale: '0.8',
        opacity: 0.5,
        backgroundColor: '#BADA55'
      }, 200, 'ease-out');
      setTimeout(function () {
        var div = $(testDiv);
        expect(div.css('opacity')).to.be($(tmpDiv).css('opacity'));
        expect(div.css('backgroundColor')).to.be($(tmpDiv).css('backgroundColor'));
        expect(div.css('transform')).to.be($(tmpDiv).css('transform'));
        document.body.removeChild(tmpDiv);
        done();
      }, 250);
    });
  });
})
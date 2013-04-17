define(function (require) {

  var $ = require('../build/jquto'),
    expect = require('expect');

  describe('$.animate methods', function () {
    var testDiv;
    beforeEach(function () {
      testDiv = document.createElement('div');
      document.body.appendChild(testDiv);
    });
    afterEach(function () {
      document.body.removeChild(testDiv);
    })

    it('.show() & .hide()', function () {
      expect($(testDiv).css('display')).to.not.be('none');
      $(testDiv).hide();
      expect($(testDiv).css('display')).to.be('none');
    });

    it('.show(speed) & .hide(speed)', function (done) {

      $(testDiv).hide(100);
      expect($(testDiv).css('opacity')).to.above(.9);
      expect($(testDiv).css('display')).to.not.be('none');
      setTimeout(function () {
        expect($(testDiv).css('display')).to.be('none');
        expect($(testDiv).css('opacity')).to.be('0');
        $(testDiv).show(100);
        expect($(testDiv).css('display')).to.not.be('none');
        expect($(testDiv).css('opacity')).to.below(.1);
        setTimeout(function () {
          expect($(testDiv).css('display')).to.not.be('none');
          expect($(testDiv).css('opacity')).to.be('1');
          done();
        }, 150)
      }, 150);
    });

    it('.show(speed, callback) & .hide(speed, callback)', function (done) {
      $(testDiv).hide(100, function () {
        $(this).show(100, function () {
          done();
        })
      });
    });

    it('.toggle(speed, callback)', function (done) {
      $(testDiv).toggle(100, function () {
        expect($(this).css('display')).to.be('none');
        $(this).toggle(100, function () {
          expect($(this).css('display')).to.not.be('none');
          done();
        });
      });
      expect($(testDiv).css('display')).to.not.be('none');
    });

    it('.fadeIn(speed, callback) & .fadeOut(speed, callback)', function (done) {
      $(testDiv).fadeOut(100, function () {
        expect($(this).css('opacity')).to.be('0');
        expect($(this).css('display')).to.be('none');
        $(this).fadeIn(100, function () {
          expect($(this).css('opacity')).to.be('1');
          done();
        });
        expect($(this).css('opacity')).to.below(.1);
        expect($(this).css('display')).to.not.be('none');

      });
      expect($(testDiv).css('opacity')).to.above(.9);
      expect($(testDiv).css('display')).to.not.be('none');
    });

    it('.fadeToggle(speed, callback)', function (done) {
      $(testDiv).fadeToggle(100, function () {
        expect($(this).css('display')).to.be('none');
        $(this).fadeToggle(100, function () {
          expect($(this).css('display')).to.not.be('none');
          done();
        });
      });
      expect($(testDiv).css('display')).to.not.be('none');
    });

  });
})
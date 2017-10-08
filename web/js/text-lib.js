'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextScramble = function () {
  function TextScramble(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { timeout: 0 };

    _classCallCheck(this, TextScramble);

    this.el = el;
    this.options = options;
    this.chars = '!<>-_\\/[]{}—=+*^?#@%01________';
    this.oldPhrase = '';
    this.update = this.update.bind(this);
  }

  _createClass(TextScramble, [{
    key: 'setText',
    value: function setText(newText) {
      var _this = this;

      var oldText = this.el.innerText;
      this.newText = newText;
      console.log(oldText.length, newText.length);
      var length = Math.max(oldText.length, newText.length);
      var promise = new Promise(function (resolve) {
        return _this.resolve = resolve;
      });
      this.queue = [];
      for (var i = 0; i < length; i++) {
        var from = oldText[i] || '';
        var to = newText[i] || '';
        var start = Math.floor(Math.random() * 40);
        var end = start + Math.floor(Math.random() * 40);
        this.queue.push({
          from: from,
          to: to,
          start: start,
          end: end
        });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      var output = '';
      var complete = 0;
      for (var i = 0, n = this.queue.length; i < n; i++) {
        var _queue$i = this.queue[i],
            from = _queue$i.from,
            to = _queue$i.to,
            start = _queue$i.start,
            end = _queue$i.end,
            char = _queue$i.char;

        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += '<span class="ultra-light">' + char + '</span>';
        } else {
          output += from;
        }
      }
      this.el.innerHTML = this.oldPhrase + output;
      if (complete === this.queue.length) {
        this.oldPhrase += this.newText;
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(function () {
          return setTimeout(_this2.update, _this2.options.timeout);
        });
        this.frame++;
      }
    }
  }, {
    key: 'randomChar',
    value: function randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }]);

  return TextScramble;
}();

var SimulateTyping = function () {
  function SimulateTyping(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { minTimeout: 140 };

    _classCallCheck(this, SimulateTyping);

    this.options = options;
    this.el = el;
    this.update = this.update.bind(this);
  }

  _createClass(SimulateTyping, [{
    key: 'setText',
    value: function setText(text) {
      var _this3 = this;

      var promise = new Promise(function (resolve) {
        return _this3.resolve = resolve;
      });
      this.text = text;
      this.update(0);
      return promise;
    }
  }, {
    key: 'update',
    value: function update(i) {
      var _this4 = this;

      if (this.text.length <= i++) {
        this.el.innerHTML = this.text;
        this.resolve();
        return;
      }
      this.el.innerHTML = this.text.substring(0, i);
      var rand = Math.floor(Math.random() * 100) + this.options.minTimeout;
      setTimeout(function () {
        return _this4.update(i);
      }, rand);
    }
  }]);

  return SimulateTyping;
}();
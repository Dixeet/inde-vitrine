'use strict';

/**
 * Created by robin on 07/10/17.
 */

//Execution
$(document).ready(onReady);

function onReady() {
  showTitle().then(function () {
    showHeader();
    showFooter();
    scramble('.infos').then(function () {
      return scramble('.exp');
    });
  });
}

function scramble() {
  var parentSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.infos';

  return new Promise(function (resolve) {
    var phrases = $(parentSelector + ' .phrase');
    var $phrases = $(parentSelector + ' .phrases');
    var el = $phrases[0];
    el.innerHTML = '';
    $phrases.removeClass('hide');
    var fx = new TextScramble(el);
    showBySelector(parentSelector);
    var next = function next(counter) {
      fx.setText(phrases[counter].innerHTML).then(function () {
        counter++;
        if (counter < phrases.length) {
          setTimeout(next(counter), 250);
        } else {
          resolve();
        }
      });
    };
    next(0);
  });
}
function showTitle() {
  return new Promise(function (resolve) {
    var $title = $('#title');
    var $titleChildren = $title.children();
    var phrases = [];
    var cursor = '<span id="cursor-title" class="blink">_</span>';
    $titleChildren.each(function () {
      var $el = $(this)[0];
      phrases.push($el.innerText);
      $el.innerHTML = '<span></span>';
    });
    $title.removeClass('hide');
    var next = function next(counter) {
      var $currentChild = $($titleChildren[counter]);
      var simulateType = new SimulateTyping($currentChild.children()[0], { minTimeout: counter > 0 ? 10 : 30 });
      $currentChild.append(cursor);
      Utils.wait(counter > 0 ? 0 : 2000).then(function () {
        simulateType.setText(phrases[counter]).then(function () {
          counter++;
          if (counter < phrases.length) {
            $currentChild.addClass('glitch');
            $currentChild.children()[1].remove();
            next(counter);
          } else {
            resolve();
          }
        });
      });
    };
    next(0);
  });
}

function showHeader() {
  var $header = $('header');
  $header.show();
}

function showFooter() {
  var $footer = $('footer');
  $footer.show();
  $('#main').css('margin-bottom', $footer.css('height'));
}

function showBySelector() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var $el = $(selector);
  if ($el[0]) {
    $el.show();
  }
}
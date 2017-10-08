'use strict';

/**
 * Created by robin on 07/10/17.
 */

//Execution
$(document).ready(onReady);

function onReady() {
  showTitle().then(function () {
    scramble();
    showHeader();
    showFooter();
    showInfos();
  });
}

function scramble() {
  var phrases = $('.phrase');
  var $phrases = $('#phrases');
  var el = $phrases[0];
  el.innerHTML = '';
  $phrases.removeClass('hide');
  var fx = new TextScramble(el);
  var counter = 0;
  var next = function next() {
    fx.setText(phrases[counter].innerHTML).then(function () {
      if (counter < phrases.length) {
        setTimeout(next, 250);
      }
    });
    counter = counter + 1;
  };

  next();
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

function showInfos() {
  var $infos = $('.infos');
  $infos.show();
}
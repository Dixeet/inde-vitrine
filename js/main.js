/**
 * Created by robin on 07/10/17.
 */

//Execution
$(document).ready(onReady);

function onReady() {
  showTitle().then(() => {
    scramble();
    showHeader();
    showFooter();
    showInfos();
  });
}

function scramble() {
  const phrases = $('.phrase');
  const $phrases = $('#phrases');
  const el = $phrases[0];
  el.innerHTML = '';
  $phrases.removeClass('hide');
  const fx = new TextScramble(el);
  let counter = 0;
  const next = () => {
    fx.setText(phrases[counter].innerHTML).then(() => {
      if (counter < phrases.length) {
        setTimeout(next, 250);
      }
    });
    counter = (counter + 1);
  };
  
  next();
}
function showTitle() {
  return new Promise((resolve) => {
    const $title = $('#title');
    const $titleChildren = $title.children();
    let phrases = [];
    const cursor = '<span id="cursor-title" class="blink">_</span>';
    $titleChildren.each(function () {
      let $el = $(this)[0];
      phrases.push($el.innerText);
      $el.innerHTML = '<span></span>';
    });
    $title.removeClass('hide');
    const next = (counter) => {
      let $currentChild = $($titleChildren[counter]);
      let simulateType = new SimulateTyping($currentChild.children()[0], {minTimeout: counter > 0 ? 10 : 30});
      $currentChild.append(cursor);
      Utils.wait(counter > 0 ? 0 : 2000).then(()=>{
        simulateType.setText(phrases[counter]).then(() => {
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
  let $header = $('header');
  $header.show();
}

function showFooter() {
  let $footer = $('footer');
  $footer.show();
  $('#main').css('margin-bottom', $footer.css('height'));
}

function showInfos() {
  let $infos = $('.infos');
  $infos.show();
}

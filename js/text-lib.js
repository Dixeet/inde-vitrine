class TextScramble {
  constructor(el, options = {timeout: 0}) {
    this.el = el;
    this.options = options;
    this.chars = '!<>-_\\/[]{}—=+*^?#@%01________';
    this.oldPhrase = '';
    this.update = this.update.bind(this);
  }
  
  setText(newText) {
    const oldText = this.el.innerText;
    this.newText = newText;
    console.log(oldText.length, newText.length);
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({
        from,
        to,
        start,
        end,
      });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let {from, to, start, end, char} = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="ultra-light">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = this.oldPhrase + output;
    if (complete === this.queue.length) {
      this.oldPhrase += this.newText;
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(() => setTimeout(this.update, this.options.timeout));
      this.frame++;
    }
  }
  
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

class SimulateTyping {
  constructor(el, options = {minTimeout: 140}){
    this.options = options;
    this.el = el;
    this.update = this.update.bind(this);
  }
  
  setText(text){
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.text = text;
    this.update(0);
    return promise;
  }
  
  update(i){
    if(this.text.length <= i++){
      this.el.innerHTML = this.text;
      this.resolve();
      return;
    }
    this.el.innerHTML = this.text.substring(0,i);
    let rand = Math.floor(Math.random() * (100)) + this.options.minTimeout;
    setTimeout(() => this.update(i), rand);
  }
}
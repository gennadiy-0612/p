"use strict";
let mover = {
  current: 0,
  start: 0
};

function objects(ObjectName, selectorsTarget, sel, actEl) {
  mover[ObjectName] = {
    Move: function () {
      let c = mover[ObjectName] = {
        collects: document.querySelectorAll(sel),
        changer: -1
      };
      this.className === 'prev' ? c.changer = -1 : c.changer = 1;
      c.lastEl = c.collects[mover.current];
      c.lastEl.setAttribute('id', 'n' + mover.current);
      mover.current += mover[ObjectName].changer;
      c.finish = c.collects.length - 1;
      if (mover.current < mover.start) mover.current = c.collects.length - 1;
      if (mover.current > c.finish) mover.current = mover.start;
      c.collects[mover.current].setAttribute('id', actEl);
      c.currtEl = c.collects[mover.current];
    },
    addButton: function (name) {
      mover[ObjectName][name] = {};
      let c = mover[ObjectName][name];
      c.navy = document.querySelector(selectorsTarget);
      c.newEl = document.createElement("span");
      c.newEl.addEventListener('click', mover[ObjectName].Move, false);
      c.newEl.setAttribute('class', name);
      c.navy.appendChild(c.newEl);
    },
    makeButtonWork: function () {
      mover[ObjectName].addButton('prev');
      mover[ObjectName].addButton('next');
    }
  }
}

mover.one = {};
objects('one', '.courses.names', '.course.name', 'courses-visible');
mover.one.makeButtonWork();

mover.two = {};
objects('two', '.parents', '.emotions', 'emotions-visible');
mover.two.makeButtonWork();
mover.scrolls = {
  changing: function (event) {
    event.preventDefault();
    let b = document.querySelector('body');
    b.setAttribute('class', 'disappear');
    this.setAttribute('class', 'hide');
    window.scrollBy(0, window.innerHeight);
    setTimeout(() => {
      b.setAttribute('class', 'ready appear');
      this.setAttribute('class', 'un-hide');
    }, 1000);
  },
  adding: function (ids) {
    let c = document.getElementById(ids);
    c.addEventListener('click', mover.scrolls.changing, false);
  }
}
mover.scrolls.adding('move-down');

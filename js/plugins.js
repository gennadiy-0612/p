"use strict";
let move = {
  offset: 0,
  offsetY: 0,
  divOverlay: document.querySelector('.courses.names'),
  isDown: false,
  getCoorsStart: function (event) {
    event.preventDefault();
    move.isDown = true;
    move.offset = move.divOverlay.offsetLeft - event.clientX;
    move.offset = move.divOverlay.offsetLeft - event.touches[0].clientX;
    move.startPW = window.scrollY;
    move.start = event.touches[0].clientY;
  },
  getCoorsMove: function (event) {
    event.preventDefault();
    if (move.isDown && ((event.touches[0].clientX + move.offset) > -800) && ((event.touches[0].clientX + move.offset) < 100)) {
      //move.divOverlay.setAttribute('style', 'left:' + (event.clientX + move.offset) + 'px');
      move.divOverlay.setAttribute('style', 'left:' + (event.touches[0].clientX + move.offset) + 'px');
    }
  },
  getCoorsFinish: function () {
    move.isDown = false;
  },
  go: function () {
    if (document.querySelector('body').offsetWidth < 1274) {
      move.posEl = document.querySelector('.courses.names');
      move.posEl.addEventListener("mousedown", move.getCoorsStart, true);
      move.posEl.addEventListener("touchstart", move.getCoorsStart, true);
      move.posEl.addEventListener("mousemove", move.getCoorsMove, true);
      move.posEl.addEventListener("touchmove", move.getCoorsMove, true);
      move.posEl.addEventListener("mouseup", move.getCoorsFinish, true);
      move.posEl.addEventListener("touchend", move.getCoorsFinish, true);
    }
  }
}
let testEm = {
  nameContainer: '.parents',
  offset: 0,
  divOverlay: document.querySelector('.parents'),
  isDown: false,
  getCoorsStart: function (event) {
    testEm.isDown = true;
    testEm.offset = testEm.divOverlay.offsetLeft - event.clientX;
    event.preventDefault();
    testEm.offset = testEm.divOverlay.offsetLeft - event.touches[0].clientX;
    move.startPW = window.scrollY;
    move.start = event.touches[0].clientY;
  },
  getCoorsMove: function (event) {
    let x = event.touches[0].clientX;     // Get the horizontal coordinate
    let y = event.touches[0].clientY;     // Get the vertical coordinate
    let coor = "X coords: " + x + ", Y coords: " + y;
    let sum = 0;
    for (let i = 0; i < 5; i++) {
      sum = sum + x;
      let XX = event.touches[0].clientX;
      let YY = event.touches[0].clientY;
      console.log(coor + ' - ' + i);
    }
    if (testEm.isDown && ((event.touches[0].clientX + testEm.offset) > -800) && ((event.touches[0].clientX + testEm.offset) < 100)) {
      event.preventDefault();
      testEm.divOverlay.setAttribute('style', 'left:' + (event.clientX + testEm.offset) + 'px');
      testEm.divOverlay.setAttribute('style', 'left:' + (event.touches[0].clientX + testEm.offset) + 'px');
      let first = move.start;
      move.start = event.touches[0].clientY;
      let second = move.start;
      let changed = first - second;
      move.startPW = move.startPW + changed;
      window.scroll(0, move.startPW);
    }
  },
  getCoorsFinish: function () {
    testEm.isDown = false;
  },
  go: function () {
    if (document.querySelector('body').offsetWidth < 1600) {
      testEm.posEl = document.querySelector('.parents');
      testEm.posEl.addEventListener("mousedown", testEm.getCoorsStart, true);
      testEm.posEl.addEventListener("touchstart", testEm.getCoorsStart, true);
      testEm.posEl.addEventListener("mousemove", testEm.getCoorsMove, true);
      testEm.posEl.addEventListener("touchmove", testEm.getCoorsMove, true);
      testEm.posEl.addEventListener("mouseup", testEm.getCoorsFinish, true);
      testEm.posEl.addEventListener("touchend", testEm.getCoorsFinish, true);
    }
  },
  touch: function () {
    move.go();
    testEm.go();
    window.addEventListener("resize", move.go, true);
    window.addEventListener("orientationchange", move.go, true);
    window.addEventListener("resize", testEm.go, true);
    window.addEventListener("orientationchange", testEm.go, true);
  }
}

window.addEventListener("load", testEm.touch, false);

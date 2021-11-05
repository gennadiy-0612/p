var src = document.querySelector('.container');
var clientX, clientY;

src.addEventListener('touchstart', function(e) {
  // Cache the client X/Y coordinates
  clientX = e.touches[0].clientX;
  clientY = e.touches[0].clientY;
}, false);

src.addEventListener('touchend', function(e) {
  var deltaX, deltaY;

  // Compute the change in X and Y coordinates.
  // The first touch point in the changedTouches
  // list is the touch point that was just removed from the surface.
  deltaX = e.changedTouches[0].clientX - clientX;
  deltaY = e.changedTouches[0].clientY - clientY;

  console.log(deltaX);
  console.log(deltaY);
}, false);

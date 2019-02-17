function loadImage(src) {
  const img = new Image();
  return new Promise(function(resolve, reject) {
    img.onload = function () {
      resolve(img);
    }
    img.onerror = reject;
    img.src = src;
  });
}

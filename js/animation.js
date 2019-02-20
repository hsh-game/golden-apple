game.animation = {};

game.animation.shakeBucket = function () {
  const bucket = $('#display');
  bucket.style.transform = 'rotate(3600deg)';
  return wait(425).then(function () {
    bucket.style.transform = 'rotate(0deg)';
    return wait(425);
  });
}

game.animation.getItem = function (itemName) {
  $('#item-window').style.display = 'block';
  $('#item-image').innerHTML = '';
  return game
          .getItem(itemName)
          .then(function (item) {
            $('#item-msg').innerHTML = item.name + '획득!';
            $('#item-image').appendChild(item.image.cloneNode());
          });
}

game.animation.bucketFail = function () {
  $('#item-window').style.display = 'block';
  $('#item-image').innerHTML = '';
  $('#item-msg').innerHTML = '조합 실패!';
}

game.bucket = {};

game.bucket.items = [];
game.bucket.color = [98,98,98]; //rgb(98, 98, 98)

game.bucket.resetItems = function () {
  game.bucket.items = [];
}

game.bucket.insertItem = function (itemName) {
  return game.bucket.items.push(itemName);
}

game.bucket.removeItems = function (itemName) {
  const index = game.bucket.items.indexOf(itemName);
  if (index != -1)
    game.bucket.items.splice(index, 1);
}

game.bucket.mixItems = function () {
  const items = game.bucket.items.sort();
  let combi;
  if (!game.isReady) return;
  combi = game.findCombination(items);
  game.bucket.resetItems();
  $('#make-button').setAttribute('open', 0);

  if (combi) {
    if (Array.isArray(combi)) {
      let key = Math.floor(combi.length * Math.random());
      combi = combi[key];
    }
    game.user
      .give(combi)
      .then(game.updateInventory);
  } else {
    //조합 실패
  }
}

game.bucket.resetColor = function () {
  game.bucket.color = [98,98,98];
}

game.bucket.onresize = function () {
  const width = Math.min(550, innerWidth, innerHeight) * 0.875,
        top = (innerHeight - width) / 2,
        left = (innerWidth - width) / 2;

  Object.assign($('#display').style, {
    width: Math.floor(width) + 'px',
    marginTop: Math.floor(top) + 'px',
    marginLeft: Math.floor(left) + 'px'
  });
};

game.bucket.drawBucket = function () {
  const canvas = $('#display'),
        ctx = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height;

  ctx.fillStyle = 'rgb(' + game.bucket.color.join(',') + ')';

  ctx.beginPath();
  ctx.moveTo(width * (13/100), 0);
  ctx.lineTo(width * (87/100), 0);
  ctx.lineTo(width * (69/100), height);
  ctx.lineTo(width * (31/100), height);
  ctx.fill();
};

window.addEventListener('DOMContentLoaded', function () {
  game.bucket.onresize();
  game.bucket.drawBucket();
  $('#make-button').addEventListener('click',game.bucket.mixItems);
});
window.addEventListener('resize', game.bucket.onresize);

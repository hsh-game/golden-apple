game.bucket = {};

game.bucket.items = [];
game.bucket.color = [98,98,98]; //rgb(98, 98, 98)

game.bucket.resetItems = function () {
  game.bucket.items = [];
}

game.bucket.insertItem = function (itemName) {
  let items, combi;

  game.bucket.items.push(itemName);

  items = game.bucket.items.sort();
  combi = game.findCombination(items);

  if (combi) {
    if (!Array.isArray(combi))
      combi = [combi];
    combi.forEach(game.getItem);
  }
}

game.bucket.removeItems = function (itemName) {
  const index = game.bucket.items.indexOf(itemName);
  if (index != -1)
    game.bucket.items.splice(index, 1);
}

let elemSelector = 1;
game.bucket.mixItems = function () {
  const items = game.bucket.items.sort(),
        proms = [];
  let combi;
  if (!game.isReady) return;
  combi = game.findCombination(items);
  game.bucket.resetItems();
  $('#make-button').setAttribute('open', 0);

  if (combi) {
    if (Array.isArray(combi))
      combi = combi.random(elemSelector++);
    proms.push(game.user.give(combi));
  }

  proms.push(game.animation.shakeBucket());

  Promise
    .all(proms)
    .then(function (results) {
      if (combi)
        game.animation.getItem(combi);
      else
        game.animation.bucketFail();
    })
    .then(game.updateInventory);
}

game.bucket.resetColor = function () {
  game.bucket.color = [98,98,98];
}

game.bucket.onresize = function () {
  const width = Math.min(550, innerWidth, innerHeight) * 0.875,
        top = (innerHeight - width) / 2,
        left = (innerWidth - width) / 2;

  $$('#display, #item-window').forEach(function (target) {
    Object.assign(target.style, {
      width: Math.floor(width) + 'px',
      top: Math.floor(top) + 'px',
      left: Math.floor(left) + 'px'
    });
  });

  Object.assign($('#make-button').style, {
    width: Math.floor(width) + 'px',
    top: Math.floor(top + width) + 'px',
    left: Math.floor(left) + 'px'
  });
};

window.addEventListener('DOMContentLoaded', function () {
  game.bucket.onresize();
  $('#make-button').addEventListener('click',game.bucket.mixItems);
});
window.addEventListener('resize', game.bucket.onresize);

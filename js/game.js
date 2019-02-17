const game = {};

game.isReady = false;
game.itemSave = {};
game.user = {};
game.user.inventory = [];

ajax
  .fetchJSON('json/combination.json')
  .then(function (result) {
    game.combination = result.map(function (combi) {
      if (!Array.isArray(combi.in))
        combi.in = [ combi.in ];
      if (!Array.isArray(combi.out))
        combi.out = [ combi.out ];
      combi.in = combi.in.sort();
      combi.out = combi.out.sort();
      return combi;
    });
    game.isReady = true;
  });

game.findCombination = function (key) {
  let result;
  key = JSON.stringify(key);
  result = game.combination.find(function (combi) {
    return JSON.stringify(combi.in) === key;
  }) || {};
  return result.out;
}

game.getItem = function (itemName) {
  return game.itemSave[itemName] =
    game.itemSave[itemName] || ajax.fetchJSON(
      'json/item/' + itemName + '.json'
    ).then(function (result) {
      data = result;
      return loadImage('img/item/' + itemName + '.png');
    }).then(function (img) {
      data.image = img;
      data.code = itemName;
      return data;
    });
}


game.user.give = function (itemName) {
  return game
          .getItem(itemName)
          .then(function (item) {
            game.user.inventory.push(item);
          });
}


game.user.has = function (itemName) {
  return -1 != game.user.inventory.indexOf(itemName);
}


game.itemClickEvent = function () {
  const selected = JSON.parse(this.getAttribute('selected')),
        itemCode = this.getAttribute('code');

  if (selected)
    game.bucket.removeItems(itemCode);
  else
    game.bucket.insertItem(itemCode);

  this.setAttribute('selected', !selected);
  $('#make-button').setAttribute('open', !selected);

  if (!this.parentNode.querySelector('.item:not([selected="true"])'))
    $('#inventory .title').click();
}


game.updateInventory = function () {
  $('#items').innerHTML = '';
  game.user.inventory.forEach(function (item) {
    const div = document.createElement('div');
    div.setAttribute('name', item.name);
    div.setAttribute('code', item.code);
    div.className = 'item';
    div.appendChild(item.image);
    div.innerHTML += "<p>"+item.name+"</p>";
    div.onclick = game.itemClickEvent;
    $('#items').appendChild(div);
  });
}


game.user
  .give('seed')
  .then(game.updateInventory);

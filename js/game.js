const game = {};

game.user = {};
game.user.inventory = [];
game.user.has = function (itemName) {
  return -1 != game.user.inventory.indexOf(itemName);
}

game.getItem = function (itemName) {
  return ajax.fetchJSON(
    'json/item/' + itemName + '.json'
  );
}

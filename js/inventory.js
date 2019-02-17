function fixInventory() {
  $('#inventory').style.top =
    innerHeight * 0.9 + 'px';
}

window.addEventListener('resize', fixInventory);

window.addEventListener('DOMContentLoaded', function () {
  fixInventory();
  $('#inventory').addEventListener('click', function () {
    const isOpen = JSON.parse(this.getAttribute('open'));
    this.setAttribute('open', JSON.stringify(!isOpen));
  });
});

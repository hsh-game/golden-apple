function fixInventory() {
  $('#inventory').style.top =
    innerHeight * 0.9 + 'px';
}

window.addEventListener('resize', fixInventory);

window.addEventListener('DOMContentLoaded', function () {
  fixInventory();
  $('#inventory .title').addEventListener('click', function () {
    const target = this.parentNode,
          isOpen = JSON.parse(target.getAttribute('open'));
    target.setAttribute('open', JSON.stringify(!isOpen));
    this.innerHTML = isOpen? "가방" : "닫기";
  });
});

window.addEventListener('DOMContentLoaded', function () {
  $('#inventory').addEventListener('click', function () {
    const isOpen = JSON.parse(this.getAttribute('open'));
    this.setAttribute('open', JSON.stringify(!isOpen));
  });
});

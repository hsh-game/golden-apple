const bucket = {};

bucket.color = [98,98,98]; //rgb(98, 98, 98)

bucket.resetColor = function () {
  bucket.color = [98,98,98];
}

bucket.onresize = function () {
  const width = Math.min(550, innerWidth, innerHeight) * 0.875,
        top = (innerHeight - width) / 2,
        left = (innerWidth - width) / 2;

  Object.assign($('#display').style, {
    width: Math.floor(width) + 'px',
    marginTop: Math.floor(top) + 'px',
    marginLeft: Math.floor(left) + 'px'
  });
};

bucket.drawBucket = function () {
  const canvas = $('#display'),
        ctx = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height;

  ctx.fillStyle = 'rgb(' + bucket.color.join(',') + ')';

  ctx.beginPath();
  ctx.moveTo(width * (13/100), 0);
  ctx.lineTo(width * ((100-13)/100), 0);
  ctx.lineTo(width * ((100-31)/100), height);
  ctx.lineTo(width * (31/100), height);
  ctx.fill();
};

window.addEventListener('DOMContentLoaded', function () {
  bucket.onresize();
  bucket.drawBucket();
});
window.addEventListener('resize', bucket.onresize);

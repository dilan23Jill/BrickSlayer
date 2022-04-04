$(document).ready(function () {
  /*  $('.game-frame-two').hide();
  $('canvas').hide();

  $('.header').on('click', function () {
    $('#title').fadeOut(400);
    $('#DS-logo').fadeOut(400);
    $('.header').hide(400);
    $('.game-frame-two').delay(600).fadeIn(800);
  });

  $('.character').on('click', function () {
    $('.character').css({ transform: 'scale(1)', filter: 'grayscale(100%)' });
    $(this).css({ transform: 'scale(1.25)', filter: 'none' });
  });

  $('.character').dblclick(function () {
    $('.game-frame-two').fadeOut(400);
    $('canvas').delay(400).fadeIn(600);
    
  }); */

  var sword = new Image();
  sword.src = './img/Kyojuro-sword.png';

  var character = new Image();
  character.src = './img/Giyuu.webp';

  var demon_one = new Image();
  demon_one.src = './img/demon1.png';

  var demon_two = new Image();
  demon_two.src = './img/demon2.png';

  var demon_three = new Image();
  demon_three.src = './img/demon3.png';

  var CharaterHeight = character.height / 7;
  var CharaterWidth = character.width / 7;
  var startW = canvas.width / 2 - 10;
  var startH = canvas.height - CharaterHeight - 100;

  var rightDown = false;
  var leftDown = false;

  function onKeyDown(evt) {
    if (evt.keyCode == 39) rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;
  }

  function onKeyUp(evt) {
    if (evt.keyCode == 39) rightDown = false;
    else if (evt.keyCode == 37) leftDown = false;
  }
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp);

  var brick_arr = [];
  var rownum = 5;
  var colnum = 10;
  var padding = 10;
  var brickheight = 30;
  var brickwidth = canvas.width / colnum - 11;

  window.onload = function draw() {
    let x = startW;
    let y = startH;
    let dx = -2;
    let dy = -4;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    let charX = canvas.width / 2 - CharaterWidth / 2;
    let charY = canvas.height - CharaterHeight;

   
    ctx.drawImage(sword, x, y, 20, 90);
    ctx.drawImage(character, charX, charY, CharaterWidth, CharaterHeight);

    function init() {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      return setInterval(move, 10);
    }

    function move() {
      ctx.clearRect(0, 0, canvas.width, canvas.height );
     
      /* ctx.translate(x + 20 * 0.5, y + 90 * 0.5);
            ctx.rotate(-.01);
            ctx.translate(-(x + 20 * 0.5), -(y + 90 * 0.5));rot++; 
            */

      if (
        x + 20 >= charX &&
        x <= charX + CharaterWidth &&
        y > canvas.height - CharaterHeight - 90
      ) {
        dx = -dx;
        dy = -dy;
      }
      if (x + 20 > canvas.width || x <= -5) {
        dx = -dx;
      }
      if (y + 90 > canvas.height || y <= 0) {
        dy = -dy;
      }
      ctx.clearRect(x, y, 20, 90);
      x += dx;
      y += dy;
      ctx.drawImage(sword, x, y, 20, 90);

      if (rightDown) {
        if (charX + CharaterWidth < canvas.width) {
          charX += 5;
          ctx.drawImage(character, charX, charY, CharaterWidth, CharaterHeight);
        } else {
          charX = canvas.width - CharaterWidth;
        }
      }
      if (leftDown) {
        if (charX > 0) {
          charX -= 5;
          ctx.drawImage(character, charX, charY, CharaterWidth, CharaterHeight);
        } else {
          charX = 0;
        }
      }
      for (let i = 0; i < rownum; i++) {
        for (let j = 0; j < colnum; j++) {
          if (brick_arr[i][j] > 0) {
            rect(
              j * (brickwidth + padding) + padding,
              i * (brickheight + padding) + padding,
              brickwidth,
              brickheight,
              brick_arr[i][j]
            );
          }
        }
      }

      rowheight = brickheight + padding; //Smo zadeli opeko?
      colwidth = brickwidth + padding;
      row = Math.floor(y / rowheight);
      col = Math.floor(x / colwidth);
      if (y < rownum * rowheight && row >= 0 && col >= 0) {
        dy = -dy;
        brick_arr[row][col] = 0;
      }
      ctx.drawImage(character, charX, charY, CharaterWidth, CharaterHeight);

      function rect(x, y, w, h, demon) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();

        if (demon >= 1 && demon <= 6) {
          ctx.drawImage(demon_three, x, y, w, h);
          ctx.strokeStyle = 'grey';
        } else if (demon >= 7 && demon <= 8) {
          ctx.drawImage(demon_two, x, y, w, h);
          ctx.strokeStyle = 'blue';
        } else {
          ctx.drawImage(demon_one, x, y, w, h);
          ctx.strokeStyle = 'yellow';
        }
        ctx.strokeRect(x, y, w, h);
      }
    }
    init();
    initBrick();
  };

  function initBrick() {
    for (let i = 0; i < rownum; i++) {
      for (let j = 0; j < colnum; j++) {
        brick_arr[i] = [];
      }
    }
    for (let i = 0; i < rownum; i++) {
      for (let j = 0; j < colnum; j++) {
        brick_arr[i][j] = Math.floor(Math.random() * 10) + 0;
      }
    }
  }
});

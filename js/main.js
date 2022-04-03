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
  character.src = './img/Zenitsu.webp';

  var CharaterHeight = character.height / 7;
  var CharaterWidth = character.width / 7;
  let rot = 0;
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
      /* ctx.translate(x + 20 * 0.5, y + 90 * 0.5);
            ctx.rotate(-.01);
            ctx.translate(-(x + 20 * 0.5), -(y + 90 * 0.5));rot++; 
            */
      ctx.clearRect(x, y, 20, 90);
      x += dx;
      y += dy;
      /* if (
            x + 20 > charX &&
            x < canvas.width / 2 + CharaterWidth / 2 &&
            y + 90 > charY
          ) {
            ctx.drawImage(
              character,
              charX,
              charY,
              CharaterWidth,
              CharaterHeight
            );
          } */
      if (x + 20 > canvas.width || x <= -5) {
        dx = -dx;
      }
      if (y + 90 > canvas.height || y <= 0) {
        dy = -dy;
      }

      ctx.drawImage(sword, x, y, 20, 90);

      if (rightDown) {
        if (charX + CharaterWidth < canvas.width) {
          ctx.clearRect(charX, charY, CharaterWidth, CharaterHeight);
          charX += 5;
          ctx.drawImage(character, charX, charY, CharaterWidth, CharaterHeight);
        }else {
          charX = canvas.width-CharaterWidth;
        }
      }
      if (leftDown) {
        if (charX > 0) {
          ctx.clearRect(charX, charY, CharaterWidth, CharaterHeight);
          charX -= 5;
          ctx.drawImage(character, charX, charY, CharaterWidth, CharaterHeight);
        } else {
          charX = 0;
        }
      }
    }
    init();
    initBrick();
  };

  function initBrick() {
    let brick_arr = [];

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        brick_arr[i] = [];
      }
    }
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        brick_arr[i][j] = Math.floor(Math.random() * 10) + 0;
        if (brick_arr[i][j] == 0) {
        }
      }
    }
  }
});

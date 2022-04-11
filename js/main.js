$(document).ready(function () {
  $('.game-frame-two').hide();
  $('canvas').hide();
  $('.info').hide();
  $('.game_frame').hide();

  $('.header').on('click', function () {
    $('#title').fadeOut(400);
    $('#DS-logo').fadeOut(400);
    $('.header').fadeOut(400);
    $('.game-frame-two').delay(600).fadeIn(800);
  });

  $('.character').on('click', function () {
    $('.character').css({ transform: 'scale(1)', filter: 'grayscale(100%)' });
    $(this).css({ transform: 'scale(1.25)', filter: 'none' });
  });

  let destoyedBricks = 1;
  $('.blink_me').css({
    visibility: 'hidden',
  });
  var character = new Image();
  $('#char_one').dblclick(function () {
    character.src = './img/Giyuu.webp';
    $('.game-frame-two').fadeOut(400);
    $('canvas').delay(400).fadeIn(600);
    $('.info').delay(400).fadeIn(600);
    $('.game_frame').delay(400).fadeIn(600);
    setTimeout(() => {
      draw();
    }, 1000);
  });

  $('#char_two').dblclick(function () {
    character.src = './img/Kyojuro.webp';
    $('.game-frame-two').fadeOut(400);
    $('canvas').delay(400).fadeIn(600);
    $('.info').delay(400).fadeIn(600);
    $('.game_frame').delay(400).fadeIn(600);
    setTimeout(() => {
      draw();
    }, 1000);
  });

  $('#char_three').dblclick(function () {
    character.src = './img/Zenitsu.webp';
    $('.game-frame-two').fadeOut(400);
    $('canvas').delay(400).fadeIn(600);
    $('.info').delay(400).fadeIn(600);
    $('.game_frame').delay(400).fadeIn(600);
    setTimeout(() => {
      draw();
    }, 1000);
  });
  var sword = new Image();
  sword.src = './img/Kyojuro-sword.png';

  swordWidth = sword.width / 10;
  swordHeight = sword.height / 10;

  var sword_180 = new Image();
  sword_180.src = './img/Kyojuro-sword-180.png';

  character.src = './img/Kyojuro.webp';

  var demon_one = new Image();
  demon_one.src = './img/demon1.png';

  var demon_two = new Image();
  demon_two.src = './img/demon2.png';

  var demon_three = new Image();
  demon_three.src = './img/demon3.png';

  var CharaterHeight = character.height / 7;
  var CharaterWidth = character.width / 7;
  var startW = canvas.width / 2;
  var startH = canvas.height - CharaterHeight - swordHeight;
  let done = true;
  var rightDown = false;
  var leftDown = false;
  let ifPowerUp = false;

  function onKeyDown(evt) {
    if (evt.keyCode == 39) rightDown = true;
    if (evt.keyCode == 37) leftDown = true;
    else if (evt.keyCode == 32) {
      if (destoyedBricks >= 15) {
        $('.blink_me').css({
          visibility: 'hidden',
        });

        if (done == true) {
          const audio = new Audio(
            'audio/Zenitsu Godlike Speed [ S02E10 ] (mp3cut.net).mp3'
          );
          audio.play();
          ifPowerUp = true;
          done = false;
          setTimeout(() => {
            ifPowerUp = false;
          }, 5000);
        }
      }
    }
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
  var brickheight = 50;
  var brickwidth = canvas.width / colnum - 11;
  let checkNull;
  let bricksleft = true;

  function draw() {
    let x = startW;
    let y = startH - 5;
    let dx = -2;
    let dy = -4;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    let charX = canvas.width / 2 - CharaterWidth / 2;
    let charY = canvas.height - CharaterHeight;
    ctx.drawImage(character, charX, charY, CharaterWidth, CharaterHeight);
    function init() {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      setInterval(move, 10);
      setInterval(function () {
        start--;
        $('#remTime').text(start + ' s');
      }, 1000);
    }
    function brickpower() {
      if (ifPowerUp == false) {
        dy = dy*(-1);
      } else return;
    }
    var start = 100;

    let i = 1;
    function move() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (bricksleft == true) {
        ctx.drawImage(character, charX, charY, CharaterWidth, CharaterHeight);
        if (ifPowerUp == true) {
          ctx.save();
          ctx.translate(x + swordWidth / 2, y + swordHeight / 2);
          ctx.rotate(i);
          ctx.translate(-(swordWidth / 2 + x), -(swordHeight / 2 + y));
          ctx.drawImage(sword, x, y, swordWidth, swordHeight);
          ctx.restore();
          i += 20;
        } else ctx.drawImage(sword, x, y, swordWidth, swordHeight);

        if (start <= 0) removeSword(start);

        if (
          x + swordWidth >= charX &&
          x <= charX + CharaterWidth &&
          y >= canvas.height - CharaterHeight - swordHeight
        ) {
          if (
            x + swordWidth >= charX &&
            y >= canvas.height - CharaterHeight - swordHeight &&
            x <= charX + CharaterWidth / 2 &&
            y >= canvas.height - CharaterHeight - swordHeight
          ) {
            dx = Math.floor(Math.random() * 5) + -7;
            dy = dy*(-1);
          } else if (
            x <= charX + CharaterWidth &&
            y >= canvas.height - CharaterHeight - swordHeight &&
            x >= charX + CharaterWidth / 2 &&
            y >= canvas.height - CharaterHeight - swordHeight
          ) {
            dx = Math.floor(Math.random() * 5) + 2;
            dy = dy*(-1);
          } else {
            dx = Math.floor(Math.random() * 10) + -5;
            dy = dy*(-1);
            if (dx == 0) dx++;
          }
        }
        if (dy == 0) dy--;
        if (dx == 0) dx++;

        if (x + swordWidth > canvas.width || x <= 5) {
          dx = -dx;
        }
        if (y + swordHeight > canvas.height) {
          if (ifPowerUp == true) {
            dx = Math.floor(Math.random() * 10) + -5;
            dy = dy*(-1);
          } else {
            removeSword(start);
            x = charX + CharaterWidth / 2;
            y = canvas.height - CharaterHeight - swordHeight;
            dx = Math.floor(Math.random() * 10) + -5;
            dy = dy*(-1);
          }
        } else if (y <= 5)         dy = dy*(-1);


        x += dx;
        y += dy;

        if (rightDown) {
          if (charX + CharaterWidth < canvas.width) {
            charX += 7;
          } else {
            charX = canvas.width - CharaterWidth;
          }
        }
        if (leftDown) {
          if (charX > 0) {
            charX -= 7;
          } else {
            charX = 0;
          }
        }
        checkNull = 0;
        for (let i = 0; i < rownum; i++) {
          for (let j = 0; j < colnum; j++) {
            checkNull = checkNull + brick_arr[i][j];
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

        if (checkNull == 0) BricksDestroyed();

        rowheight = brickheight + padding;
        colwidth = brickwidth + padding;
        row = Math.floor(y / rowheight);
        col = Math.floor(x / colwidth);
        if (
          x< colnum * colwidth &&  
          row >= 0 &&   
          col >= 0 &&   
          brick_arr[row][col] >= 1 
        ) {
          if (brick_arr[row][col] >= 1 && brick_arr[row][col] <= 6) {
            brick_arr[row][col] = 0;
            destoyedBricks++;
          } else if (brick_arr[row][col] >= 7 && brick_arr[row][col] <= 8) {
            if (brick_arr[row][col] == 7.5) {
              destoyedBricks++;
              brick_arr[row][col] = 0;
            }
            if (brick_arr[row][col] == 8)
              brick_arr[row][col] = brick_arr[row][col] - 0.5;

            if (brick_arr[row][col] == 7)
              brick_arr[row][col] = brick_arr[row][col] + 0.5;
          } else if (brick_arr[row][col] >= 9 && brick_arr[row][col] < 12) {
            brick_arr[row][col] = brick_arr[row][col] + 1;
          } 

          if (brick_arr[row][col] == 12) {
            destoyedBricks++;
            brick_arr[row][col] = 0;
          }

          brickpower();
        } 
    

        if (destoyedBricks >= 15 && done == true) {
          $('.blink_me').css({
            visibility: 'visible',
          });
        }

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
          } else if (demon >= 9) {
            ctx.drawImage(demon_one, x, y, w, h);
            ctx.strokeStyle = 'yellow';
          }
          ctx.strokeRect(x, y, w, h);
        }
      } else {
        return;
      }
    }
    init();
    initBrick();
  }

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
  let life = 6;
  $('.sword_life:nth-of-type(' + life + ')').css({
    filter: 'drop-shadow(0 0 0.3rem red)',
  });

  function removeSword(start) {
    if (life == 0 || start <= 0) {
      $('.game-frame-two').hide();
      $('canvas').hide();
      $('.info').hide();
      $('.game_frame').hide();
      $('.container').hide();

      $('body').css({
        background: 'url(../img/background2.jpg) no-repeat',
        backgroundSize: 'cover',
        backgroundColor: 'black',
      });
      Swal.fire({
        title: 'YOU DIED',
        width: 2000,
        showConfirmButton: false,
        timer: 5000,
        color: '#fff',
        background: 'transparent',
      }).then(function () {
        location.reload();
      });
    }
    $('.sword_life:nth-of-type(' + life + ')').hide();
    life--;
    $('.sword_life:nth-of-type(' + life + ')').css({
      filter: 'drop-shadow(0 0 0.3rem red)',
    });
  }

  function BricksDestroyed() {
    bricksleft = false;
    $('.game-frame-two').hide();
    $('canvas').hide();
    $('.info').hide();
    $('.game_frame').hide();
    $('.container').hide();

    $('body').css({
      background: 'url(../img/background3.webp) no-repeat',
      backgroundSize: 'cover',
      backgroundColor: 'black',
    });
    Swal.fire({
      title: 'YOU WIN',
      width: 2000,
      showConfirmButton: false,
      timer: 5000,
      color: '#fff',
      background: 'transparent',
    }).then(function () {
      location.reload();
    });
  }
});
window.onload = function audio() {
  /* const audio = new Audio(
    'audio/Demon Slayer_ Akaza vs Rengoku Theme _ EPIC VERSION (Mugen Train OST Cover).mp3'
  );
  audio.play(); */
};

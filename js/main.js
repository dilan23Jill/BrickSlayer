$(document).ready(function () {
  $('.game-frame-two').hide();
  $('canvas').hide();
  $('.info').hide();
  $('.game_frame').hide();
  $('#volume').hide();
  $('.credits_alert').hide();

  audio = new Audio(
    'audio/Demon Slayer_ Akaza vs Rengoku Theme _ EPIC VERSION (Mugen Train OST Cover).mp3'
  );
  audio.volume = 0.4;

  popup_audio = new Audio('audio/Sword Draw Sound Effect.mp3');
  $('.menu:nth-of-type(3').on('click', function () {
    $('#mute, #volume').toggle();
    if ($('#volume').is(':visible')) audio.play();
    else audio.pause();
  });
  $('.menu:nth-of-type(1)').on('click', function () {
    popup_audio.play();
    $('.header').hide();
    $('.credits_alert').fadeIn(800);    
    $('#instr').hide();
    $('#credits_cloud').show();

    setTimeout(() => {
      $('.credits_alert').fadeOut(400);
      $('.header').delay(600).fadeIn(800);
    }, 5000);
  });
  $('.menu:nth-of-type(2)').on('click', function () {
    popup_audio.play();
    $('.header').hide();
    $('.credits_alert').fadeIn(800);    
    $('#credits_cloud').hide();
    $('#instr').show();

    setTimeout(() => {
      $('.credits_alert').fadeOut(400);
      $('.header').delay(600).fadeIn(800);
    }, 5000);
    
  });
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

  $('.blink_me').css({
    visibility: 'hidden',
  });
  giyuAudio = new Audio('audio/Giyuu saying his name.mp3');
  rengokuAudio = new Audio(
    'audio/Rengoku Kyojuro Saying His Name - AUDIO FOR EDIT - Demons Slayer.m4a'
  );
  zenitsuAudio = new Audio(
    'audio/Zenitsu saying his name (Free)-Demon slayer.mp3'
  );

  character = new Image();
  $('#char_one').on('click', function () {
    giyuAudio.play();
    character.src = './img/Giyuu.webp';
    displayGame();
  });

  $('#char_two').on('click', function () {
    rengokuAudio.play();
    character.src = './img/Kyojuro.webp';
    displayGame();
  });

  $('#char_three').on('click', function () {
    zenitsuAudio.play();
    character.src = './img/Zenitsu.webp';
    displayGame();
  });

  function displayGame() {
    $('.menu:nth-of-type(1)').fadeOut(400);
    $('.menu:nth-of-type(2)').fadeOut(400);
    $('.game-frame-two').fadeOut(400);
    $('canvas').delay(400).fadeIn(600);
    $('.info').delay(400).fadeIn(600);
    $('.game_frame').delay(400).fadeIn(600);
    setTimeout(() => {
      draw();
    }, 1000);
  }

  sword = new Image();
  sword.src = './img/Kyojuro-sword-180.png';

  swordWidth = sword.width / 10;
  swordHeight = sword.height / 10;

  sword_180 = new Image();
  sword_180.src = './img/Kyojuro-sword-180.png';

  character.src = './img/Kyojuro.webp';

  demon_one = new Image();
  demon_one.src = './img/demon1.png';

  demon_two = new Image();
  demon_two.src = './img/demon2.png';

  demon_three = new Image();
  demon_three.src = './img/demon3.png';

  CharaterHeight = character.height / 7;
  CharaterWidth = character.width / 7;
  startW = canvas.width / 2;
  startH = canvas.height - CharaterHeight - swordHeight;
  endOfPowerUp = true;
  rightDown = false;
  leftDown = false;
  ifPowerUp = false;
  destoyedBricks = 1;

  function onKeyDown(evt) {
    if (evt.keyCode == 39) rightDown = true;
    if (evt.keyCode == 37) leftDown = true;
    else if (evt.keyCode == 32) {
      if (destoyedBricks >= 15) {
        $('.blink_me').css({
          visibility: 'hidden',
        });

        if (endOfPowerUp == true) {
          const audio = new Audio(
            'audio/Zenitsu Godlike Speed [ S02E10 ] (mp3cut.net).mp3'
          );
          audio.play();

          ifPowerUp = true;
          endOfPowerUp = false;
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
  let row;
  let col;

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
        timeLeft--;
        $('#remTime').text(timeLeft + ' s');
      }, 1000);
    }
    function brickpower() {
      if (ifPowerUp == false) {
        dy = -dy;
        dx = -dx;
      } else return;
    }
    var timeLeft = 100;

    let i = 1;
    function move() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* if(endOfPowerUp == false){
      if(destoyedBricks >35)
      endOfPowerUp = true;} */

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

        if (timeLeft <= 0) removeSword(timeLeft);

        if (
          x + swordWidth >= charX &&
          x <= charX + CharaterWidth &&
          y >= canvas.height - CharaterHeight - swordHeight
        ) {
          if (y + swordHeight < canvas.height - CharaterHeight / 1.3) {
            dx = Math.floor(Math.random() * 11) - 5;
            dy = Math.floor(Math.random() * 4) + 4;
            dy = -Math.abs(dy);
            if (dx == 0) dx--;
          }
          if (y + swordHeight > canvas.height - CharaterHeight / 1.3) {
            if (x < charX + CharaterWidth / 2) {
              dx = Math.floor(Math.random() * 5) - 6;
              dy = Math.floor(Math.random() * 4) + 4;
              dy = -Math.abs(dy);
            } else if (x > charX + CharaterWidth / 2) {
              dx = Math.floor(Math.random() * 5) + 1;
              dy = Math.floor(Math.random() * 4) + 4;
              dy = -Math.abs(dy);
            }
          }
        }

        if (x + swordWidth > canvas.width) {
          dx = -Math.abs(dx);
        } else if (x <= 0) {
          dx = Math.abs(dx);
        }
        if (y + swordHeight > canvas.height) {
          if (ifPowerUp == true) {
            dx = Math.floor(Math.random() * 11) - 5;
            dy = Math.floor(Math.random() * 4) + 4;
            dy = -Math.abs(dy);
            if (dx == 0) dx--;
          } else {
            removeSword(timeLeft);
            x = charX + CharaterWidth / 2;
            y = canvas.height - CharaterHeight - swordHeight;
            dx = Math.floor(Math.random() * 11) - 5;
            dy = Math.floor(Math.random() * 4) + 4;
            dy = -Math.abs(dy);
            if (dx == 0) dx--;
          }
        } else if (y <= 0) {
          dy = dy = Math.floor(Math.random() * 4) + 4;
          dy = Math.abs(dy);
        }

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

        /* do {
          try {
            if (y < rownum * rowheight) {
              col = Math.floor((x + swordWidth / 2) / colwidth);
              if (dy < 0) {
                //Spodnji odboj
                row = Math.floor((y - rowheight / 2) / rowheight);
                if (row >= 0 && col >= 0 && brick_arr[row][col] > 0) {
                  destroyBricks();
                  break;
                }
              } else {
                row = Math.floor((y + rowheight) / rowheight);
                //Zgornji odboj
                if (row >= 0 && col >= 0 && brick_arr[row][col] > 0) {
                  destroyBricks();
                  break;
                }
              }
              row = Math.floor((y + swordHeight) / rowheight);
              if (dx > 0) {
                col = Math.floor((x + colwidth / 2 - swordWidth/2) / colwidth);

                //Levi odboj
                if (row >= 0 && col >= 0 && brick_arr[row][col] > 0) {
                  destroyBricks();
                  break;
                }
              } else {
                col = Math.floor((x) / colwidth);
                //Desni odboj
                if (row >= 0 && col >= 0 && bricks[row][col] > 0) {
                  destroyBricks();
                  break;
                }
              }
            }
          } catch (error) {
          }
        } while (false); */

        rowheight = brickheight + padding ;
        colwidth = brickwidth + padding ;
        
        row = Math.floor(y / rowheight);
        col = Math.floor(x / colwidth);
        if (
          y < rownum * rowheight &&
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
            if (brick_arr[row][col] == 12) {
              destoyedBricks++;
              brick_arr[row][col] = 0;
            }
          }
          brickpower();
        } 
         if (
          x + swordWidth< rownum * rowheight &&
          row >= 0 &&
          col >= 0 &&
          brick_arr[row][col] >= 1
        ) { if (brick_arr[row][col] >= 1 && brick_arr[row][col] <= 6) {
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
          if (brick_arr[row][col] == 12) {
            destoyedBricks++;
            brick_arr[row][col] = 0;
          }
        }
        brickpower();}



        if (destoyedBricks >= 15 && endOfPowerUp == true) {
          $('.blink_me').css({
            visibility: 'visible',
          });
        }

        function rect(x, y, w, h, demon) {
          ctx.beginPath();
          ctx.rect(x, y, w, h);
          ctx.closePath();

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
        }
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

  function removeSword(timeLeft) {
    if (life == 0 || timeLeft <= 0) {
      $('.game-frame-two').hide();
      $('canvas').hide();
      $('.info').hide();
      $('.game_frame').hide();
      $('.container').hide();

      $('body').css({
        background: 'url(../img/background2.jpg) no-repeat',
        backgroundSize: 'cover'
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
      backgroundSize: 'cover'
    });
  }
});
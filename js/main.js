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
});

var sword = new Image();
sword.src = './img/Kyojuro-sword.png';

var character = new Image();
character.src = './img/Kyojuro.webp';

var CharaterHeight = character.height / 7;
var CharaterWidth = character.width / 7;
let rot = 0;
var startW = canvas.width / 2 - 10;
var startH = canvas.height - CharaterHeight - 100;

let brick_arr = [];
for(var i=0;){
  for(){

  }
}


function draw() {
  var x = startW;
  var y = startH;
  var dx = -2;
  var dy = -4;
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(sword, x, y, 20, 90);
  ctx.drawImage(
    character,
    canvas.width / 2 - CharaterWidth / 2,
    canvas.height - CharaterHeight,
    CharaterWidth,
    CharaterHeight
  );

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
            x + 20 > canvas.width / 2 - CharaterWidth / 2 &&
            x < canvas.width / 2 + CharaterWidth / 2 &&
            y + 90 > canvas.height - CharaterHeight
          ) {
            ctx.drawImage(
              character,
              canvas.width / 2 - CharaterWidth / 2,
              canvas.height - CharaterHeight,
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
  }
  init();
}

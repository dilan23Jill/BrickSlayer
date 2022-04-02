$(document).ready(function () {
  $('.game-frame-two').hide();
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
  });
});

import { boys } from './models.js';
import { runStartup } from './startup.js';

runStartup();

let count = 0;

$('.modal-exit').on('click', function() {
  const video = $('#dream-video').get(0);
  video.pause();
  video.currentTime = 0;
  $('.modal').toggleClass('open');
});

$(".digit").on('click', function() {
  let num = ($(this).clone().children().remove().end().text());
  if (count === 2) {
    num += '-';
  }

  $("#output").append('<span>' + num.trim() + '</span>');
  if (count < 6) {
    count++
  } else {
    count = 0;
    dial();
  }
});

const dial = () => {
  setTimeout(() => {
    $('.modal').toggleClass('open');
    $('#dream-video').get(0).play();
    const dialledBoy = boys.find(x => x.number === $('#output').text());
    $('#dream-answer').text(dialledBoy.name);
    $('#output').text('');
  }, 200)
} 
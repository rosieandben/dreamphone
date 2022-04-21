let count = 0;

$('.modal-exit').on('click', function() {
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
    dial();
  }
});

$('.fa-long-arrow-left').on('click', function() {
  $('#output span:last-child').remove();
  count--;
});

const dial = () => {
  setTimeout(() => {
    $('.modal').toggleClass('open');
  }, 200)
} 
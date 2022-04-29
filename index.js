import { runStartup, startupBoys } from './startup.js';

runStartup();

let count = 0;

$('.modal-exit').on('click', function () {
	const video = $('#dream-video').get(0);
	video.pause();
	video.currentTime = 0;
	$('.modal').toggleClass('open');
});

$('.digit').on('click', function () {
	let num = $(this).clone().children().remove().end().text();
	if (count === 2) {
		num += '-';
	}

	$('#output').append('<span>' + num.trim() + '</span>');
	if (count < 6) {
		count++;
	} else {
		count = 0;
		dial();
	}
});

$('#dream-video').on('ended', function () {
  $('#dream-video').fadeOut(1000);
  $('#dream-answer').fadeIn(5000);
});

const dial = () => {
  $('#dream-answer').hide();
  $('#dream-video').show();
	setTimeout(() => {
		const dialledBoy = startupBoys.find(
			(x) => x.number === $('#output').text()
		);
    $('#dream-answer').text(dialledBoy.name);
		$('#dream-video')
			.find('source')
			.attr('src', dialledBoy.gameAttributes.allocatedVideo);
		$('#dream-video').get(0).load();

		$('.modal').toggleClass('open');
		$('#dream-video').get(0).play();
		$('#output').text('');
	}, 200);
};

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
	if (count === 6 && !num.includes('#')) {
		count = 0;
		const dialledBoy = startupBoys.find(
			(x) => x.number === $('#output').text()
		);
		dial(dialledBoy);
	} else if (count === 7 && num.includes('#')) {
		count = 0;
		const dialledBoy = startupBoys.find(
			(x) => x.number === $('#output').text().replace('#', '')
		)
		guess(dialledBoy);
	} else {
		count++;
	}
});

$('#dream-video').on('ended', function () {
  $('#dream-video').fadeOut(1000, () => {
	$('#dream-answer').fadeIn(1000);
  });
});

const dial = (dialledBoy) => {
	$('#dream-answer').hide();
	$('#dream-video').show();
	setTimeout(() => {
		if (!dialledBoy) {
			$('#dream-answer').html('Sorry, wrong number, dial again');
			$('#dream-answer').show();
			$('#dream-video').hide();
		} else {
			$('#dream-answer').html(dialledBoy.gameAttributes.answerToReveal);
			$('#dream-video')
				.find('source')
				.attr('src', dialledBoy.gameAttributes.allocatedVideo);
			$('#dream-video').get(0).load();
		}

		$('.modal').toggleClass('open');
		if (dialledBoy) $('#dream-video').get(0).play();
		$('#output').text('');
	}, 200);
};

const guess = (dialledBoy) => {
	$('#dream-answer').hide();
	$('#dream-video').show();
	setTimeout(() => {
		if (!dialledBoy) {
			$('#dream-answer').html('Sorry, wrong number, dial again');
			$('#dream-answer').show();
			$('#dream-video').hide();
		} else {
			$('#dream-answer').html('<b>Congratulations!</b>');
			$('#dream-video')
				.find('source')
				.attr('src', dialledBoy.gameAttributes.allocatedVideo);
			$('#dream-video').get(0).load();
		}

		$('.modal').toggleClass('open');
		if (dialledBoy) $('#dream-video').get(0).play();
		$('#output').text('');
	}, 200);
};

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
	const dialledNumbers = $('#output').text()
	let num = $(this).clone().children().remove().end().text();
	if (count === 2 && !dialledNumbers.includes('#')) {
		num += '-';
	}
	if (count === 3 && dialledNumbers.includes('#')) {
		num += '-';
	}

	$('#output').append('<span>' + num.trim() + '</span>');
	if (count === 6 && !dialledNumbers.includes('#')) {
		count = 0;
		const dialledBoy = startupBoys.find(
			(x) => x.number === $('#output').text()
		);
		dial(dialledBoy);
	} else if (count === 7 && dialledNumbers.includes('#')) {
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

const displayModalVideoAndMessage = (dialledBoy, message, video) => {
	$('#dream-answer').html(message);
	if (video) {
		$('#dream-video')
			.find('source')
			.attr('src', video);
		$('#dream-video').get(0).load();
	} else {
		$('#dream-video').hide();
		$('#dream-answer').show();
	}

	$('.modal').toggleClass('open');
	if (dialledBoy && video) $('#dream-video').get(0).play();
	$('#output').text('');
}

const displayWrongNumberMessage = () => {
	$('#dream-answer').html('Sorry, wrong number, dial again');
	$('#dream-answer').show();
	$('#dream-video').hide();
	$('.modal').toggleClass('open');
	$('#output').text('');
}

const dial = (dialledBoy) => {
	$('#dream-answer').hide();
	$('#dream-video').show();
	setTimeout(() => {
		if (!dialledBoy) {
			displayWrongNumberMessage();
		} else {
			displayModalVideoAndMessage(
				dialledBoy,
				dialledBoy.gameAttributes.answerToReveal,
				dialledBoy.gameAttributes.allocatedVideo
			);
		}
	}, 200);
};

const guess = (dialledBoy) => {
	$('#dream-answer').hide();
	$('#dream-video').show();
	setTimeout(() => {
		if (!dialledBoy) {
			displayWrongNumberMessage();
		} else {
			displayModalVideoAndMessage(
				dialledBoy,
				dialledBoy.gameAttributes.isAdmirer ? '<b>Congratulations!</b>' : '<b>Better luck next time!</b>',
				dialledBoy.gameAttributes.isAdmirer ? dialledBoy.gameAttributes.correctAnswerVideo : dialledBoy.gameAttributes.incorrectAnswerVideo
			);
		}
	}, 200);
};
import { generateHeart } from './hearts.js';
import { runStartup, startupBoys } from './startup.js';
import { incomingCallBoys } from './models.js';

const admirer = runStartup();
const incomingCallBoysLocal = JSON.parse(JSON.stringify(incomingCallBoys));
const admirerIndex = incomingCallBoysLocal.findIndex(
	(boy) => boy.name === admirer.name
);
if (admirerIndex > -1) {
	incomingCallBoysLocal.splice(admirerIndex, 1);
}

let turn = 0;
let digitCount = 0;
let disableIncomingCall = false;

const setIncomingCall = () => {
	const incomingCallBoy =
		incomingCallBoysLocal[
			Math.floor(Math.random() * incomingCallBoysLocal.length)
		];
	const message = `<b>${incomingCallBoy.name.toUpperCase()}</b> isn't into you, sorry!`;

	let audio = new Audio('resources/ringing.mp3');
	$('.container').toggleClass('ringing');
	audio.play();

	$('#dream-answer').hide();
	$('#dream-video').show();
	disableIncomingCall = true;
	setTimeout(() => {
		$('.container').toggleClass('ringing');
		audio.pause();
		audio = null;
		setTimeout(() => {
			displayModalVideoAndMessage(
				incomingCallBoy,
				message,
				incomingCallBoy.videoUrl,
				true
			);
		}, 200);
	}, 9000);

	const indexOfUsedBoy = incomingCallBoysLocal.findIndex(
		(boy) => boy === incomingCallBoy
	);
	incomingCallBoysLocal.splice(indexOfUsedBoy, 1);
};

$('.modal-exit').on('click', function () {
	const video = $('#dream-video').get(0);
	video.pause();
	video.currentTime = 0;
	$('.modal').toggleClass('open');
	if ((turn === 3 || turn === 5 || turn === 8) && !disableIncomingCall) {
		setIncomingCall();
	}
});

$('.digit').on('click', function () {
	const dialledNumbers = $('#output').text();
	let num = $(this).clone().children().remove().end().text();
	if (digitCount === 2 && !dialledNumbers.includes('#')) {
		num += '-';
	}
	if (digitCount === 3 && dialledNumbers.includes('#')) {
		num += '-';
	}

	$('#output').append('<span>' + num.trim() + '</span>');
	if (digitCount === 6 && !dialledNumbers.includes('#')) {
		digitCount = 0;
		const dialledBoy = startupBoys.find(
			(x) => x.number === $('#output').text()
		);
		dial(dialledBoy);
	} else if (digitCount === 7 && dialledNumbers.includes('#')) {
		digitCount = 0;
		const dialledBoy = startupBoys.find(
			(x) => x.number === $('#output').text().replace('#', '')
		);
		guess(dialledBoy);
	} else {
		digitCount++;
	}
});

const generateHeartAtCoordinates = (xPoint, yPoint) => {
	const start = 1 - Math.round(Math.random()) * 2;
	const scale = Math.random() * Math.random() * 0.8 + 0.2;
	const bound = 30 + Math.random() * 20;
	generateHeart(xPoint, yPoint, bound, start, scale);
};

$('#dream-video').on('ended', function () {
	$('#dream-video').fadeOut(1000, () => {
		$('#dream-answer').fadeIn(1000);
		if ($('#dream-answer').text() === 'Congratulations!') {
			setTimeout(() => {
				for (let i = 0; i < 1000; i += 10) {
					generateHeartAtCoordinates(i, 950);
				}
			}, 1000);
		}
	});
});

const displayModalVideoAndMessage = (
	dialledBoy,
	message,
	video,
	incomingCall
) => {
	if (!incomingCall) {
		disableIncomingCall = false;
		turn++;
	}

	$('.modal-bg').css(
		'background-image',
		incomingCall
			? `url(resources/images/Box-side-girls.jpeg)`
			: `url(resources/images/${dialledBoy.name}.jpeg)`
	);
	$('.modal-bg').css('background-size', '20%');

	$('#dream-answer').html(message);
	if (video) {
		$('#dream-video').find('source').attr('src', video);
		$('#dream-video').get(0).load();
	} else {
		$('#dream-video').hide();
		$('#dream-answer').show();
	}

	$('.modal').toggleClass('open');
	if (dialledBoy && video) $('#dream-video').get(0).play();
	$('#output').text('');
};

const displayWrongNumberMessage = () => {
	$('.modal-bg').css('background-image', 'url(resources/images/Booklet.jpeg)');
	$('.modal-bg').css('background-size', '100%');

	disableIncomingCall = true;
	$('#dream-answer').html('Sorry, wrong number, dial again');
	$('#dream-answer').show();
	$('#dream-video').hide();
	$('.modal').toggleClass('open');
	$('#output').text('');
};

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
				dialledBoy.gameAttributes.allocatedVideo,
				false
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
				dialledBoy.gameAttributes.isAdmirer
					? '<b>Congratulations!</b>'
					: '<b>Better luck next time!</b>',
				dialledBoy.gameAttributes.isAdmirer
					? dialledBoy.gameAttributes.correctAnswerVideo
					: dialledBoy.gameAttributes.incorrectAnswerVideo,
				false
			);
		}
	}, 200);
};

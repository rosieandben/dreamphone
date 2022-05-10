var brd = document.createElement('DIV');
document.body.insertBefore(brd, document.getElementById('board'));
const duration = 3000;
const speed = 0.5;
var hearts = [];

export const generateHeart = (x, y, xBound, xStart, scale) => {
	var heart = document.createElement('DIV');
	heart.setAttribute('class', 'heart');
	brd.appendChild(heart);
	heart.time = duration;
	heart.x = x;
	heart.y = y;
	heart.bound = xBound;
	heart.direction = xStart;
	heart.style.left = heart.x + 'px';
	heart.style.top = heart.y + 'px';
	heart.scale = scale;
	heart.style.transform = 'scale(' + scale + ',' + scale + ')';
	if (hearts == null) hearts = [];
	hearts.push(heart);
	return heart;
};

const frame = () => {
	var current = Date.now();
	var deltaTime = current - before;
	before = current;
	for (const i in hearts) {
		var heart = hearts[i];
		heart.time -= deltaTime;
		if (heart.time > 0) {
			heart.y -= speed;
			heart.style.top = heart.y + 'px';
			heart.style.left =
				heart.x +
				heart.direction * heart.bound * Math.sin((heart.y * heart.scale) / 30) +
				'px';
		} else {
			heart.parentNode.removeChild(heart);
			hearts.splice(i, 1);
		}
	}
};

var before = Date.now();
setInterval(frame, 5);

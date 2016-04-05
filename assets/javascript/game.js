var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var background1,
	hands,
	text,
	background2,
	pushups,
	background3,
	beer;

function preload() {
	game.load.image('background1', './assets/images/background1.png');
	game.load.spritesheet('hands', './assets/sprites/hands.png', 499, 136);
	game.load.spritesheet('text', './assets/sprites/text.png', 330, 166); 

	game.load.image('background2', './assets/images/background2.png');
	game.load.spritesheet('pushups', './assets/sprites/pushups.png', 500, 200);

	game.load.image('background3', './assets/images/background3.png');
	game.load.spritesheet('beer', './assets/sprites/beer.png', 800, 600);
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	background1 = game.add.sprite(0, 0, 'background1');

	hands = game.add.sprite(180, game.world.height - 180, 'hands');
	text = game.add.sprite(250, game.world.height - 389, 'text');
	game.physics.arcade.enable(hands);

	cursors = game.input.keyboard.createCursorKeys();
	hits = 0;
	textFrame = 0;

	alert('IT\'S ALMOST TIME FOR HAPPY HOUR BRO\n\nGOTTA CRUSH THAT LAST COMMIT!!!\n\n(button mash left and right)');
}

var lastFrame = 0;
var level = 1;

function update() {
	// level 1 mechanics
	if (level == 1) {
		if ((cursors.left.isDown && cursors.left.repeats == 0) || (cursors.right.isDown && cursors.right.repeats == 0)) {
			hands.frame = cursors.left.isDown ? 0 : 1;
			if (lastFrame != hands.frame) {
				text.frame++;

				if (!text.frame) {
					text.frame = 0;
				}

				hits++;

				if (hits == 50) {
					alert('SICK BRO\n\nLET\'S DO SOME PUSH UPS BEFORE WE GO\n\n(button mash up and down)');
					level = 2;
					background1.destroy();
					hands.destroy();
					text.destroy();

					// set up level 2;
					background2 = game.add.sprite(0, 0, 'background2');
					pushups = game.add.sprite(100, game.world.height - 200, 'pushups');
					lastFrame = 0;
					hits = 0;
				} else {
					lastFrame = hands.frame;
				}
			}
		}
	}

	if (level == 2) {
		if ((cursors.up.isDown && cursors.up.repeats == 0) || (cursors.down.isDown && cursors.down.repeats == 0)) {
			pushups.frame = cursors.up.isDown ? 0 : 1;

			if (lastFrame != pushups.frame) {
				hits++;

				if (hits == 20) {
					alert('HELL YEAH BRO\n\nLET\'S GO CRUSH SOME BREWS\n\n(button mash down)');
					level = 3;
					background2.destroy();
					pushups.destroy();

					background3 = game.add.sprite(0, 0, 'background3');
					beer = game.add.sprite(0, 0, 'beer');

					lastframe = 0;
					hits = 0;
				}
			}
		}
	}

	if (level == 3) {
		if (cursors.down.isDown && cursors.down.repeats == 0) {
			hits++;

			if (hits % 3 == 0) {
				beer.frame++;
			}

			if (hits == 10) {
				alert('WE\'RE GONNA ROCK THE FUCKIN WORLD\n\nI LOVE YOU SO MUCH BRO');
				background3.destroy();
				beer.destroy();
			}
		}
	}
}
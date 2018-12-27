//Listener event to resize bg image
window.addEventListener('resize', () => {
			this.game.resize(window.innerWidth, window.innerHeight);
		}, false);

//Global variables
		var enterSound;
		var bgColor;
		var instructionsText;
		var frameNames;
		var explosionAnime;
		var graphics;
		var graphics2;
		var bg;
		var pauseText;
		var jumpSound;
		var walls;
		var player;
		var spikes;
		var platforms;
		var dots;
		var bombs;
		var bomb;
		var bomb2;
		var cursors;
		var ground;
		var score;
		var scoreText;
		var levelText;
		var gameOver = false;
		var paused = false
		var spikes;
		var bombVelocityX = -700;
		var bombVelocityY = -700;
		var sky;
		var bgMusic;
		var levelNum;
		var aKey;

//Create Menu Scene
var MenuScene = new Phaser.Class({
	Extends: Phaser.Scene,

	initialize:

	function MenuScene()
	{
		Phaser.Scene.call(this, { key: 'menuScene'});
	},

	preload: function() 
	{
		this.load.audio('jump-sound', '/assets/plasterbrain-jump.mp3');
		this.load.audio('enter-sound', '/assets/littlerobotsoundfactory_enter.wav');
	},

	create: function()
	{
		var companyText = this.add.text(150, 100, 'CoffeeGames Presents', { fontSize: '38px', fill: '#fff' });
		var titleText = this.add.text(250, 200, 'Get The Dots!', { fontSize: '38px', fill: '#fff' });

		//Creating graphic
		//Draw a rectangles
		graphics = this.add.graphics();
		graphics.lineStyle(4, 0x00ff00, 1);
		graphics.fillStyle(0xFFFFFF, 1); 
		graphics.fillRect(210, 385, 350, 70);
		graphics.strokeRect(210, 385, 350, 70);

		graphics2 = this.add.graphics();
		graphics.lineStyle(4, 0xff00, 1);
		graphics.strokeRect(210, 485, 350, 70);

		var startText = this.add.text(329, 400, 'Start', { fontSize: '38px', fill: '#000' });
		startText.setInteractive(); // Make start text listen for events
		startText.on('pointerdown', () => { console.log('start menu has been clicked'); });

		instructionsText = this.add.text(260, 500, 'Instructions', { fontSize: '38px', fill: '#fff' });

		this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

		enterSound = this.sound.add('enter-sound');

		//Listener for Enter
			this.input.keyboard.on('keydown_ENTER', function (event) 
			{
				enterSound.play();
				if (startText.x === 329)
				{
					this.scene.pause();
					this.scene.launch('playScene');
				}
				if (instructionsText.x === 259)
				{
					this.scene.pause();
					this.scene.launch('instructionScene');
				}
			}, this);

		//Listen for Up and Down presses
		this.input.keyboard.on('keydown_UP', function (event)
		{
			graphics = this.add.graphics();
			graphics.fillStyle(0xFFFFFF, 1); 
			graphics.fillRect(210, 385, 350, 70);
			graphics.lineStyle(4, 0x00ff00, 1);
			graphics.strokeRect(210, 385, 350, 70);

			graphics2 = this.add.graphics();
			graphics.fillStyle(0x000000, 1); 
			graphics.fillRect(210, 485, 350, 70);
			graphics.lineStyle(4, 0xff00, 1);
			graphics.strokeRect(210, 485, 350, 70);

			startText = this.add.text(329, 400, 'Start', { fontSize: '38px', fill: '#000' });
			intstructionsText = this.add.text(260, 500, 'Instructions', { fontSize: '38px', fill: '#FFF' });
			jumpSound = this.sound.add('jump-sound');
			jumpSound.play();

		}, this);

		this.input.keyboard.on('keydown_DOWN', function (event) {
			console.log('down arrow was pressed');
			graphics = this.add.graphics();
			graphics.fillStyle(0x000000, 1); 
			graphics.fillRect(210, 385, 350, 70);
			graphics.lineStyle(4, 0x00ff00, 1);
			graphics.strokeRect(210, 385, 350, 70);

			graphics2 = this.add.graphics();
			graphics.fillStyle(0xFFFFFF, 1); 
			graphics.fillRect(210, 485, 350, 70);
			graphics.lineStyle(4, 0xff00, 1);
			graphics.strokeRect(210, 485, 350, 70);

			startText = this.add.text(330, 400, 'Start', { fontSize: '38px', fill: '#FFF' });
			intstructionsText = this.add.text(259, 500, 'Instructions', { fontSize: '38px', fill: '#000' });
			instructionsText.x = 259
			jumpSound = this.sound.add('jump-sound');
			jumpSound.play();

		}, this);

	}

});

var InstructionScene = new Phaser.Class({
		Extends: Phaser.Scene,

		initialize:

		function InstructionScene()
	{
		Phaser.Scene.call(this, { key: 'instructionScene' });
	},

	preload: function()
	{
		this.load.image('blackBg', 'assets/blackbg.png');
		this.load.audio('enter-sound', '/assets/littlerobotsoundfactory_enter.wav');
	},

	create: function() 
	{
		enterSound = this.sound.add('enter-sound');
		var blackBg = this.add.image(400, 300, 'blackBg');
		var moveInstructions= this.add.text(50, 50, 'Use left and right arrows to move left and right', { fontSize: '32px', fill: '#FFF' });	
		var jumpInustructions = this.add.text(50, 150, 'Use Up arrow to jump.', { fontSize: '32px', fill: '#FFF' });	
		var pauseInsutrcions = this.add.text(50, 250, 'Press A to pause and resume', { fontSize: '32px', fill: '#FFF' });	
		var restartInustrcions = this.add.text(50, 350, 'Press enter twice to restart game', { fontSize: '32px', fill: '#FFF' });	
			graphics = this.add.graphics();
			graphics.fillStyle(0xFFFFFF, 1); 
			graphics.fillRect(210, 485, 350, 70);
			graphics.lineStyle(4, 0x00ff00, 1);
			graphics.strokeRect(210, 485, 350, 70);

			startText = this.add.text(329, 500, 'Start', { fontSize: '38px', fill: '#000' });

			this.input.keyboard.on('keydown_ENTER', function (event) 
			{
					enterSound.play();
					this.scene.pause();
					this.scene.launch('playScene');
			}, this);
	}

});

var PlayScene= new Phaser.Class({
		Extends: Phaser.Scene,

		initialize:

		function PlayScene()
	{
		Phaser.Scene.call(this, { key: 'playScene' });
	},

		preload: function() 
	{
		//do we need this?
		this.load.image('wall', '/assets/wall.png');
		this.load.image('spike', '/assets/spike.png');
		this.load.image('dot', '/assets/dot.png');
		this.load.image('ground', '/assets/ground-floor.png');
		this.load.image('bomb', '/assets/truezipp-bomb64.png');
		this.load.image('spike', '/assets/spike.png');
		this.load.image('bg', '/assets/pixel-art-hill.png');
		this.load.spritesheet('explosion', '/assets/j-robot-explosion.png', { frameWidth: 96, frameHeight: 96});
		this.load.spritesheet('user-player-spritesheet', '/assets/user-movement-spritesheet.png', { frameWidth: 32, frameHeight: 32, endFrame: 5});
		this.load.audio('getDot', '/assets/collected-dot.wav');
		this.load.audio('bg-music', '/assets/ozzed-raining.mp3');
		this.load.audio('jump-sound', '/assets/plasterbrain-jump.mp3');
		this.load.audio('explosion', '/assets/explosion.wav');
	},

		create: function()
	{
			this.events.on('resize', this.game.resize, this);
			this.bg = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'bg');
			this.bg.setDisplaySize(this.game.config.width, this.game.config.height);

			walls = this.physics.add.staticGroup();

			walls.create(20, 450, 'wall');
			walls.create(780, 450, 'wall');

			platforms = this.physics.add.staticGroup();

			platforms.create(-140, 420, 'ground')
			platforms.create(950, 420, 'ground')


			ground = this.physics.add.staticGroup();
				
			ground.create(400, 590, 'ground').setScale(1.2).refreshBody();
			ground.displayHeight = game.config.height*.1;

			dots = this.physics.add.staticGroup();
			dots.create(720, 500, 'dot');
			dots.create(80, 500, 'dot');
			dots.create(80, 350, 'dot');
			dots.create(720, 350, 'dot');
			dots.create(20, 210, 'dot');
			dots.create(780, 210, 'dot');

			bombs = this.physics.add.group();
			bomb = bombs.create(400, 0, 'bomb');
			bomb.setBounce(1);
			bomb.setCollideWorldBounds(true);
			bomb.setVelocity(Phaser.Math.Between(bombVelocityX, bombVelocityY), 20);
			bomb.allowGravity = false;

			spikes = this.physics.add.staticGroup();
			spikes.create(400, 548, 'spike');
			spikes.create(370, 548, 'spike');
			spikes.create(340, 548, 'spike');
			spikes.create(460, 548, 'spike');
			spikes.create(430, 548, 'spike');
			spikes.create(20, 238, 'spike');
			spikes.create(780, 238, 'spike');


			player = this.physics.add.sprite(500, 500, 'user-player-spritesheet');
			player.setBounce(0.2);
			player.setCollideWorldBounds(true);

			/*
			this.anims.create({
				key: 'turn',
				frames: [ { key: 'user-player-spritesheet', frame: 5 } ], 
				frameRate: 10,
			});
			*/

			this.anims.create({
				key: 'left',
				frames: this.anims.generateFrameNumbers('user-player-spritesheet', { start: 1, end: 2 }),
				frameRate: 10,
			});

			this.anims.create({
				key: 'right',
				frames: this.anims.generateFrameNumbers('user-player-spritesheet', { start: 3, end: 4 }),
				frameRate: 10,
			});
			
			// Set score and level number
			score = 0;
			levelNum = 1;

			//The score
			scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });

			//The Level
			levelText = this.add.text(550, 16, 'Level: ' + levelNum, { fontSize: '32px', fill: '#000'});

			// Input Events
			cursors = this.input.keyboard.createCursorKeys();

			//Pause and resume the game
			this.input.keyboard.on('keydown_A', function (event) 
			{
				this.scene.pause();
				pauseText = this.add.text(380, 250, 'Pause', { fontSize: '32px', fill: '#000'});
				this.scene.launch('pauseScene');
			}, this);

			this.input.keyboard.on('keydown_ENTER', function (event)
		{
				console.log('game over!!');
				this.scene.launch('menuScene');
				score = 0;
				levelNum = 1;
				gameOver = false;
		}, this);

			// Sound events
			this.sound.add('getDot');
			jumpSound = this.sound.add('jump-sound');
			bgMusic = this.sound.add('bg-music');
			bgMusic.play();

			// Collide the player and platforms
			this.physics.add.collider(player, platforms);
			this.physics.add.collider(player, walls);
			this.physics.add.collider(player, ground);
			this.physics.add.collider(dots, ground);
			this.physics.add.collider(bombs, ground);
			this.physics.add.collider(bombs, walls);
			this.physics.add.collider(bombs, platforms);

			// Check collision between dot and player
			this.physics.add.overlap(player, dots, this.collectDot, null, this);

			// Check collision between bomb and player
			this.physics.add.overlap(player, bombs, this.hitBomb, null, this);

			// Check collision between spikes and player
			this.physics.add.overlap(player, spikes, this.hitSpikes, null, this);

	},

	update: function()
	{
					// Add movement for character
			if (cursors.left.isDown)
				{
					player.setVelocityX(-260);
					player.anims.play('left', true);
				}

			else	if (cursors.right.isDown)
			{
					player.setVelocityX(260);
					player.anims.play('right', true);
			}

			else	
			{
					player.setVelocityX(0);
			}

			if (cursors.up.isDown && player.body.touching.down)
			{
				player.setVelocityY(-600);
				player.setGravityY(550);
				jumpSound.play();
			}
			
		},

		collectDot: function(player, dot, bomb, bombVelocityX, bombVelocityY)
		{
						dot.disableBody(true, true);

			this.sound.play('getDot');
			score += 10;
			scoreText.setText('Score: ' + score);

			if (dots.countActive(true) === 0)
			{
				//You win and restart game
				dots.create(720, 500, 'dot');
				dots.create(80, 500, 'dot');
				dots.create(80, 350, 'dot');
				dots.create(720, 350, 'dot');
				dots.create(20, 210, 'dot');
				dots.create(780, 210, 'dot');


				bomb = bombs.create(400, 0, 'bomb');
				bomb.setBounce(1);
				bomb.setCollideWorldBounds(true);
				bomb.setVelocity(Phaser.Math.Between(-700, -700), 20);
				bomb.allowGravity = false;

				levelNum += 1

				levelText.setText('Level: ' + levelNum); 

			}
		},

		hitBomb: function(player, bomb)
		{
			gameOver = true;
			bomb.disableBody(true, true);
			player.disableBody(true, true);
			explosionAnime = this.add.sprite(player.x, player.y, 'explosion');

			this.anims.create({
				key: 'explode',
				frames: this.anims.generateFrameNumbers('explosion', { start: 1, end: 12 }),
				frameRate: 10
			});

			explosionAnime.anims.play('explode', true);

			var explosion = this.sound.add('explosion');
			explosion.play();

			this.physics.pause();

			bgMusic.stop();
			scoreText.setText('Congrats! You scored: ' + score);
		},

		hitSpikes: function(player, spike)
		{
			gameOver = true;
			player.disableBody(true, true);
			explosionAnime = this.add.sprite(player.x, player.y, 'explosion');
			this.anims.create({
				key: 'explode',
				frames: this.anims.generateFrameNumbers('explosion', { start: 1, end: 12 }),
				frameRate: 10
			});

			explosionAnime.anims.play('explode', true);
			
			//Create explosion sound
			var explosion = this.sound.add('explosion');
			explosion.play();

			this.physics.pause();
			bgMusic.stop();
			scoreText.setText('Congrats! You scored: ' + score);
		},

		resize: function(width, height)
		{
			gameOver = true;
			
			this.physics.pause();
			scoreText.setText('Congrats! You scored: ' + score);
		}

});

var PauseScene = new Phaser.Class({
		Extends: Phaser.Scene,

		initialize:

		function PauseScene()
	{
		Phaser.Scene.call(this, { key: 'pauseScene' });
	},

	create: function()
	{

		//Creates Pause Scene
		this.input.keyboard.on('keydown_A', function (event) {
			this.scene.pause();
			pauseText.setText('');
			this.scene.wake('playScene');
		}, this);
	}


});

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
	gravity: { y: 300 },
		debug: false
		}
	},
	scene: [ MenuScene, InstructionScene, PlayScene, PauseScene ]
};

var game = new Phaser.Game(config);





		//TO DO LIST
		//Create different game states
			//Menu Title State
			//Play State
			//Game over State
		// Get assets for:
			//Bomb
			//Player
			//Platforms
			//Walls
			//Dots
			//Ground
		//Features to add:
			//Resume and pause
			//Being able to shoot bombs checkDown method useful for this!!

//Listener event to resize bg image
window.addEventListener('resize', () => {
			this.game.resize(window.innerWidth, window.innerHeight);
		}, false);

//Global variables
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
		var score = 0;
		var scoreText;
		var levelText;
		var gameOver = false;
		var paused = false
		var spikes;
		var bombVelocityX = -700;
		var bombVelocityY = -700;
		var sky;
		var bgMusic;
		var levelNum = 1;
		var aKey;

//Create Scene A
var SceneA = new Phaser.Class({
	Extends: Phaser.Scene,

	initialize:

	function SceneA()
	{
		Phaser.Scene.call(this, { key: 'sceneA'});
	},

	create: function()
	{
		var titleText = this.add.text(150, 100, 'CoffeeGames Presents...', { fontSize: '38px', fill: '#fff' });
		var titleText2 = this.add.text(250, 300, 'Get The Dots!', { fontSize: '38px', fill: '#fff' });
		var titleText3 = this.add.text(160, 400, 'Click Screen To Start!', { fontSize: '38px', fill: '#fff' });

		//Input cursor
		this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

		//Listener for click
		this.input.once('pointerup', function() 
		{
			console.log('Clicky clack!');
			this.scene.start('sceneB');
		}, this);

	}

});

var SceneB = new Phaser.Class({
		Extends: Phaser.Scene,

		initialize:

		function SceneB()
	{
		Phaser.Scene.call(this, { key: 'sceneB' });
	},

		preload: function() 
	{
		//do we need this?
		this.load.image('wall', '/assets/wall.png');
		this.load.image('player', '/assets/character.png');
		this.load.image('spike', '/assets/spike.png');
		this.load.image('platform', '/assets/platform.png');					
		this.load.image('dot', '/assets/dot.png');
		this.load.image('ground', '/assets/ground.png');
		this.load.image('bomb', '/assets/bomb.png');
		this.load.image('spike', '/assets/spike.png');
		this.load.image('bg', '/assets/pixel-art-hill.png');
		this.load.audio('getDot', '/assets/collected-dot.wav');
		this.load.audio('bg-music', '/assets/ozzed-raining.mp3');
		this.load.audio('jump-sound', '/assets/plasterbrain-jump.mp3');
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

			platforms.create(0, 420, 'platform');
			platforms.create(800, 420, 'platform');


			ground = this.physics.add.staticGroup();
			
			ground.create(400, 595, 'ground').setScale(2).refreshBody();

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
			spikes.create(400, 552, 'spike');
			spikes.create(370, 552, 'spike');
			spikes.create(340, 552, 'spike');
			spikes.create(460, 552, 'spike');
			spikes.create(430, 552, 'spike');
			spikes.create(20, 238, 'spike');
			spikes.create(780, 238, 'spike');


			player = this.physics.add.sprite(500, 500, 'player');
			
			player.setBounce(0.2);
			player.setCollideWorldBounds(true);

			//The score
			scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

			//The Level
			levelText = this.add.text(550, 16, 'Level: ' + levelNum, { fontSize: '32px', fill: '#000'});

			// Input Events
			cursors = this.input.keyboard.createCursorKeys();

			//Pause and resume the game
			this.input.keyboard.on('keydown_A', function (event) 
			{
				this.scene.pause();
				pauseText = this.add.text(200, 200, 'Resume Game? Press A!', { fontSize: '32px', fill: '#000'});
					
				this.scene.launch('sceneC');
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
				}

			else if (cursors.right.isDown)
			{
					player.setVelocityX(260);
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
			
			if (this.key.isDown && gameOver === true)
			{
				console.log('game over!!');
				this.scene.restart()
				score = 0;
				levelNum = 1;
				gameOver = false;
				bgMusic.stop();

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
			
			this.physics.pause();
			scoreText.setText('Congrats! You scored: ' + score);
		},

		hitSpikes: function(player, spike)
		{
			gameOver = true;
			
			this.physics.pause();
			scoreText.setText('Congrats! You scored: ' + score);
		},

		resize: function(width, height)
		{
			gameOver = true;
			
			this.physics.pause();
			scoreText.setText('Congrats! You scored: ' + score);
		}

});

var SceneC = new Phaser.Class({
		Extends: Phaser.Scene,

		initialize:

		function SceneC()
	{
		Phaser.Scene.call(this, { key: 'sceneC' });
	},

	create: function()
	{
		//Set Text for pause scene

		//Creates Pause Scene
		this.input.keyboard.on('keydown_A', function (event) {
			this.scene.pause();
				pauseText = this.add.text(200, 400, 'Start Game' + levelNum, { fontSize: '32px', fill: '#000'});
			this.scene.wake('sceneB');
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
	scene: [ SceneA, SceneB, SceneC ]
};

var game = new Phaser.Game(config);




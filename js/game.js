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
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

		//TO DO LIST
		//Create different game states
			//Menu Title State
			//Play State
			//Game over State
		//Add sound effects to the game

    var game = new Phaser.Game(config);

		//Global variables
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
		var gameOver = false;
		var spikes;
		var bombVelocityX = -900
		var bombVelocityY = -800
		var wKey;

    function preload ()
    {
			this.load.image('wall', '/assets/wall.png');
			this.load.image('player', '/assets/character.png');
			this.load.image('spike', '/assets/spike.png');
			this.load.image('platform', '/assets/platform.png');
			this.load.image('dot', '/assets/dot.png');
			this.load.image('ground', '/assets/ground.png');
			this.load.image('bomb', '/assets/bomb.png');
			this.load.image('spike', '/assets/spike.png');
    }


    function create ()
    {
			walls = this.physics.add.staticGroup();

			walls.create(20, 400, 'wall');
			walls.create(780, 400, 'wall');

			platforms = this.physics.add.staticGroup();

			platforms.create(0, 420, 'platform');
			platforms.create(800, 420, 'platform');

			ground = this.physics.add.staticGroup();
			
			ground.create(400, 585, 'ground').setScale(2).refreshBody();

			dots = this.physics.add.staticGroup();
			dots.create(720, 500, 'dot');
			dots.create(80, 500, 'dot');
			dots.create(80, 350, 'dot');
			dots.create(720, 350, 'dot');
			dots.create(20, 120, 'dot');
			dots.create(780, 120, 'dot');

			bombs = this.physics.add.group();
			bomb = bombs.create(400, 0, 'bomb');
			bomb.setBounce(1);
			bomb.setCollideWorldBounds(true);
			bomb.setVelocity(Phaser.Math.Between(bombVelocityX, bombVelocityY), 20);
			bomb.allowGravity = false;

			spikes = this.physics.add.staticGroup();
			spikes.create(400, 542, 'spike');
			spikes.create(20, 187, 'spike');
			spikes.create(780, 187, 'spike');


			player = this.physics.add.sprite(500, 500, 'player');
			
			player.setBounce(0.2);
			player.setCollideWorldBounds(true);

			//The score
			scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

			/*
			dots = this.physics.add.group({
				key: 'dot',
				repeat: 4,
				setXY: {x: 
			*/

			// Input Events
			cursors = this.input.keyboard.createCursorKeys();

			// Collide the player and platforms
			this.physics.add.collider(player, platforms);
			this.physics.add.collider(player, walls);
			this.physics.add.collider(player, ground);
			this.physics.add.collider(dots, ground);
			this.physics.add.collider(bombs, ground);
			this.physics.add.collider(bombs, walls);
			this.physics.add.collider(bombs, platforms);

			// Check collision between dot and player
			this.physics.add.overlap(player, dots, collectDot, null, this);

			// Check collision between bomb and player
			this.physics.add.overlap(player, bombs, hitBomb, null, this);

			// Check collision between spikes and player
			this.physics.add.overlap(player, spikes, hitSpikes, null, this);

    }



    function update ()
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
				player.setVelocityY(-330);
				console.log("jumping");
			}

			if (gameOver == true)
			{
				score = 0;
				this.scene.restart();
				gameOver = false;
			}
			
    }

		function collectDot(player, dot, bomb, bombVelocityX, bombVelocityY)
		{
			// kill dot from screen
			dot.disableBody(true, true);

			score += 10;
			scoreText.setText('Score: ' + score);

			if (dots.countActive(true) === 0)
			{
				//You win and restart game
				dots.create(720, 500, 'dot');
				dots.create(80, 500, 'dot');
				dots.create(80, 350, 'dot');
				dots.create(720, 350, 'dot');


			bomb = bombs.create(400, 0, 'bomb');
			bomb.setBounce(1);
			bomb.setCollideWorldBounds(true);
			bomb.setVelocity(Phaser.Math.Between(-900, -800), 20);
			bomb.allowGravity = false;


			}

		}

		function hitBomb(player, bomb)
		{

			gameOver = true;
			scoreText.setText('Congrats! You scored: ' + score);

		}

		function hitSpikes(player, spike)
		{
			gameover = true;
			scoreText.setText('Congrats! You scored: ' + score);
		}

		function gameOver()
		{
			//pause scene
			//show score
			//press key to restart game
			this.physics.pause();
		}




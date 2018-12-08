var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});
					
//TO DO LIST
//count collision between enemy and bullet
var character;
var gameWorldHeight;
var ground;
var enemy;
var bullet;
var bulletGroup;
var bulletNumber = 10;
var text;
var flipFlop = true;
var timer;
var total = 0;
var enemyHit = 0;


function preload() {
//add prototype for walls and character
game.load.image('ground', 'assets/ground.png');
game.load.image('character', 'assets/character.png');
game.load.image('bullet', 'assets/bullet.png');
game.load.image('enemy', 'assets/enemy.png');
}

function create() {
//load in walls and character for game
//load in physics
game.world.setBounds(0, 0, 800, 600);

game.physics.startSystem(Phaser.Physics.ARCADE);

character = game.add.sprite(350, 525, 'character');
enemy = game.add.sprite(350, 125, 'enemy');
ground = game.add.sprite(0, 550, 'ground');
bulletGroup = game.add.group();

//add bullet text too top right corner
text = game.add.text(100, 100, 'Bullet Number is ' + bulletNumber);

//enable physics for player
game.physics.arcade.enable(character);
game.physics.arcade.enable(enemy);
game.physics.arcade.enable(bulletGroup);

//player physics
character.body.bounce.y = 0.2;
character.body.gravity.y = 300;
character.body.collideWorldBounds = true;

//Enemy physics
enemy.body.gravity.y = 0.2;
enemy.body.collideWorldBounds = true;
enemy.body.bounce.setTo(1, 1);
enemy.body.immovable = true;

//enable physics for ground 
game.physics.arcade.enable(ground);

//maes ground unmovable
ground.body.immovable = true;

// Create our timer
timer = game.time.create(false);

//Set a TimeEvent to occur after 2 seconds
timer.loop(1000, updateCounter, this);

// Start the timer running
timer.start();


}



function update() {
	//check collision between player and ground 
 game.physics.arcade.collide(character, ground);
 game.physics.arcade.collide(bullet, ground);
 game.physics.arcade.collide(bullet, enemy);
//game.physics.arcarde.overlap(bullet, enemy)
 
 //set boolean to true for enemy movement
 var enemyMove = true;
 
 
 //set movement for character
 var cursors = game.input.keyboard.createCursorKeys();
 var attackKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

 character.body.velocity.x = 0;
 enemy.body.velocity.x = 0;
 game.camera.y -= 4; 

 //check for movement
 if (cursors.left.isDown)
 {
	 //move to the left
	character.body.velocity.x = -600;
 }
 if (cursors.right.isDown)
 {
	 //move to the right
	 character.body.velocity.x = 600;
 }

	if (enemyMove === true) 
	{
		enemy.body.velocity.x = 600;
		
	}

	checkEnemyHit();//Check too see if this function is working correctly

}

function checkEnemyHit() {
	//check collision between enemy and bullet
	//if collision is true add 1 to counter
	//removes bullet from enemy
	if (game.physics.arcade.collide(bullet, enemy))
		{
			bullet.kill();
			enemyHit++
		}

}


function fireBullet() {

	 //used to trigger one event per bullet and then kill that event
	 bullet = bulletGroup.create(character.position.x, character.position.y, 'bullet');
	 game.physics.arcade.enable(bullet); //enables physics for bullet
	 bullet.body.velocity.y = -950;
   flipFlop = !flipFlop;

}

function updateCounter() {

	total++;
	fireBullet();

}

function killBullet() {

	bullet.kill();

}


function render() {

//	game.debug.cameraInfo(game.camera, 32, 32);
//	game.debug.text('Elapsed seconds: ' + game.time.totalElapsedSeconds(), 400, 32);

	game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);

	game.debug.text('Loop Count: ' + total, 32, 64);

	game.debug.text('Enemy Hit: ' + enemyHit, 132, 64);

	

}


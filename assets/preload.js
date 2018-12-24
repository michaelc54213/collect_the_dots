var preloadState = {
	//load in assets for the game
	preload: function() {
		//loading bar
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: "#fff"});


		//assets
		game.load.image('ground', 'assets/platform.png');
		game.load.image('ball', 'assets/fruit_apple1.png');
		game.load.image('banana', 'assets/banana.png');
		game.load.image('strawberry', 'assets/strawberry.png');
		game.load.image('background', 'assets/background.png');
		game.load.image('title', 'assets/catch-the-fruit-title.png');
		game.load.spritesheet('boy', 'assets/user-player-sprite-sheet.png', 32, 32, 5);
		game.load.audio('bleep', 'assets/bleep.mp3');
		game.load.audio('gameover', 'assets/gameover.mp3');
		game.load.audio('intro', 'assets/intro-music.mp3');
	},

	create: function() {
		//call menu state
		game.state.start('menu');
	}
}

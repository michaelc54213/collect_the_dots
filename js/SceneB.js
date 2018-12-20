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
		this.load.image('player', '/assets/character.png');
	},

		create: function()
	{
		var player = this.physics.add.sprite(500, 500, 'player');
		var titleText4 = this.add.text(220, 400, 'Scene B!', { fontSize: '38px', fill: '#fff' });
		console.log('This is scene B');
	}
});
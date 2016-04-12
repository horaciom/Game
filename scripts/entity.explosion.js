var Explosion = function(){
	this.waitToNextSprite = 100;
	this.lastSprite;
	this.sprite;
	this.game;

	this.constructor = function (game,posX,posY) {
		this.setSprite();
		this.game = game;
		this.entityContructor(posX,posY, 32,32,3,this.sprite);
	}

	this.setSprite = function(){
		var sprite = new Sprite();
		sprite.constructor(32,32,0,0 ,'./assets/sprites/explosion1.png');
		this.sprite = sprite;
	}

	this.play = function(){
		var limit = this.sprite.naturalWidth;
		var dateTime = new Date().getTime();
		var canvasX = this.canvasX  + this.width;

		if(canvasX >= limit && this.lastSprite){
			this.game.entitiesToDelete.push(this);
			return;
		}

		if(dateTime-this.lastSprite < this.waitToNextSprite){
			return;
		}
		this.lastSprite = dateTime;
		this.canvasX = canvasX;
	}

	this.move = function(delta){
		this.play();
		this.entityMove(delta);
		return;
	};
}

Explosion.prototype = new Entity();
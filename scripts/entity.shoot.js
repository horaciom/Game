var Shoot = function(){
	this.used = false;
	this.game;
	this.velocityOfmoving = 0.3;
	this.sprite;
	this.width = 32;
	this.height = 32;
	this.hitPower = 500;
	this.shootOrientation;
	this.selfByOrientation;
	this.parseX;
	this.parseY;
	this.explosion;

	this.constructor = function (game,posX,posY,orientation) {
		this.shootOrientation = orientation;
		this.setSprite();
		this.setVelocityByOrientation(posX,posY);
		this.entityContructor(this.parseX,this.parseY, this.width,this.height,3,this.sprite);
		this.game = game;
	}



	this.move = function(delta){
		
		this.setSelfObj(this.x+13,this.y+13,this.width-25,this.height-25);

		if(this.y < -100 || this.y > this.game.canvas.height  || this.x < 0 || this.x > this.game.canvas.width){
			this.game.entitiesToDelete.push(this);
			return;
		}
		var tile  = this.game.checkCollisionWithTile(this);


		if(tile && tile.typeTile != 4 ){

			if(tile.typeTile === 3){ //shoot hawk end game
				this.game.endGame();
			}
				console.log(tile);
			if(tile.hitTile(this.hitPower)){
				this.game.entitiesToDelete.push(tile);
			}

			this.used = true;
			this.explosion = new Explosion();
			this.explosion.constructor(this.game,this.x ,this.y );
			this.game.arrayOfEntities.push(this.explosion);
			this.game.entitiesToDelete.push(this);
			return;
		}

		this.entityMove(delta);

	}

	this.collision = function(other){

		return this.entityCollision(this.selfByOrientation,other);
	}


	this.setSelfObj = function (x,y,w,h){
		this.selfByOrientation = {
			x:x,
			y:y,
			width:w,
			height:h
		}
	}

	this.setVelocityByOrientation = function(x,y){
		this.parseX = x;
		this.parseY = y;
		switch(this.shootOrientation)
		{
			case "top": 
				this.dy = -this.velocityOfmoving;
				this.parseY = this.parseY-20;
			break;	
			case "bottom":
				this.dy = +this.velocityOfmoving;
				this.parseY = this.parseY+20;
			break;
			case "left":
				this.dx = -this.velocityOfmoving;
				this.parseX = this.parseX-20;
			break;
			case "right":
				this.dx = +this.velocityOfmoving;
				this.parseX = this.parseX+20;
			break;
		}
	}

	this.showRatio = function(){
		if(this.selfByOrientation){
			var ctx = this.game.ctx;
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.rect(this.selfByOrientation.x,this.selfByOrientation.y,this.selfByOrientation.width,this.selfByOrientation.height);
			ctx.stroke();
		}
	}


	this.setSprite = function(){
		var sprite = new Sprite();
		var x;
		switch(this.shootOrientation)
		{
			case "top": 
				x = 0;
			break;	
			case "bottom":
				x = 64;
			break;
			case "left":
				x = 32;
			break;
			case "right":
				x = 96;
			break;
		}
	
		sprite.constructor(this.width,this.height,x,0 ,'./assets/sprites/bullet.png');
		this.sprite = sprite;
	}

	


}
Shoot.prototype = new Entity();
var Tank = function(){
	this.game;
	this.width = 32;
	this.height = 32;
	this.sprite;
	this.img;
	this.velocityOfmoving = 0.08;
	this.spriteObj;
	this.selfByOrientation;
	this.intervalShoot = 500;
	this.lastShoot;
	this.colide = false;
	this.allowWalk = false;
	

	this.constructor = function(game, posX, posY,img,type,orientation){
		this.game = game;
		this.orientation =  orientation || 'top';
		this.setSprite(img);
		this.entityContructor(posX,posY, this.height,this.width,type,this.sprite);

	}

	this.setSprite = function(img){
		this.spriteObj = new Sprite();
		var pos = this.spritePosByOrientation()[this.orientation];
		this.spriteObj.constructor(this.width,this.height, pos.x,pos.y ,img);
		this.sprite = this.spriteObj;
	}

	this.setSelfObj = function (x,y,w,h){
		this.selfByOrientation = {
			x:x,
			y:y,
			width:w,
			height:h
		}
	}
	
	this.spritePosByOrientation = function(){
		return {
			'top':{
				x:0,
				y:0
			},
			'bottom':{
				x:0,
				y:32
			},
			'left':{
				x:0,
				y:64
			},
			'right':{
				x:0,
				y:96
			},
		}
	}


	this.setOrientation = function(orientation){
		this.orientation = orientation;
		var limit = this.sprite.naturalWidth;
		var y;
		var x = (this.canvasX  + this.width >= limit) ? 0 : this.canvasX  + this.width;
		var selfObj = {};
		switch(orientation)
		{
			case "top": 
			y = 0; 
			this.setSelfObj(this.x+5,this.y+2,this.width-10,this.height-7);
			break;	
			case "bottom":
			y = 32;
			this.setSelfObj(this.x+5,this.y+7,this.width-10,this.height-10);
			break;
			case "left":
			y = 64; 
			this.setSelfObj(this.x,this.y+5,this.width-8,this.height-10);
			break;
			case "right":
			y = 96;
			this.setSelfObj(this.x+6,this.y+5,this.width-8,this.height-10);
			break;
		}
		this.canvasX = x;
		this.canvasY = y;

	}

	this.tryShoot = function() {

		var dateTime = new Date().getTime();

		if(dateTime-this.lastShoot < this.intervalShoot)
		{
			return;
		}
		this.lastShoot = dateTime;
		var shoot = new Shoot();
		shoot.constructor(this.game,this.x,this.y,this.orientation,this.id);
		this.game.arrayOfEntities.push(shoot);
	}

	this.setHit = function (hit){
		
		return true;
	}

	this.showRatio = function(){
		if(this.selfByOrientation){
			var ctx = this.game.ctx;
			ctx.beginPath();
			ctx.strokeStyle = "yellow";
			ctx.rect(this.selfByOrientation.x,this.selfByOrientation.y,this.selfByOrientation.width,this.selfByOrientation.height);
			ctx.stroke();
		}
	}

	this.collision = function(other){
		
		return this.entityCollision(this.selfByOrientation,other);
	}

	this.setVelocityHorizontal = function(dx){
		this.dx = dx;
	}

	this.setVelocityVertical = function(dy){
		this.dy = dy;
	}

	this.move = function(delta){

		if(this.dy < 0 && this.y < 1) {
			this.colide = true;
			return this.colide;
		}
		if(this.dx < 0 && this.x < 1) {
			this.colide = true;
			return this.colide;
		}
		if(this.dx > 0 && this.x > this.game.canvas.width - (this.width+2) ) {
			this.colide = true;
			return this.colide;
		}
		if(this.dy > 0 && this.y > this.game.canvas.height - (this.height+2) ) {
			this.colide = true;
			return this.colide;
		}
		
		
		this.entityMove(delta);
	}

}

Tank.prototype = new Entity();
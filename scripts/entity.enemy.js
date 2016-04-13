var Enemy = function (game, posX, posY,img,type,orientation)
{
	this.type = 0;
	this.constructor(game, posX, posY,img,type,orientation);

	this.intervalMove = 1000;
	this.lastDateTime = new Date().getTime();
	this.lastTimeOri ;
	this.started = false;

	this.autoMove = function(){
		if(!this.started){
			var dateTime = new Date().getTime();
			if(dateTime-this.lastDateTime < this.intervalMove){
				return;
			}
			this.lastDateTime = dateTime;
			this.started = true;
			this.orientation = this.randomOrientation();
			this.setOrientation(this.orientation);
			this.setVelocityByOrientation();
			return;
		}

		var inEntityArr = this.game.filterEntities('id',this.id)[0];
		var checkCollision = this.game.checkCollision(this);

		if(inEntityArr){
			if(checkCollision){	
				this.colide = true;
			}
			if(this.colide){
				var rand = this.randomOrientation();
				while(this.orientation == rand){
					rand = this.randomOrientation();
				}
				this.orientation = rand;
				this.colide = false;
			}
			this.setVelocityByOrientation();
			this.autoShoot();
		}
	}

	this.setOrientation = function(orientation){
		this.orientation = orientation;
		var limit = this.sprite.naturalWidth;
		var y;
		var x = (this.canvasX  + this.width >= limit) ? 0 : this.canvasX  + this.width;
		var selfObj = {};
		switch(orientation){
			case "top": 
			y = 0; 
			this.setSelfObj(this.x+5,this.y-5,this.width-8,this.height-7);
			break;	
			case "bottom":
			y = 32;
			this.setSelfObj(this.x+5,this.y+15,this.width-8,this.height-10);
			break;
			case "left":
			y = 64; 
			this.setSelfObj(this.x-5,this.y+5,this.width-9,this.height-10);
			break;
			case "right":
			y = 96;
			this.setSelfObj(this.x+15,this.y+5,this.width-9,this.height-10);
			break;
		}
		this.canvasX = x;
		this.canvasY = y;

	}

	this.autoOrientation = function(){

		// this.showRatio();
		// var dateTime = new Date().getTime();
		// var randTime =  this.randomIntFromInterval(2100,3500); 
		// if(dateTime-this.lastDateTime < randTime)/ {
		// 	this.setOrientation(this.orientation);	
		// 	return;
		// }
		// if(!this.colide){
		// 	this.lastDateTime = dateTime;
		// 	console.log("cambio");
		// 	var orientation = this.randomOrientation();
		// 	if(this.orientation !== orientation){
		// 		this.orientation = orientation;
		// 		this.setVelocityByOrientation();
		// 	}
		// 	return;
		// }
		
	}


	this.autoShoot = function(){
		
		var dateTime = new Date().getTime();
		if(dateTime-this.lastDateTime < this.randomIntFromInterval(2000,8500)){
			return;
		}
		this.lastDateTime = dateTime;
		this.started = true;
		this.tryShoot();
	}

	this.newOrientation = function(){
		
		var orientation = this.randomOrientation();
		if(this.orientation !== orientation){

			this.colide = false;
			this.orientation = orientation;
			//this.setVelocityByOrientation();
			return this.colide;
			
		}
		return true;
	}
	

	this.randomOrientation = function (){
		this.setVelocityHorizontal(0);
		this.setVelocityVertical(0);
		var orientation;
		var a = Math.random()<0.5;
		if(a){
			this.velocityOfmoving = (Math.random()<0.5? -this.velocityOfmoving : this.velocityOfmoving );
			if(this.velocityOfmoving != 0){
				orientation = (this.velocityOfmoving < 0 ) ? 'left': 'right';
			}
		}
		else{
			this.velocityOfmoving = (Math.random()<0.5? -this.velocityOfmoving : this.velocityOfmoving );
			if(this.velocityOfmoving != 0){	
				orientation = (this.velocityOfmoving < 0 ) ? 'top': 'bottom';
			}
		}
		return orientation;
	}

	this.setVelocityByOrientation = function(){
		if(!this.colide){
			if(this.orientation === "right" || this.orientation === "left"  ){
				this.setVelocityHorizontal(this.velocityOfmoving);
			}else if(this.orientation === "top" || this.orientation === "bottom"  ){
				this.setVelocityVertical(this.velocityOfmoving);
			}
			this.setOrientation(this.orientation);
		}
	}

}
Enemy.prototype = new Tank();
var Enemy = function (game, posX, posY,img,type,orientation){
	this.type = 0;
	this.constructor(game, posX, posY,img,type,orientation);

	this.intervalMove = 1000;
	this.lastMove = new Date().getTime();
	this.started = false;

	this.autoMove = function(){
		if(!this.started){
		    var dateTime = new Date().getTime();

		    if(dateTime-this.lastMove < this.intervalMove)
		    {
		      return;
		    }
		    this.lastMove = dateTime;
		    this.started = true;
	    	this.orientation = this.randomOrientation();
			this.setOrientation(this.orientation);
			this.setVelocityByOrientation();
	    	return;
		}

		this.setOrientation(this.orientation);	

		if(this.game.checkCollisionWithTile(this)){
			this.colide = true;
		}

		if(this.colide){
			var orientation = this.randomOrientation();
			if(this.orientation != orientation){
				this.colide = false;
				this.orientation = orientation;
				this.setVelocityByOrientation();
				return;
			}
		}

	}

	this.randomOrientation = function (){
		this.setVelocityHorizontal(0);
		this.setVelocityVertical(0);
		var orientation;
		var a = Math.random()<0.5;
		if(a)
		{
			this.velocityOfmoving = (Math.random()<0.5? -this.velocityOfmoving : this.velocityOfmoving );
			if(this.velocityOfmoving != 0){
				if( this.velocityOfmoving < 0 ){
					orientation = 'left';
				}else{
					 orientation = 'right';
				}
			}
		}
		else
		{
			this.velocityOfmoving = (Math.random()<0.5? -this.velocityOfmoving : this.velocityOfmoving );
			
			if(this.velocityOfmoving != 0){	
				if( this.velocityOfmoving < 0 ){
					orientation = 'top';
				}else{
					orientation = 'bottom';
				}
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
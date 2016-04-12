var Enemy = function (game, posX, posY,img,type,orientation){
	this.type = 0;
	this.constructor(game, posX, posY,img,type,orientation);
	this.intervalMove = 10000;
	this.lastMoved;


	this.autoMove = function (){
		this.setVelocityHorizontal(0);
		this.setVelocityVertical(0);
		var orientation;
		var a = Math.random()<0.5;
		if(a)
		{
			speedX = (Math.random()<0.5? -this.velocityOfmoving : this.velocityOfmoving );
			
			if(speedX != 0){
				if( speedX < 0 ){
					orientation = 'left';
					this.setVelocityHorizontal(speedX);

				}else{
					 orientation = 'right';
					 this.setVelocityHorizontal(speedX);
				}
			}
		}
		else
		{
			speedY = (Math.random()<0.5? -this.velocityOfmoving : this.velocityOfmoving );
			
			if(speedY != 0){	
				if( speedY < 0 ){
					orientation = 'top';
					this.setVelocityVertical(speedY);
				}else{
					orientation = 'bottom';
					this.setVelocityVertical(speedY);
				}
			}
		}
		this.setOrientation(orientation);
	}

	//this.autoMove();
}
Enemy.prototype = new Tank();
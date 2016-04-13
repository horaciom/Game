var Player = function (game,x,y,img,type,orientation){

	this.constructor(game,x,y,img,type,orientation);

	this.keyPadEvents = function(){
		this.setVelocityHorizontal(0);
	    this.setVelocityVertical(0);
	    
	    if(!this.game.pressKeyLeft && !this.game.pressKeyRight && !this.game.pressKeyDown && this.game.pressKeyTop)
	    {
	      this.setOrientation('top');
	      if(!this.game.checkCollision(this))
	      {
	        this.setVelocityVertical(-this.velocityOfmoving);
	      }
	    }else if(!this.game.pressKeyLeft && !this.game.pressKeyRight && !this.game.pressKeyTop && this.game.pressKeyDown)
	    {
	      this.setOrientation('bottom');
	      if(!this.game.checkCollision(this))
	      {
	        this.setVelocityVertical(this.velocityOfmoving);
	      }
	    }else if(this.game.pressKeyLeft && !this.game.pressKeyRight && !this.game.pressKeyTop && !this.game.pressKeyDown)
	    {
	      this.setOrientation('left');
	      if(!this.game.checkCollision(this))
	      {
	        this.setVelocityHorizontal(-this.velocityOfmoving);
	      }
	    }else if(!this.game.pressKeyLeft && !this.game.pressKeyTop && !this.game.pressKeyDown && this.game.pressKeyRight)
	    {
	      this.setOrientation('right');
	      if(!this.game.checkCollision(this))
	      {
	        this.setVelocityHorizontal(this.velocityOfmoving);
	      }
	    }

	    if(this.game.pressKeySpace)
	    {
	      this.tryShoot();
	    }
	}
}

Player.prototype = new Tank();
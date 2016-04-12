var Entity = function(){
	this.width;
	this.height;
	this.x;
	this.y;
	this.dx = 0;
	this.dy = 0;
	this.type;
	this.sprite;
	this.canvasX;
	this.canvasY;
	this.canvasWidth;
	this.canvasHeight;
	this.spriteObj;


	this.entityContructor = function(posX, posY, width, height, type, spt){
		this.x = posX;
		this.y = posY;
		this.width = width;
		this.height = height;
		this.type = type;

		var newimg = new Image();
		newimg.src = spt.img;

		this.sprite = newimg;
		this.spriteObj = spt;
		this.canvasX = this.spriteObj.x;
		this.canvasY = this.spriteObj.y;
		this.canvasWidth = this.spriteObj.width;
		this.canvasHeight = this.spriteObj.height;
	}

	this.getType = function(){
        return this.type;
    }

	this.entityMove = function(delta){
		this.x += (this.dx * delta);
		this.y += (this.dy * delta);
	}

	this.draw = function(ctx){
	
		ctx.drawImage(this.sprite, this.canvasX, this.canvasY, this.canvasWidth, this.canvasHeight, this.x, this.y, this.width, this.height);
	} 

	this.entityCollision = function(one,other){
		if (one.x + one.width < other.x) {
            return false;
        }
        if (one.y + one.height < other.y) {
            return false;
        }
        if (one.x > other.x + other.width) {
            return false;
        }
        if (one.y > other.y + other.height) {
            return false;
        }
        return true;
	};


}
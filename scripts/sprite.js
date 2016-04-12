var Sprite = function (){
	this.width;
	this.height;
	this.x;
	this.y;
	this.img;


	this.constructor = function(w,h,x,y,img){
		
		this.width = w;
		this.height = h;
		this.x = x;
		this.y = y;
		this.img = img;
	}

	this.setX  = function (x) {
		this.x = x ;
	}

	this.setY  = function (y) {
		this.y = y ;
	}

	this.getX  = function (x) {
		 return this.x;
	}

	this.getY  = function (y) {
		return this.y;
	}
}	
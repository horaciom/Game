var Tile = function(){
	this.sprite;
    this.width = 32;
    this.height = 32;
    this.x;
    this.y;
    this.allowWalk;
   
    this.typeTile = 0;
    this.endurance;
 
    this.spriteX;
    this.spriteY;

    this.constructor = function(aw,tileType,x,y,e){
        this.allowWalk = aw;
        this.endurance = e;
        this.typeTile = tileType;
        this.setTile(tileType);     
        var x = x || 0;
        var y = y || 0;
        this.entityContructor(x,y,32,32,0,this.sprite);
       
    }



    this.setEndurance = function(e){
        this.endurance = e;
    }

    this.getEndurance = function(e){
        return this.endurance;
    }

    this.setHit = function(hitPower){

        var endurance =  this.getEndurance();

        if(endurance){
            var result = endurance - hitPower;
            this.setEndurance(result);        
            var arrSpriteCords =  this.getSpriteByEndurance();

            if(this.endurance <= 750)
            {
                this.setSpriteX(arrSpriteCords[1][0]);
                this.setSpriteY(arrSpriteCords[1][1]);
            }
            if( this.endurance <= 500)
            {
                this.setSpriteX(arrSpriteCords[2][0]);
                this.setSpriteY(arrSpriteCords[2][1]);
            }
            if( this.endurance <= 250)
            {
                this.setSpriteX(arrSpriteCords[3][0]);
                this.setSpriteY(arrSpriteCords[3][1]);
            }

            if( this.endurance <= 0 )
            {
                return true;
            }
        }

        return false;


    }

    this.getSpriteByEndurance = function(){
        arrayOfCoordinates = [];
        if(this.typeTile == 1){
             arrayOfCoordinates = [[0,0],[32,0],[64,0],[96,0]];
        }
        if(this.typeTile == 3){
             arrayOfCoordinates = [[0,96],[32,96],[32,96],[32,96]];
        }
        return arrayOfCoordinates;
    }

    this.setX = function(x){
         
        this.x =  this.width*x;
    }

     this.setY = function(y){
       
        this.y =  this.height*y;
    }

    this.logicToApply = function(x,y){
        console.log(x+" ",y);
        console.log(this)
    }

    this.setSpriteX = function(x){
     
          this.canvasX = x ;
    }

    this.setSpriteY = function(y){
        
          this.canvasY = y ;
    }

    this.setTile = function(tileType){

        var x,y;
        switch(tileType){
            case 0:
                x = 128;
                y = 128;
            break;
            case 1:
                x = 0;
                y = 0;
            break;
            case 2:
                x = 64;
                y = 32;
            break;
            case 3:
                x = 0;
                y = 96;
            break;
            case 4:
                x = 96;
                y = 32;
            break;
          
        }
        this.spriteX = x ;
        this.spriteY = y;

        var sprite = new Sprite();
        sprite.constructor(this.width,this.height,this.spriteX,this.spriteY,'./assets/sprites/tileset1.png');
        this.sprite = sprite;
    }



}

Tile.prototype = new Entity();

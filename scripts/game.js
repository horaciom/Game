var Juego = function() {

  this.canvas;
  this.ctx;
  this.fpsDisplay;


  this.lastFrameTimeMs = 0;
  this.maxFPS = 60;
  this.delta = 0;
  this.timestep = 1000/60;
  this.fps = 60;
  this.framesThisSecond = 0;
  this.lastFpsUpdate = 0;
  this.running = false;
  this.started = false;
  this.frameID = 0;

  this.endGame = false;

  this.arrayOfEntities = [];
  this.entitiesToDelete = [];
  this.debugA;
  this.debugB;
  this.debugC;
  this.debugD;

  this.tank;
  this.map;
  this.enemy;

  this.pressKeyLeft = false;
  this.pressKeyRight= false;
  this.pressKeyTop  = false;
  this.pressKeyDown = false;
  this.pressKeySpace = false;


  this.constructor = function(canvasId,fpsDisplayId,debugA,debugB,debugC,debugD)
  {
    this.canvas = $("#"+canvasId)[0];
    this.canvas.width = 800;
    this.canvas.height = 640;
    this.ctx = this.canvas.getContext("2d");

    this.fpsDisplay = $("#"+fpsDisplayId);
    this.initEntities();
  }

  this.initEntities = function()
  {
    this.map = new Map();
    this.tank = new Tank();
    this.tank.constructor(this,300,600,'./assets/sprites/playertank.png',1,'top');
    this.map.constructor(this,'map-01.json');
    this.enemy = new Enemy(this,10, 10,'./assets/sprites/redtank.png',2,'bottom');

   


    this.arrayOfEntities.push(this.tank);
    this.arrayOfEntities.push(this.enemy);

    var tiles = this.map.arrTiles;
    for(var i=0;i < tiles.length; i++)
    {
      this.arrayOfEntities.push(tiles[i]);
    }
    
  }

 

  this.getEntitiesByType = function(type){
      function filterByType(value,type) {
         return value.type == type;
      }
      var filtered = this.arrayOfEntities.filter(function(element){
         return filterByType(element,type)
      });
      return filtered;
  }

  this.checkCollisionWithTile = function(entity) {
    // console.log(entity);
    var tiles = this.getEntitiesByType(0);
    for(var i=0;i < tiles.length; i++)
    {
      if(!tiles[i].allowWalk)
      {
        if(entity.collision(tiles[i]))
        {
          return tiles[i];
        }
      }
    }
    return;
  }

  this.endGame = function (){
   setTimeout(function(){
      this.stop();  
      return; 
   }.bind(this),1000);
  }

  this.deleteEntitiesFromGame = function()
  {
    var m=this.entitiesToDelete.length;
    if(m > 0){
      for(var i=0;i<m;i++)
      {
        var n=this.arrayOfEntities.length;
        for(var j=0;j<n;j++)
        {
          if(this.entitiesToDelete[i]==this.arrayOfEntities[j])
          {
            this.arrayOfEntities.splice(j,1);
            break;
          }
        }
      }
      this.entitiesToDelete=[];
    }
    return;
  }

  this.update = function(delta) {
    for(var i = 0; i < this.arrayOfEntities.length; i++) {
      if(typeof this.arrayOfEntities[i].move == 'function')
      {
        this.arrayOfEntities[i].move(delta);
      }
    }

    this.tank.setVelocityHorizontal(0);
    this.tank.setVelocityVertical(0);
    
    // if(this.checkCollisionWithTile(this.enemy)){
    //   console.log(this.checkCollisionWithTile(this.enemy) );
    //   this.enemy.autoMove();
    // }

    if(!this.pressKeyLeft && !this.pressKeyRight && !this.pressKeyDown && this.pressKeyTop)
    {
      this.tank.setOrientation('top');
      if(!this.checkCollisionWithTile(this.tank))
      {
        this.tank.setVelocityVertical(-this.tank.velocityOfmoving);
      }
    }else if(!this.pressKeyLeft && !this.pressKeyRight && !this.pressKeyTop && this.pressKeyDown)
    {
      this.tank.setOrientation('bottom');
      if(!this.checkCollisionWithTile(this.tank))
      {
        this.tank.setVelocityVertical(this.tank.velocityOfmoving);
      }
    }else if(this.pressKeyLeft && !this.pressKeyRight && !this.pressKeyTop && !this.pressKeyDown)
    {
      this.tank.setOrientation('left');
      if(!this.checkCollisionWithTile(this.tank))
      {
        this.tank.setVelocityHorizontal(-this.tank.velocityOfmoving);
      }
    }else if(!this.pressKeyLeft && !this.pressKeyTop && !this.pressKeyDown && this.pressKeyRight)
    {
      this.tank.setOrientation('right');
      if(!this.checkCollisionWithTile(this.tank))
      {
        this.tank.setVelocityHorizontal(this.tank.velocityOfmoving);
      }
    }

    if(this.pressKeySpace)
    {
      this.tank.tryShoot();
    }

    this.deleteEntitiesFromGame();
  }

  this.draw = function(interp) {
    for(var i = 0;  i < this.arrayOfEntities.length; i++) {
      this.arrayOfEntities[i].draw(this.ctx);
    }
    this.fpsDisplay.html( Math.round(this.fps) + ' FPS');
  }

  this.panic = function() {
    this.delta = 0;
  }

  this.stop = function() {
    this.running = false;
    this.started = false;
    cancelAnimationFrame(this.frameID);
  
  }

  this.start = function() {
    if(!this.started) {
      this.started = true;
      this.frameID = requestAnimationFrame(function(timestamp) {
        this.draw(1);
        this.running = true;
        this.lastFrameTimeMs = timestamp;
        this.lastFpsUpdate = timestamp;
        this.framesThisSecond = 0;
        this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
      }.bind(this));
    }
  }

  this.mainLoop = function(timestamp) {
    if(timestamp < this.lastFrameTimeMs +(1000 / this.maxFPS)) {
      this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
      return;
    }
    this.delta += timestamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timestamp;

    if(timestamp > this.lastFpsUpdate + 1000) {
      this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;
      this.lastFpsUpdate = timestamp;
      this.framesThisSecond = 0;
    }

    this.framesThisSecond++;
    var numUpdateSteps = 0;

    while(this.delta >= this.timestep) {
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
      this.update(this.timestep);
      this.delta -= this.timestep;
      if(++numUpdateSteps >= 240) {
        this.panic();
        break;
      }
    }
    this.draw(this.delta / this.timestep);
    this.frameID = requestAnimationFrame(this.mainLoop.bind(this)); 

    
 }

  this.keyDown = function(e)
  {
    e.preventDefault();
    if(e.keyCode === 38)
    {
      this.pressKeyTop = true;
    }else if(e.keyCode === 40)
    {
      this.pressKeyDown = true;
    }else if(e.keyCode === 37)
    {
      this.pressKeyLeft = true;
    }else if(e.keyCode === 39)
    {
      this.pressKeyRight = true;
    }

    if(e.keyCode === 32)
    {
      this.pressKeySpace = true;
    }

    if(e.keyCode === 13)
    {
      this.tank.x = 500;
      this.tank.y = 500;
    }
  }

  this.keyUp = function(e)
  {
    e.preventDefault();
    if(e.keyCode === 38)
    {
      this.pressKeyTop = false;
    }else if(e.keyCode === 40)
    {
      this.pressKeyDown = false;
    }else if(e.keyCode === 37)
    {
      this.pressKeyLeft = false;
    }else if(e.keyCode === 39)
    {
      this.pressKeyRight = false;
    }
    if(e.keyCode === 32)
    {
      this.pressKeySpace = false;
    }
  }

}

$(document).ready(function()
{
   var testGame = new Juego();
   testGame.constructor('game','fps','box-a','box-b','box-c','box-d');
   testGame.start();
   $(document).keydown(function(e)
   {
      testGame.keyDown(e);
   });

   $(document).keyup(function(e)
   {
      testGame.keyUp(e);
   });

   $("#stopGame").on('click',function(e)
   {
      e.preventDefault();
      testGame.stop();
   });
   $("#startGame").on('click',function(e)
   {
      e.preventDefault();
      testGame.start();
   });
});




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

  this.newGame = false;
  this.endGame = false;

  this.arrayOfEntities = [];
  this.entitiesToDelete = [];
  this.debugA;
  this.debugB;
  this.debugC;
  this.debugD;

  this.player;
  this.map;
  this.enemies = [];
  this.enemyCant = 1;
  this.spanEnemy = 1500;

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
   
  }

  this.initEntities = function()
  {
    this.map = new Map();
    this.player = new Player(this,300,600,'./assets/sprites/playertank.png',1,'top');


    this.map.constructor(this,'map-01.json');

    var mkEnemies = function(){
      if( this.running && this.started ){
        if(this.enemyCant > 0){
          
          var cord = function(){
              var pos = [[10,10],[740,10]];
              var rand = Math.round(Math.random()*pos.length);
              var x = pos[0][0];
              var y = pos[0][1];
              if(pos[rand] && pos[rand][0]){
                x = pos[rand][0];
              }
              if(pos[rand] && pos[rand][1]){
                y = pos[rand][1];
              }
              return {
                x:x,
                y:y
              }
          }

          var randCords = cord();
          var enemy = new Enemy(this, randCords.x, randCords.y,'./assets/sprites/redtank.png',2,'bottom');

          if(this.enemies.length > 0){
            if( this.gameCollision(enemy)){
              return;
            }
          }
          this.enemies.push(enemy);
          this.arrayOfEntities.push(enemy);
          this.enemyCant--;

        }else {
          clearInterval(makeEnemies);
        }
      }
    };
    
    var makeEnemies = setInterval(mkEnemies.bind(this), this.spanEnemy);
    setTimeout(mkEnemies.bind(this),100);

    var tiles = this.map.arrTiles;
    for(var i=0;i < tiles.length; ++i)
    {
      this.arrayOfEntities.push(tiles[i]);
    }

    this.arrayOfEntities.push(this.player);

  }

  this.filterEntities = function(key,vaL){
      function filterByType(value,type) {
         return value[key] == vaL;
      }
      var filtered = this.arrayOfEntities.filter(function(element){
         return filterByType(element,vaL)
      });
      return filtered;
  }

  this.gameCollision = function(entity){
    var entities = this.arrayOfEntities;
    for(var i = 0; i < entities.length; ++i){
        if(typeof entities[i].collision == 'function'){
           if(entities[i].collision(entity)){
              return true;
           }
        }
    }
  }

  this.checkCollision = function(entity) {
    var other = this.filterEntities("allowWalk",false);
    for(var i=0;i < other.length; ++i)
    {
      if( entity.id != other[i].id)
      {
        if(entity.collision(other[i]))
        {
        
          return other[i];
        }
      }
    }
    return false;
  }

  this.endGame = function (){
   setTimeout(function(){
      this.stop(); 
      console.log("GAME OVER"); 
      return; 
   }.bind(this),200);
  }

  this.deleteEntitiesFromGame = function()
  {
    var m=this.entitiesToDelete.length;
    if(m > 0){
      for(var i=0;i<m;++i)
      {
        var n=this.arrayOfEntities.length;
        for(var j=0;j<n;++j)
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
    this.deleteEntitiesFromGame();

    for(var i = 0; i < this.arrayOfEntities.length; ++i) {
      if(typeof this.arrayOfEntities[i].move == 'function')
      {
        this.arrayOfEntities[i].move(delta);
      }
    }

    this.player.keyPadEvents();

    for(var i = 0; i < this.enemies.length; ++i){
      this.enemies[i].autoMove();
    }

   
  }

  this.draw = function() {
    for(var i = 0;  i < this.arrayOfEntities.length; ++i) {
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
    if(!this.newGame){
      this.initEntities();
    }
    if(!this.started) {
      this.started = true;
      this.newGame = true;
      this.frameID = requestAnimationFrame(function(timestamp) {
        this.draw();
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
     this.start();
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

$(window).load(function()
{
   var testGame = new Juego();
   testGame.constructor('game','fps','box-a','box-b','box-c','box-d');
   
   console.log("press enter  to play");
    
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




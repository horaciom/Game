var Map = function (){
	this.fileRoot = './assets/maps/';
	this.map ;
	this.mapName;
	this.setTiles = [];
	this.arrTiles = [];
	this.game;


	this.constructor = function(game,map){
		this.game = game;
		this.mapName = map;
		this.getMap();
		this.arrayOfEntitiesTiles();
	}

	this.getMap = function(){
	    $.ajax({
	        type: 'GET',
	        url: this.fileRoot+this.mapName,
	        dataType: 'json',
	        context: this,
	        complete: function(response) {
	           this.map = eval('(' + response.responseText + ')');
	        },
	        async: false
	    });
	}

	this.arrayOfEntitiesTiles = function(){
		var map = this.map;
		var y = map.length;
		var x = map[0].length;
		for (var yi=0;yi<y;yi++)
		{
			for (var xi=0;xi<x;xi++)
			{	
				var nTile = new Tile();
				switch(map[yi][xi]){

					case 1://brick
					nTile.constructor(false,1,nTile.width*xi,nTile.height*yi,1000);
					this.arrTiles.push(nTile);
					break;
					case 2://grass
					nTile.constructor(true,2,nTile.width*xi,nTile.height*yi,1000);
					this.arrTiles.push(nTile);
					break;
					case 3://hawk
					nTile.constructor(false,3,nTile.width*xi,nTile.height*yi,1000);
					this.arrTiles.push(nTile);
					break;
					case 4://water
					nTile.constructor(false,4,nTile.width*xi,nTile.height*yi,0);
					this.arrTiles.push(nTile);
					break;

				}
			}
		}
	}

}
Map.prototype = new Entity();

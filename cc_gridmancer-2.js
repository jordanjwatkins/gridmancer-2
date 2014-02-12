/* Version Modified to Work with CodeCombat Environment */
var grid = new Gridmancer(this.getNavGrid().grid, this.addRect);
grid.run();

function Gridmancer(grid, addRect) {
	this.tileSize = 4;
	this.tiles = [];
	this.rects = 0;
	this.nextRectID = 0;
	this.nextTileID = 0;
	this.addRect = addRect;

	var tiles = [];
	var tile = [];
	for(var y = 0; y + this.tileSize < grid.length; y += this.tileSize) {
		for(var x = 0; x + this.tileSize < grid[0].length; x += this.tileSize) {
			var occupied = grid[y][x].length > 0;
			if(!occupied) {
				tile = [x/this.tileSize,y/this.tileSize];
				tiles.push(tile);
			}
		}
	}

	for	(var i=0; i < tiles.length; i++) {
		tile = {
			id: this.nextTileID,
			gridX : tiles[i][0],
			gridY : tiles[i][1],
			x : tiles[i][0] * this.tileSize,
			y : tiles[i][1] * this.tileSize
		};
		if (!this.tiles[tiles[i][1]]) {
			this.tiles[tiles[i][1]] = [];
		}
		this.tiles[tiles[i][1]][tiles[i][0]] = tile;
		this.nextTileID++;
	}

	this.run = function(){
		for (var i=0; i<this.tiles.length; i++) {
			for (var j=0; j<this.tiles[i].length; j++) {
				if (this.tiles[i][j]) {
					this.drawLine(j,i);
				}
			}
		}
	};

	this.getLineWidth = function(gridX,gridY) {
		var pos_width = 1;
		var neg_width = 0;
		var startGridX = gridX;
		while (1) {
			if (this.tiles[gridY][gridX] && this.tiles[gridY][gridX+1]) {
				if (this.tiles[gridY][gridX+1].gridX !== this.tiles[gridY][gridX].gridX+1) {
					break;
				}
			} else {
				break;
			}
			pos_width++;
			gridX++;
		}
		gridX = startGridX;
		while (1) {
			if (this.tiles[gridY][gridX] && this.tiles[gridY][gridX-1]) {
				if (this.tiles[gridY][gridX-1].gridX !== this.tiles[gridY][gridX].gridX-1) {
					break;
				}
			} else {
				break;
			}
			neg_width++;
			gridX++;
		}
		return (this.tiles[gridY][startGridX]) ? pos_width + neg_width : false;
	};

	this.getLineHeight = function(gridX,gridY) {
		if (this.tiles[gridY+1]) {
			var height = 1;
			while (this.getLineWidth(gridX,gridY) === this.getLineWidth(gridX,gridY+1)) {
				height++;
				gridY++;
			}
			return height;
		} else {
			return 1;
		}
	};

	this.drawLine = function(gridX,gridY){
		var width = this.getLineWidth(gridX,gridY);
		var height = this.getLineHeight(gridX,gridY);
		this.disableTiles(gridX,gridY,width,height);
		this.rects++;
		this.addRect(gridX * this.tileSize + width * this.tileSize / 2, gridY * this.tileSize + height * this.tileSize / 2, width * this.tileSize, height * this.tileSize);
	};

	this.disableTiles = function(gridX,gridY,width,height) {
		for (i=0;i<width;i++) {
			for (j=0;j<height;j++) {
				this.tiles[gridY+j][gridX+i] = undefined;
			}
		}
	};
}
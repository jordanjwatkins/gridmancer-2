function Gridmancer(tiles) {
	this.tileSize = 40;
	this.tiles = [];
	this.rects = 0;
	this.nextRectID = 0;
	this.currentTile = 0;

	for (var i=0; i < tiles.length; i++) {
		var tile = {
			gridX : tiles[i][0],
			gridY : tiles[i][1],
		};
		if (!this.tiles[tiles[i][1]]) {
			this.tiles[tiles[i][1]] = [];
		}
		this.tiles[tiles[i][1]][tiles[i][0]] = tile;
	}

	this.run = function() {
		for (var i=0; i<this.tiles.length; i++) {
			for (var j=0; j<this.tiles[i].length; j++) {
				if (this.tiles[i][j]){
					this.drawLine(j,i);
				}
			}
		}
	}

	this.getLineWidth = function(gridX,gridY) {
		return (this.tiles[gridY][gridX]) ? this.widthSeg('right', gridX, gridY) + this.widthSeg('left', gridX, gridY) : false;
	};

	this.widthSeg = function(direction, gridX, gridY) {
		direction =  direction || 'right';
		var width = (direction == 'right') ? 1 : 0;
		var next = (direction == 'right') ? 1 : -1;
		while (1) {
			if (this.tiles[gridY][gridX] && this.tiles[gridY][gridX+next]) {
				if (this.tiles[gridY][gridX+next].gridX !== this.tiles[gridY][gridX].gridX+next) {
					break;
				}
			} else {
				break;
			}
			width++;
			gridX++;
		}
		return width;
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
		var $rect = $('<div class="rect" id="rect-'+this.nextRectID+'">');
		$rect.css({left: gridX * this.tileSize, top: gridY * this.tileSize, width: width * this.tileSize, height: height * this.tileSize});
		$('#grid').append($rect);
	};

	this.disableTiles = function(gridX,gridY,width,height) {
		for (i=0;i<width;i++) {
			for (j=0;j<height;j++) {
				this.tiles[gridY+j][gridX+i] = undefined;
			}
		}
	};
}
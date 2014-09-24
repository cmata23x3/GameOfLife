/**
* DOM Graph class. The view of the Game of Life. 
*
* @param {Integer} size Integer of the size of the board
* @return {Object} Returns GraphView Object instance
*/
var DOMView = function(controller, size){
	var that = Object.create(DOMView.prototype);

    var table = $('<table/>', {
	        id: 'board'
	});

    $('#main_container').append(table);

	/**
	* Function takes the coordinates of a cell and fills it using
	* jQuery css changes.
	*  
	* @method fillCell
	* @param {Integer} x x-coordinate of the cell that was selected
	* @param {Integer} y y-coordinate of the cell that was selected
	*/
    that.fillCell = function(x,y){
    	var id = "#" + x + "\\," + y;
    	$(id).removeClass("cell-empty").addClass("cell-alive");
    }

	/**
	* Function takes the coordinates of a cell and fills it using
	* jQuery css changes.
	*  
	* @method emptyCell
	* @param {Integer} x x-coordinate of the cell that was selected
	* @param {Integer} y y-coordinate of the cell that was selected
	*/
    that.emptyCell = function(x,y){
    	var id = "#" + x + "\\," + y;
    	$(id).removeClass("cell-alive").addClass("cell-empty");
    }

	/**
	* Function is used to render the Game of Life onto the HTML.
	* Function uses jQuery to create table row and table data DOMs.
	*  
	* @method initialize
	*/
	that.initialize = function(){
        var squareSize = 400/size; //Compute the size of each square
        for(var i=0; i<size; i+=1){
            var row = $('<tr/>', {
	        	class: 'board-row',
	        	height: squareSize
			});

            for(var j=0; j<size; j+=1){
            	var cell = $('<td/>', {
                	id: i + "," + j,
	        		class: 'cell  cell-empty',
	        		height: squareSize,
	        		width: squareSize,
	        		click: function(){
	        			//emit event 
	        			var params = event.target.id.parseCoordinates();
	        			controller.handleEvent(params, function(status){
	        				status ? that.fillCell(params.x, params.y) : that.emptyCell(params.x, params.y);
	        			});
	        		}
				}); 
                $(row).append(cell);
            }
            $(table).append(row);
        }
	}

	/**
	* Function is to refill the board colors to reflect the current
	* state of the Game of Life.
	*
	* @method refill
	* @param {Array} set Snapshot of the model
	*/
	that.refill = function(set){
		//Iterate in nested loop to create the board
		for (var i = 0; i < size; i += 1) {
			for (var j = 0; j < size; j += 1) {
				set[i][j] ? that.fillCell(i, j) : that.emptyCell(i, j);
			}
		}

	}

	return that;
}
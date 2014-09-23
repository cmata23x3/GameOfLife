/**
* DOM Graph class. The view of the Game of Life. 
*
* @param {Integer} size Integer of the size of the board
* @return {Object} Returns GraphView Object instance
*/
var DOMView = function(size){
	var that = Object.create(DOMView.prototype);
	//Create colors
	var black = Color(0,0,0);
	var white = Color(255,255,255);
	var grey = Color(150,150,150);

    var table = $('<table/>', {
	        id: 'board'
	});

    $('#main_container').append(table);

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
	        		class: 'cell',
	        		height: squareSize,
	        		width: squareSize
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

	}

	return that;
}
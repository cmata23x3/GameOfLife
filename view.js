/**
* Graph class. The view of the Game of Life. 
*
* @param {Integer} size Integer of the size of the board
* @return {Object} Returns GraphView Object instance
*/
var GraphView = function(size){
	//Create colors
	var black = Color(0,0,0);
	var white = Color(255,255,255);
	var grey = Color(150,150,150);

	// create the drawing pad object and associate with the canvas
	var pad = Pad(document.getElementById('canvas'));
	pad.clear();

	//Initialize some constants for use in creating the board
	var LINE_WIDTH = 0.5;
	var x_factor = pad.get_width() / size;
	var y_factor = pad.get_height() / size;

	return {
		/**
		* Function is used to render the Game of Life onto the HTML.
		*
		* @method render
		* @param {Array} board Snapshot of the next graph state
		* @return {} Returns true on success
		*/
		render: function(set){
			console.log("Rendering", board);
			//remove the previous board
			pad.clear();

			//Iterate in nested loop to create the board
			for (var i = 0; i < size; i += 1) {
				for (var j = 0; j < size; j += 1) {
					var fill = (set[j][i]) ? black : white;
					pad.draw_rectangle(Coord(i*x_factor, j*y_factor),
						x_factor, y_factor, LINE_WIDTH, grey, fill);
				}
			}
		}
	}
} 
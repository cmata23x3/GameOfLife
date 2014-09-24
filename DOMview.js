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

	var color = ['black', 'white'];

	//Create some buttons to add to the html
	var handleButton = $('<button/>', {
				        text: 'Pause',
				        id: 'handle',
				        class: 'btn btn-default',
				        click: function () { 
				        	if(controller.getState() === 1){
				        		controller.removeInterval();
				        		handleButton.html("Resume");
				        	}
				        	else if (controller.getState() === 0){
				        		controller.addInterval();
				        		handleButton.html("Pause");
				        	}
				        	else{
				        		//do nothing
				        	}
				        }, 
				        disabled: true
				    });

	var randomButton = $('<button/>', {
			        text: 'Randomize',
			        id: 'random',
			        class: 'btn btn-default',
			        click: function () { 
			        	controller.randomize();
			        }
			    });

	var startButton = $('<button/>', {
					text: 'Start',
					id: 'start',
					class: 'btn btn-default',
					click: function(){
						$(handleButton).prop('disabled', false);
						handleButton.html("Pause");
						controller.run();
					}
					});	

	var label = $('<label/>',{
		text: "Animation Speed Slider",
		id: "slider-label"
	});

	var slide = $('<div/>', {
		id: "slide"
	});

	$('#controls').append([startButton, randomButton, handleButton, label, slide]);

	$( "#slide" ).slider({
		max: 600, 
		min: 50, 
		slide: function(event, ui){
			if(controller.getState() === 1){
        		controller.removeInterval();
        		controller.setIntervalTime(Math.abs(ui.value-550));
        		controller.addInterval();
        		handleButton.html("Pause");
        	}
        	else if(controller.getState() === 0){
        		controller.setIntervalTime(Math.abs(ui.value-550));
        	}
		}
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
    	$(id).css('background-color', color[0]);
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
    	$(id).css('background-color', color[1]);
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
	        			var params = parseCoordinates(event.target.id);
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
		color = randomColor();
		for (var i = 0; i < size; i += 1) {
			for (var j = 0; j < size; j += 1) {
				set[i][j] ? that.fillCell(i, j, color[0]) : that.emptyCell(i, j, color[1]);
			}
		}
	}
	return that;
}

/**
* Helper function is to parse the coordinates from the HTML/CSS
* id of a cell. 
*
* @method parseCoordinates
* @param {String} id String id of the cell
* @return {Object} Returns object that has the Integer representation
* of each of the cell coordinates.
*/
parseCoordinates = function(id){
    var arr = id.split(",");
    var coords = arr.map(parseInt);
    return {x: coords[0] , y: coords[1]}
}

/**
* Helper method to choose the random colors using HSL.
* 
* @method randomColor
* @return Returns an array of color strings	.
*/

randomColor = function(){
	var hue = Math.floor(Math.random()*360);

	var color1 = 'hsl('+hue+',100%,40%)';
	var color2 = 'hsl('+hue+',100%,95%)';

    return [color1, color2];
}
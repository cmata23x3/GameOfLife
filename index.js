/**
* Overall Controller class for the entire game of life. This
* controller initializes and manages the view and model objects.
*
* @return {Object} Returns GameController object
*/
var GameController = function(){
	BOARD_SIZE = 20;
	//Initialize the prototype
	var that = Object.create(GameController.prototype);
	//Create an instance of the model & of the view
	var board = BoardModel(BOARD_SIZE);
	// var graph = GraphView(BOARD_SIZE);
	// var DOMgraph = DOMView(that, BOARD_SIZE);
	//Create an interval variable
	var interval = {};
	var state = 0;

	//Create some buttons to add to the html
	var handleButton = $('<button/>', {
				        text: 'Pause',
				        id: 'handle',
				        class: 'btn btn-default',
				        click: function () { 
				        	if(that.getState() === 1){
				        		that.removeInterval();
				        		handleButton.html("Resume");
				        	}
				        	else if (that.getState() === 0){
				        		that.addInterval();
				        		handleButton.html("Pause");
				        	}
				        	else{
				        		//do nothing
				        	}
				        }, 
				        disabled: true
				    });

	// var startButton = $('<button/>', {
	// 		        text: 'Randomize & Start',
	// 		        id: 'random',
	// 		        class: 'btn btn-default',
	// 		        disabled: true,
	// 		        click: function () { 
	// 		        	handleButton.prop('disabled', false);
	// 		        	that.runRandom(); 
	// 		        }
	// 		    });

	var startButton = $('<button/>', {
					text: 'Start',
					id: 'start',
					class: 'btn btn-default',
					click: function(){
						handleButton.prop('disabled', false);
						that.run();
					}
					});	

	$('#controls').append([startButton, handleButton]);

	//render the empty board
	// graph.render();
	// DOMgraph.initialize();

	/*
	* Method is called when to get the state of the game, whether running or paused.
	*
	* @method getState
	* @return {Integer} Returns the integer corresponding to the state of the game.
	*/
	that.getState = function(){
		return state;
	}

	/* 
	* Method is called when the state variable would like be reassigned. 
	* 
	* @method setState
	* @param {Integer} newState the new value that the state should be set to
	*/ 
	that.setState =function(newState){
		state = newState;
	}

	/*
	* Method is called when the user would like to pause the state of 
	* the board. Method takes the interval instance and clears it.
	*
	* @method removeInterval
	*/
	that.removeInterval = function(){
		that.setState(0);
		clearInterval(interval);
	}

	// /*
	// * Method is called when the user click's to start the random interval.
	// *
	// * @method addRandomInterval
	// */
	// that.addInterval = function(){
	// 	that.setState(1);
	// 	// set Interval & render
	// 	interval = setInterval(function(){
	// 		board.setBoard(board.step());
	// 		graph.render(board.getSet());
	// 	}, 350);
	// }

	/*
	* Method is called when the user click's to start button. Adds
	* setInterval and calls refill button.
	* 
	* @method addInterval
	*/
	that.addInterval = function(){
		that.setState(1);
		// set Interval & render
		interval = setInterval(function(){
			board.setBoard(board.step());
			DOMgraph.refill(board.getSet());
		}, 350);
	}

	/*
	* Method is called when a mouse event occurs. The method is called
	* by the view and passed to the controller. Controller will then forward to the model.
	*
	* @method handleEvent
	* @param {Object} params an object instance that will pass criteria from the event to the controller
	* @param {Function} callback method that is called once the change to the model
	*/
	that.handleEvent = function(params, callback){
		var status = board.toggleCell(params.x, params.y);
		callback(status);
	}

	// /** OLD CODE: 1.1
	// * Method is called once to randomize and render the board. It also
	// * sets the interval so the game will be played.
	// *
	// * @method runRandom
	// */
	// that.run = function(){
	// 	board.setBoard(board.randomizeBoard());

	// 	//Render initial random set
	// 	graph.render(board.getSet());

	// 	//Remove the previous Interval (if any)
	// 	that.removeInterval();

	// 	//Set interval & render
	// 	that.addInterval();
	// 	handleButton.html("Pause");
	// }

	/* Method is called once to start the board. It also
	* sets the interval so the game will be played.
	*
	* @method runRandom
	*/
	that.run = function(){
		//fill the board to make sure
		DOMgraph.refill(board.getSet());

		//Remove the previous Interval (if any)
		that.removeInterval();

		//Set interval & render
		that.addInterval();
		handleButton.html("Pause");
	}

	var DOMgraph = DOMView(that, BOARD_SIZE);
	DOMgraph.initialize();

	return that;
};

/**
* Anonymous function that initializes the controller.
*/
(function () {
	var controller = GameController();
	}) ()
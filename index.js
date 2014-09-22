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
	var graph = GraphView(BOARD_SIZE);
	//Create an interval variable
	var interval = {};

	//render the empty board
	graph.render();

	/*
	* Method is called when the user would like to pause the state of 
	* the board. Method takes the interval instance and clears it.
	*
	* @method pause
	*/
	that.removeInterval = function(){
		clearInterval(interval);
	}

	/*
	* Method is called when the user would like to pause the state of 
	* the board. Method takes the interval instance and clears it.
	*
	* @method pause
	*/
	that.addInterval = function(){
		// set Interval & render
		interval = setInterval(function(){
			board.setBoard(board.step());
			graph.render(board.getSet());
		}, 400);
	}

	/**
	* Method is called once to randomize and render the board. It also
	* sets the interval so the game will be played.
	*
	* @method run
	*/
	that.run = function(){
		board.setBoard(board.randomizeBoard());

		//Render initial random set
		graph.render(board.getSet());

		//Remove the previous Interval (if any)
		that.removeInterval();

		//Set interval & render
		that.addInterval();
	}

	return that;
}

/**
* jQuery click listener. Calls run() when Start button is clicked.
*/
$( "#start" ).click(function() {
	controller.run();
});

/**
* Anonymous function that initializes the controller.
*/
(function () {
	controller = GameController();
	}) ()
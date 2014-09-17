/**
* Overall Controller class for the entire game of life. This
* controller initializes and manages the view and model objects.
*
* @return {Object} Returns GameController object
*/
var GameController = function(){
	var BOARD_SIZE = 20;
	//Create an instance of the model & of the view
	var board = BoardModel(BOARD_SIZE);
	var graph = GraphView(BOARD_SIZE);

	//render the empty board
	graph.render();
	return {
		/**
		* Method is called once to randomize and render the board. It also
		* sets the interval so the game will be played.
		*
		* @method run
		*/
		run: function(){
			board.setBoard(board.randomizeBoard());

			//Render initial random set
			graph.render(board.getSet());

			// set Interval & render
			setInterval(function(){
				board.setBoard(board.step());
				graph.render(board.getSet());
			},400);
		}
	}
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
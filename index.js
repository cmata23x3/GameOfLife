/**
* Anonymous function that works as the main method controller.
*
*/
(function () {
	var BOARD_SIZE = 6;
	console.log("Running the main method");
	//Create an instance of the model
	board = BoardModel(BOARD_SIZE);
	board.setBoard([[0,1,0,0,1,0],
					[1,0,0,1,0,1],
					[0,0,0,0,0,0],
					[0,1,1,1,0,0],
					[0,1,0,1,0,0],
					[0,1,1,1,0,0]]);

	//Create a instance of the Graph
	var graph = GraphView(BOARD_SIZE);

	//Set Initial design
	graph.render(board.getSet());

	// set Interval
	setInterval(function(){
		board.setBoard(board.step());
		graph.render(board.getSet());
	},300);

	}) ()

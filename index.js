/**
* Anonymous function that works as the main method controller.
*
*/
(function () {
	var BOARD_SIZE = 30;
	console.log("Running the main method");
	//Create an instance of the model
	board = BoardModel(BOARD_SIZE);

	//Create a instance of the Graph
	var graph = GraphView(BOARD_SIZE);

	graph.render();

	//set Interval
	setInterval(function(){
		// console.log("interval");
		board.step();
		// graph.render(board.getSet());
	},300);

	}) ()

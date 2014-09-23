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
	var DOMgraph = DOMView(BOARD_SIZE);
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

	var startButton = $('<button/>', {
			        text: 'Randomize & Start',
			        id: 'start',
			        class: 'btn btn-default',
			        click: function () { 
			        	handleButton.prop('disabled', false)
			        	that.run(); 
			        }
			    });

	$('#controls').append([startButton, handleButton]);

	//render the empty board
	graph.render();
	DOMgraph.initialize();

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
	* @method pause
	*/
	that.removeInterval = function(){
		that.setState(0);
		clearInterval(interval);
	}

	/*
	* Method is called when the user would like to pause the state of 
	* the board. Method takes the interval instance and clears it.
	*
	* @method pause
	*/
	that.addInterval = function(){
		that.setState(1);
		// set Interval & render
		interval = setInterval(function(){
			board.setBoard(board.step());
			graph.render(board.getSet());
		}, 350);
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
		handleButton.html("Pause");
	}
	return that;
};

/**
* Anonymous function that initializes the controller.
*/
(function () {
	var controller = GameController();
	}) ()
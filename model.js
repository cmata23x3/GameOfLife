/**
* BoardModel is a constructor of the model that runs behind the 
* game of life. The constructor takes a size param and initializes
* the data structure storing the board.
*
* @method BoardModel
* @param {Integer} size Size of the board that will be used in the game.
* @return {Object} Returns BoardModel Object instance
*/
var BoardModel = function(size){
	var set = [];

	//Iterate through and create an array of arrays data structure
	for(var i=0; i<size; i+=1){
		var arr = [];
		for(var j=0; j<size; j+=1){
			arr.push(0);
		}
		set.push(arr);
	}

	return{

		step: function(){ 
			console.log("step!");

		},

		getSet: function(){
			return set; //could this have issues?
		},

		setBoard: function(name){
			//uses name to set the initial state.
			return true;
		}
	}
}

/**
* Private method _checkStatus takes the current board set, and x and y coordinates
* and determines if the cell will be alive or dead on the next step.
*
* @method _checkStatus
* @param {Array} set Array of arrays of the current board
* @param {Integer} x Integer that corresponds to the x coordinate of the cell
* @param {Integer} y Integer that corresponds to the y coordinate of the cell
	* @return {boolean} Returns boolean when complete
*/
_checkStatus = function(set, x, y){
	//if alive
		//<2 neighbors = dies
		//2||3 neighbors = lives
		//>3 neighbors = dies
	//dead
		//if 3 neighbors = lives
	//First step, determine if alive or dead.
	var status = set[x][y]; // 1 = alive; 0 = dead
	var liveNeighbors = _checkNeighbors(set, x, y);
	if(status){
		console.log('Cell at ', x, y, ' is currently alive!');
		if( (liveNeighbors < 2) || (liveNeighbors>3) ){
			console.log('Died because of ', liveNeighbors, " neighbors.");
			return 0;
		}
		else{
			console.log('Lives on because of having only ', liveNeighbors, " neighbors.");
			return 1;
		}
	}
	else{
		console.log('Cell at ', x, y, 'currently, dead!');
		if(liveNeighbors == 3){
			console.log('Lives because of exactly ', liveNeighbors, " neighbors.");
			return 1;
		}
		else{
			console.log('Remains dead because of having only ', liveNeighbors, " neighbors.");
			return 0;
		}
	}

}

_checkNeighbors = function(set, x, y){
	//Go though and check the neighbors.
	//get max length
	var max = set.length-1;
	//initialize the counter
	var count = 0;
	for(var i = -1; i<=1; i+=1){
		for(var j = -1; j<=1; j+=1){
			var neighborX = x + i;
			var neighborY = y + j; 
			if( !(neighborX<0 || neighborY<0 || neighborX>max || neighborY>max)){//check that its a valid cell on the board
				if(!(i==0 && j==0)){//get status and increment or decrement appropriately
					count += set[neighborX][neighborY];
				}
			}
		}
	}
	return count;
}
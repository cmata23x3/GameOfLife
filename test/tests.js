test("testing Board", function() {
	var board = BoardModel(5);
	var set = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	equal( board.getSet().length, set.length, 'Same Column Length');
	equal(board.getSet()[0].length, set[0].length, 'Same Row Length');

});

test("testing _checkNeighbors", function() {
	var set = [[0,1,0,0,1,0],
				[1,0,0,1,0,1],
				[0,0,0,0,0,0],
				[0,1,1,1,0,0],
				[0,1,0,1,0,0],
				[0,1,1,1,0,0]];
	equal(_checkNeighbors(set, 0, 0), 2, "Cell @ (0,0)");
	equal(_checkNeighbors(set, 0, 5), 2, "Cell @ (0,5)");
	equal(_checkNeighbors(set, 2, 2), 4, "Cell @ (2,2)");
	equal(_checkNeighbors(set, 2, 4), 3, "Cell @ (2,4)");
	equal(_checkNeighbors(set, 4, 2), 8, "Cell @ (4,2)");
	equal(_checkNeighbors(set, 4, 5), 0, "Cell @ (4,5)");
});

test("testing _checkStatus", function(){
	var set = [[0,1,0,0,1,0],
			[1,0,0,1,0,1],
			[0,0,0,0,0,0],
			[0,1,1,1,0,0],
			[0,1,0,1,0,0],
			[0,1,1,1,0,0]];
	equal(_checkStatus(set, 0, 1), 0, "Cell @ (0,1) is dead because of underpopulation");
	equal(_checkStatus(set, 0, 4), 1, "Cell @ (0,4) is survives");
	equal(_checkStatus(set, 4, 1), 0, "Cell @ (4,1) is dead because of overpopulation");
	equal(_checkStatus(set, 2, 4), 1, "Cell @ (2,4) is now alive");
	equal(_checkStatus(set, 4, 5), 0, "Cell @ (4,5) is still dead");
});

test("testing step", function(){
	var board = BoardModel(6); 
	var set = [[0,1,0,0,1,0],
			[1,0,0,1,0,1],
			[0,0,0,0,0,0],
			[0,1,1,1,0,0],
			[0,1,0,1,0,0],
			[0,1,1,1,0,0]];
	board.setBoard(set);
	var step = [[0,0,0,0,1,0],
				[0,0,0,0,1,0],
				[0,1,0,1,1,0],
				[0,1,0,1,0,0],
				[1,0,0,0,1,0],
				[0,1,0,1,0,0]];
	var results = board.step();
	console.log(results);
	equal(1, 1, "Practice step"); //had to check visually
});










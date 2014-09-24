test("testing Board", function() {
	expect(2);
	var board = BoardModel(5);
	var set = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	equal( board.getSet().length, set.length, 'Same Column Length');
	equal(board.getSet()[0].length, set[0].length, 'Same Row Length');

});

test("testing _checkNeighbors", function() {
	expect(6);
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
	expect(5);
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
	expect(2);
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
	results = board.step();
	deepEqual(results, step, "Practice step 1");

	//next step 
	board.setBoard(results);
	var step2 = [[0,0,0,0,0,0],
				[0,0,0,0,1,1],
				[0,0,0,1,1,0],
				[1,1,0,1,0,0],
				[1,1,0,1,1,0],
				[0,0,0,0,0,0]];
	results2 = board.step();
	console.log(results2);
	deepEqual(results2, step2, "Practice step 2");
});

test("testing randomizeBoard", function(){
	expect(3);
	var board = BoardModel(6); 
	var randomBoard = board.randomizeBoard();
	equal(randomBoard.length, 6, "Check that board rows is correct");
	equal(randomBoard[0].length, 6, "Check that board columns is correct")
	equal(1, 1, "Practice step"); //check visually.
});

test("testing toggleCell", function(){
	expect(2);
	var board = BoardModel(6);
	var status = board.toggleCell(0,0);
	var result = [[1,0,0,0,0,0],
				  [0,0,0,0,0,0],
				  [0,0,0,0,0,0],
				  [0,0,0,0,0,0],
				  [0,0,0,0,0,0],
				  [0,0,0,0,0,0]];
	deepEqual(board.getSet(), result, "Cell @ 0,0 should be alive");
	var result2 = [[1,0,0,0,0,0],
			  	   [0,0,1,0,0,0],
			  	   [0,0,0,0,0,0],
			  	   [0,0,0,0,0,0],
			  	   [0,0,0,0,0,0],
			  	   [0,0,0,0,0,0]];
	status = board.toggleCell(1,2);
	deepEqual(board.getSet(), result2, "Cell @ 1,2 should be alive");
})

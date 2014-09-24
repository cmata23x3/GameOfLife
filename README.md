6.170 Project 1: Conway's Game of Life
=====
*Christian Mata*

For the first project in 6.170, Conway's Game of Life was assigned. In this implementation, the Rules were taken from Wikipedia's article. This implementation chose to follow a typical Model-View-Controller paradigm. There are three main Javascript files, *index.js*, which has the controller code and the main function, *model.js*, which has the board model, and *view.js*, which has the graph view logic. This paradigm was followed to give the program a certain level of abstraction and modularity as well as to prevent tightly coupling the logic. As predicted, the abstraction from the previous submission allowed me to quickly make changes and implement the DOM requirements. Also, in the project jQuery and Bootstrap are utilized as well as functional methods defined in lecture. Only a few minor changes were made to the model.js class and some changes were made to the controller class. 

###Rules

1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

(Source: [ Wikipedia Conway's Game of Life])

##Instructions
1. Open the index.html file in Chrome. 
2. Click on individual cells to toggle their status or click the 'Randomize' button to populate the field. 
3. Click the 'Start' button to begin the Game. 
4. Optionally, click the 'Pause' button to pause the game.
5. Optionally, use the slider to choose the animation speed of the game.

##Programming

###Highlights
One of the main objectives on this part of the project was the use of DOM elements. For my project, I decided to use a HTML table and then use jQuery to quickly create the table rows and table data entries. Each had a unique id that would be used to identify it to the model when clicks were made. 

The next major highlight in the code is the use of callbacks to register events from the view into the model. As said before, the model and its data structure were abstracted and made modular from the view, so when the view was changed, very few changes were needed to be made to the model. The controller was now passed to the view as a param. This allowed the view to call controller methods to change, which then made the appropriate changes to the model. Once the changes were done and not before the data structure was updated, a view callback is called and the view is then updated to reflect the change. This is to prevent cases where the view is updated, but that the model doesn't reflect the change. [DOMview.js Line 137]

The additional changes functionality that I added to the game are the changing colors for the dead cells and the living cells and the animation speed slider. This was done by using Javascript random function and creating two HSL color strings to apply on each iteration of the board. Using jQuery UI, I implemented a slider that would control the animation speed of the game. Using jQuery event listeners, when the slider is moving the setTimeInterval() method is called and addInterval() is called to begin the animation again. 

##Design 
###Coding Challenges
####1. Model-View-Controller Communication
One of the major challenges that I experienced was decide how exactly would the three components interact. I wanted to maintain the modularity between the model and view, but I needed to ensure that the model updated when the view was changed. I could have broken the modularity and made the model a parameter of the view and allowed the view to directly edit the model or I could have the controller handle the events and make the appropriate calls to the model. I decided on the latter. I followed the implementation used by Backbone.js. In Backbone.js, the views are required to have a model, but the models know nothing of the views that use their data, which is the kind of seperation of parts that I wanted. In order to implement this, I simply added a few methods to the controller, a callback in the view and a data structure setter method in the model.

####2. View Options
For the View, we were required to use a DOM element (other than a Canvas) to display the Game of Life. For this one, I could use divs that I would have to apply CSS styling to maintain or use a HTML table and use the tds are the cells in the game. This one was a simple choice. I used the table because it lends itself well to the game and provided some functionality such as borders and already had implemented HTML fields like 'tr' and 'td'.

##Previous README Proj. 1.1

###Highlights
One of the main objectives of this project was to practice using functional programming and closures. Throughout the development of the Game of Life, functional programming format was implemented and utilized. In [index.js Line 47], there is a good example of functional programming and the use of anonymous functions to start the entire game of life. 

Furthermore, another good example of functional programming and use of closures can be found in the *model.js* while creating the BoardModel object. Starting on [model.js Line 22] and continuing forward, the BoardModel constructor function returns a BoardModel object that has functions that utilize closures to manage the scope that they are called in. 

A final highlight would be the overall implementation MVC implementation. The project was easily broken down into three modules of the MVC paradigm. The use of abstraction simplified the board model into a single class with only four public methods, the view class and the controller class each only had a single public method.

##Design 
###Coding Challenges
####1. Game of Life Time Display: 
One of the main challenges of the Game of Life project is choosing the a good way to handle generations. One possible choice is to have two board instances, 'current' and 'next'. In this case, the 'current' would be displayed and then the 'next' would be generated by applying the rules to the 'current'. Once, 'next' is created, it would be set as 'current' and then drawn. 
Another option would be to use one data structure to handle the game of life and then use functions to modify the state and apply it using closures.

In the end, I chose to do a combination of the two options. I chose to make a function that was use a closure to the current set and then applied the rules to the set to generate the new board. Then using a setter method, I reassigned the set to the newly generated set.

####2. Graphical Interface: 
With the assignment, we're given flexibility in deciding which form to graphically display Conway's Game of Life. From other projects, I could use a more complex Javascript library that would present the material better, such as D3.js or two.js, but that would be more work than required. At this point, I think displaying good design and use of functional programming would be the priority, which would explain why a simple graphics library was provided. A third option to consider would be to use a DOM, such as a HTML table, display that could preemptively plan for the second phase of the assignment.

In the end, I chose to use the graphics package that was provided. This allows me to focus on developing the Game of Life code and also provides practice with working within some given code base. 

####3. Board Data Structure: 
To hold the cell statuses, I had the option of using either an array of arrays or an object with objects to represent each of the cells. 

For this project in general, the grid layout lends itself well to the array of arrays data structure. Also when using nested for loops, indexing into the data structure is simplified ([See view.js Line 42]).

[ Wikipedia Conway's Game of Life]:http://en.wikipedia.org/wiki/Conway's_Game_of_Life
[DOMview.js Line 137]:https://github.com/6170-fa14/cmata_proj1/blob/master/DOMview.js#L137

[index.js Line 47]: https://github.com/6170-fa14/cmata_proj1/blob/master/index.js#L47
[model.js Line 22]: https://github.com/6170-fa14/cmata_proj1/blob/master/model.js#L22
[See view.js Line 42]:https://github.com/6170-fa14/cmata_proj1/blob/master/view.js#L42
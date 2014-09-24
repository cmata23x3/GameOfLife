// Functional to call a function on every element of an array.
Array.prototype.foreach = function(f) {
    for (var i = 0; i < this.length; ++i) {
        f(this[i]);
    }
};

// Functional to produce a new array, keeping only the elements of the original that pass a test.
Array.prototype.filter = function(f) {
    var output = [];

    for (var i = 0; i < this.length; ++i) {
        if (f(this[i])) {
            output.push(this[i]);
        }
    }

    return output;
};

// Another classic functional: build a new array, with elements determined by applying a function to each old element.
Array.prototype.map = function(f) {
    var output = [];

    for (var i = 0; i < this.length; ++i) {
        output.push(f(this[i]));
    }

    return output;
}

// A third classic functional: iterating application of a function over all elements of an array, accumulating a summary.
Array.prototype.reduce = function(f, acc) {
    for (var i = 0; i < this.length; ++i) {
        acc = f(this[i], acc);
    }

    return acc;
}

String.prototype.parseCoordinates = function(){
    var arr = this.split(",");
    var coords = arr.map(parseInt);
    return {x: coords[0] , y: coords[1]}
}
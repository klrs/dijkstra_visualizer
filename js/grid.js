function Grid(width, height, sideLength) {

  //square length
  this.sideLength = sideLength;

  //grid width in squares! not pixels
  this.width = width;

  //grid height in squares! not pixels
  this.height = height;

  //border between squares
  this.border = 1;

  //square arr to hold all squares
  this.squares = [];

  this.startPointIndex = null;
  this.endPointIndex = null;

  this.initSquares();
}

Grid.prototype.initSquares = function(){
  this.squares = [];
  let i = 0, x = 0, y = 0;

  for(y = 0; y < this.height; y++){
    for(x = 0; x < this.width; x++) {
      this.squares[i] = new Square(this.sideLength, i, x, y);
      this.squares[i].draw();
      i++;
    }
  }
};

Grid.prototype.reset = function() {
  this.startPointIndex = null;
  this.endPointIndex = null;

  this.initSquares();
};

Grid.prototype.draw = function() {
  this.squares.forEach(function(item) {
    item.draw();
  })
};

Grid.prototype.checkSquare = function(x, y) {
  //checks which square was clicked
  //x and y are click positions

  let xIndex = Math.floor(x / (this.sideLength + 1)); //taking border into account, hence + 1
  let yIndex = Math.floor(y / (this.sideLength + 1));
  let index = xIndex + yIndex * this.height;

  if(index >= this.squares.length) {
    //TODO
    //alert("meme");
  }
  else {

    let radio = document.querySelector('input[name=block]:checked').value;
    let blockType;
    switch(radio) {
      case "wall":
        blockType = "wall";
        break;
      case "start":

        //in case there already exists a start point
        if(this.startPointIndex !== null) {
          this.squares[this.startPointIndex].type = "empty";
          this.squares[this.startPointIndex].draw();
        }

        this.startPointIndex = index;
        blockType = "start";
        break;
      case "end":
        //in case there already exists an end point
        if(this.endPointIndex !== null) {
          this.squares[this.endPointIndex].type = "empty";
          this.squares[this.endPointIndex].draw();
        }

        this.endPointIndex = index;
        blockType = "end";
        break;
      case "empty":
        blockType = "empty";
        break;
    }

    //when start point was overridden or emptied
    //TODO TEST?
    if(blockType !== "start" && index === this.startPointIndex) {
      this.startPointIndex = null;
    }

    //when end point was overridden or emptied
    if(blockType !== "end" && index === this.endPointIndex) {
      this.endPointIndex = null;
    }

    this.squares[index].type = blockType;
    this.squares[index].draw();
  }
};

Grid.prototype.init = function() {
  let canvas = document.getElementById("canvas");
  let grid = this;
  canvas.addEventListener("click", function(event) {
    grid.checkSquare(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
  });
};

Grid.prototype.getSquare = function(x, y) {
  let sq = this.squares[x + y * this.height];
  if(x < 0 || y < 0) {
    return null;
  }
  else if(x >= this.width || y >= this.width) {
    return null;
  }
  else {
    return sq;
  }
};

Grid.prototype.findPath = function(algorithm) {
  algorithm.findPath();
};
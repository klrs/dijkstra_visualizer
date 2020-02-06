function Square(sideLength, index, x, y) {
    this.side = sideLength;
    this.index = index;
    this.type = "empty";

    //location based on grid
    this.x = x;
    this.y = y;

    //leftmost topmost location in PIXELS
    this.xPos = x * sideLength + x;
    this.yPos = y * sideLength + y;
}

Square.prototype.check = function() {
    if(this.type === "empty") {
        this.type = "checked";
        this.draw();
    }
};

Square.prototype.markPath = function() {
    if(this.type === "checked") {
        this.type = "path";
        this.draw();
    }
};

Square.prototype.draw = function() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    switch(this.type) {
        case "empty":
            context.fillStyle = "#aaaaaa";
            break;
        case "wall":
            context.fillStyle = "#101010";
            break;
        case "end":
            context.fillStyle = "#aa0000";
            break;
        case "start":
            context.fillStyle = "#00ff00";
            break;
        case "checked":
            context.fillStyle = "#99ff99";
            break;
        case "path":
          context.fillStyle = "#ffff44";
    }

    //console.log(this.xPos + " " + this.yPos + " " + this.sideLength + " " + this.sideLength);
    context.fillRect(this.xPos, this.yPos, this.side, this.side);
};
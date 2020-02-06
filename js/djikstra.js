
/////GRAPH///////
function Graph() {
  this.nodes = [];
  this.adjacencyList = {};
}

Graph.prototype.addNode = function(node) {
  this.nodes[node.index] = (node);
  this.adjacencyList[node.index] = [];
};

Graph.prototype.addEdge = function(node1, node2, weight) {
  this.adjacencyList[node1.index].push({node:node2, weight: weight});
  //this.adjacencyList[node2].push({node:node1, weight: weight});
};
///////////////////

/////PRIORITY QUEUE///////////////

function PriorityQueue() {
  this.collection = [];
}

PriorityQueue.prototype.enqueue = function(element) {
  if (this.isEmpty()){
    this.collection.push(element);
  } else {
    let added = false;
    for (let i = 1; i <= this.collection.length; i++){
      if (element[1] < this.collection[i-1][1]){
        this.collection.splice(i-1, 0, element);
        added = true;
        break;
      }
    }
    if (!added){
      this.collection.push(element);
    }
  }
};

PriorityQueue.prototype.dequeue = function() {
  let value = this.collection.shift();
  return value;
};

PriorityQueue.prototype.isEmpty = function() {
  return (this.collection.length === 0);
};

//////////////////////////////////

/////DIJKSTRA//////
function Djikstra(grid) {
  this.grid = grid;
  this.weight = 1;
  this.graph = null;
}

Djikstra.prototype.initializeGraph = function() {
  this.graph = new Graph();

  for(let i = 0; i < this.grid.squares.length; i++) {
    this.graph.addNode(this.grid.squares[i]);
  }

  //form the edges for all adjacent squares
  for(let i = 0; i < this.grid.squares.length; i++) {
    let nearbies = this.findNearbies(this.grid.squares[i]);
    for(let j = 0; j < nearbies.length; j++) {
      if(nearbies[j] !== null) {
        this.graph.addEdge(this.grid.squares[i], nearbies[j], this.weight);
        console.log(this.graph.adjacencyList[this.grid.squares[i].index]);
      }
    }
  }
};

Djikstra.prototype.findPath = async function () {
  this.initializeGraph();

  let startNode = this.grid.squares[this.grid.startPointIndex];
  let endNode = this.grid.squares[this.grid.endPointIndex];

  let times = {};
  let backtrace = {};
  let pq = new PriorityQueue();

  times[startNode.index] = 0;
  this.graph.nodes.forEach(node => {
    if (node.index !== startNode.index) {
      times[node.index] = Infinity;
    }
  });

  pq.enqueue([startNode, 0]);

  while (!pq.isEmpty()) {
    let shortestStep = pq.dequeue();
    let currentNode = shortestStep[0];
    currentNode.check();
    for(let i = 0; i < this.graph.adjacencyList[currentNode.index].length; i++) {
      let neighbor = this.graph.adjacencyList[currentNode.index][i];
      neighbor.node.check();

      let time = times[currentNode.index] + neighbor.weight;
      if (time < times[neighbor.node.index]) {
        times[neighbor.node.index] = time;
        backtrace[neighbor.node.index] = currentNode;
        pq.enqueue([neighbor.node, time]);
      }
      console.log("test");
      await new Promise(r => setTimeout(r, 2));
    }
  }

  let path = [];
  path.push(endNode);
  let lastStep = endNode;
  while(lastStep !== startNode) {
    path.unshift(backtrace[lastStep.index]);
    lastStep = backtrace[lastStep.index];
  }

  for(let i = 0; path.length; i++) {
    path[i].markPath();
  }
};

Djikstra.prototype.findNearbies = function(current) {
  //nearbies has 4 adjacent squares to start location
  //it is ordered so that adjacent square above start location has index 0
  //adjacent square to the right of start location has index 1
  //square below start has index 2
  //square to the left of start has index 3. So clockwise ordering
  //if there is none (out of bounds or a wall in the way), index is null

  let nearbies = [];
  nearbies[0] = this.grid.getSquare(current.x, current.y - 1);
  nearbies[1] = this.grid.getSquare(current.x + 1, current.y);
  nearbies[2] = this.grid.getSquare(current.x, current.y + 1);
  nearbies[3] = this.grid.getSquare(current.x - 1, current.y);

  for(let i = 0; i < nearbies.length; i++) {
    //console.log(nearbies[i]);
    if(nearbies[i] != null) {
      if(nearbies[i].type === "empty" || nearbies[i].type === "end"){
        nearbies[i].distance = current.distance + this.weight;
      }
      else {
        nearbies[i] = null;
      }
    }
  }

  return nearbies;
};

/////////////////
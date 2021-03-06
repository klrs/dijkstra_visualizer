(function() {
  window.onload = function() {
    let grid = new Grid(10, 10, 25);
    grid.init();
    grid.draw();

    let algorithm = new Djikstra(grid);
    let findPathButton = document.getElementById("findPath");
    findPathButton.addEventListener("click", function() {
      grid.findPath(algorithm);
    });
    let resetButton = document.getElementById('reset');
    resetButton.addEventListener("click", function() {
      //alert("reset");
      grid.reset();
      algorithm.hasRan = false;
    });
  };
})();
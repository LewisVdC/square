// function that builds a grid in the "container"
function createGrid(x) {
  for (var rows = 0; rows < x; rows++) {
    for (var columns = 0; columns < x; columns++) {
      $("#container").append("<div class='grid" + "" + "'></div>");
    }
  }
  $(".grid").width(400 / x);
  $(".grid").height(400 / x);
}

// function that clears the grid
function clearGrid() {
  $(".grid").remove();
}

// function that prompts the user to select the number of boxes in a new grid
// the function then also creates that new grid
function refreshGrid() {
  var z = prompt("How many boxes per side?");
  clearGrid();
  createGrid(z);
}

// create a 10x10 grid when the page loads
$(document).ready(function () {
  createGrid(10);

  $(".newGrid").click(function () {
    refreshGrid();
  });
});

var state = [];
state[0] = -1; //filled
state[1] = 0; //empty
state[2] = 1; //player or possible location

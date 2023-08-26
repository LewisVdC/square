var state = [];
for (var gridNumber = 0; gridNumber < 100; gridNumber++) {
  state[gridNumber] = "empty";
}

state[0] = "possible";

var changeStatus = (gridNumber, oldClass, newClass) => {
  var clickedGrid = $(`[data-gridNumber="${gridNumber}"]`);
  clickedGrid.removeClass(oldClass);
  clickedGrid.addClass(newClass);

  state[gridNumber] = newClass;
};

var setPossible = (x, y) => {
  if (0 <= x && x <= 9 && 0 <= y && y <= 9 && state[x * 10 + y] === "empty") {
    changeStatus(x * 10 + y, "empty", "possible");
  }
};

var handleClick = (gridNumber) => {
  if (state[gridNumber] === "possible") {
    // fill the cell
    changeStatus(gridNumber, "possible", "filled");

    // remove all previous possibles
    for (var x = 0; x < 100; x++) {
      if (state[x] === "possible") {
        changeStatus(x, "possible", "empty");
      }
    }

    // set new possibles
    var x = Math.floor(gridNumber / 10);
    var y = gridNumber % 10;
    // console.log(x, y);
    setPossible(x + 3, y);
    setPossible(x + 2, y + 2);
    setPossible(x, y + 3);
    setPossible(x - 2, y + 2);
    setPossible(x - 3, y);
    setPossible(x - 2, y - 2);
    setPossible(x, y - 3);
    setPossible(x + 2, y - 2);
  }
  //createGrid(10);
};

// function that builds a grid in the "container"
function createGrid(x) {
  clearGrid();
  for (var rows = 0; rows < x; rows++) {
    for (var columns = 0; columns < x; columns++) {
      var gridNumber = columns + rows * x;
      $("#container").append(
        `<div data-gridNumber='${gridNumber}' class='grid ${state[gridNumber]}' onclick='handleClick(${gridNumber})'></div>`
      );
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

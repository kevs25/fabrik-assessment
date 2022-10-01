function gridFunction() {
  var gridBtn = document.getElementById("grid-hide");
  var listBtn = document.getElementById("user-cards");

  if (gridBtn.style.display === "block") {
    gridBtn.style.display = "block";
  } else {
    gridBtn.style.display = "block";
    listBtn.style.display = "none"
  }
}

function listFunction() {
  var listBtn = document.getElementById("user-cards");
  var gridBtn = document.getElementById("grid-hide");

  if (listBtn.style.display === "block") {
    listBtn.style.display = "block";
  } else {
    listBtn.style.display = "block";
    gridBtn.style.display = "none"
  }
}

function menuFunction() {
var x = document.getElementById("registerBtn");
var containerArea = document.getElementById("container");
if (x.style.display === "block") {
  x.style.display = "none";
  containerArea.style.height = "4rem";
} else {
  x.style.display = "block";
  containerArea.style.height = "10rem";
}
}
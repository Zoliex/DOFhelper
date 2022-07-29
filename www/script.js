var socket = io();

var previous;
var next;

var settingsPageSelector;
var quantityPageSelector;
var taskPageSelector;

var isoValueSelector;
var expValueSelector;
var ouvValueSelector;

var darValueSelector;
var offValueSelector;
var flaValueSelector;

var settings = {};
var isoValueID = 0;
var expValueID = 0;
var ouvValueID = 0;

socket.on("res_settings", (data) => {
  console.log(data);
  settings = data;
  isoValueSelector.innerHTML =
    data.main.children.imgsettings.children.iso.value;
  expValueSelector.innerHTML =
    data.main.children.capturesettings.children.shutterspeed.value;
  ouvValueSelector.innerHTML =
    data.main.children.capturesettings.children["f-number"].value;

  for (
    i = 0;
    i < data.main.children.imgsettings.children.iso.choices.length;

  ) {
    console.log(i);
    if (
      (data.main.children.imgsettings.children.iso.choices[i] =
        data.main.children.imgsettings.children.iso.value)
    ) {
      isoValueID = i;
      break;
    }
    i++;
  }
});

window.onload = () => {
  previous = document.getElementById("previous");
  next = document.getElementById("next");

  isoValueSelector = document.getElementById("iso-value");
  expValueSelector = document.getElementById("exp-value");
  ouvValueSelector = document.getElementById("ouv-value");

  darValueSelector = document.getElementById("dar-value");
  offValueSelector = document.getElementById("off-value");
  flaValueSelector = document.getElementById("fla-value");

  settingsPageSelector = document.querySelector(".settings-page");
  quantityPageSelector = document.querySelector(".quantity-page");
  taskPageSelector = document.querySelector(".task-page");
  socket.emit("settings");
};

function settingsPage() {
  previous.disabled = true;
  quantityPageSelector.style.display = "none";
  settingsPageSelector.style.display = "block";
  previous.setAttribute("onClick", "");
  next.setAttribute("onClick", "quantityPage();");
  next.innerHTML = "Suivant";
}

function quantityPage() {
  previous.style.display = "block";
  next.style.display = "block";

  previous.disabled = false;
  settingsPageSelector.style.display = "none";
  quantityPageSelector.style.display = "block";
  previous.setAttribute("onClick", "settingsPage();");
  next.setAttribute("onClick", "taskPage();");
  next.innerHTML = "Démarrer";
}

function taskPage() {
  previous.style.display = "none";
  next.style.display = "none";

  quantityPageSelector.style.display = "none";
  taskPageSelector.style.display = "flex";

  previous.setAttribute("onClick", "");
  next.setAttribute("onClick", "");
}

function stopTask() {
  taskPageSelector.style.display = "none";
  previous.style.display = "block";
  next.style.display = "block";

  settingsPage();
}

function settingButton(name) {
  if (name == "ISO+") {
  } else if (name == "ISO-") {
  } else if (name == "EXPO+") {
  } else if (name == "EXPO-") {
  } else if (name == "OUV+") {
  } else if (name == "OUV-") {
  }
}

function quantityButton(name) {
  if (name == "DAR+") {
    darValueSelector.innerHTML = parseInt(darValueSelector.innerHTML) + 5;
  } else if (name == "DAR-") {
    darValueSelector.innerHTML = parseInt(darValueSelector.innerHTML) - 5;
  } else if (name == "OFF+") {
    offValueSelector.innerHTML = parseInt(offValueSelector.innerHTML) + 5;
  } else if (name == "OFF-") {
    offValueSelector.innerHTML = parseInt(offValueSelector.innerHTML) - 5;
  } else if (name == "FLA+") {
    flaValueSelector.innerHTML = parseInt(flaValueSelector.innerHTML) + 5;
  } else if (name == "FLA-") {
    flaValueSelector.innerHTML = parseInt(flaValueSelector.innerHTML) - 5;
  }

  if (darValueSelector.innerHTML < 0) {
    darValueSelector.innerHTML = 0;
  } else if (offValueSelector.innerHTML < 0) {
    offValueSelector.innerHTML = 0;
  } else if (flaValueSelector.innerHTML < 0) {
    flaValueSelector.innerHTML = 0;
  }
}

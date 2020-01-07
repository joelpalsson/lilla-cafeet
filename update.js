function getStationInput() {
  var e = document.getElementById("stations_update");
  var station = e.options[e.selectedIndex].value;
  console.log(station);
  return station;
}

function getPeriodInput() {
  var e = document.getElementById("periods_reset");
  var period = e.options[e.selectedIndex].value;
  console.log(period);
  return period;
}

function getNameInput() {
  var e = document.getElementById("name_input");
  var name = "";
  var i;
  for (i = 0; i < e.length; i++) {
    name = name + e.elements[i].value;
  }
  //console.log(name);
  return name;
}

function getNoteInput() {
  var e = document.getElementById("note_input");
  var note = "";
  var i;
  for (i = 0; i < e.length; i++) {
    note = note + e.elements[i].value;
  }
  //console.log(name);
  return note;
}

function getStartHoursInput() {
  var startHours = parseInt(document.getElementById("start_hour").value);
  //console.log(typeof startHours);
  return startHours;
}

function getStartMinutesInput() {
  var startMinutes = parseInt(document.getElementById("start_minute").value);
  //console.log(typeof startMinutes);
  return startMinutes;
}

function getEndHoursInput() {
  var endHours = parseInt(document.getElementById("end_hour").value);
  //console.log(endHours);
  return endHours;
}

function getEndMinutesInput() {
  var startMinutes = parseInt(document.getElementById("end_minute").value);
  //console.log(startMinutes);
  return startMinutes;
}

function clearButtonClick() {
  var station = getStationInput();
  var period = getPeriodInput();
  window.opener.clearWorkingPeriod(station, period);
}

function updateButtonClick() {
  var name = getNameInput();
  var note = getNoteInput();
  var station = getStationInput();
  var startHour = getStartHoursInput();
  var startMinute = getStartMinutesInput();
  var endHour = getEndHoursInput();
  var endMinute = getEndMinutesInput();

  if (name == "") {
    alert("Ange ett namn på personen");
  } else if (startHour > endHour) {
    alert("Ange en sluttid som infaller efter starttiden");
  } else {
    window.opener.fillCells(station, name, note, startHour, startMinute, endHour, endMinute, false);
  }

}

function generateDayButtonClick() {
  window.opener.generateDay(1);
}

var stations = [
  "laundry",
  "cleaning_upstairs",
  "cleaning_downstairs",
  "baking_upstairs",
  "baking_downstairs",
  "sandwiches",
  "serving_1",
  "serving_2",
  "serving_3",
  "counter",
  "washing",
  "catering",
  "individual"
];

var dayStartHour = 9;
var dayStartMinute = 0;
var dayEndHour = 16;
var dayEndMinute = 0;
var lunchStartHour = 12;
var lunchEndHour = 13;
var timeslotMinutes = 15;

var today;
var xmlDoc;

/* ------ initialization ------ */

window.onload = function initiate() {
  today = new Date();
  generateDay(today);
  setupTimeStapleSections();
  setupTimeStapleExtension();
  runTimeStaple();
}

function generateDay(today) {
  clearSchedule();
  generateDateHeader(today);

  switch (today.getDay()) {
    case 1: // monday
      loadXML("data/monday.xml");
      break;
    case 2: // tuesday
      loadXML("data/tuesday.xml");
      break;
    case 3: // wednesday
      loadXML("data/wednesday.xml");
      break;
    case 4: // thursday
      loadXML("data/thursday.xml");
      break;
    case 5: // friday
      loadXML("data/friday.xml");
  }
}

function nextDay() {
  today.setDate(today.getDate() + 1);
  generateDay(today);
}

function prevDay() {
  today.setDate(today.getDate() - 1);
  generateDay(today);
}

function openUpdateWindow() {
  updateWindow = window.open(
    "update.html",
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=650"
  );
}

/* ------ time staple ------ */

function setupTimeStapleExtension() {
  var timeStapleExtensionWidth = document.getElementById("timestaple").clientWidth;
  for (column of document.getElementsByClassName("schedule-col")) {
    timeStapleExtensionWidth += column.clientWidth;
  }
  document.getElementById("timestaple-extension").style.width = timeStapleExtensionWidth + "px";
}

function setupTimeStapleSections() {
  var timeslotHeight = parseInt(document.getElementById("timeslot").clientHeight);
  var borderHeight = 1;
  var nbrTimeslotsAm = ((lunchStartHour - dayStartHour) * 60 / timeslotMinutes);
  var nbrTimeslotsLunch = ((lunchEndHour - lunchStartHour) * 60 / timeslotMinutes);
  var nbrTimeslotsPm = ((dayEndHour - lunchEndHour) * 60  / timeslotMinutes);
  document.getElementById("am").style.height = nbrTimeslotsAm * timeslotHeight - borderHeight + "px";
  document.getElementById("lunch").style.height = nbrTimeslotsLunch * timeslotHeight - borderHeight + "px";
  document.getElementById("pm").style.height = nbrTimeslotsPm * timeslotHeight - borderHeight + "px";
}

function runTimeStaple() {
  var defaultStapleHeight = parseInt(document.getElementById("timestaple").clientHeight);
  var totalNbrMinutes = (dayEndHour - dayStartHour) * 60;

  var id = setInterval(initiateTimeStaple, 1000);

  function initiateTimeStaple() {

    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    var currentSecond = currentDate.getSeconds();

    if (currentHour >= dayStartHour && currentHour <= dayEndHour) {

      clearInterval(id);

      var remainingNbrMinutes = (dayEndHour - currentHour) * 60 - currentMinute;
      var stapleHeight = remainingNbrMinutes / totalNbrMinutes * defaultStapleHeight;
      document.getElementById("timestaple").style.height = stapleHeight + "px";

      id = setInterval(updateTimeStaple, 1000);

      function updateTimeStaple() {
        currentDate = new Date();
        currentHour = currentDate.getHours();
        currentMinute = currentDate.getMinutes();
        currentSecond = currentDate.getSeconds();

        if (stapleHeight > 0) {
          if (currentSecond == 0) {
            remainingNbrMinutes = (dayEndHour - currentHour) * 60 - currentMinute;
            stapleHeight = remainingNbrMinutes / totalNbrMinutes * defaultStapleHeight;
            document.getElementById("timestaple").style.height = stapleHeight + "px";
          }
        } else {
          clearInterval(id);
          id = setInterval(initiateTimeStaple, 1000);
        }
      }
    }
  }
}

/* ------ schedule ------ */

function updateTimeslots(station, name, note, startHour, startMinute, endHour, endMinute, clear) {
  var column;
  var color;

  switch (station) {
    case "laundry":
      column = "c1";
      color = "#C4BD97";
      break;
    case "cleaning_upstairs":
      column = "c2";
      color = "#808080";
      break;
    case "cleaning_downstairs":
      column = "c3";
      color = "#808080";
      break;
    case "baking_upstairs":
      column = "c4";
      color = "#FFFF0B";
      break;
    case "baking_downstairs":
      column = "c5";
      color = "#FFFF0B";
      break;
    case "sandwiches":
      column = "c6";
      color = "#18C1FF";
      break;
    case "serving_1":
      column = "c7";
      color = "#FB00FF";
      break;
    case "serving_2":
      column = "c8";
      color = "#FB00FF";
      break;
    case "serving_3":
      column = "c9";
      color = "#FB00FF";
      break;
    case "counter":
      column = "c10";
      color = "#00B050";
      break;
    case "washing":
      column = "c11";
      color = "#FB0005";
      break;
    case "catering":
      column = "c12";
      color = "#FFC000";
      break;
    case "individual":
      column = "c13";
      color = "#C097E7";
  }

  var timeslots = document.getElementsByClassName(column);
  //console.log("number of timeslots: " + timeslots.length.toString());

  var firstTimeslotIndex = (startHour * 60 + startMinute - dayStartHour * 60) / timeslotMinutes;
  var lastTimeslotIndex = ((endHour - dayStartHour) * 60 + endMinute) / timeslotMinutes - 1;

  for (var i = firstTimeslotIndex; i <= lastTimeslotIndex; i++) {
    if (clear) {
      timeslots[i].innerHTML = "";
      timeslots[i].style.backgroundColor = "white";
      if (timeslots[i].parentNode.id != "schedule-row-1") {
        timeslots[i].style.borderTop = "none";
      }
      if (timeslots[i].parentNode.id != "schedule-row-28") {
        timeslots[i].style.borderBottom = "none";
      }
    } else {
      timeslots[i].style.backgroundColor = color;
    }
  }

  if (!clear) {
    timeslots[firstTimeslotIndex].style.borderTop = "1px solid black";
    timeslots[lastTimeslotIndex].style.borderBottom = "1px solid black";

    var nameTimeslotIndex = Math.round(firstTimeslotIndex + (lastTimeslotIndex - firstTimeslotIndex) / 2 - 1).toString();

    timeslots[nameTimeslotIndex].innerHTML = "<div>" + name.toUpperCase().bold() + "</div>";

    var noteTimeslotIndex = firstTimeslotIndex + 1;

    if (noteTimeslotIndex != nameTimeslotIndex) {
      timeslots[noteTimeslotIndex].innerHTML = note;
    }
  }
  /*
  console.log("station: " + station);
  console.log("column: " + column);
  console.log("color: " + color);
  console.log("name: " + name);
  console.log("startHour: " + startHour.toString());
  console.log("startMinute: " + startMinute.toString());
  console.log("endHour: " + endHour.toString());
  console.log("endMinute: " + endMinute.toString());
  console.log("dayStartHour: " + dayStartHour.toString());
  console.log("timeslotMinutes: " + timeslotMinutes.toString());
  console.log("firstTimeslotIndex: " + firstTimeslotIndex.toString());
  console.log("lastTimeslotIndex: " + lastTimeslotIndex.toString());
  console.log("nameTimeslotIndex: " + noteTimeslotIndex.toString());
  */
}

function clearWorkingPeriod(station, period) {
  var startHour;
  var endHour;

  switch (period) {
    case "am":
      startHour = dayStartHour
      endHour = lunchStartHour;
      break;
    case "lunch":
      startHour = lunchStartHour;
      endHour = lunchEndHour;
      break;
    case "pm":
      startHour = lunchEndHour;
      endHour = dayEndHour;
  }

  updateTimeslots(station, "", "", startHour, 0, endHour, 0, true);
}

function clearSchedule() {
  for (var i = 0; i < stations.length; i++) {
    updateTimeslots(stations[i], "", "", dayStartHour, 0, dayEndHour, 0, true);
  }
}

function generateDateHeader(today) {
  var weekday = [
    "SÖNDAG",
    "MÅNDAG",
    "TISDAG",
    "ONSDAG",
    "TORSDAG",
    "FREDAG",
    "LÖRDAG"
  ][today.getDay()];

  var date = today.getDate();

  var month = [
    "JANUARI",
    "FEBRUARI",
    "MARS",
    "APRIL",
    "MAJ",
    "JUNI",
    "JULI",
    "AUGUSTI",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DECEMBER"
  ][today.getMonth()];

  document.getElementById("date").innerHTML = weekday + " " + date + " " + month;
}

/* ------ input data handling ------ */

function loadXML(filePath) {
  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", filePath, true);
  xhttp.send();

  xhttp.onreadystatechange = function() {
    //console.log("state changed! - readyState: " + this.readyState, ", status: " + this.status);
    if (this.readyState == 4) {
      if (this.status == 0) {
        alert("The file \"" + filePath + "\"" + " could not be found!");
      } else if (this.status == 200) {
        parseXML(this.responseXML, filePath);
      }
    }
  };
}

function parseXML(xmlDoc, filePath) {
  var workingPeriods = xmlDoc.getElementsByTagName("working_period");
  console.log(workingPeriods);

  if (workingPeriods.length == 0) {
    alert(getNoPeriodsMsg(filePath));
    return;
  }

  for (var i = 0; i < workingPeriods.length; i++) {
    var period = {};

    try {
      period = parseWorkingPeriod(workingPeriods[i]);
    } catch (e) {
      alert(getParsingErrorMsg(filePath, i + 1) + e);
      return;
    }

    var nonValidPeriodMsg = validateWorkingPeriod(period);

    if (nonValidPeriodMsg != "") {
      alert(getValidationErrorMsg(filePath, i + 1) + nonValidPeriodMsg);
      return;
    }

    console.log(period);

    updateTimeslots(period.station, period.name, period.note, period.startHour,
      period.startMinute, period.endHour, period.endMinute, false);
  }
}

function parseWorkingPeriod(workingPeriodElement) {
  var tagNames = ["station", "name", "start_time", "end_time", "note"];
  var values = [];

  for (var i = 0; i < tagNames.length; i++) {
    var elements = workingPeriodElement.getElementsByTagName(tagNames[i]);
    if (elements.length == 0) {
      if (i < tagNames.length - 1) {
        throw getElementNotFoundMsg(tagNames[i]);
      } else {
        values[i] = "";
      }
    } else {
      var value = "";
      try {
        value = elements[0].childNodes[0].nodeValue;
      } catch (e) {}

      values[i] = value;
    }
  }

  var startTimeUnits = parseTimeStamp(values[2], "start_time");
  var endTimeUnits = parseTimeStamp(values[3], "end_time");

  return {
    station: values[0],
    name: values[1],
    startHour: startTimeUnits[0],
    startMinute: startTimeUnits[1],
    endHour: endTimeUnits[0],
    endMinute: endTimeUnits[1],
    note: values[4]
  };
}

function parseTimeStamp(timeStamp, tagName) {
  var timeStampPattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeStampPattern.test(timeStamp)) {
    throw getInvalidTimeStampMsg(tagName);
  }

  var timeUnits = timeStamp.split(":");
  var hour = parseInt(timeUnits[0]);
  var minute = parseInt(timeUnits[1]);

  return [hour, minute];
}

function validateWorkingPeriod(period) {
  return validateStation(period.station) +
    validateStartTime(period.startHour, period.startMinute) +
    validateEndTime(period.startHour, period.startMinute, period.endHour, period.endMinute);
}

function validateStation(station) {
  if (stations.indexOf(station) == -1) {
    return "– " + getInvalidStationMsg();
  }
  return "";
}

function validateStartTime(startHour, startMinute) {
  if (startMinute % timeslotMinutes != 0) {
    return "– \"start_time\": " + getMinuteIntervalMsg();
  }

  var lastStartHour = (dayEndMinute == 0) ? (dayEndHour - 1) : dayEndHour;
  var lastStartMinute = (dayEndMinute == 0) ? (60 - timeslotMinutes) : (dayEndMinute - timeslotMinutes);

  if ((startHour < dayStartHour || (startHour == dayStartHour && startMinute < dayStartMinute)) ||
    (startHour > lastStartHour || (startHour == lastStartHour && startMinute > lastStartMinute))) {
    return "– \"start_time\": " + getInvalidTimeIntervalMsg(dayStartHour, dayStartMinute, lastStartHour, lastStartMinute);
  }

  return "";
}

function validateEndTime(startHour, startMinute, endHour, endMinute) {
  if (endMinute % timeslotMinutes != 0) {
    return "– \"end_time\": " + getMinuteIntervalMsg();
  }

  var firstEndHour = (startMinute == (60 - timeslotMinutes)) ? (startHour + 1) : startHour;
  var firstEndMinute = (startMinute == (60 - timeslotMinutes)) ? 0 : (startMinute + timeslotMinutes);

  if ((endHour < firstEndHour || (endHour == firstEndHour && endMinute < firstEndMinute)) ||
    (endHour > dayEndHour || (endHour == dayEndHour && endMinute > dayEndMinute))) {
    return "– \"end_time\": " + getInvalidTimeIntervalMsg(firstEndHour, firstEndMinute, dayEndHour, dayEndMinute);
  }

  return "";
}

function getNoPeriodsMsg(filePath) {
  return "Filen \"" + filePath + "\" innehåller inga arbetspass!";
}

function getElementNotFoundMsg(tagName) {
  return "Elementet " + "\"" + tagName + "\" saknas.\n";
}

function getParsingErrorMsg(filePath, id) {
  return "Arbetspass nr. " + id.toString() + " i filen " + "\"" + filePath + "\"" + " kunde inte läsas in.\n\nOrsak: "
}

function getValidationErrorMsg(filePath, id) {
  return "Arbetspass nr. " + id.toString() + " i filen " + "\"" + filePath + "\"" + " innehåller otillåtna värden:\n\n"
}

function getTimeString(hour, minute) {
  return ((hours < 10) ? ("0" + hours.toString()) : hours.toString()) + ":" + ((minutes == 0) ? "00" : minutes.toString());
}

function getInvalidTimeStampMsg(tagName) {
  return "Elementet " + "\"" + tagName + "\" har ett ogiltigt format. Tiden måste anges på formatet hh:mm.\n";
}

function getMinuteIntervalMsg() {
  return "Minuttalet måste vara en multipel av " + timeslotMinutes + ".\n";
}

function getInvalidTimeIntervalMsg(dayStartHour, dayStartMinute, dayEndHour, dayEndMinute) {
  return "Tiden måste infalla mellan " + getTimeString(dayStartHour, dayStartMinute) + " och " + getTimeString(dayEndHour, dayEndMinute) + ".\n";
}

function getInvalidStationMsg() {
  return "\"working station\"\n";
}

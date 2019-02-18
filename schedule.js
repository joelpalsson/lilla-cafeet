var stations = ["laundry", "cleaning_upstairs", "cleaning_downstairs", "baking_upstairs", "baking_downstairs", "sandwiches", "serving_1", "serving_2", "serving_3", "counter", "washing", "catering", "individual"];
var firstHour = 9;
var firstMinute = 0;
var lastHour = 16;
var lastMinute = 0;
var minimumTimeUnit = 15;

var today;
var xmlDoc;


function fillTimeStaple() {
	var timeStapleHeight = parseInt(document.getElementById("timestaple").clientHeight);
	var timeStapleWidth = parseInt(document.getElementById("timestaple").clientWidth);
	document.getElementById("time").style.height = timeStapleHeight.toString() + "px";
	document.getElementById("time").style.width = timeStapleWidth.toString() + "px";
}


function adjustTimeStapleSections() {
	var minimumTimeUnitHeight = parseInt(document.getElementById("minimumTimeUnit").clientHeight);
	//console.log("minimumTimeUnitHeight:" + minimumTimeUnitHeight);
	document.getElementById("am").style.height = 1 * minimumTimeUnitHeight + "px";
	document.getElementById("am").style.paddingTop = 5 * minimumTimeUnitHeight + "px";
	document.getElementById("am").style.paddingBottom = 6 * minimumTimeUnitHeight + "px";
	document.getElementById("lunch").style.height = 1 * minimumTimeUnitHeight + "px";
	document.getElementById("lunch").style.paddingTop = 1 * minimumTimeUnitHeight + "px";
	document.getElementById("lunch").style.paddingBottom = 2 * minimumTimeUnitHeight + "px";
	document.getElementById("pm").style.height = 1 * minimumTimeUnitHeight + "px";
	document.getElementById("pm").style.paddingTop = 5 * minimumTimeUnitHeight + "px";
	document.getElementById("pm").style.paddingBottom = 6 * minimumTimeUnitHeight + "px";
}


function runTimeStaple() {
	var stapleHeight = parseInt(document.getElementById("timestaple").clientHeight) + 1;
	var timeUnitHeight = stapleHeight / ((lastHour - firstHour) * 60);
	
	var id = setInterval(initiateTimeStaple, 1000);
	
	function initiateTimeStaple() {
		
		//console.log("waiting for initiation");

		var currentDate = new Date();
		var currentHour = currentDate.getHours();
		var currentMinute = currentDate.getMinutes();
		var currentSecond = currentDate.getSeconds();

		if (currentHour >= firstHour && currentHour <= lastHour) {
			
			clearInterval(id);
			var scheduleTotalMinutes = (lastHour - firstHour) * 60;
			var currentTotalMinutes = (currentHour - firstHour) * 60 + currentMinute;
			var partOfHeight = 1 - currentTotalMinutes / scheduleTotalMinutes;
			stapleHeight = partOfHeight * stapleHeight;

			document.getElementById("time").style.height = stapleHeight + "px";
			
			id = setInterval(updateTimeStaple, 1000);
			
			function updateTimeStaple(){
				var currentDate = new Date();
				var currentHour = currentDate.getHours();
				var currentMinute = currentDate.getMinutes();
				var currentSecond = currentDate.getSeconds();
				
				//console.log(currentSecond);
				
				if (stapleHeight > 0) {
					if (currentSecond == 01) {
						stapleHeight -= timeUnitHeight;
						if (stapleHeight < 0) {
							stapleHeight = 0;
						}	
						document.getElementById("time").style.height = stapleHeight + "px";
					}
				} else {

					//console.log("staple on the ground");
					
					clearInterval(id);

					//console.log("updating stopped");
					
					id = setInterval(initiateTimeStaple, 1000);

					//console.log(currentSecond);

				}	
			}
		}
	}
}


function fillCells(station, name, note, startHour, startMinute, endHour, endMinute, clear) {
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

    var e = document.getElementsByClassName(column);
    //console.log("number of cells: " + e.length.toString());

	var startCell = (startHour * 60 + startMinute - firstHour * 60) / minimumTimeUnit;
	var endCell = ((endHour - firstHour) * 60 + endMinute) / minimumTimeUnit - 1;

    for (var i = startCell; i <= endCell; i++) {
    	if (clear == true) {
    		e[i].innerHTML = "";
			e[i].style.backgroundColor = "white";
		} else {
	    	e[i].style.backgroundColor = color;
    	}
    }

    var nameCell = Math.round(startCell + (endCell - startCell) / 2 - 1).toString();

    e[nameCell].innerHTML = name.toUpperCase().bold();

    var noteCell = startCell + 1;

    if (noteCell != nameCell) {
		e[noteCell].innerHTML = note;	
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
	console.log("firstHour: " + firstHour.toString());
	console.log("minimumTimeUnit: " + minimumTimeUnit.toString());
	console.log("startCell: " + startCell.toString());
	console.log("endCell: " + endCell.toString());
	console.log("nameCell: " + nameCell);
	*/
}


function clearSchedule() {
	for (var i = 0; i < stations.length; i++) {
		fillCells(stations[i], "", "", firstHour, 0, lastHour, 0, true);
	}
}


function generateDateHeader(today) {
	var weekday = ["SÖNDAG", "MÅNDAG", "TISDAG", "ONSDAG", "TORSDAG", "FREDAG", "LÖRDAG"][today.getDay()];
	var date = today.getDate();
	var month = ["JANUARI", "FEBRUARI", "MARS", "APRIL", "MAJ", "JUNI", "JULI", "AUGUSTI", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DECEMBER"][today.getMonth()];
	document.getElementById("date").innerHTML = weekday + " " + date + " " + month;
}


function loadXML(filePath) {
    var xhttp = new XMLHttpRequest();

	xhttp.open("GET", filePath, true);
	xhttp.send();

	xhttp.onreadystatechange = function() {
	//console.log("state changed! - readyState: " + this.readyState, ", status: " + this.status);
		if (this.readyState == 4) {
			if (this.status == 0) {
				alert("The file \"" + filePath + " could not be found!");
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
		alert("Filen \"" + filePath + "\" innehåller inga arbetspass!");
		return;
	}

    for (var i = 0; i < workingPeriods.length; i++) {

		var id = i + 1;
		var tag = ""
		var elements;
		var station = "";
		var name = "";
		var startTime = "";
		var endTime = "";
		var note = "";
		var timeStampPattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

		// Obtain validate the working station
		tag = "station";
		elements = workingPeriods[i].getElementsByTagName(tag);

		if (elements.length == 0) {
			alert(getElementNotFoundString(filePath, id, tag));
			continue;
		}

		try {
			station = elements[0].childNodes[0].nodeValue;
		} catch (e) {
			alert(getElementEmptyString(filePath, id, tag));
			continue;
		}

		console.log("station: " + station);

		if (stations.indexOf(station) == -1) {
			alert(getInvalidValueString(filePath, id, tag));
			continue;
		}

		// Obtain the name
		tag = "name";
		elements = workingPeriods[i].getElementsByTagName(tag);

		if (elements.length == 0) {
			alert(getElementNotFoundString(filePath, id, tag));
			continue;
		}

		try {
			name = elements[0].childNodes[0].nodeValue;
		} catch (e) {
			alert(getElementEmptyString(filePath, id, tag));
			continue;
		}

		console.log("name: " + name);

		// Obtain the start time
		tag = "start_time";
		elements = workingPeriods[i].getElementsByTagName(tag);

		if (elements.length == 0) {
			alert(getElementNotFoundString(filePath, id, tag));
			continue;
		}

		try {
			startTime = elements[0].childNodes[0].nodeValue;
		} catch (e) {
			alert(getElementEmptyString(filePath, id, tag));
			continue;
		}

		console.log("startTime: " + startTime);

		var startTimeUnits = startTime.split(":");
		var startHour = parseInt(startTimeUnits[0]);
		var startMinute = parseInt(startTimeUnits[1]);

		if (!startTime.match(timeStampPattern)) {
			alert(getInvalidTimeFormatString(filePath, id, tag));
			continue;
		}

		if (startMinute % minimumTimeUnit != 0) {
			alert(getMinuteIntervalString(filePath, id, tag));
			continue;
		}

		var lastStartHour = (lastMinute == 0) ? (lastHour - 1):lastHour;
		var lastStartMinute = (lastMinute == 0) ? (60 - minimumTimeUnit):(lastMinute - minimumTimeUnit);

		if ((startHour < firstHour || (startHour == firstHour && startMinute < firstMinute)) || (startHour > lastStartHour || (startHour == lastStartHour && startMinute > lastStartMinute))) {
			alert(getInvalidTimeIntervalString(filePath, id, tag, firstHour, firstMinute, lastStartHour, lastStartMinute));
			continue;
		}

		// Obtain the end time
		tag = "end_time";
		elements = workingPeriods[i].getElementsByTagName(tag);

		if (elements.length == 0) {
			alert(getElementNotFoundString(filePath, id, tag));
			continue;
		}

		try {
			endTime = elements[0].childNodes[0].nodeValue;
		} catch (e) {
			alert(getElementEmptyString(filePath, id, tag));
			continue;
		}

		console.log("endTime: " + endTime);

		var endTimeUnits = endTime.split(":");
		var endHour = parseInt(endTimeUnits[0]);
		var endMinute = parseInt(endTimeUnits[1]);

		if (!endTime.match(timeStampPattern)) {
			alert(getInvalidTimeFormatString(filePath, id, tag));
			continue;
		}

		if (endMinute % minimumTimeUnit != 0) {
			alert(getMinuteIntervalString(filePath, id, tag));
			continue;
		}

		/*
		var firstEndHour = (firstMinute == (60 - minimumTimeUnit)) ? (firstHour + 1):firstHour;
		var firstEndMinute = (firstMinute == (60 - minimumTimeUnit)) ? 0:(firstMinute + minimumTimeUnit);

		if ((endMinute % minimumTimeUnit != 0) || (endHour < firstEndHour || (endHour == firstEndHour && endMinute < firstEndMinute)) || (endHour > lastHour || (endHour == lastHour && endMinute > lastMinute))) {
			alert(getInvalidTimeIntervalString(filePath, id, tag, firstEndHour, firstEndMinute, lastHour, lastMinute));
			continue;
		}
		*/

		var firstEndHour = (startMinute == (60 - minimumTimeUnit)) ? (startHour + 1):startHour;
		var firstEndMinute = (startMinute == (60 - minimumTimeUnit)) ? 0:(startMinute + minimumTimeUnit);

		if ((endHour < firstEndHour || (endHour == firstEndHour && endMinute < firstEndMinute)) || (endHour > lastHour || (endHour == lastHour && endMinute > lastMinute))) {
			alert(getInvalidTimeIntervalString(filePath, id, tag, firstEndHour, firstEndMinute, lastHour, lastMinute));
			continue;
		}

		// Obtain the note if it exists
		tag = "note";
		try {
			note = workingPeriods[i].getElementsByTagName(tag)[0].childNodes[0].nodeValue;
		} catch (e) {}

		console.log("note: " + note);

		fillCells(station, name, note, startHour, startMinute, endHour, endMinute, false);

		console.log("\n");
	}
}


function getFeedbackBaseString(filePath, id) {
	return "Arbetspass nr. " + id.toString() + " i filen " + "\"" + filePath + "\"" + " kunde inte läsas in.\n\nOrsak: "
}

function getElementNotFoundString(filePath, id, tag) {
	 return getFeedbackBaseString(filePath, id) + " Elementet " + "\"" + tag + "\" saknas.";
}

function getElementEmptyString(filePath, id, tag) {
	return getFeedbackBaseString(filePath, id) + "Elementet " + "\"" + tag + "\" är tomt.";
}

function getInvalidValueString(filePath, id, tag) {
	return getFeedbackBaseString(filePath, id) + "Elementet " + "\"" + tag + "\" har ett ogiltigt värde.";
}

function getInvalidTimeFormatString(filePath, id, tag) {
	return getFeedbackBaseString(filePath, id) + "Elementet " + "\"" + tag + "\" har ett ogiltigt format. Tiden måste anges på formatet hh:mm.";
}

function getMinuteIntervalString(filePath, id, tag) {
	return getFeedbackBaseString(filePath, id) + "Minuttalet i elementet \"" + tag + "\" måste vara en multipel av " + minimumTimeUnit + ".";
}

function getTimeString(hours, minutes) {
	return ((hours < 10) ? ("0" + hours.toString()):hours.toString()) + ":" + ((minutes == 0) ? "00":minutes.toString());
}

function getInvalidTimeIntervalString(filePath, id, tag, firstHour, firstMinute, lastHour, lastMinute) {
	return getFeedbackBaseString(filePath, id) + "Elementet " + "\"" + tag + "\" har ett otillåtet värde. Tiden måste infalla mellan " + getTimeString(firstHour, firstMinute) + " och " + getTimeString(lastHour, lastMinute) + ".";
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


function clearWorkingPeriod(station, period) {
	var startHour;
	var endHour;

	switch (period) {
	    case "am":
			startHour = 9;
			endHour = 12;
	        break;
	    case "lunch":
			startHour = 12;
			endHour = 13;
	        break;
	    case "pm":
			startHour = 13;
			endHour = 16;   
	}

	fillCells(station, "", "", startHour, 0, endHour, 0, true);
}


function openUpdateWindow() {
	updateWindow = window.open("update.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=650");
}


function nextDay() {
	today.setDate(today.getDate() + 1);
	generateDay(today);
}


function prevDay() {
	today.setDate(today.getDate() - 1);
	generateDay(today);
}


window.onload = function initiate() {
	today = new Date();
	generateDay(today);
	adjustTimeStapleSections();
	fillTimeStaple();
	runTimeStaple();
}

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
	return name.toUpperCase();
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
	var startMinutes = parseInt(document.getElementById("start_minute").value);
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
	var station = getStationInput();
	var startHour = getStartHoursInput();
	var startMinute = getStartMinutesInput();
	var endHour = getEndHoursInput();
	var endMinute = getEndMinutesInput();
	window.opener.update(station, name, startHour, startMinute, endHour, endMinute);
}

function generateDayButtonClick() {
	window.opener.generateDay(1);
}


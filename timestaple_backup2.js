function runTimeStaple() {
	var stapleHeight = parseInt(document.getElementById("timestaple").clientHeight) + 1;
	var totalNbrMinutes = (lastHour - firstHour) * 60;
	var minuteHeight = stapleHeight / totalNbrMinutes;
	
	var id = setInterval(initiateTimeStaple, 1000);
	
	function initiateTimeStaple() {
		
		var currentDate = new Date();
		var currentHour = currentDate.getHours();
		var currentMinute = currentDate.getMinutes();
		var currentSecond = currentDate.getSeconds();

		if (currentHour >= firstHour && currentHour <= lastHour) {

			clearInterval(id);

			var remainingNbrMinutes = (lastHour - currentHour) * 60 - currentMinute;
			stapleHeight = remainingNbrMinutes / totalNbrMinutes * stapleHeight;
			document.getElementById("time").style.height = stapleHeight + "px";
			
			id = setInterval(updateTimeStaple, 1000);
			
			function updateTimeStaple() {
				var currentDate = new Date();
				var currentHour = currentDate.getHours();
				var currentMinute = currentDate.getMinutes();
				var currentSecond = currentDate.getSeconds();
			
				if (stapleHeight > 0) {
					if (currentSecond == 0) {
						stapleHeight -= minuteHeight;
						if (stapleHeight < 0) {
							stapleHeight = 0;
						}	
						document.getElementById("time").style.height = stapleHeight + "px";
					}
				} else {		
					clearInterval(id);	
					id = setInterval(initiateTimeStaple, 1000);
				}	
			}
		}
	}
}
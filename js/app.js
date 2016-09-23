(function(){
	"use strict"

	// grab elements

	var body = document.getElementsByTagName('body');
	var wrapper = document.getElementById('wrapper');
	var secondsBar = document.getElementById('seconds-bar');

	var hours = document.getElementById('hours');
	var minutes = document.getElementById('minutes');
	var seconds = document.getElementById('seconds');

	// console.log(hours, minutes, seconds);

	var currentTime;

	function logCurrentTime(){

		currentTime = new Date();

		var hour = currentTime.getHours();
		var minute = currentTime.getMinutes();
		var second = currentTime.getSeconds();

		// console.log(hour + ':' + minute + ':' + second);

		// return [hour, minute, second];

		return {
						hour : hour,
						minute : minute,
						second : second
					 }
	}

	function padZero(num){
		var paddedNum = ("0" + num).slice(-2);

		return paddedNum;
	}

	function convertTimeToHex(num){

		var currentHour = logCurrentTime().hour;
		var currentMinute = logCurrentTime().minute;
		var currentSecond = logCurrentTime().second;

		// set up ms values
		var msDay = 3600000 * 24;
		var msHour = 60000 * 60;
		var msMinute = 60000;
		var msSecond = 1000;

		
		// find time percentages
		// find the percentage of day completed
		var percentOfDayCompleteBase16 = 		(Math.floor(((currentHour * msHour)/ msDay) * 100))
																						 .toString(16);
    // find the percentage of hour completed
		var percentOfHourCompleteBase16 = 	(Math.floor(((currentMinute * msMinute)/ msHour) * 100))
																				     .toString(16);
    // find the percentage of minute completed
		var percentOfMinuteCompleteBase16 = (Math.floor(((currentSecond * msSecond) / msMinute) * 100))
																						 .toString(16);
		// make hex code based off of percentages
		var hexCat = '#';
				hexCat += padZero(percentOfDayCompleteBase16);
				hexCat += padZero(percentOfHourCompleteBase16);
				hexCat += padZero(percentOfMinuteCompleteBase16);

				console.log(hexCat);
		
		return {
						hexPercent: hexCat
					 };
	}

	function displayTime(){
		var timeLog = logCurrentTime();

		hours.textContent = padZero(timeLog.hour);
		minutes.textContent = padZero(timeLog.minute);
		seconds.textContent = padZero(timeLog.second);

	}

	function setColor() {
		
		var hrsText = hours.textContent;
		var minText = minutes.textContent;
		var secText = seconds.textContent;

		var hex = convertTimeToHex().hexPercent;
		 		// hex += convertToHex(minText);
		 		// hex += convertToHex(secText);

		wrapper.setAttribute('style', 'background-color:' + hex);
		console.log("applying color: " + hex );
		// console.log("applying color: " + hex );

	}

	function growSecondsBar(){
		var currentTime = logCurrentTime();
		var seconds = currentTime.second;

		secondsBar.style.width = (seconds / 60) * 100 + '%';
	}


// group all function calls into one function
	function colorClock(){
		displayTime();
		setColor();
		growSecondsBar();
	}



	// initialize the clock on load 
	// window.addEventListener('load', displayTime);
	// window.addEventListener('load', setColor);
	window.addEventListener('load', colorClock);
	
	// set timers on the window object
	// window.setInterval(displayTime, 1000);
	// window.setInterval(setColor, 1000);
	// window.setInterval(growSecondsBar, 1000);
	window.setInterval(colorClock, 1000);
	



}());
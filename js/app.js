(function(){
	"use strict"

	// grab elements

	// var body = document.getElementsByTagName('body');
	var wrapper = document.getElementById('wrapper');
	var secondsBar = document.getElementById('seconds-bar');
	var clockBody = document.getElementById('clock-body');
	
	// drill down and get both clocks
	var numbersClock = clockBody.querySelector('#numbers-clock');
	var hexClock = clockBody.querySelector('#hex-clock');

	// get the clock elements
	var hours = document.getElementById('hours');
	var minutes = document.getElementById('minutes');
	var seconds = document.getElementById('seconds');
	// get hex clock elements
	var hexHours = document.getElementById('hex-hours');
	var hexMinutes = document.getElementById('hex-minutes');
	var hexSeconds = document.getElementById('hex-seconds');

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

		// use the actual time values to create a hex
		var currentHourBase16 = currentHour.toString(16);
		var currentMinuteBase16 = currentMinute.toString(16);
		var currentSecondBase16 = currentSecond.toString(16);

		var hexNormal =  padZero(currentHourBase16);
			  hexNormal += padZero(currentMinuteBase16);
			  hexNormal += padZero(currentSecondBase16);
		
		// find time percentages
		// set up ms values
		var msDay = 3600000 * 24;
		var msHour = 60000 * 60;
		var msMinute = 60000;
		var msSecond = 1000;
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
		var hexPercent =  padZero(percentOfDayCompleteBase16);
				hexPercent += padZero(percentOfHourCompleteBase16);
				hexPercent += padZero(percentOfMinuteCompleteBase16);
		
		return {
						hexHourPercent: padZero(percentOfDayCompleteBase16),
						hexMinutePercent: padZero(percentOfHourCompleteBase16),
						hexSecondPercent: padZero(percentOfMinuteCompleteBase16),
						hexNormal: hexNormal,
						hexPercent: hexPercent
					 };
	}

	function displayTime(){
		var timeLog = logCurrentTime();

		hours.textContent = padZero(timeLog.hour);
		minutes.textContent = padZero(timeLog.minute);
		seconds.textContent = padZero(timeLog.second);

	}

	function displayTimeInHex(){
		var timeLog = convertTimeToHex();

		hexHours.textContent = timeLog.hexHourPercent;
		hexMinutes.textContent = timeLog.hexMinutePercent;
		hexSeconds.textContent = timeLog.hexSecondPercent;

	}

	function setColor() {
		
		var hrsText = hours.textContent;
		var minText = minutes.textContent;
		var secText = seconds.textContent;

		var hex = '#' + convertTimeToHex().hexPercent;
		var hex2 = '#' + convertTimeToHex().hexNormal;

		wrapper.setAttribute('style', 'background-image : radial-gradient(circle 50vw, ' + hex2 + ' 0%, ' + hex + ' 100%)');

	}

	function growSecondsBar(){
		var currentTime = logCurrentTime();
		var seconds = currentTime.second;

		secondsBar.style.width = (seconds / 60) * 100 + '%';
		secondsBar.classList.add('animating');

		setTimeout(function(){
			secondsBar.classList.remove('animating');
		}, 400);

	}

	function switchToHexClockHandler(){ // hide num clock, show hex clock

		if (numbersClock.classList.contains('showing')){
			numbersClock.classList.remove('showing');
			numbersClock.classList.add('hidden');
			
			if(hexClock.classList.contains('hidden')){
				hexClock.classList.remove('hidden');
				hexClock.classList.add('showing');
			}

		} else {
			numbersClock.classList.add('hidden');
			hexClock.classList.add('showing');
		}
	}

	function switchToNumberClockHandler(){ // hide hex clock, show numclock
		
		if(hexClock.classList.contains('showing')){
			hexClock.classList.remove('showing');
			hexClock.classList.add('hidden');

			if(numbersClock.classList.contains('hidden')){
				numbersClock.classList.remove('hidden')
				numbersClock.classList.add('showing');	
			}

		} else {
			numbersClock.classList.add('showing');
			hexClock.classList.add('hidden');
		}

	}

// group all function calls into one function
	function colorClock(){
		displayTime();
		displayTimeInHex()
		setColor();
		growSecondsBar();
	}


	// initialize the clock on load
	window.addEventListener('load', colorClock);
	// set timer on the window object
	window.setInterval(colorClock, 1000);

	clockBody.addEventListener('mouseover', switchToHexClockHandler);
	clockBody.addEventListener('mouseout', switchToNumberClockHandler);

	
}());
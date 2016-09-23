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
		var paddedNum = ("0" + num).slice(-2)
		return paddedNum;
	}

	function convertToHex(num){
		var hexify = num.toString(16);
		return hexify;
	}

	function displayTime(){
		var timeLog = logCurrentTime();

		hours.textContent = padZero(timeLog.hour);
		minutes.textContent = padZero(timeLog.minute);
		seconds.textContent = padZero(timeLog.second);

	}

	function displayColor() {
		var timeLog = logCurrentTime();

		var hex = "#";
				hex += convertToHex(timeLog.hour);
				hex += convertToHex(timeLog.minute);
				hex += convertToHex(timeLog.second);

		wrapper.style.backgroundColor = hex;
		console.log("applying color: " + hex )

	}

	function growSecondsBar(){
		var currentTime = logCurrentTime();
		var seconds = currentTime.second;



		secondsBar.style.width = (seconds / 60) * 100 + '%';
	}



	// cease the 1 second lag on load 
	window.addEventListener('load', displayTime);
	window.addEventListener('load', displayColor);
	
	// set timers on the window object
	window.setInterval(displayTime, 1000);
	window.setInterval(displayColor, 1000);
	window.setInterval(growSecondsBar, 1000);
	



}());
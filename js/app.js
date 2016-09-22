(function(){
	"use strict"

	// grab elements

	var body = document.getElementsByTagName('body');

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

		return [hour, minute, second];

	}

	function displayTime(){
		var timeLog = logCurrentTime();

		hours.textContent = ("0" + timeLog[0]).slice(-2);
		minutes.textContent = ("0" + timeLog[1]).slice(-2);
		seconds.textContent = ("0" + timeLog[2]).slice(-2);

	}


	window.setInterval(displayTime, 1000)
	



}());
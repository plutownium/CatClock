// notes: If LunchTime == "5-6 pm", I want my alarm clock to say "Lunch Time" at 5 pm
// if Nap Time == "3-4 pm", I want my alarm clock to say "Nap Time!" at 3 pm
// if Wake Up Time == "8-9 am", I want my alarm clock to say "Time to wake up!" at 8 am

const noon = 12;

let button = document.getElementById("alarmButton");

const image = document.querySelector("img");

const clock = document.getElementById("clock");

const displayText = document.getElementById("image-text");

const defaultCat =
	"C:\\Users\\Roland\\dir2_JS\\January_2020_cat_clock\\assets\\images\\cat-10.jpg";
const wakeupTimeCat =
	"C:\\Users\\Roland\\dir2_JS\\January_2020_cat_clock\\assets\\images\\cat-pet-animal.jpeg";
const lunchTimeCat =
	"C:\\Users\\Roland\\dir2_JS\\January_2020_cat_clock\\assets\\images\\pregnant+mama.jpg";
const napTimeCat =
	"C:\\Users\\Roland\\dir2_JS\\January_2020_cat_clock\\assets\\images\\pexels-photo.jpg";

const setAlarm = () => {
	if (button.innerText == "PARTY TIME! (Activate Alarm)") {
		// set the alarm
		setInterval(compareTimes, 5000);
		button.innerHTML = "PARTY OVER!";
	} else if (button.innerText == "PARTY OVER!") {
		// cancel and reset the app's state
		cancelAndResetAlarm();
		button.innerHTML = "PARTY TIME! (Activate Alarm)";
		console.log("444");
	}
};

button.addEventListener("click", setAlarm);

const changeImageSrc = (textToDisplay, imgSrc) => {
	// change the image src
	image.src = imgSrc;
	// change the text over the image
	displayText.innerHTML = textToDisplay;
};

const showCurrentTime = () => {
	// make the clock show the current time
	const today = new Date();
	let hours = today.getHours();
	let minutes = today.getMinutes();
	let seconds = today.getSeconds();
	let meridian = "AM";

	if (hours >= noon) {
		meridian = "PM";
	}
	if (hours > noon) {
		hours = hours - 12;
	}
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	let time = hours + ":" + minutes + ":" + seconds + " " + meridian + "!";

	// the heavy lifting: changing the actual time of the clock element
	clock.innerHTML = time;
	return time;
};

// console.log(clock.innerHTML);

const getSelectedTimeFromTimers = () => {
	// https://www.dyn-web.com/tutorials/forms/select/selected.php
	// get the selected time from the Timers
	const wakeupTimer = document.getElementById("wakeupTimer");
	const lunchTimer = document.getElementById("lunchTimer");
	const napTimer = document.getElementById("napTimer");
	return {
		wakeup: wakeupTimer.value,
		lunch: lunchTimer.value,
		nap: napTimer.value
	};
};

const compareTimes = () => {
	// compares the times selected in the Timers to the current time in showCurrentTime / on the clock
	const timers = getSelectedTimeFromTimers(); // {wakeup, lunch and nap}
	const today = new Date();
	let currentHour = today.getHours();
	for (const timer in timers) {
		// has to be "==", not "==="
		// when the time in Timers is equal to showCurrentTime, change the image.
		if (timers[timer] == currentHour) {
			// console.log("Match");
			if (timer == "wakeup") {
				changeImageSrc("Time to wake up!", wakeupTimeCat);
			} else if (timer == "lunch") {
				changeImageSrc("Time to eat!", lunchTimeCat);
			} else if (timer == "nap") {
				changeImageSrc("Time to take a nap!", napTimeCat);
			} else {
				console.log("error! none of wakeup/lunch/nap were given");
			}
		}
	}
};

const cancelAndResetAlarm = () => {
	// restore original state of app
	changeImageSrc("Yay, a cat!", defaultCat);
	defaultImageText();
};

const defaultImageText = () => {
	const today = new Date();
	let currentHour = today.getHours();
	console.log(currentHour);

	if (currentHour >= 4 && currentHour < 12) {
		displayText.innerHTML = "GOOD MORNING!";
	} else if (currentHour >= 12 && currentHour < 17) {
		displayText.innerHTML = "Good afternoon!";
	} else if (currentHour >= 17 && currentHour < 21) {
		displayText.innerHTML = "Good evening!";
	} else {
		displayText.innerHTML = "Good night.";
	}
};

// set image text to a time appropriate saying
defaultImageText();

// start the clock upon page load
showCurrentTime();
// keep the clock updating by calling showCurrentTime every 1 second
setInterval(showCurrentTime, 1000);

// button.addEventListener("click", compareTimes);

// TODO: align SET WAKEUP TIME with its associated selector (for lunchtime and naptime too)
// whats this TODO about? ^^^^^^^
// TODO: Make "YAY a cat" flash "good evening" after 6pm, "good afternoon" after noon, etc
// TODO: Allow timer to be set in advance, countdown til the alarm, then trigger when time == alarmTime
// FIXME: DOES the timer go off when set in advance?

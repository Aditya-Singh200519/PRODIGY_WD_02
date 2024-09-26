// Stopwatch logic
let timer;
let elapsedTime = 0;
let isRunning = false;
let startTime;
let lapCounter = 1;

// DOM Elements
const timerDisplay = document.querySelector("[data-timerDisplay]");
const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");
const resetButton = document.querySelector("[data-reset]");
const recordButton = document.querySelector("[data-record]");
const lapsList = document.querySelector("[data-lapsList]");

// Event Listeners
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
recordButton.addEventListener("click", recordLap);

// Format time into HH:MM:SS.SS
function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

// Pad numbers with leading zeros
function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

// Start the stopwatch
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 10);
    }
}

// Update the stopwatch display
function updateTimer() {
    elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
}

// Stop the stopwatch
function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

// Reset the stopwatch
function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    lapCounter = 1;
    timerDisplay.textContent = "00:00:00.00";
    lapsList.innerHTML = ''; // Clear laps
}

// Record a lap
function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
    }
}

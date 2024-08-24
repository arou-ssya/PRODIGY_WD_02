
let stopwatchTimer;
let stopwatchStartTime;
let stopwatchElapsedTime = 0;
let stopwatchPaused = false;

const stopwatchDisplay = document.getElementById('stopwatch-display');
const startStopwatchBtn = document.getElementById('start-stopwatch-btn');
const pauseStopwatchBtn = document.getElementById('pause-stopwatch-btn');
const lapBtn = document.getElementById('lap-btn');
const resetStopwatchBtn = document.getElementById('reset-stopwatch-btn');
const lapsList = document.getElementById('laps-list');


function updateStopwatchTime() {
    const now = Date.now();
    stopwatchElapsedTime += now - stopwatchStartTime;
    stopwatchStartTime = now;

    const time = new Date(stopwatchElapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');

    stopwatchDisplay.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startStopwatch() {
    if (!stopwatchPaused) stopwatchElapsedTime = 0;
    stopwatchPaused = false;
    stopwatchStartTime = Date.now();
    stopwatchTimer = setInterval(updateStopwatchTime, 10);
    startStopwatchBtn.disabled = true;
    pauseStopwatchBtn.disabled = false;
    lapBtn.disabled = false;
    resetStopwatchBtn.disabled = false;
}

function pauseStopwatch() {
    clearInterval(stopwatchTimer);
    stopwatchPaused = true;
    startStopwatchBtn.disabled = false;
    pauseStopwatchBtn.disabled = true;
}

function resetStopwatch() {
    clearInterval(stopwatchTimer);
    stopwatchElapsedTime = 0;
    stopwatchPaused = false;
    stopwatchDisplay.textContent = '00:00:00';
    startStopwatchBtn.disabled = false;
    pauseStopwatchBtn.disabled = true;
    lapBtn.disabled = true;
    resetStopwatchBtn.disabled = true;
    lapsList.innerHTML = '';
}

function recordLap() {
    const lapTime = stopwatchDisplay.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}

startStopwatchBtn.addEventListener('click', startStopwatch);
pauseStopwatchBtn.addEventListener('click', pauseStopwatch);
resetStopwatchBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

let countdownTimer;
let countdownEndTime;
let countdownPaused = false;

const countdownDisplay = document.getElementById('countdown-display');
const setTimerBtn = document.getElementById('set-timer-btn');
const startTimerBtn = document.getElementById('start-timer-btn');
const pauseTimerBtn = document.getElementById('pause-timer-btn');
const resetTimerBtn = document.getElementById('reset-timer-btn');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

function updateCountdownTime() {
    const now = Date.now();
    const timeRemaining = countdownEndTime - now;

    if (timeRemaining <= 0) {
        clearInterval(countdownTimer);
        countdownDisplay.textContent = '00:00:00';
        startTimerBtn.disabled = false;
        pauseTimerBtn.disabled = true;
        resetTimerBtn.disabled = true;
        return;
    }

    const time = new Date(timeRemaining);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');

    countdownDisplay.textContent = `${minutes}:${seconds}`;
}

function setCountdownTimer() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
    countdownEndTime = Date.now() + totalMilliseconds;
    countdownDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    resetTimerBtn.disabled = true;
}

function startCountdown() {
    if (!countdownPaused) {
        setCountdownTimer();
    }
    countdownPaused = false;
    countdownTimer = setInterval(updateCountdownTime, 1000);
    startTimerBtn.disabled = true;
    pauseTimerBtn.disabled = false;
    resetTimerBtn.disabled = false;
}

function pauseCountdown() {
    clearInterval(countdownTimer);
    countdownPaused = true;
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
}

function resetCountdown() {
    clearInterval(countdownTimer);
    countdownDisplay.textContent = '00:00:00';
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    resetTimerBtn.disabled = true;
}

setTimerBtn.addEventListener('click', setCountdownTimer);
startTimerBtn.addEventListener('click', startCountdown);
pauseTimerBtn.addEventListener('click', pauseCountdown);
resetTimerBtn.addEventListener('click', resetCountdown);

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let display = document.querySelector(".time h1");
let startBtn = document.querySelector(".btn1");
let stopBtn = document.querySelector(".btn2");
let resetBtn = document.querySelector(".btn3");
let lapBtn = document.querySelector(".btn4");
let lapList = document.querySelector(".lap-list");
let lapCount = 0;
let timer = null;

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;
  display.textContent = `${h}:${m}:${s}.${ms}`;
}

function startTimer() {
  if (timer !== null) return;
  timer = setInterval(() => {
    milliseconds++;
    if (milliseconds === 100) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 10); // every 10 milliseconds
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  updateDisplay();
  lapList.innerHTML = "";
  lapCount = 0;
  timer = null;
}

function addLap() {
  if (timer === null) return;
  lapCount++;
  const li = document.createElement("li");
  li.innerHTML = `Lap ${lapCount}: ${display.textContent} <button class="delete-lap">❌</button>`;
  lapList.appendChild(li);

  li.querySelector(".delete-lap").addEventListener("click", () => {
    lapList.removeChild(li);
  });
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);

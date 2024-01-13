let counter = 1;
let isPaused = false;
const intervalTime = 5000; // Czas dla automatycznego przewijania

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const playPauseBtn = document.querySelector('#pauseBtn');

function togglePlayPause() {
    isPaused = !isPaused;
    playPauseBtn.textContent = isPaused ? 'Wznów' : 'Pauza';
}

function changeSlide() {
    if (!isPaused) {
        document.querySelector('#radio' + counter).checked = true;
        counter++;
        if (counter > 6) {
            counter = 1;
        }
    }
}

const sliderInterval = setInterval(changeSlide, intervalTime);

prevBtn.addEventListener('click', () => {
    counter--;
    if (counter < 1) {
        counter = 6;
    }
    document.querySelector('#radio' + counter).checked = true;
});

nextBtn.addEventListener('click', () => {
    counter++;
    if (counter > 6) {
        counter = 1;
    }
    document.querySelector('#radio' + counter).checked = true;
});
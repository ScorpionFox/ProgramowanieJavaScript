document.addEventListener('keypress', onKeyPress);

const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4'),
    'g': document.querySelector('#s5'),
    'h': document.querySelector('#s6'),
    'j': document.querySelector('#s7')
};

const KeyToButton = {
    'a': document.querySelector('.piano-key[data-key="a"]'),
    's': document.querySelector('.piano-key[data-key="s"]'),
    'd': document.querySelector('.piano-key[data-key="d"]'),
    'f': document.querySelector('.piano-key[data-key="f"]'),
    'g': document.querySelector('.piano-key[data-key="g"]'),
    'h': document.querySelector('.piano-key[data-key="h"]'),
    'j': document.querySelector('.piano-key[data-key="j"]')
};

const startRecordButton = document.getElementById('startRecord');
const stopRecordButton = document.getElementById('stopRecord');
const playRecordButton = document.getElementById('playRecord');
const channelButtons = document.getElementById('channelButtons');

let isRecording = false;
let recordedSequences = {};
let activeChannel = 'a'; //checked

startRecordButton.addEventListener('click', startRecording);
stopRecordButton.addEventListener('click', stopRecording);
playRecordButton.addEventListener('click', playRecordedSequences);

function onKeyPress(event) {
    const sound = KeyToSound[event.key];
    playSound(sound);
    const button = KeyToButton[event.key];
    if (button) {
        buttonPressed(button);
        if (isRecording) {
            recordedSequences[activeChannel].push(event.key);
        }
    }
}

function playSound(sound) {
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

function buttonPressed(button) {
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 350);
}

function startRecording() {
    isRecording = true;
    recordedSequences[activeChannel] = [];
    startRecordButton.disabled = true;
    stopRecordButton.disabled = false;
    playRecordButton.disabled = true;
}

function stopRecording() {
    isRecording = false;
    startRecordButton.disabled = false;
    stopRecordButton.disabled = true;
    playRecordButton.disabled = false;
}

function playRecordedSequences() {
    if (Object.values(recordedSequences).every(sequence => sequence.length === 0)) {
        console.log("No recorded sequences. Record something first.");
        return;
    }

    startRecordButton.disabled = true;
    stopRecordButton.disabled = true;
    playRecordButton.disabled = true;

    const channels = Object.keys(recordedSequences);

    channels.forEach(channel => {
        const playButton = document.querySelector(`#channelButtons input[value="${channel}"]`);
        playButton.disabled = true;
    });

    const playChannel = activeChannel => {
        let index = 0;

        const intervalId = setInterval(() => {
            const key = recordedSequences[activeChannel][index];
            const sound = KeyToSound[key];
            playSound(sound);

            index++;

            if (index >= recordedSequences[activeChannel].length) {
                clearInterval(intervalId);
                startRecordButton.disabled = false;
                stopRecordButton.disabled = true;
                playRecordButton.disabled = false;
                channels.forEach(channel => {
                    const playButton = document.querySelector(`#channelButtons input[value="${channel}"]`);
                    playButton.disabled = false;
                });
            }
        }, 250);
    };

    if (activeChannel !== 'all') {
        playChannel(activeChannel);
    } else {
        channels.forEach(channel => playChannel(channel));
    }
}

function setActiveChannel(channel) {
    activeChannel = channel;
    playRecordButton.disabled = false;
}
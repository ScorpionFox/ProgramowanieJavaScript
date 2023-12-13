/* Odtwarzanie dźwięku i animacja przycisków */

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

function onKeyPress(event) {
    const sound = KeyToSound[event.key];
    playSound(sound);
    const button = KeyToButton[event.key];
    if (button) {
        buttonPressed(button);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function buttonPressed(button) {
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 500);
}

/* Nagrywarka */

document.addEventListener('DOMContentLoaded', () => {

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let recordedData = [];
let isRecording = false;
const recorder = audioContext.createScriptProcessor(4096, 1, 1);

recorder.onaudioprocess = function (e) {
  if (isRecording) {
    recordedData.push(new Float32Array(e.inputBuffer.getChannelData(0)));
  }
};

document.getElementById('startRecord').addEventListener('click', () => {
    recordedData = [];
    isRecording = true;

    recorder.onaudioprocess = function (e) {
        if (isRecording) {
            recordedData.push(new Float32Array(e.inputBuffer.getChannelData(0)));
        }
    };

    recorder.connect(audioContext.destination);

    
    document.getElementById('startRecord').disabled = true;
    document.getElementById('stopRecord').disabled = false;
    document.getElementById('playRecord').disabled = true;
});





















});
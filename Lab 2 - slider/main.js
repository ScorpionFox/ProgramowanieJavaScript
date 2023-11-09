// // notatnik z zajęć

// const main = document.querySelector('main')

// // jednorazowe wykonanie kodu po określonym czasie
// const timeoutRef = setTimeout(
//     () => {
//         main.innerHTML = 'Msg from setTimeout'
//     },
//     2000
// )

// // wykonywanie kodu co określony czas
// let licznik = 0
// const intervalRef = setInterval(
//     () => {
//         main.innerHTML = `Msg from setInterval: ${licznik++}`
//     },
//     4000
// )

// kasujemy setInterval
// clearInterval(intervalRef)

// kasujemy setTimeout
// clearTimeout(intervalRef)


// window.requestAnimationFrame

let counter = 1;
setInterval(function () {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 6) {
        counter = 1;
    }
}, 5000);

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
    counter--;
    if (counter < 1) {
        counter = 6;
    }
    document.getElementById('radio' + counter).checked = true;
});

nextBtn.addEventListener('click', () => {
    counter++;
    if (counter > 6) {
        counter = 1;
    }
    document.getElementById('radio' + counter).checked = true;
})
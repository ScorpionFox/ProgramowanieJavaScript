// notatnik z zajęć
////////////////////////////////////////////////////////////////////// SHAME VERSION
// const btnPrzelicz = document.querySelector("#przelicz");
// const wynikiPojemnik = document.querySelector("#wyniki");

// const liczba1 = document.querySelector("#liczba1");
// const liczba2 = document.querySelector("#liczba2");
// const liczba3 = document.querySelector("#liczba3");
// const liczba4 = document.querySelector("#liczba4");

// function przeliczWartosci() {
//   const l1 = parseInt(liczba1.value) || 0;
//   const l2 = parseInt(liczba2.value) || 0;
//   const l3 = parseInt(liczba3.value) || 0;

//   const sum = l1 + l2 + l3;
//   const avg = sum / 4;
//   const min = Math.min(l1, l2, l3);
//   const max = Math.max(l1, l2, l3);

//   wynikiPojemnik.innerHTML =
//     "Suma: " +
//     sum +
//     "<br>Srednia: " +
//     avg +
//     "<br>Min: " +
//     min +
//     "<br>Max: " +
//     max;
// }

////////////////////////////////////////////////////////////////////////// ZIEW VERSION

// let shouldCalculate = false;

// //Jak kliknie się przycisk, to przelicza wartosci i zmienia flage na true przez co będą się aktualizowały automatycznie
// btnPrzelicz.addEventListener("click", () => {
//   shouldCalculate = true;
//   przeliczWartosci();
// });

// // Automatyczne przeliczanie, jeśli był już kliknięty raz button Przelicz, flaga should calculate zmienia sie na true wtedy i przelicza sie samo
// liczba1.addEventListener("input", () => {
//   if (shouldCalculate) {
//     przeliczWartosci();
//   }
// });
// liczba2.addEventListener("input", () => {
//   if (shouldCalculate) {
//     przeliczWartosci();
//   }
// });
// liczba3.addEventListener("input", () => {
//   if (shouldCalculate) {
//     przeliczWartosci();
//   }
// });

//////////////////////////////////////////////////////////////// NORMAL VERSION
const btnPrzelicz = document.querySelector("#przelicz");
const wynikiPojemnik = document.querySelector("#wyniki");
const pola = document.querySelector("#pola");
const btnDodajPole = document.querySelector("#dodajpole");
const btnUsunPole = document.querySelector("#usunpole");
let shouldCalculate = false; //flaga do wykonywania automatycznego obliczania
let firstCalculation = true; //flaga do wykonania pierwszego obliczenia
let i = 4; //nr kolejnego pola do dodania i nr. jego id

//dodaj pole
btnDodajPole.addEventListener("click", () => {
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.id = `liczba${i}`;
  newInput.value = 0;
  newInput.placeholder = 0;
  pola.appendChild(newInput);
  pola.appendChild(document.createElement("br")); //dodaje br, żeby pola sie dodawały jedno pod drugim
  i++;
  if (shouldCalculate) {
    przeliczWartosci();
  }
  //console.log(i);
});

//usuń pole
btnUsunPole.addEventListener("click", () => {
  if (i > 4) {
    const lastInput = document.querySelector(`#liczba${i - 1}`);
    pola.removeChild(lastInput);
    pola.removeChild(pola.lastChild); // usuwa br
    i--;
    if (shouldCalculate) {
      przeliczWartosci();
    }
    //console.log(i);
  }
});

function przeliczWartosci() {
  const inputs = Array.from(pola.querySelectorAll("input")); // Node list, konwersja na tablice zeby mozna bylo uzyc map
  let sum = 0;

  inputs.forEach((input) => {
    const value = parseInt(input.value) || 0; // || 0, aby uniknąć NaN przy parsowaniu
    sum += value;
  });

  const avg = sum / inputs.length;
  const min = Math.min(...inputs.map((input) => parseInt(input.value) || 0)); // spread operator konwertuje node list (inputs) na tablice, przez co można wykonać operacje map
  const max = Math.max(...inputs.map((input) => parseInt(input.value) || 0));

  wynikiPojemnik.innerHTML =
    "<div id='javascript'>" +
    "Suma: " +
    sum +
    "<br>Średnia: " +
    avg +
    "<br>Min: " +
    min +
    "<br>Max: " +
    max +
    "</div>";
}

//przelicza po kliknięciu przycisku
btnPrzelicz.addEventListener("click", () => {
  if (firstCalculation) {
    przeliczWartosci();
    firstCalculation = false;
  }
  shouldCalculate = true;
});

//jak przycisk już raz został kliknięty to przelicza automatycznie

pola.addEventListener("input", (event) => {
  //nasłuchuje zdarzeń w divie pola, w którym są inputy
  if (shouldCalculate) {
    przeliczWartosci();
  }
});

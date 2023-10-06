// notatnik z zajęć
const btnPrzelicz = document.querySelector('#przelicz');
const wynikiPojemnik = document.querySelector('#wyniki');
const liczba1 = document.querySelector('#liczba1');
const liczba2 = document.querySelector('#liczba2');
const liczba3 = document.querySelector('#liczba3');
const liczba4 = document.querySelector('#liczba4');

function przeliczSumę() {
    const l1 = parseInt(liczba1.value) || 0; // Konwersja na liczbę, ustawienie na 0, jeśli nie można sparsować.
    const l2 = parseInt(liczba2.value) || 0;
    const l3 = parseInt(liczba3.value) || 0;
    const l4 = parseInt(liczba4.value) || 0;

    const sum = l1 + l2 + l3 + l4;
    const avg = sum / 4;
    const min = Math.min(l1, l2, l3, l4);
    const max = Math.max(l1, l2, l3, l4);

    wynikiPojemnik.innerHTML = 'Suma: ' + sum + '<br>Srednia: ' + avg + '<br>Min: ' + min + '<br>Max: ' + max;
}

// Nasłuchuj zmian w polach tekstowych i uruchamiaj funkcję przeliczSumę przy każdej zmianie.
liczba1.addEventListener('input', przeliczSumę);
liczba2.addEventListener('input', przeliczSumę);
liczba3.addEventListener('input', przeliczSumę);
liczba4.addEventListener('input', przeliczSumę);
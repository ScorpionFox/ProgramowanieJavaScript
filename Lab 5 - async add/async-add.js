// Funkcja dodawania dwóch liczb
function asyncAdd(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 100);
  });
}

// Funkcja dodawania dowolnej ilości liczb asynchronicznie
async function addNumbersAsync(...numbers) {
  let sum = 0;

  for (const num of numbers) {
    sum = await asyncAdd(sum, num);
  }

  return sum;
}

// Funkcja mierząca czas wykonania
async function measureExecutionTimeAsync(func, ...args) {
  const startTime = performance.now();
  const result = await func(...args);
  const endTime = performance.now();
  const executionTime = endTime - startTime;

  console.log(`Pomiar czasu wykonania zakończony.`);
  console.log(`Czas wykonania: ${executionTime} ms`);
  console.log(`Wartość sumy obecnej: ${result}`);

  return { result, executionTime };
}

// Testowanie dla zbioru danych o wielkości 100 elementów
const data = Array.from({ length: 100 }, (_, index) => index + 1);

// Zoptymalizowana funkcja dodająca dla zbioru danych
async function addNumbersOptimizedAsync(...numbers) {
  const promises = numbers.map(async (num) => {
    const result = await asyncAdd(0, num);
    console.log(`Dodawana liczba ${num}`);
    return result;
  });

  const results = await Promise.all(promises);
  const sum = results.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  console.log(`Wartość sumy po wszystkich iteracjach: ${sum}`);
  return sum;
}

// Do wyświetlenia wyników w HTML
const timeElement = document.getElementById("time");
const countsElement = document.getElementById("counts");
const sumElement = document.getElementById("sum");

// Funkcja mierząca czas wykonania
measureExecutionTimeAsync(addNumbersOptimizedAsync, ...data)
  .then(({ result, executionTime }) => {
    console.log(`Wynik dodawania: ${result}`);
    console.log(`Czas wykonania: ${executionTime} ms`);
    console.log(`Ilość operacji asynchronicznych: ${data.length}`);

    // Aktualizacja zawartości
    sumElement.textContent = `${result}`;
    timeElement.textContent = `${executionTime} ms`;
    countsElement.textContent = `${data.length}`;
  })
  .catch((error) => {
    console.error("Wystąpił błąd:", error);
  });
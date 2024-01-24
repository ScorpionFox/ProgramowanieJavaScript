// Function to execute a given function periodically and update a UI element
function interval(something, updateFunction) {
  let timer = 1;
  setInterval(() => {
    const data = something(timer);
    updateFunction(data);
    timer++;
  }, 2000);
}

// Function to save data to session storage, log to the console, and return the logged data
function saveCToSessionStorage(data, loggerFunction, updateFunction) {
  console.log("[reader C]", data);
  const storageData = { data };
  sessionStorage.setItem("C", JSON.stringify(storageData));
  loggerFunction(`[log from C] ${data}`);
  updateFunction(data);
  return data;
}

// Function to generate a random powerball number based on the input data
function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100);
  console.log("[powerball number]", number);
  return number;
}

// Logger class to log data to the console
class Logger {
  static log(data) {
    console.log(data);
  }
}

// Update in HTML
function updateReaderCResult(data) {
  document.getElementById("readerCResult").innerText = data;
}

function updateLogFromC(data) {
  document.getElementById("logFromC").innerText = data;
}

function updatePowerballNumber(data) {
  document.getElementById("powerballNumber").innerText = data;
}

// Execute intervals for different functions
interval((timer) => saveCToSessionStorage(timer, Logger.log, updateLogFromC), updateReaderCResult);
interval(discoverPowerBallNumber, updatePowerballNumber);

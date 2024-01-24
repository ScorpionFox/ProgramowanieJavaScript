// Function to execute a given function periodically and update a UI element
function interval(something, updateFunction) {
  let timer = 1;
  setInterval(() => {
    const data = something(timer);
    updateFunction(data);
    timer++;
  }, 2000);
}

// Logger class to log data to the console and return the logged data
class Logger {
  static log(data) {
    console.log(data);
    return data;
  }
}

// Function to save data to session storage, log to the console, and return the logged data
function saveCToSessionStorage(data) {
  console.log("[reader C]", data);
  const storageData = { data };
  sessionStorage.setItem("C", JSON.stringify(storageData));
  const logData = Logger.log(`${data}`);
  return logData;
}

// Function to generate a random powerball number based on the input data
function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100);
  console.log("[powerball number]", number);
  return number;
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
interval(saveCToSessionStorage, updateReaderCResult);
interval(discoverPowerBallNumber, updatePowerballNumber);
interval((timer) => ` ${timer}`, updateLogFromC);
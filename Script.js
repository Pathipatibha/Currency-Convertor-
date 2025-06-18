const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

// Fetch currency list and populate dropdowns
fetch("https://api.exchangerate.host/symbols")
  .then((res) => res.json())
  .then((data) => {
    const symbols = data.symbols;
    for (const code in symbols) {
      const option1 = new Option(code, code);
      const option2 = new Option(code, code);
      fromCurrency.add(option1);
      toCurrency.add(option2);
    }
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  });

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === "" || isNaN(amount)) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      result.innerText = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
    })
    .catch(() => {
      result.innerText = "Error fetching exchange rates.";
    });
}

// script.js
document.addEventListener("DOMContentLoaded", () => {
  const resultDisplay = document.getElementById("result");
  let currentInput = "0";
  let previousInput = null;
  let operator = null;

  const updateDisplay = () => {
    resultDisplay.textContent = currentInput;
  };

  const handleClear = () => {
    currentInput = "0";
    previousInput = null;
    operator = null;
    updateDisplay();
  };

  const handleNumber = (value) => {
    if (currentInput === "0") {
      currentInput = value;
    } else {
      currentInput += value;
    }
    updateDisplay();
  };

  const handleOperator = (value) => {
    if (operator && previousInput !== null) {
      currentInput = calculate(previousInput, operator, parseFloat(currentInput)).toString();
    }
    previousInput = parseFloat(currentInput);
    operator = value;
    currentInput = "0";
  };

  const handleEquals = () => {
    if (operator && previousInput !== null) {
      currentInput = calculate(previousInput, operator, parseFloat(currentInput)).toString();
      operator = null;
      previousInput = null;
      updateDisplay();
    }
  };

  const calculate = (a, operator, b) => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return 0;
    }
  };

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;

      if (!isNaN(value) || value === ".") {
        handleNumber(value);
      } else if (value === "clear") {
        handleClear();
      } else if (value === "=") {
        handleEquals();
      } else {
        handleOperator(value);
      }
    });
  });

  updateDisplay();
});

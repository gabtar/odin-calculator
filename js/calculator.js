document.addEventListener('DOMContentLoaded', () => {

  // Number input
  document.querySelectorAll('.number').forEach(function (number) {
    number.addEventListener('click', () => {
      enterNumber(number.value);
    }); 
  });

  // Operation input
  document.querySelectorAll('.operator').forEach(function (operation) {
    operation.addEventListener('click', () => {
      enterOperation(operation.id);
    }); 
  });

  // Clear input
  document.querySelector('.clear').addEventListener('click', clear);

  // Undo last number pressed
  document.querySelector('.backspace').addEventListener('click', () => {
    setDisplayValue(getDisplayValue().slice(0,-1));
  });

  // Dot input
  document.querySelector('.dot').addEventListener('click', dot);

  // Sign input
  document.querySelector('.sign').addEventListener('click', () => {
    if(getDisplayValue().indexOf("-") == -1) {
      setDisplayValue("-" + getDisplayValue());
    } else {
      setDisplayValue(getDisplayValue().slice(1)); 
    }
  });

  // Keyboard support
  document.addEventListener("keydown", (event) => {
    switch(event.key) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        enterNumber(event.key);
        break;
      case "+":
        enterOperation("add");
        break;
      case "-":
        enterOperation("subtract");
        break;
      case "*":
        enterOperation("multiply");
        break;
      case "/":
        enterOperation("divide");
        break;
      case "Enter":
        enterOperation("equals");
        break;
      case "Delete":
        clear()
        break;
      case "Backspace":
        undo()
        break;
      case ".":
        dot()
        break;
    }
  });

});

// Globals
let lastResult = ""; // When any operation button is pressed, the current display value or the result calculation will be sotred here!
let currentOperation = ""; 
let lastOperation = "";

// Operations availables
const operations = {
  add: (numberOne, numberTwo) => numberOne + numberTwo,
  subtract: (numberOne, numberTwo) => numberOne - numberTwo,
  multiply: (numberOne, numberTwo) => numberOne * numberTwo,
  divide: (numberOne, numberTwo) => numberOne / numberTwo,
  power: (numberOne, numberTwo) => Math.pow(numberOne, numberTwo),
  equals: () => lastResult
}

// Functions
const getDisplayValue = () => document.getElementById('display').value;
const setDisplayValue = number => document.getElementById('display').value = number;
const setPlaceholder = value => document.getElementById('display').placeholder = value;

const calculate = (operation, numberOne = 0, numberTwo = 0) => {
  return operations[operation](parseFloat(numberOne),parseFloat(numberTwo)); 
}

const enterNumber = (number) => {
  // Limit to 15 digits
  if(getDisplayValue().length <= 15) {
    setDisplayValue(getDisplayValue() + number);
  }
}

const enterOperation = (operation) => {
  if(getDisplayValue() || lastOperation == 'equals') {
    currentOperation = operation
    // If there is an operation in progress, calculate the last result using old stored value
    if(lastResult) {
      lastResult = lastOperation == 'equals' ? lastResult : calculate(lastOperation , lastResult, getDisplayValue());
    } else {
      lastResult = getDisplayValue();
    }
    setPlaceholder(lastResult);
    setDisplayValue("");
    lastOperation = currentOperation;
  }
}

const clear = () => {
    lastResult = "";
    setDisplayValue("");
    setPlaceholder("0");
};

const undo = () => setDisplayValue(getDisplayValue().slice(0,-1));

const dot = () => {
  if(getDisplayValue().indexOf(".") == -1) {
    setDisplayValue(getDisplayValue() + ".");
  }
} 

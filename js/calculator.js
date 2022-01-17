document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.number').forEach(function (number) {
    number.addEventListener('click', () => {
      setDisplayValue(getDisplayValue() + number.value)
    }); 
  });

  document.querySelectorAll('.operator').forEach(function (operation) {
    operation.addEventListener('click', () => {
      // If it's stored a previous value, just calculate operations so far and store the new value
      if(displayValue) {
        setDisplayValue(calculate(operation.id, displayValue, getDisplayValue()))
      }
      displayValue = getDisplayValue();
      setDisplayValue("");
      console.log(displayValue);
    });

  });

  document.querySelector('.clear').addEventListener('click', () => {
    displayValue = "";
    setDisplayValue("");
  });

});

let displayValue = ""; // When any operation button is pressed, the current display value will be sotred here!

// Operations available
const operations = {
  add: (numberOne, numberTwo) => numberOne + numberTwo,
  subtract: (numberOne, numberTwo) => numberOne - numberTwo,
  multiply: (numberOne, numberTwo) => numberOne * numberTwo,
  divide: (numberOne, numberTwo) => numberOne / numberTwo,
  sqrt: (numberOne) => Math.sqrt(numberOne),
  power: (numberOne, numberTwo) => Math.pow(numberOne, numberTwo)
}

const getDisplayValue = () => document.getElementById('display').value;
const setDisplayValue = (number) => document.getElementById('display').value = number;

const calculate = (operation, numberOne, numberTwo = 0 ) => {
  return operations[operation](parseInt(numberOne),parseInt(numberTwo));
}

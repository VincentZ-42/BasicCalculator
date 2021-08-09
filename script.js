const lastOperation = document.getElementById('lastOperation');
const currOperation = document.getElementById('currOperation');
const numBtns = document.querySelectorAll('[number]')
const opsBtns = document.querySelectorAll('[operator]')
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const equalBtn = document.getElementById('equal');
let numbers = []; // [1st num, 2nd num, result]

// Listener Events
clearBtn.onclick = () => clearAll();
equalBtn.onclick = () => calculate();
deleteBtn.onclick =() => deleteLastChar();
numBtns.forEach(btn => btn.addEventListener('click', (e) => inputNumber(e.target.value)));
opsBtns.forEach(num => num.addEventListener('click', (e) => setOperation(e.target.value)));

const add = (a, b) => { return a + b };
const subtract = (a, b) => { return a - b };
const multiply = (a, b) => { return a * b };
const divide = (a, b) => { return a / b };

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'x':
      return multiply(a, b);
    case '/':
      return divide(a, b);
  }
} 

function clearNumList() {
  do {
    numbers.shift();
  } while (numbers.length > 0)
}

function clearAll() {
  lastOperation.innerHTML = '';
  currOperation.innerHTML = '';
  numbers = [];
}

function calculate() {
  if (numbers.length === 1) {
    numbers.push(Number(currOperation.textContent));
    const operator = lastOperation.textContent.charAt(lastOperation.textContent.length - 1);
    const result = operate(operator, numbers[0], numbers[1]);
    numbers.push(result);
    lastOperation.textContent += ` ${currOperation.textContent} = ${result}`;
    currOperation.textContent = ``;
  }
}

function deleteLastChar() {
  currOperation.textContent = currOperation.textContent.slice(0, -1);
}

function inputNumber(num) {
  if (numbers.length === 2) {
    clearNumList();
  } else {
    currOperation.textContent += num;
  }
}

function setOperation(operator) {
  
  if (numbers.length === 0) {
    numbers.push(Number(currOperation.textContent));
    lastOperation.textContent = `${currOperation.textContent} ${operator}`;
    currOperation.textContent = '';
  } else if (numbers.length === 1) {
    const lastOp = lastOperation.textContent.charAt(lastOperation.textContent.length - 1);
    const result = operate(lastOp, numbers.shift(), Number(currOperation.textContent));
    numbers.push(result);
    lastOperation.textContent = `${result} ${operator}`;
    currOperation.textContent = '';
  } else { //numbers.length === 2
    const temp = numbers[2];
    clearNumList();
    numbers.push(temp);
    lastOperation.textContent = `${numbers[0]} ${operator}`
  }
}
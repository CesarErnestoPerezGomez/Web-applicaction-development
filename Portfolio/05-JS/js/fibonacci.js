function fibonacci(n) {
  if (n <= 1) {
      return n;
  } else {
      return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

function displayFibonacci() {
  const positionInput = document.getElementById("positionInput").value;
  const resultElement = document.getElementById("result");

  const position = parseInt(positionInput);
  const fibonacciNumber = fibonacci(position);

  resultElement.textContent = `Fibonacci number at position ${position} is: ${fibonacciNumber}`;
}

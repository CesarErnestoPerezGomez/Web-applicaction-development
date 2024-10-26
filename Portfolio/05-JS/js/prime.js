var getPrimeFactors = function (n) {
    "use strict";
  
    function isPrime(n) {
      var i;
      for (i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
          return false;
        }
      }
      return true;
    }
  
    var i,
      sequence = [];
  
    for (i = 2; i <= n; i++) {
      while (n % i === 0) {     
        if (isPrime(i)) {         
          sequence.push(i);       
        }
        n /= i;                  
      }
    }
  
    return sequence;
  };
  
  console.log(getPrimeFactors(30030)); 
  

function sieveOfEratosthenes(n) {
    let isPrime = Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false; 

    for (let p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i <= n; i += p) {
                isPrime[i] = false;
            }
        }
    }

    let primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }
    return primes;
}

function calculatePrimes() {
    const n = parseInt(document.getElementById("numberInput").value);
    const primes = sieveOfEratosthenes(n);
    document.getElementById("result").textContent = primes.join(", ");
}

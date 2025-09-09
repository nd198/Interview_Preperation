// In this example, if http://external-service:3001/data starts failing or timing out frequently, 
// opossum will open the circuit, and subsequent calls to breaker.fire() will immediately return 
// the fallback data without attempting the actual HTTP request until the resetTimeout elapses.
const CircuitBreaker = require('opossum');
const axios = require('axios');

// Define the function that makes the potentially failing call
async function callExternalService() {
  console.log('Attempting to call external service...');
  const response = await axios.get('http://external-service:3001/data');
  return response.data;
}

// Configure the circuit breaker
const options = {
  timeout: 3000,      // If our function takes longer than 3 seconds, trigger a timeout
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 10000,   // After 10 seconds, move to half-open state
  name: 'ExternalServiceCircuit',
};

const breaker = new CircuitBreaker(callExternalService, options);

// Define a fallback function when the circuit is open
breaker.fallback(() => {
  console.log('Circuit is OPEN or timed out! Returning fallback data.');
  return { message: 'Fallback data: Service temporarily unavailable' };
});

breaker.on('open', () => console.warn(`Circuit ${breaker.name} is OPEN`));
breaker.on('halfOpen', () => console.log(`Circuit ${breaker.name} is HALF_OPEN`));
breaker.on('close', () => console.log(`Circuit ${breaker.name} is CLOSED`));
breaker.on('fire', () => console.log('Circuit fired a request'));
breaker.on('success', () => console.log('Request succeeded'));
breaker.on('reject', () => console.warn('Request rejected (circuit open)'));
breaker.on('timeout', () => console.warn('Request timed out'));
breaker.on('failure', (err) => console.error(`Request failed: ${err.message}`));

// Use the circuit breaker to make calls
async function fetchData() {
  try {
    const data = await breaker.fire();
    console.log('Received data:', data);
  } catch (error) {
    console.error('Error with circuit breaker:', error.message);
  }
}

// Simulate calls over time
setInterval(fetchData, 1000);
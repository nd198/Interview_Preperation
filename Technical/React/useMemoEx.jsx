import React, { useState, useMemo } from 'react';

// An intentionally slow factorial calculation function
const factorial = (n) => {
  console.log(`Calculating factorial for ${n}...`);
  if (n < 0) return -1;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    // Simulate heavy computation
    for (let j = 0; j < 10000000; j++) {} // Intensive loop
    result *= i;
  }
  return result;
};

function FactorialCalculator() {
  const [number, setNumber] = useState(1);
  const [incrementor, setIncrementor] = useState(0);

  // Without useMemo: factorial(number) would be called on EVERY render,
  // even if 'number' hasn't changed (e.g., when 'incrementor' changes).
  // const result = factorial(number);

  // With useMemo: factorial(number) will only be called when 'number' changes.
  // If 'incrementor' changes, but 'number' stays the same, 'result' will be
  // pulled from the cache.
  const memoizedResult = useMemo(() => factorial(number), [number]);

  return (
    <div>
      <h3>Factorial Calculator with `useMemo`</h3>
      <p>
        Number: {number}{' '}
        <button onClick={() => setNumber(number + 1)}>
          Increment Number
        </button>
      </p>
      <p>
        Factorial Result (Memoized): {memoizedResult}
      </p>

      <hr />

      <p>
        Incrementor: {incrementor}{' '}
        <button onClick={() => setIncrementor(incrementor + 1)}>
          Increment Incrementor (triggers re-render)
        </button>
      </p>

      <p>
        **Check console logs: Notice "Calculating factorial..." only when "Increment Number" is clicked.**
      </p>
    </div>
  );
}

export default FactorialCalculator;
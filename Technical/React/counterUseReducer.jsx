import React, { useReducer } from 'react';

// 1. Define the reducer function
// This function contains ALL the state update logic.
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'INCREMENT_BY_VALUE':
      // The action can carry a 'payload' (additional data)
      return { count: state.count + action.value };
    case 'DECREMENT_BY_VALUE':
      return { count: state.count - action.value };
    default:
      // Always throw an error for unknown action types in development
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// Optional: Lazy initialization function
const init = (initialCount) => ({ count: initialCount });

function ComplexCounter({ initialCount = 0 }) {
  // 2. Use useReducer Hook
  //    - counterReducer: The function that manages state updates
  //    - initialCount: The initial argument for the init function (or initial state if init is not provided)
  //    - init: The lazy initializer function
  const [state, dispatch] = useReducer(counterReducer, initialCount, init);

  return (
    <div>
      <h3>Complex Counter (useReducer)</h3>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'INCREMENT_BY_VALUE', value: 5 })}>
        Increment by 5
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT_BY_VALUE', value: 10 })}>
        Decrement by 10
      </button>
    </div>
  );
}

export default ComplexCounter;
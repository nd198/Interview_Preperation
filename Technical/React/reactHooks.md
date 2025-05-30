# React Hooks
**useEffect**
The useEffect Hook lets you perform side effects in functional components. Side effects are operations that interact with the "outside world" of your component, such as data fetching, subscriptions, manual DOM manipulation, or setting up event listeners. It serves a similar purpose to componentDidMount, componentDidUpdate, and componentWillUnmount in class components, but unified into a single API.

import React, { useState, useEffect } from 'react';

function TitleUpdater() {
  const [count, setCount] = useState(0);

 ` // This effect runs after every render where 'count' has changed.
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log('Document title updated!');

    // Optional cleanup function: This runs before the component unmounts
    // or before the effect runs again due to a dependency change.
    return () => {
      console.log('Cleanup before next effect or unmount');
    };
  }, [count]); // Dependency array: Effect only re-runs if 'count' changes.

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>
    </div>
  );
}`


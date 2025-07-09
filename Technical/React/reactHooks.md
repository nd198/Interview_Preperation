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

**useState**
  > useState is a React Hook that lets you add a state variable to your component.
  > Call useState at the top level of your component to declare a state variable.
  > useState returns an array with exactly two values:
      1) The current state. During the first render, it will match the initialState you have passed.
      2) The set function that lets you update the state to a different value and trigger a re-render.

  `const [state, setState] = useState(initialState)
  `

  `  import { useState } from 'react';
  export default function Counter() {
    const [count, setCount] = useState(0);

    function handleClick() {
      setCount(count + 1);
    }

    return (
      <button onClick={handleClick}>
        You pressed me {count} times
      </button>
    );
  }`

**useReducer**
  > useReducer is a React Hook that lets you add a reducer to your component.
  > Call useReducer at the top level of your component to manage its state with a reducer.

  The useReducer Hook is a powerful and often more suitable alternative to useState for managing complex state logic in React function components. It's particularly useful when:

  **State transitions are complex**: Your state updates involve multiple sub-values, and the next state depends on the previous one in intricate ways.

  **State logic involves multiple actions**: You have several different types of actions that can modify the state.

  **State updates are spread across many event handlers**: You want to centralize the state update logic rather than scattering useState calls across various parts of your component.

  **Core Concepts**
  useReducer is conceptually similar to the reduce method in JavaScript arrays (e.g., array.reduce(reducer, initialValue)), and it's inspired by the way Redux manages state. It works with three main parts:

  1) reducer function: This is a pure function that takes the current state and an action as arguments, and returns the new state.
      > reducer(state, action) => newState
      > It should be pure: given the same state and action, it should always return the same newState and have no side effects.

  2) nitialState: The initial value of your state.

  3) dispatch function: This is a function that you get back from useReducer. You call dispatch(action) to trigger a state update. The action is an object (or any value) that describes "what happened."

  You need to pass state updates down to deeply nested components: useReducer often pairs well with useContext for global state management, similar to how Redux works.

  `const [state, dispatch] = useReducer(reducer, initialArg, init?)

  **state**: The current state value, managed by the reducer.

  **dispatch**: A function you use to "dispatch" actions. When dispatch is called, React will re-render the component and pass the action to your reducer function to calculate the new state.

  **reducer**: Your state-managing function ((state, action) => newState).

  **initialState**: The initial value of the state.

  **init (optional)**: An optional function that can compute the initial state lazily. This is useful for expensive initial state calculations or when the initial state needs to be derived from props. init(initialArg) => initialState. If provided, initialState acts as the initialArg.

  **When to Prefer useReducer over useState:**
  **Complex state structure**: When your state is an object or array with multiple properties that need coordinated updates.

  **State updates depend on previous state**: While useState has a functional update form (setCount(prevCount => prevCount + 1)), useReducer excels when multiple parts of the state depend on each other.

  **Frequent updates or many different update types**: If you have many setX, setY, setZ calls, consolidating them into a reducer can make the component cleaner.

  **Logic needs to be easily testable**: Reducer functions are pure, making them very easy to unit test in isolation.

  **Global state management with useContext**: useReducer is often paired with useContext to create a custom global state management solution that mimics Redux for certain parts of your application.

  When passing down dispatch is easier than passing down multiple set functions: You can pass the dispatch function down through context or props without worrying about specific state setters for each piece of state.

  Ex. counterUseReducer.jsx


  **UseContext**
  The useContext Hook is a fundamental React Hook that allows you to consume (read) values from React Context within a function component.
  React Context provides a way to pass data through the component tree without having to pass props down manually at every level. This solves the problem of "prop drilling" 
      `const contextValue = useContext(MyContext);`

  **Common example**
    1) Theming an Application
  
  **Benefits of useContext:**
      > Avoids Prop Drilling: No need to pass theme props down through intermediate components that don't directly use them.

      > Cleaner Code: useContext(MyContext) is much more concise than MyContext.Consumer render props.

      > Centralized State for Global Concerns: Excellent for data that is truly "global" or needed by many unrelated components (e.g., current user, language settings, UI themes).

      > Readability: It makes it clear that a component is consuming a global piece of state, rather than receiving it via props from its direct parent.

  **Important Considerations:**
    **Re-renders**: When the value passed to a Context.Provider changes, all components consuming that context (using useContext) will re-render, even if they only use a small part of the value. For very frequently updating or large contexts, this might lead to performance concerns, in which case useMemo or splitting contexts might be necessary.

    **Not a Replacement for Redux/Zustand**: While useContext can manage state, for truly large and complex application-wide state management with frequent updates and complex actions, a dedicated state management library (like Redux, Zustand, Recoil, Jotai) combined with useReducer and useContext often provides more robust and scalable solutions. useContext is best for less frequently updated, "global-ish" data.

    **Provider Placement**: Ensure the Context.Provider is placed high enough in your component tree so that all components that need to consume its value are within its subtree.

  **use memo**
    useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
    It helps optimize performance by preventing re-computation of values on every render if the dependencies of that calculation haven't changed.
    `const cachedValue = useMemo(calculateValue, dependencies)`
    `const visibleTodos = useMemo(() => filterTodos(todos, tab),[todos, tab]);`

   **You need to pass two things to useMemo:**
    1) A calculation function that takes no arguments, like () =>, and returns what you wanted to calculate.
    calculateValue: The function calculating the value that you want to cache. It should be pure, should take no arguments, and should return a value of any type. React will call your function during the initial render. On next renders, React will return the same value again if the dependencies have not changed since the last render. Otherwise, it will call calculateValue, return its result, and store it so it can be reused later.
    2) A list of dependencies including every value within your component that’s used inside your calculation.
    dependencies: The list of all reactive values referenced inside of the calculateValue code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is configured for React, it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like [dep1, dep2, dep3]. React will compare each dependency with its previous value using the Object.is comparison.

    On the initial render, the value you’ll get from useMemo will be the result of calling your calculation.

    On every subsequent render, React will compare the dependencies with the dependencies you passed during the last render. If none of the dependencies have changed (compared with Object.is), useMemo will return the value you already calculated before. Otherwise, React will re-run your calculation and return the new value.

    **Explanation**
      `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`

      **computeExpensiveValue(a, b)**: This is the function that performs your potentially expensive calculation. useMemo will call this function and cache its returned value.

      **[a, b] (Dependency Array)**: This is an array of dependencies. useMemo will only re-run the computeExpensiveValue function if any value in this array has changed since the last render.

      > If the array is empty ([]), the function will run only once on the initial render.

      > If you omit the dependency array, the function will re-run on every render, defeating the purpose of useMemo.

      > Crucially: Ensure all values used inside your computeExpensiveValue function are listed in the dependency array. Failing to do so can lead to stale closures and bugs where the memoized value doesn't update when it should. 

      **When NOT to Use useMemo:**
      For Every Calculation: Don't use useMemo indiscriminately. Memoization itself has an overhead (storing the previous value, comparing dependencies). For simple calculations, the overhead might outweigh the benefits.

      For Side Effects: useMemo is for pure calculations. If you need to perform side effects (like data fetching, subscriptions, DOM manipulation), useEffect is the appropriate Hook.

      If Dependencies Change Frequently: If the dependencies of your useMemo call change on almost every render, then useMemo won't provide much benefit, as the memoized function will almost always re-run. 



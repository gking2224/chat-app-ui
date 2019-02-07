import * as React from 'react';

interface CounterProps {

}
interface CounterState {

}
const Counter = (props: CounterProps) => {
  const [counter, setCounter] = React.useState(0);

  const increment = () => setCounter(counter + 1);
  return (
    <>
      <p>Count: {counter}</p>
      <button onClick={increment}>Increment</button>
    </>
  );
}

export default Counter;

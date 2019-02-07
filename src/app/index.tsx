import * as React from 'react';
import { render } from 'react-dom';
import App from './App';

const doRender = (Component: React.ComponentType) => render(<Component />, document.getElementById('react-root'));

const Root = () => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  return (
    <div>
      <p>App</p>
      {mounted && <App onUnmount={() => setMounted(false)} />}
      {!mounted && <button onClick={() => setMounted(true)}>Re-mount</button>}
    </div>
  )
}
doRender(Root);

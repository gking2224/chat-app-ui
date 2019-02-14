import * as React from 'react';
import { render } from 'react-dom';
import App from './App';

const doRender = (Component: React.ComponentType) => render(<Component />, document.getElementById('react-root'));

const Root = () => {
  return (
    <div>
      <App />
    </div>
  );
};
doRender(Root);

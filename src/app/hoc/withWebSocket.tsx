import * as React from 'react';

export const WebsocketContext = React.createContext(null);

export default (Component: React.ComponentType<any>) => {
  const HocComponent = (props: any) => {
    <WebsocketContext.Consumer>
      {connection => <Component {...props} connection={connection} />}
    </WebsocketContext.Consumer>
  }
  return HocComponent;
};

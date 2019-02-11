import * as React from 'react';

export const WebsocketContext = React.createContext<WebSocket | null>(null);

export interface WebsocketProps<S, R> {
  connection: WebSocket;
  send: (data: S) => void;
}

export default <P, S, R>(Component: React.ComponentType<P & WebsocketProps<S, R>>): React.ComponentType<P> => {
  const HocComponent = (props: P) => (
    <WebsocketContext.Consumer>
      {(connection) => {
        if (!connection) return null;
        const onSend = (message: S) => connection.send(JSON.stringify(message));
        return <Component {...props} connection={connection} send={onSend} />;
      }}
    </WebsocketContext.Consumer>
  );
  return HocComponent;
};

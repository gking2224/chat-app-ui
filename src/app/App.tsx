import * as React from 'react';
import { WebsocketContext } from './hoc/withWebSocket';
import Messages from './view/organisms/messages/Messages';
import useWebsocket from './hooks/use-websocket';

interface AppActions {
  readonly onUnmount: () => void;
}
const App = (props: AppActions) => {
  const [connection, connectionStatus, disconnect] = useWebsocket(props.onUnmount);

  return (
    <WebsocketContext.Provider value={connection}>
      <p>Connection Status: {connectionStatus}</p>
      <Messages />
      <button onClick={disconnect}>Disconnect</button>
    </WebsocketContext.Provider>
  );
}

export default App;

import * as React from 'react';
import { WebsocketContext } from './hoc/withWebSocket';
import Messages from './organisms/messages/Messages';

const WS_ENDPOINT = 'wss://ka2k09zdag.execute-api.eu-west-1.amazonaws.com/dev';

type ConnectionStatus = 'init' | 'connected' | 'disconnecting';

interface AppActions {
  readonly onUnmount: () => void;
}
const App = (props: AppActions) => {
  const wsConnectionRef = React.useRef<WebSocket>(null);
  const [connectionStatus, setConnectionStatus] = React.useState<ConnectionStatus>('init');

  const onConnect = (c: any) => {
    setConnectionStatus('connected');
    console.log('connected:', c);
  }
  const onError = (e) => {
    console.log('error:', e);
  }
  const onMessage = (m: any) => {
    console.log('message received:', m);
  }
  const onClose = (d: any) => {
    console.log('disconnected:', d);
  }

  React.useEffect(() => {
    if (wsConnectionRef.current === null) {
      console.log('connecting');
      const ws = new WebSocket(WS_ENDPOINT);

      ws.onopen = onConnect;
      ws.onerror = onError;
      ws.onmessage = onMessage;
      ws.onclose = onClose;
      wsConnectionRef.current = ws;
    }
    return () => {
      if (wsConnectionRef.current! == null) {
        console.log('disconnecting');
        setConnectionStatus('disconnecting');
        wsConnectionRef.current.close(1000);
      } else {
        console.log('unmounting - no need to disconnect');
      }
    }
  }, []);

  const disconnect = () => {
    if (wsConnectionRef.current !== null) {
      wsConnectionRef.current.close();
    }
    props.onUnmount();
  }

  return (
    <WebsocketContext.Provider value={wsConnectionRef.current}>
      <p>Connection Status: {connectionStatus}</p>
      <Messages />
      <button onClick={disconnect}>Disconnect</button>
    </WebsocketContext.Provider>
  );
}


export default App;

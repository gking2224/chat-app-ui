import * as React from 'react';
import { ConnectionStatus } from '../model/domain/websocket';

const WS_ENDPOINT = process.env.WEBSOCKET_ENDPOINT;

export default (onDisconnect: () => void): [WebSocket | null, ConnectionStatus, () => void] => {
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
    onDisconnect();
  }
  return [wsConnectionRef.current, connectionStatus, disconnect];
}

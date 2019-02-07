import * as React from 'react';
import { ConnectionStatus } from '../model/domain/websocket';

const WS_ENDPOINT = process.env.WEBSOCKET_ENDPOINT;
const wsUrl = (room: string, author: string) => `${WS_ENDPOINT}/?room=${room}&room=${author}`;

export default <T>(
  room: string,
  author: string,
  onMessageReceived: (message: T) => void,
  onDisconnect: () => void,
): [WebSocket | null, ConnectionStatus, () => void, (message: T) => void] => {
  const wsConnectionRef = React.useRef<WebSocket>(null);
  const [connectionStatus, setConnectionStatus] = React.useState<ConnectionStatus>('init');


  const disconnect = () => {
    if (wsConnectionRef.current !== null) {
      wsConnectionRef.current.close();
    }
    onDisconnect();
  }
  const onConnect = (c: any) => {
    setConnectionStatus('connected');
    console.log('connected:', c);
  }
  const onError = (e: any) => {
    console.log('error:', e);
  }
  const onMessage = (m: any) => {
    console.log('message received:', m);
    onMessageReceived(JSON.parse(m.data) as T);
  }
  const onClose = (d: any) => {
    console.log('disconnected:', d);
    disconnect();
  }

  const sendMessage = (m: T) => {
    if (wsConnectionRef.current !== null) {
      wsConnectionRef.current.send(JSON.stringify(m));
    }
  }

  React.useEffect(() => {
    if (wsConnectionRef.current === null) {
      console.log('connecting');
      const ws = new WebSocket(wsUrl(room, author));

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
  return [wsConnectionRef.current, connectionStatus, disconnect, sendMessage];
}

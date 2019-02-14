import * as React from 'react';

export type ConnectionStatus = 'init' | 'connected' | 'disconnecting';

const WS_ENDPOINT = process.env.WEBSOCKET_ENDPOINT;
const wsUrl = (room: string, author: string) => `${WS_ENDPOINT}/?room=${room}&author=${author}`;

export default <S, R>(
  room: string,
  author: string,
  onMessageReceived: (message: R) => void,
  onDisconnect: () => void,
  onConnect: () => void,
  validateResponse: (x: any) => R,
): [WebSocket | null, ConnectionStatus, () => void, (message: S) => void] => {
  const wsConnectionRef = React.useRef<WebSocket>(null) as React.MutableRefObject<WebSocket>;
  const [connectionStatus, setConnectionStatus] = React.useState<ConnectionStatus>('init');

  const disconnect = () => {
    if (wsConnectionRef.current !== null) {
      wsConnectionRef.current.close();
    }
    onDisconnect();
  };
  const onOpen = (c: any) => {
    setConnectionStatus('connected');
    console.log('connected:', c);
    if (onConnect) onConnect();
  };
  const onError = (e: any) => {
    console.log('error:', e);
  };
  const onMessage = (m: any) => {
    console.log('message received:', m);
    if (m) onMessageReceived(validateResponse(JSON.parse(m.data)));
  };
  const onClose = (d: any) => {
    console.log('disconnected:', d);
    disconnect();
  };

  const sendMessage = (m: S) => {
    if (wsConnectionRef.current !== null) {
      wsConnectionRef.current.send(JSON.stringify(m));
    }
  };

  React.useEffect(() => {
    if (wsConnectionRef.current === null) {
      console.log('connecting');
      const ws = new WebSocket(wsUrl(room, author));

      ws.onopen = onOpen; // tslint:disable-line:no-object-mutation
      ws.onerror = onError; // tslint:disable-line:no-object-mutation
      ws.onmessage = onMessage; // tslint:disable-line:no-object-mutation
      ws.onclose = onClose; // tslint:disable-line:no-object-mutation
      wsConnectionRef.current = ws; // tslint:disable-line
    }
    return () => {
      if (wsConnectionRef.current !== null) {
        console.log('disconnecting');
        setConnectionStatus('disconnecting');
        wsConnectionRef.current.close(1000);
      } else {
        console.log('unmounting - no need to disconnect');
      }
    };
  }, []);
  return [wsConnectionRef.current, connectionStatus, disconnect, sendMessage];
};

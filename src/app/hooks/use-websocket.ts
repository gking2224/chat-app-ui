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
    if (onConnect) onConnect();
  };
  const onError = (e: any) => {
    console.error(e);
  };
  const onMessage = (m: any) => {
    console.log(typeof m.data);
    console.log(m.data);
    console.log(`Received message: ${JSON.stringify(m.data)}`);
    if (m) onMessageReceived(validateResponse(JSON.parse(m.data)));
  };
  const onClose = (d: any) => {
    disconnect();
  };

  const sendMessage = (m: S) => {
    if (wsConnectionRef.current !== null) {
      wsConnectionRef.current.send(JSON.stringify(m));
    }
  };

  React.useEffect(() => {
    if (wsConnectionRef.current === null) {
      const ws = new WebSocket(wsUrl(room, author));

      ws.onopen = onOpen; // tslint:disable-line:no-object-mutation
      ws.onerror = onError; // tslint:disable-line:no-object-mutation
      ws.onmessage = onMessage; // tslint:disable-line:no-object-mutation
      ws.onclose = onClose; // tslint:disable-line:no-object-mutation
      wsConnectionRef.current = ws; // tslint:disable-line
    }
    return () => {
      if (wsConnectionRef.current !== null) {
        setConnectionStatus('disconnecting');
        wsConnectionRef.current.close(1000);
      }
    };
  }, []);
  return [wsConnectionRef.current, connectionStatus, disconnect, sendMessage];
};

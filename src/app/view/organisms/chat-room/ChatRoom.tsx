import { validateWebsocketMessageResponse, WebsocketMessageRequest, WebsocketMessageResponse } from '@animando/chat-types'; // tslint:disable-line:no-implicit-dependencies max-line-length
import * as React from 'react';
import { WebsocketContext } from '../../../hoc/withWebSocket';
import useMessages from '../../../hooks/use-messages';
import useWebsocket from '../../../hooks/use-websocket';
import Messages from '../messages/Messages';

interface ChatRoomProps {
  readonly room: string;
  readonly author: string;
  readonly onLeave: () => void;
}

export const ChatRoom = (props: ChatRoomProps) => {

  const [messages, addMessage] = useMessages();

  const onMessageReceived = (m: WebsocketMessageResponse) => addMessage(m);
  const onConnect = () => sendMessage({ action: 'init', roomName: props.room });

  const [connection, connectionStatus, disconnect, sendMessage] =
    useWebsocket<WebsocketMessageRequest, WebsocketMessageResponse>(
      props.room, props.author, onMessageReceived, props.onLeave, onConnect, validateWebsocketMessageResponse);

  const onAddNewMessage = (message: string) => {
    sendMessage({ action: 'message', message: { message, author: props.author, room: props.room } });
  };
  return (
    <WebsocketContext.Provider value={connection}>
      <p>Connection Status: {connectionStatus}</p>
      <Messages messages={messages} room={props.room} author={props.author} onAddNewMessage={onAddNewMessage} />
      <button type={'button'} onClick={disconnect}>Leave room</button>
    </WebsocketContext.Provider>
  );
};

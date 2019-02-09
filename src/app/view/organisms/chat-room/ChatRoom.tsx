import * as React from 'react';
import Messages from '../messages/Messages';
import { WebsocketContext } from '../../../hoc/withWebSocket';
import useWebsocket from '../../../hooks/use-websocket';
import { ReceiveMessage as ReceiveMessageType, SendMessage as SendMessageType } from '../../../model/domain/message';
import useMessages from '../../../hooks/use-messages';

interface ChatRoomProps {
  readonly room: string;
  readonly author: string;
  readonly onLeave: () => void;
}

export const ChatRoom = (props: ChatRoomProps) => {

  const [messages, addMessage] = useMessages();

  const onMessageReceived = (m: ReceiveMessageType) => addMessage(m);
  const onConnect = () => sendMessage({ action: 'init', room: props.room });

  const [connection, connectionStatus, disconnect, sendMessage] = useWebsocket<SendMessageType, ReceiveMessageType>(
    props.room, props.author, onMessageReceived, props.onLeave, onConnect);

  const onAddNewMessage = (message: string) => {
    sendMessage({ action: 'message', message: { message, author: props.author, room: props.room } });
  }
  return (
    <WebsocketContext.Provider value={connection}>
      <p>Connection Status: {connectionStatus}</p>
      <Messages messages={messages} room={props.room} author={props.author} onAddNewMessage={onAddNewMessage} />
      <button type={'button'} onClick={disconnect}>Leave room</button>
    </WebsocketContext.Provider>
  );
}

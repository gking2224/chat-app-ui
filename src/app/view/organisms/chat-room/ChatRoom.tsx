import * as React from 'react';
import Messages from '../messages/Messages';
import { WebsocketContext } from '../../../hoc/withWebSocket';
import useWebsocket from '../../../hooks/use-websocket';
import { Message } from '../../../model/domain/message';


type InitMessage = {
  action: 'init';
  room: string;
}
type InitRoomMessages = {
  action: 'init';
  messages: Message[];
}
type NewMessage = {
  action: 'message';
  message: Message;
}
type SendMessage = InitMessage | NewMessage;
type ReceiveMessage = NewMessage | InitRoomMessages;

const useMessages = (room: string): [Message[], (m: ReceiveMessage) => void] => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  const addMessage = (payload: ReceiveMessage) => {
    if (payload.action === 'init') {
      setMessages(payload.messages);
    } else {
      setMessages((prev) => [...prev, payload.message]);
    }
  }
  return [messages, addMessage];
}

interface ChatRoomProps {
  readonly room: string;
  readonly author: string;
  readonly onLeave: () => void;
}

export const ChatRoom = (props: ChatRoomProps) => {

  const [messages, addMessage] = useMessages(props.room);
  const onMessageReceived = (m: ReceiveMessage) => {
    addMessage(m);
  }
  const onConnect = () => {
    sendMessage({ action: 'init', room: props.room });
  }

  const [connection, connectionStatus, disconnect, sendMessage] =
    useWebsocket<SendMessage, ReceiveMessage>(props.room, props.author, onMessageReceived, props.onLeave, onConnect);

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

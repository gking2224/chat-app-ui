import * as React from 'react';
import Messages from '../messages/Messages';
import { WebsocketContext } from '../../../hoc/withWebSocket';
import useWebsocket from '../../../hooks/use-websocket';
import { getMessages } from '../../../handlers/message-handlers';
import { Message } from '../../../model/domain/message';


const useMessages = (room: string): [Message[], (m: Message) => void] => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  React.useEffect(() => {
    getMessages(room).then((mm) => setMessages(mm));
  }, [room]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
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
  const onMessageReceived = (m: any) => addMessage(m);

  const [connection, connectionStatus, disconnect, sendMessage] =
    useWebsocket<Message>(props.room, props.author, onMessageReceived, props.onLeave);


  const onAddNewMessage = (message: string) => {
    sendMessage({ message, author: props.author, room: props.room });
  }
  return (
    <WebsocketContext.Provider value={connection}>
      <p>Connection Status: {connectionStatus}</p>
      <Messages messages={messages} room={props.room} author={props.author} onAddNewMessage={onAddNewMessage} />
      <button type={'button'} onClick={disconnect}>Leave room</button>
    </WebsocketContext.Provider>
  );
}

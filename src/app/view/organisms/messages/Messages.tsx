import * as React from 'react';
import { getMessages } from '../../../handlers/message-handlers';
import { Message } from '../../../model/domain/message';
import { NewMessage } from '../../molecules/new-message/NewMessage';
import withWebSocket, { WebsocketProps } from '../../../hoc/withWebSocket';

interface SendMessageType {
  message: string;
  author: string;
}
type ReceiveMessageType = string;

const useMessages = (): [Message[], (m: Message) => void] => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  React.useEffect(() => {
    getMessages().then((mm) => setMessages(mm));
  }, []);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  }
  return [messages, addMessage];
}

const Messages = (props: WebsocketProps<SendMessageType, ReceiveMessageType>) => {
  const [messages, addMessage] = useMessages();
  const onAddNewMessage = (message) => props.send({ message, author: 'Me' })
  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((m: Message) => <li key={m.messageId}>{JSON.stringify(m)}</li>)}
      </ul>
      <NewMessage onAddNewMessage={onAddNewMessage} />
    </div>
  )
}
export default withWebSocket<{}, SendMessageType, ReceiveMessageType>(Messages);

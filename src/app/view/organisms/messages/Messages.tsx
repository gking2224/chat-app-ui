import * as React from 'react';
import { Message } from '../../../model/domain/message';
import { NewMessage } from '../../molecules/new-message/NewMessage';
import withWebSocket, { WebsocketProps } from '../../../hoc/withWebSocket';

interface SendMessageType {
  message: string;
  author: string;
  room: string;
}
type ReceiveMessageType = string;

interface MessageProps {
  room: string;
  author: string;
  messages: Message[];
  onAddNewMessage: (m: string) => void;
}
type AllProps = MessageProps & WebsocketProps<SendMessageType, ReceiveMessageType>;

const Messages = (props: AllProps) => {
  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {props.messages.map((m: Message) => <li key={m.messageId}>{JSON.stringify(m)}</li>)}
      </ul>
      <NewMessage onAddNewMessage={props.onAddNewMessage} />
    </div>
  )
}
export default withWebSocket<MessageProps, SendMessageType, ReceiveMessageType>(Messages);

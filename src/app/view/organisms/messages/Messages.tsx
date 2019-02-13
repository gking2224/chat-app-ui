import * as React from 'react';
import { NewMessage } from '../../molecules/new-message/NewMessage';
import withWebSocket, { WebsocketProps } from '../../../hoc/withWebSocket';
import Message from '../../molecules/message/Message';
import { ChatRoomMessageEntity } from 'chat-types';

interface SendMessageType {
  message: string;
  author: string;
  room: string;
}
type ReceiveMessageType = string;

interface MessageProps {
  room: string;
  author: string;
  messages: ChatRoomMessageEntity[];
  onAddNewMessage: (m: string) => void;
}
type AllProps = MessageProps & WebsocketProps<SendMessageType, ReceiveMessageType>;

const Messages = (props: AllProps) => {
  return (
    <div>
      <h2>Messages</h2>
      <div>
        {props.messages.map((m: ChatRoomMessageEntity) => <Message key={m.messageId} message={m} />)}
      </div>
      <NewMessage onAddNewMessage={props.onAddNewMessage} />
    </div>
  )
}
export default withWebSocket<MessageProps, SendMessageType, ReceiveMessageType>(Messages);

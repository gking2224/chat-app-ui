import * as React from 'react';
import { NewChatMessage, SavedChatMessage } from '../../../model/domain/message';
import { NewMessage } from '../../molecules/new-message/NewMessage';
import withWebSocket, { WebsocketProps } from '../../../hoc/withWebSocket';
import Message from '../../molecules/message/Message';

interface SendMessageType {
  message: string;
  author: string;
  room: string;
}
type ReceiveMessageType = string;

interface MessageProps {
  room: string;
  author: string;
  messages: SavedChatMessage[];
  onAddNewMessage: (m: string) => void;
}
type AllProps = MessageProps & WebsocketProps<SendMessageType, ReceiveMessageType>;

const Messages = (props: AllProps) => {
  return (
    <div>
      <h2>Messages</h2>
      <div>
        {props.messages.map((m: SavedChatMessage) => <Message key={m.messageId} message={m} />)}
      </div>
      <NewMessage onAddNewMessage={props.onAddNewMessage} />
    </div>
  )
}
export default withWebSocket<MessageProps, SendMessageType, ReceiveMessageType>(Messages);

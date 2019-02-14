import { ChatRoomMessageEntity } from '@animando/chat-types';
import * as React from 'react';
import withWebSocket, { WebsocketProps } from '../../../hoc/withWebSocket';
import Message from '../../molecules/message/Message';
import { NewMessage } from '../../molecules/new-message/NewMessage';

interface SendMessageType {
  readonly message: string;
  readonly author: string;
  readonly room: string;
}
type ReceiveMessageType = string;

interface MessageProps {
  readonly room: string;
  readonly author: string;
  readonly messages: ReadonlyArray<ChatRoomMessageEntity>;
  readonly onAddNewMessage: (m: string) => void;
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
  );
};
export default withWebSocket<MessageProps, SendMessageType, ReceiveMessageType>(Messages);

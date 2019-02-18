import { ChatRoomMessageEntity } from '@animando/chat-types';
import * as React from 'react';
import './message.css';

interface MessageProps {
  readonly message: ChatRoomMessageEntity;
}

const Message = (props: MessageProps) => {
  const { message } = props;
  return (
    <div className={'message'}>
      <div className={'message__header'}>
        <span className={'message__author'}>{message.author}</span>
        <span className={'message__timestamp'}>
          {new Date(message.timestamp).toLocaleDateString()} {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
      <div className={'message__message-ctr'}>
        <p className={'message__message'}>{message.message} [{message.language}]</p>
        {message.translation && <p className={'message__translation'}>({message.translation})</p>}
      </div>
    </div>
  );
};
export default Message;

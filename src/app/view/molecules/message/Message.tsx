import * as React from 'react';
import './message.css';
import { ChatRoomMessageEntity } from 'chat-types';

interface MessageProps {
  message: ChatRoomMessageEntity;
}

const Message = (props: MessageProps) => {
  const { message } = props;
  return (
    <div className={'message'}>
      <div>
        <span className={'message__author'}>{message.author}</span>
        <span className={'message__message'}>{message.message} [{message.language}]</span>
      </div>
      {message.translation && <p className={'message__translation'}>({message.translation})</p>}
    </div>
  )
}
export default Message;

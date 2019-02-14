import { ChatRoomMessageEntity, WebsocketMessageResponse } from '@animando/chat-types'; // tslint:disable-line:no-implicit-dependencies max-line-length
import * as React from 'react';

export default (): [ReadonlyArray<ChatRoomMessageEntity>, (m: WebsocketMessageResponse) => void] => {
  const [messages, setMessages] = React.useState<ReadonlyArray<ChatRoomMessageEntity>>([]);

  const addMessage = (payload: WebsocketMessageResponse) => {
    if (payload.action === 'init') {
      setMessages(payload.messages);
    } else {
      setMessages((prev) => [...prev, payload.message]);
    }
  };
  return [messages, addMessage];
};

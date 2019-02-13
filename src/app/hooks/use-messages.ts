import * as React from 'react';
import { ChatRoomMessageEntity, WebsocketMessageResponse } from 'chat-types';

export default (): [ChatRoomMessageEntity[], (m: WebsocketMessageResponse) => void] => {
  const [messages, setMessages] = React.useState<ChatRoomMessageEntity[]>([]);

  const addMessage = (payload: WebsocketMessageResponse) => {
    if (payload.action === 'init') {
      setMessages(payload.messages);
    } else {
      setMessages((prev) => [...prev, payload.message]);
    }
  }
  return [messages, addMessage];
}

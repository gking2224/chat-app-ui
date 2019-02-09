import { ReceiveMessage, SavedChatMessage } from "../model/domain/message";
import * as React from 'react';

export default (): [SavedChatMessage[], (m: ReceiveMessage) => void] => {
  const [messages, setMessages] = React.useState<SavedChatMessage[]>([]);

  const addMessage = (payload: ReceiveMessage) => {
    if (payload.action === 'init') {
      setMessages(payload.messages);
    } else {
      setMessages((prev) => [...prev, payload.message]);
    }
  }
  return [messages, addMessage];
}

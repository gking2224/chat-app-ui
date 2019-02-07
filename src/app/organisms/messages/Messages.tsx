import * as React from 'react';
import { getMessages } from '../../handlers/message-handlers';
import { Message } from '../../model/domain/message';


export default () => {
  const [messages, setMessages] = React.useState<Message[]>([] as Message[]);
  React.useEffect(() => {
    console.log('init get messages');
    getMessages().then((mm) => setMessages(mm));
  }, []);
  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map(m => <li key={m.message}>{JSON.stringify(m)}</li>)}
      </ul>
    </div>
  )
}

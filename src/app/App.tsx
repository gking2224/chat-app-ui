import { chooseLogger, Logger } from '@animando/cloud-app-logging';
import * as React from 'react';
import { ChatApp } from './view/pages/chat-app/ChatApp';

const logger = chooseLogger();
export const LoggerContext = React.createContext<Logger>(logger);

const App = () => {
  return (
    <LoggerContext.Provider value={logger}>
      <ChatApp />
    </LoggerContext.Provider>
  );
};

export default App;

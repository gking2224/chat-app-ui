import * as React from 'react';
import logger, { Logger } from '../util/logger';
import { ChatApp } from './view/pages/chat-app/ChatApp';

export const LoggerContext = React.createContext<Logger>(logger);

const App = () => {
  return (
    <LoggerContext.Provider value={logger}>
      <ChatApp />
    </LoggerContext.Provider>
  );
};

export default App;

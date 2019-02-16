import { Logger } from '@animando/cloud-app-logging';
import * as React from 'react';

export const useEnterExitLogging = (logger: Logger, logOnEnter: string, logOnExit: string) => {
  React.useEffect(() => {
    logger.debug(logOnEnter);
    return () => {
      logger.debug(logOnExit);
    };
  }, []);
};

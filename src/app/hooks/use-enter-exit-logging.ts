import * as React from 'react';
import { Logger } from '../../util/logger';

export const useEnterExitLogging = (logger: Logger, logOnEnter: string, logOnExit: string) => {
  React.useEffect(() => {
    logger.debug(logOnEnter);
    return () => {
      logger.debug(logOnExit);
    };
  }, []);
};

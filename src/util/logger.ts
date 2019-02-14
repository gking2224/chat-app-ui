import { Literal, Union } from 'runtypes';
import { awsLogger } from './aws-logger';
import { consoleLogger } from './console-logger';

export type Logger = ({ debug: ((s: string) => Promise<void>) });

const LoggerTypeValidation = Union(Literal('cloudwatch'), Literal('console'));
const loggerType = process.env.LOGGER_TYPE || 'console';

const chooseLogger = (): Logger => {
  if (LoggerTypeValidation.validate(loggerType).success) {
    switch (loggerType) {
      case 'cloudwatch':
        return awsLogger();
      case 'console':
        return consoleLogger;
    }
  }
  console.error(`Invalid loggerType '${loggerType}', falling back to console logging`);
  return consoleLogger;
};

const logger: Logger = chooseLogger();
export default logger;

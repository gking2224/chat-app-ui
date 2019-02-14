import { Logger } from './logger';

export const consoleLogger: Logger = ({
  debug: async (s: string) => {
    console.log(s);
  },
});

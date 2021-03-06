import { Logger } from '@animando/cloud-app-logging';
import * as React from 'react';
import { LoggerContext } from '../App';

export interface LoggerProps {
  readonly logger: Logger;
}

export default <P, S, R>(Component: React.ComponentType<P & LoggerProps>): React.ComponentType<P> => {
  const HocComponent = (props: P) => (
    <LoggerContext.Consumer>
      {(l: Logger) => {
        return <Component {...props} logger={l} />;
      }}
    </LoggerContext.Consumer>
  );
  return HocComponent;
};

import { IConnection, IGlobalConfig } from '../interface';

export type ParamList = {
  Bookings: {
    tokenData: IConnection;
  };
};

export type StateType = {
  connectionData: IConnection[];
  globalConfig: IGlobalConfig;
  initializing: boolean;
};

import { RootState } from 'types';
import { Saga } from 'redux-saga';
import { SagaInjectionModes } from 'redux-injectors';
import { Reducer, AnyAction } from '@reduxjs/toolkit';

// Exclude reducer key that is used in test cases
export type RootStateKeyType = Exclude<keyof RootState, 'testStateKey'>;

export type InjectedReducersType = {
  [P in RootStateKeyType]?: Reducer<RootState[P], AnyAction>;
};

export interface InjectReducerParams<Key extends RootStateKeyType> {
  key: Key;
  reducer: Reducer<RootState[Key], AnyAction>;
}

export interface InjectSagaParams {
  key: RootStateKeyType;
  saga: Saga;
  mode?: SagaInjectionModes;
}

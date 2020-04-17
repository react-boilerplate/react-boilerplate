import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from 'redux-injectors';
import {
  InjectReducerParams,
  InjectSagaParams,
  RootStateKeyType,
} from './types/injector-typings';

/* Wrap redux-injectors with stricter types */

export function useInjectReducer<Key extends RootStateKeyType>({
  key,
  reducer,
}: InjectReducerParams<Key>) {
  return useReducer({ key, reducer });
}

export function useInjectSaga({ key, saga, mode }: InjectSagaParams) {
  return useSaga({ key, saga, mode });
}

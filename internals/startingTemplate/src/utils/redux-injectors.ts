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

export function useInjectReducer<Key extends RootStateKeyType>(
  params: InjectReducerParams<Key>,
) {
  return useReducer(params);
}

export function useInjectSaga(params: InjectSagaParams) {
  return useSaga(params);
}

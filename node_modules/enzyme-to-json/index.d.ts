/// <reference types="cheerio" />
import {CommonWrapper, ShallowWrapper, ReactWrapper} from 'enzyme';

export interface Json {
  type: string;
  props: {[key: string]: any};
  children: Array<Json>;
  $$typeof: Symbol;
}

export interface OutputMapper {
  (json: Json): Json;
}

export interface Options {
  map?: OutputMapper;
  noKey: boolean;
  mode?: 'shallow' | 'deep';
}

export interface JestSerializer {
  test: (CommonWrapper: CommonWrapper) => boolean;
  print: (CommonWrapper: CommonWrapper, serializer: JestSerializer) => Json;
}

/**
 * toJson helper is used to convert any Enzyme wrapper to a format compatible with Jest snapshot
 * @param wrapper any Enzyme wrapper
 * @param [options] an option object which accepts `map`, `noKey` and `mode` as keys
 */
export declare function toJson(wrapper: CommonWrapper | Cheerio, options?: Options): Json;
export declare function toJson<P, S>(wrapper: CommonWrapper<P, S> | Cheerio, options?: Options): Json;

/**
 * shallowToJson helper is used to convert Enzyme shallow wrappers to a format compatible with Jest snapshot
 * @param wrapper an Enzyme shallow wrapper
 * @param [options] an option object which accepts `map`, `noKey` and `mode` as keys
 */
export declare function shallowToJson(wrapper: ShallowWrapper, options?: Options,): Json;
export declare function shallowToJson<P, S>(wrapper: ShallowWrapper<P, S>, options?: Options,): Json;

/**
 * mountToJson helper is used to convert Enzyme mount wrappers to a format compatible with Jest snapshot
 * @param wrapper an Enzyme mount wrapper
 * @param [options] an option object which accepts `map`, `noKey` and `mode` as keys
 */
export declare function mountToJson(wrapper: ReactWrapper, options?: Options): Json;
export declare function mountToJson<P, S>(wrapper: ReactWrapper<P, S>, options?: Options): Json;

/**
 * renderToJson helper is used to convert Enzyme render wrappers to a format compatible with Jest snapshot
 * @param wrapper an Enzyme render wrapper
 * @param [options] an option object which accepts `map`, `noKey` and `mode` as keys
 */
export declare function renderToJson(wrapper: Cheerio, options?: Options): Json;

/**
 * createSerializer helper is used to create snapshot serializers for Jest
 * @param [options] an option object which accepts `map`, `noKey` and `mode` as keys
 */
export declare function createSerializer(options?: Options): JestSerializer;

export default toJson;

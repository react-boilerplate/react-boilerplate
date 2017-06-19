import { handleLoadedModules } from '../Loadable';

describe('Loaded modules handler', () => {
  let reducer;
  let sagas;
  let component;
  beforeEach(() => {
    reducer = { default: () => {} };
    sagas = { default: () => {} };
    component = () => {};
  });

  it('should inject reducer', () => {
    const injectReducer = jest.fn();
    handleLoadedModules(injectReducer, () => {})([reducer, sagas, component]);

    expect(injectReducer).toHaveBeenCalledWith('home', reducer.default);
    expect(injectReducer.mock.calls.length).toBe(1);
  });

  it('should inject sagas', () => {
    const injectSaga = jest.fn();
    handleLoadedModules(() => {}, injectSaga)([reducer, sagas, component]);

    expect(injectSaga).toHaveBeenCalledWith(sagas.default);
    expect(injectSaga.mock.calls.length).toBe(1);
  });

  it('should return the component', () => {
    const returnedComponent = handleLoadedModules(() => {}, () => {})([reducer, sagas, component]);

    expect(returnedComponent).toBe(component);
  });
});

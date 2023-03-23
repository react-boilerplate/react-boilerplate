import { selectGlobal, makeSelectNewString } from '../../App/selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = {
      loading: false,
      error: false,
      newStr: '',
      strData: {
        repositories: false,
      },
    };
    const mockedState = {
      home: globalState,
    };
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectNewString', () => {
  const newstrSelector = makeSelectNewString();
  it('should select the newstr', () => {
    const newstr = '';
    const mockedState = {
      home: {
        newstr,
      },
    };
    expect(newstrSelector(mockedState)).toEqual(newstr);
  });
});

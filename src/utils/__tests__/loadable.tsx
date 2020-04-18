import React from 'react';

export function ExportedFunc() {
  return <div>My lazy-loaded component</div>;
}
export default ExportedFunc;

describe('dummy', () => {
  it('because jest thinks this is a test file', () => {
    expect(ExportedFunc()).toBeDefined();
  });
});

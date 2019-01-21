import EnzymeAdapter from './EnzymeAdapter';

export default function validateAdapter(adapter) {
  if (!adapter) {
    throw new Error(`
      Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none. To
      configure an adapter, you should call \`Enzyme.configure({ adapter: new Adapter() })\`
      before using any of Enzyme's top level APIs, where \`Adapter\` is the adapter
      corresponding to the library currently being tested. For example:

      import Adapter from 'enzyme-adapter-react-15';

      To find out more about this, see http://airbnb.io/enzyme/docs/installation/index.html
    `);
  }
  if (!(adapter instanceof EnzymeAdapter)) {
    throw new Error('Enzyme Internal Error: configured enzyme adapter did not inherit from the EnzymeAdapter base class');
  }
}

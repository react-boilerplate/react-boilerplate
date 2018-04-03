// Enzyme v3 requires use of adapters
// https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md
import 'raf/polyfill';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

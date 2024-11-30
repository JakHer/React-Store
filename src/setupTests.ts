import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import {
  TextEncoder as PolyfillTextEncoder,
  TextDecoder as PolyfillTextDecoder,
} from 'util';

global.TextEncoder = PolyfillTextEncoder as any;
global.TextDecoder = PolyfillTextDecoder as any;

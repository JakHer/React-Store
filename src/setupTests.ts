import '@testing-library/jest-dom';

import {
  TextEncoder as PolyfillTextEncoder,
  TextDecoder as PolyfillTextDecoder,
} from 'util';

global.TextEncoder = PolyfillTextEncoder as any;
global.TextDecoder = PolyfillTextDecoder as any;
